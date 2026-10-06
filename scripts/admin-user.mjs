#!/usr/bin/env node
// Gestion des comptes de l'espace admin, à lancer sur le serveur (SSH) depuis la racine du projet.
//
//   npm run admin -- create <email>     créer un compte (mot de passe demandé)
//   npm run admin -- password <email>   changer le mot de passe (déconnecte ses sessions)
//   npm run admin -- revoke <email>     déconnecter toutes ses sessions
//   npm run admin -- delete <email>     supprimer le compte
//   npm run admin -- list               lister les comptes
//
// Les comptes sont écrits dans <ADMIN_DATA_DIR ou ./data>/admin-users.json.
import { existsSync } from "node:fs";
import { dataDir } from "../src/lib/admin/files.mjs";
import { hashPassword, listUsers, MIN_PASSWORD_LENGTH, normalizeEmail, saveUsers } from "../src/lib/admin/users.mjs";

// Même dossier de données que le site si ADMIN_DATA_DIR est défini dans .env.local.
for (const file of [".env.local", ".env"]) {
    if (existsSync(file)) process.loadEnvFile(file);
}

const [command, rawEmail] = process.argv.slice(2);
const email = normalizeEmail(rawEmail);

function fail(message) {
    console.error(`Erreur : ${message}`);
    process.exit(1);
}

// Saisie masquée dans un terminal ; lecture d'une ligne sur l'entrée standard sinon (pipe).
let pipedLines = null;
async function ask(question) {
    const { stdin, stdout } = process;
    if (!stdin.isTTY) {
        if (!pipedLines) {
            let data = "";
            stdin.setEncoding("utf8");
            for await (const chunk of stdin) data += chunk;
            pipedLines = data.split(/\r?\n/);
        }
        return pipedLines.shift() ?? "";
    }

    stdout.write(question);
    stdin.setRawMode(true);
    stdin.setEncoding("utf8");
    stdin.resume();
    return new Promise((resolve) => {
        let value = "";
        const onData = (chunk) => {
            for (const char of chunk) {
                if (char === "\r" || char === "\n") {
                    stdin.setRawMode(false);
                    stdin.pause();
                    stdin.off("data", onData);
                    stdout.write("\n");
                    resolve(value);
                    return;
                }
                if (char === "\u0003") {
                    stdin.setRawMode(false);
                    stdout.write("\n");
                    process.exit(130);
                }
                if (char === "\u007f" || char === "\b") value = value.slice(0, -1);
                else value += char;
            }
        };
        stdin.on("data", onData);
    });
}

async function askNewPassword() {
    const password = await ask(`Mot de passe (${MIN_PASSWORD_LENGTH} caractères minimum) : `);
    if (password.length < MIN_PASSWORD_LENGTH) fail(`le mot de passe doit faire au moins ${MIN_PASSWORD_LENGTH} caractères.`);
    if (process.stdin.isTTY && (await ask("Confirmer le mot de passe : ")) !== password) {
        fail("les deux saisies ne correspondent pas.");
    }
    return hashPassword(password);
}

const users = await listUsers();
const index = users.findIndex((user) => user.email === email);
const now = new Date().toISOString();

switch (command) {
    case "create": {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) fail("adresse e-mail invalide.");
        if (index !== -1) fail(`le compte ${email} existe déjà (utiliser « password » pour changer son mot de passe).`);
        const passwordHash = await askNewPassword();
        users.push({ email, passwordHash, sessionVersion: 0, createdAt: now, updatedAt: now });
        await saveUsers(users);
        console.log(`Compte ${email} créé dans ${dataDir()}.`);
        break;
    }
    case "password": {
        if (index === -1) fail(`aucun compte ${email}.`);
        const passwordHash = await askNewPassword();
        users[index] = { ...users[index], passwordHash, sessionVersion: (users[index].sessionVersion ?? 0) + 1, updatedAt: now };
        await saveUsers(users);
        console.log(`Mot de passe de ${email} modifié ; ses sessions ouvertes sont fermées.`);
        break;
    }
    case "revoke": {
        if (index === -1) fail(`aucun compte ${email}.`);
        users[index] = { ...users[index], sessionVersion: (users[index].sessionVersion ?? 0) + 1, updatedAt: now };
        await saveUsers(users);
        console.log(`Sessions de ${email} fermées.`);
        break;
    }
    case "delete": {
        if (index === -1) fail(`aucun compte ${email}.`);
        users.splice(index, 1);
        await saveUsers(users);
        console.log(`Compte ${email} supprimé.`);
        break;
    }
    case "list": {
        if (users.length === 0) console.log(`Aucun compte dans ${dataDir()}.`);
        for (const user of users) console.log(`${user.email}  (créé le ${user.createdAt.slice(0, 10)})`);
        break;
    }
    default:
        console.log("Usage : npm run admin -- <create|password|revoke|delete> <email>  |  npm run admin -- list");
        process.exit(command ? 1 : 0);
}
