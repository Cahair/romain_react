import { NextResponse } from "next/server";
import {
    BUDGET_OPTIONS,
    CONTACT_RECIPIENT,
    LIMITS,
    PROJECT_OPTIONS,
    STAGE_OPTIONS,
    TIMING_OPTIONS,
    cleanNeeds,
    validateContact,
} from "@/lib/contact";
import { getTransports, sendWith } from "@/lib/mailer";

export const runtime = "nodejs";

// Libellés lisibles dans l'e-mail reçu (en français, langue de Romain).
const PROJECT_LABELS = {
    "site-vitrine": "Site vitrine",
    "site-e-commerce": "Site e-commerce",
    "application-web": "Application web",
    "application-mobile": "Application mobile",
    refonte: "Refonte d'un site existant",
    autre: "Autre",
};

const BUDGET_LABELS = {
    less1k: "Moins de 1 000 €",
    "1k2k": "1 000 – 2 000 €",
    "2k5k": "2 000 – 5 000 €",
    more5k: "Plus de 5 000 €",
    unknown: "Je ne sais pas encore",
};

const STAGE_LABELS = {
    idee: "C'est encore une idée",
    defini: "Le projet est déjà bien défini",
    existant: "Un site existant à refaire",
    presse: "Une échéance serrée",
};

const TIMING_LABELS = {
    asap: "Dès que possible",
    trimestre: "Dans les trois prochains mois",
    annee: "Plus tard dans l'année",
    inconnu: "Pas de date précise",
};

const NEED_LABELS = {
    presenter: "Présenter mon activité",
    realisations: "Montrer mes réalisations",
    demandes: "Recevoir des demandes de devis",
    google: "Être trouvé sur Google",
    rdv: "Prise de rendez-vous en ligne",
    autonomie: "Modifier le contenu moi-même",
    catalogue: "Présenter mes produits",
    paiement: "Paiement en ligne",
    livraison: "Livraison ou retrait sur place",
    commandes: "Gérer les commandes et les stocks",
    reservations: "Réservations ou inscriptions en ligne",
    "espace-client": "Espace client avec connexion",
    adherents: "Gérer des adhérents ou des clients",
    suivi: "Tableau de bord, suivi d'activité",
    papier: "Remplacer des fichiers Excel ou du papier",
    stores: "Publication sur l'App Store et Google Play",
    notifications: "Notifications",
    comptes: "Comptes utilisateurs",
    "back-office": "Un back-office pour gérer le contenu",
    design: "Un design plus actuel",
    mobile: "Un meilleur affichage sur téléphone",
    vitesse: "Un site plus rapide",
};

const LOCALE_LABELS = { fr: "Français", en: "Anglais", de: "Allemand" };

const escapeHtml = (value) =>
    String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
const singleLine = (value) => String(value).replace(/[\r\n]+/g, " ").trim();

// Limite d'envois par adresse IP, en mémoire de l'instance : suffisant contre les rafales.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const recentSends = new Map();

function isRateLimited(ip) {
    const now = Date.now();
    if (recentSends.size > 5000) recentSends.clear();
    const recent = (recentSends.get(ip) || []).filter((time) => now - time < WINDOW_MS);
    recent.push(now);
    recentSends.set(ip, recent);
    return recent.length > MAX_PER_WINDOW;
}

const pick = (labels, options, value) => (options.includes(value) ? labels[value] : "Non précisé");

