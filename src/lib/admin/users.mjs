import { randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { readJson, writeJson } from "./files.mjs";

// Comptes de l'espace admin. Ils ne se créent qu'en ligne de commande (scripts/admin-user.mjs),
// jamais depuis le site.
const USERS_FILE = "admin-users.json";
const scryptAsync = promisify(scrypt);
const KEY_LENGTH = 64;
const COST = { N: 16384, r: 8, p: 1 };

export const MIN_PASSWORD_LENGTH = 12;

export const normalizeEmail = (value) => String(value ?? "").trim().toLowerCase();

export async function listUsers() {
    const { users } = await readJson(USERS_FILE, { users: [] });
    return users;
}

export async function findUser(email) {
    const normalized = normalizeEmail(email);
    return (await listUsers()).find((user) => user.email === normalized) ?? null;
}

export async function saveUsers(users) {
    await writeJson(USERS_FILE, { users });
}

// Format stocké : scrypt$N$r$p$sel$clé (base64url).
export async function hashPassword(password) {
    const salt = randomBytes(16);
    const key = await scryptAsync(String(password).normalize("NFKC"), salt, KEY_LENGTH, COST);
    return ["scrypt", COST.N, COST.r, COST.p, salt.toString("base64url"), key.toString("base64url")].join("$");
}

export async function verifyPassword(password, stored) {
    const [scheme, N, r, p, salt, key] = String(stored ?? "").split("$");
    if (scheme !== "scrypt" || !salt || !key) return false;
    const expected = Buffer.from(key, "base64url");
    const actual = await scryptAsync(String(password).normalize("NFKC"), Buffer.from(salt, "base64url"), expected.length, {
        N: Number(N),
        r: Number(r),
        p: Number(p),
    });
    return timingSafeEqual(actual, expected);
}
