import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";

// Données de l'espace admin : fichiers JSON et photos, hors du dépôt Git (dossier `data/`
// à la racine du projet, ou ADMIN_DATA_DIR). Partagé avec scripts/admin-user.mjs.
export const dataDir = () => path.resolve(process.env.ADMIN_DATA_DIR || path.join(process.cwd(), "data"));

export async function readJson(name, fallback) {
    try {
        return JSON.parse(await readFile(path.join(dataDir(), name), "utf8"));
    } catch (error) {
        if (error.code === "ENOENT") return fallback;
        throw error;
    }
}

// Écriture atomique : fichier temporaire puis renommage, pour ne jamais laisser un JSON tronqué.
export async function writeJson(name, value) {
    const dir = dataDir();
    await mkdir(dir, { recursive: true });
    const file = path.join(dir, name);
    const tmp = `${file}.${process.pid}.${Date.now()}.tmp`;
    await writeFile(tmp, `${JSON.stringify(value, null, 2)}\n`, { mode: 0o600 });
    await rename(tmp, file);
}
