import "server-only";
import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { dataDir } from "./files.mjs";
import { findUser } from "./users.mjs";

const COOKIE = "rk_admin";
const MAX_AGE = 7 * 24 * 60 * 60; // secondes

// Clé de signature : ADMIN_SESSION_SECRET si défini, sinon générée une fois dans le dossier
// de données. La changer (ou supprimer le fichier) déconnecte tout le monde.
let secretPromise = null;

function getSecret() {
    if (process.env.ADMIN_SESSION_SECRET) return Promise.resolve(process.env.ADMIN_SESSION_SECRET);
    secretPromise ??= loadOrCreateSecret().catch((error) => {
        secretPromise = null;
        throw error;
    });
    return secretPromise;
}

async function loadOrCreateSecret() {
    const file = path.join(dataDir(), "session-secret");
    try {
        const existing = (await readFile(file, "utf8")).trim();
        if (existing.length >= 32) return existing;
    } catch (error) {
        if (error.code !== "ENOENT") throw error;
    }
    await mkdir(dataDir(), { recursive: true });
    const secret = randomBytes(32).toString("base64url");
    await writeFile(file, secret, { mode: 0o600 });
    return secret;
}

const sign = (value, secret) => createHmac("sha256", secret).update(value).digest("base64url");

// Jeton : charge utile en base64url + signature HMAC. `v` reprend la version de session du
// compte : la commande `revoke` (ou un changement de mot de passe) l'incrémente et invalide
// les jetons déjà émis.
export async function createSession(user) {
    const secret = await getSecret();
    const payload = Buffer.from(
        JSON.stringify({ sub: user.email, v: user.sessionVersion ?? 0, exp: Math.floor(Date.now() / 1000) + MAX_AGE }),
    ).toString("base64url");
    const store = await cookies();
    store.set(COOKIE, `${payload}.${sign(payload, secret)}`, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: MAX_AGE,
    });
}

export async function clearSession() {
    (await cookies()).delete(COOKIE);
}

export async function getSession() {
    const token = (await cookies()).get(COOKIE)?.value;
    if (!token) return null;
    const [payload, signature] = token.split(".");
    if (!payload || !signature) return null;

    const expected = Buffer.from(sign(payload, await getSecret()));
    const received = Buffer.from(signature);
    if (expected.length !== received.length || !timingSafeEqual(expected, received)) return null;

    let data;
    try {
        data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    } catch {
        return null;
    }
    if (!data?.sub || typeof data.exp !== "number" || data.exp * 1000 < Date.now()) return null;

    const user = await findUser(data.sub);
    if (!user || (user.sessionVersion ?? 0) !== data.v) return null;
    return { email: user.email };
}

// À appeler en tête de chaque page et de chaque action de l'espace admin : un layout seul
// ne suffit pas, il n'est pas réexécuté à chaque navigation.
export async function requireSession() {
    const session = await getSession();
    if (!session) redirect("/admin/login");
    return session;
}