function buildMail({ name, email, phone, message, needs, project, stage, timing, budget, locale }) {
    const cleanName = singleLine(name);
    const cleanEmail = email.trim();
    const cleanPhone = typeof phone === "string" ? singleLine(phone).slice(0, LIMITS.phone) : "";
    // Le message est facultatif quand des besoins sont cochés.
    const cleanMessage = typeof message === "string" ? message.trim() : "";
    const needLabels = cleanNeeds(needs).map((need) => NEED_LABELS[need]);
    const projectLabel = pick(PROJECT_LABELS, PROJECT_OPTIONS, project);
    const localeLabel = LOCALE_LABELS[locale] || LOCALE_LABELS.fr;
    const subject = `Nouvelle demande de ${cleanName} — ${projectLabel}`;

    // [libellé, valeur en texte brut, valeur HTML si différente]
    const fields = [
        ["Nom", cleanName],
        ["E-mail", cleanEmail, `<a href="mailto:${escapeHtml(cleanEmail)}" style="color:#2563eb;">${escapeHtml(cleanEmail)}</a>`],
        cleanPhone && [
            "Téléphone",
            cleanPhone,
            `<a href="tel:${escapeHtml(cleanPhone.replace(/[^\d+]/g, ""))}" style="color:#2563eb;">${escapeHtml(cleanPhone)}</a>`,
        ],
        ["Projet", projectLabel],
        ["Besoins", needLabels.length > 0 ? needLabels.join(", ") : "Non précisé"],
        ["Avancement", pick(STAGE_LABELS, STAGE_OPTIONS, stage)],
        ["Échéance", pick(TIMING_LABELS, TIMING_OPTIONS, timing)],
        ["Budget", pick(BUDGET_LABELS, BUDGET_OPTIONS, budget)],
        ["Langue du site", localeLabel],
    ].filter(Boolean);
    const rows = fields.map(([label, value, html]) => [label, html || escapeHtml(value)]);

    const text = [
        "Nouvelle demande depuis romain-kantzer.com/demarrer",
        "",
        ...fields.map(([label, value]) => `${label} : ${value}`),
        "",
        "Message :",
        cleanMessage || "(pas de message, voir les besoins ci-dessus)",
        "",
        `Répondez directement à ce mail pour écrire à ${cleanName}.`,
    ].join("\n");

    const replySubject = encodeURIComponent("Re: votre demande sur romain-kantzer.com");
    const html = `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8"><title>${escapeHtml(subject)}</title></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#171717;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:32px 12px;">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border:1px solid #e5e7eb;border-radius:16px;overflow:hidden;">
<tr><td style="background:#171717;padding:28px 32px;">
<div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#a3a3a3;">Démarrer un projet</div>
<div style="margin-top:8px;font-size:24px;line-height:1.25;font-weight:600;color:#e5e5e5;">Nouvelle demande de ${escapeHtml(cleanName)}</div>
<div style="margin-top:14px;width:32px;height:3px;background:#3b82f6;"></div>
</td></tr>
<tr><td style="padding:24px 32px 8px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:15px;">
${rows.map(([label, value]) => `<tr><td style="padding:8px 0;width:140px;color:#6b7280;vertical-align:top;">${label}</td><td style="padding:8px 0;color:#171717;">${value}</td></tr>`).join("\n")}
</table>
</td></tr>
<tr><td style="padding:12px 32px 28px;">
<div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#6b7280;margin-bottom:10px;">Message</div>
<div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:12px;padding:18px 20px;font-size:15px;line-height:1.6;white-space:pre-wrap;">${cleanMessage ? escapeHtml(cleanMessage) : '<span style="color:#6b7280;">Pas de message, voir les besoins ci-dessus.</span>'}</div>
<a href="mailto:${escapeHtml(cleanEmail)}?subject=${replySubject}" style="display:inline-block;margin-top:24px;background:#3b82f6;color:#ffffff;text-decoration:none;padding:12px 22px;border-radius:999px;font-weight:600;font-size:14px;">Répondre à ${escapeHtml(cleanName)}</a>
</td></tr>
<tr><td style="padding:16px 32px;background:#f9fafb;border-top:1px solid #e5e7eb;font-size:12px;color:#6b7280;">Envoyé depuis romain-kantzer.com/demarrer. Répondre à ce mail écrit directement à ${escapeHtml(cleanEmail)}.</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;

    return { subject, text, html, replyTo: { name: cleanName, address: cleanEmail } };
}

export async function POST(request) {
    let body;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ ok: false, code: "bad_request" }, { status: 400 });
    }

    const { name, email, phone, message, needs, project, stage, timing, budget, locale, website } = body || {};

    // Pot de miel rempli : robot. On répond comme si tout allait bien, sans rien envoyer.
    if (website) {
        return NextResponse.json({ ok: true });
    }

    const fields = validateContact({ name, email, message, needs });
    if (Object.keys(fields).length > 0) {
        return NextResponse.json({ ok: false, code: "validation", fields }, { status: 400 });
    }

    const ip = (request.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "local";
    if (isRateLimited(ip)) {
        return NextResponse.json({ ok: false, code: "rate_limited" }, { status: 429 });
    }

    const transports = getTransports();
    if (transports.length === 0) {
        console.error("[contact] aucun mode d'envoi configuré (SMTP_*, EMAIL_* ou RESEND_API_KEY)");
        return NextResponse.json({ ok: false, code: "not_configured" }, { status: 503 });
    }

    const mail = buildMail({ name, email, phone, message, needs, project, stage, timing, budget, locale });

    for (const transport of transports) {
        try {
            const id = await sendWith(transport, mail);
            console.info(`[contact] message envoyé via ${transport.name} à ${CONTACT_RECIPIENT} (${id})`);
            return NextResponse.json({ ok: true });
        } catch (error) {
            console.error(`[contact] échec de l'envoi via ${transport.name} :`, error?.message || error);
        }
    }

    return NextResponse.json({ ok: false, code: "send_failed" }, { status: 502 });
}
