import "server-only";
import { readJson, writeJson } from "./files.mjs";
import { sendMail } from "../mailer";

// Compte Instagram connecté à l'espace admin (API Instagram avec connexion Instagram).
// Le jeton d'accès vaut 60 jours ; chaque renouvellement en renvoie un nouveau, valable 60 jours
// de plus. Le site le garde dans data/instagram.json, le renouvelle lui-même (minuteur lancé par
// src/instrumentation.js + à chaque publication) et le transmet à n8n avec chaque publication.
//
// Forme : { accessToken, userId, username, connectedAt, refreshedAt, expiresAt,
//           lastError?: { message, at }, alertedAt? }
const FILE = "instagram.json";
const GRAPH = "https://graph.instagram.com";
const API_VERSION = "v22.0";
const DAY = 24 * 60 * 60 * 1000;
const LIFETIME_DAYS = 60;
// Renouvellement dès que le précédent date d'une semaine (Meta l'interdit avant 24 h).
const REFRESH_AFTER_DAYS = 7;
const MIN_AGE_DAYS = 1;
// En dessous, l'admin affiche un avertissement et une alerte part par e-mail.
export const WARN_BEFORE_DAYS = 14;

const iso = (time) => new Date(time).toISOString();

export const getInstagramAccount = () => readJson(FILE, null);

// Ce que l'interface peut afficher : jamais le jeton lui-même.
export function instagramStatus(account) {
    if (!account) return { connected: false };
    const daysLeft = Math.floor((Date.parse(account.expiresAt) - Date.now()) / DAY);
    return {
        connected: true,
        username: account.username,
        userId: account.userId,
        expiresAt: account.expiresAt,
        refreshedAt: account.refreshedAt,
        daysLeft,
        expired: daysLeft < 0,
        canRefresh: Date.now() - Date.parse(account.refreshedAt) >= MIN_AGE_DAYS * DAY,
        lastError: account.lastError ?? null,
    };
}

async function graph(path, params) {
    const url = new URL(`${GRAPH}/${path}`);
    for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value);
    const response = await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(15_000) });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || data.error) {
        throw new Error(data.error?.message ? `Instagram a répondu « ${data.error.message} ».` : `Instagram a répondu ${response.status}.`);
    }
    return data;
}

async function exchangeForFresh(accessToken) {
    const data = await graph("refresh_access_token", { grant_type: "ig_refresh_token", access_token: accessToken });
    if (!data.access_token) throw new Error("Instagram n'a pas renvoyé de nouveau jeton.");
    const now = Date.now();
    return {
        accessToken: data.access_token,
        refreshedAt: iso(now),
        expiresAt: iso(now + (Number(data.expires_in) || LIFETIME_DAYS * 24 * 3600) * 1000),
        lastError: null,
        alertedAt: null,
    };
}

// Jeton collé dans les réglages : vérifié auprès d'Instagram avant d'être enregistré.
export async function connectInstagram(rawToken) {
    const accessToken = String(rawToken ?? "").trim();
    if (!/^IG\S{20,}$/.test(accessToken)) {
        throw new Error("Ce n'est pas un jeton de l'API Instagram : il commence par « IG » et ne contient pas d'espace.");
    }
    const me = await graph(`${API_VERSION}/me`, { fields: "user_id,username", access_token: accessToken });
    const now = Date.now();
    let account = {
        accessToken,
        userId: String(me.user_id),
        username: me.username,
        connectedAt: iso(now),
        refreshedAt: iso(now),
        expiresAt: iso(now + LIFETIME_DAYS * DAY),
        lastError: null,
    };
    try {
        // Jeton généré il y a plus de 24 h : le renouveler tout de suite donne sa vraie échéance.
        account = { ...account, ...(await exchangeForFresh(accessToken)) };
    } catch {
        // Jeton tout juste généré : Meta refuse le renouvellement avant 24 h, échéance estimée à 60 jours.
    }
    await writeJson(FILE, account);
    return account;
}

export async function disconnectInstagram() {
    await writeJson(FILE, null);
}

// Un seul renouvellement à la fois : l'ancien jeton peut cesser de valoir une fois remplacé.
let pending = null;

// Renouvelle le jeton s'il date d'une semaine (ou tout de suite avec force). Ne lève jamais :
// renvoie { status, account?, error? } avec status absent | a-jour | trop-recent | renouvele | echec.
export function refreshInstagramToken({ force = false } = {}) {
    pending ??= runRefresh(force).finally(() => {
        pending = null;
    });
    return pending;
}

async function runRefresh(force) {
    const account = await getInstagramAccount();
    if (!account) return { status: "absent" };
    const age = Date.now() - Date.parse(account.refreshedAt);
    if (age < MIN_AGE_DAYS * DAY) return { status: "trop-recent", account };
    if (!force && age < REFRESH_AFTER_DAYS * DAY) return { status: "a-jour", account };

    try {
        if (Date.parse(account.expiresAt) <= Date.now()) {
            throw new Error("Le jeton a expiré : en générer un nouveau dans l'app Meta et le coller dans les réglages.");
        }
        const next = { ...account, ...(await exchangeForFresh(account.accessToken)) };
        await writeJson(FILE, next);
        console.info(`[instagram] jeton renouvelé pour @${next.username}, valable jusqu'au ${next.expiresAt}`);
        return { status: "renouvele", account: next };
    } catch (error) {
        const failed = { ...account, lastError: { message: error.message, at: iso(Date.now()) } };
        console.error("[instagram] renouvellement du jeton impossible :", error.message);
        await writeJson(FILE, await alertOnce(failed));
        return { status: "echec", account: failed, error: error.message };
    }
}

// Alerte par e-mail, une fois par jour au plus, quand le renouvellement échoue.
async function alertOnce(account) {
    if (account.alertedAt && Date.now() - Date.parse(account.alertedAt) < DAY) return account;
    const { daysLeft } = instagramStatus(account);
    const echeance = new Intl.DateTimeFormat("fr-FR", { dateStyle: "long", timeZone: "Europe/Paris" }).format(
        new Date(account.expiresAt),
    );
    const sent = await sendMail(
        {
            subject: `[Admin] Jeton Instagram de @${account.username} : renouvellement impossible`,
            text: [
                `Le renouvellement automatique du jeton Instagram de @${account.username} a échoué.`,
                "",
                `Raison : ${account.lastError.message}`,
                daysLeft >= 0
                    ? `Le jeton actuel reste valable jusqu'au ${echeance} (${daysLeft} jour${daysLeft > 1 ? "s" : ""}).`
                    : `Le jeton a expiré le ${echeance} : la publication sur Instagram ne fonctionne plus.`,
                "",
                "Pour réparer : générer un nouveau jeton dans l'app Meta (Générer des tokens d'accès),",
                "puis le coller dans l'espace admin, page Réglages.",
            ].join("\n"),
        },
        "instagram",
    );
    return sent ? { ...account, alertedAt: iso(Date.now()) } : account;
}

// Minuteur du serveur : une vérification peu après le démarrage, puis toutes les 12 heures.
// Drapeau global : en développement, le module peut être réévalué sans que le processus redémarre.
export function startInstagramTokenTimer() {
    if (globalThis.__rkInstagramTimer) return;
    globalThis.__rkInstagramTimer = true;
    const check = () => refreshInstagramToken();
    setTimeout(check, 60_000).unref?.();
    setInterval(check, 12 * 60 * 60 * 1000).unref?.();
}
