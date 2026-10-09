import "server-only";
import { randomBytes, randomUUID } from "node:crypto";
import { mkdir, readFile, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { dataDir, readJson, writeJson } from "./files.mjs";
import { CATEGORIES } from "./categories";

// Actualités saisies dans l'espace admin, stockées dans data/actualites.json.
// Forme : { id, title, body, date, category, image, createdAt, updatedAt,
//           social?: { instagram?: { caption, status, generatedAt, updatedAt,
//                                    mediaId?, permalink?, publishedAt? } } }
const POSTS_FILE = "actualites.json";

export const MAX_IMAGE_BYTES = 8 * 1024 * 1024;
// Nom des photos : 32 caractères hexadécimaux aléatoires (adresse publique non devinable).
export const MEDIA_NAME = /^[a-f0-9]{32}\.jpg$/;

const mediaDir = () => path.join(dataDir(), "medias");

async function readPosts() {
    const { posts } = await readJson(POSTS_FILE, { posts: [] });
    return posts;
}

export async function listPosts() {
    const posts = await readPosts();
    return posts.toSorted((a, b) => (b.date || "").localeCompare(a.date || "") || b.createdAt.localeCompare(a.createdAt));
}

export async function getPost(id) {
    return (await readPosts()).find((post) => post.id === id) ?? null;
}

export async function savePost(post) {
    const posts = await readPosts();
    const index = posts.findIndex((existing) => existing.id === post.id);
    if (index === -1) posts.push(post);
    else posts[index] = post;
    await writeJson(POSTS_FILE, { posts });
    return post;
}

export async function deletePost(id) {
    const posts = await readPosts();
    const post = posts.find((existing) => existing.id === id);
    if (!post) return;
    await writeJson(POSTS_FILE, { posts: posts.filter((existing) => existing.id !== id) });
    if (post.image) await deleteMedia(post.image);
}

export const newPostId = () => randomUUID();

// Champs du formulaire → valeurs nettoyées + erreurs par champ.
export function validatePost(formData) {
    const values = {
        title: String(formData.get("title") ?? "").trim(),
        body: String(formData.get("body") ?? "").trim(),
        date: String(formData.get("date") ?? "").trim(),
        category: String(formData.get("category") ?? ""),
    };
    const errors = {};
    if (!values.title) errors.title = "Le titre est obligatoire.";
    else if (values.title.length > 150) errors.title = "150 caractères maximum.";
    if (!values.body) errors.body = "Le texte est obligatoire.";
    else if (values.body.length > 5000) errors.body = "5 000 caractères maximum.";
    if (values.date && !/^\d{4}-\d{2}-\d{2}$/.test(values.date)) errors.date = "Date invalide.";
    if (!CATEGORIES.some((category) => category.value === values.category)) errors.category = "Choisir une catégorie.";
    return { values, errors };
}

// Photo : JPEG uniquement, c'est le seul format qu'accepte la publication Instagram par API.
export async function saveMedia(file) {
    if (file.size > MAX_IMAGE_BYTES) return { error: "La photo dépasse 8 Mo." };
    const buffer = Buffer.from(await file.arrayBuffer());
    const isJpeg = buffer.length > 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
    if (!isJpeg) return { error: "La photo doit être au format JPEG." };
    const name = `${randomBytes(16).toString("hex")}.jpg`;
    await mkdir(mediaDir(), { recursive: true });
    await writeFile(path.join(mediaDir(), name), buffer);
    return { name };
}

// Dimensions affichées d'un JPEG (en-tête SOF), orientation EXIF comprise : une photo de
// téléphone prise en portrait est souvent enregistrée en paysage avec une consigne de rotation.
export function jpegSize(buffer) {
    let orientation = 1;
    let offset = 2;
    while (offset + 9 <= buffer.length) {
        if (buffer[offset] !== 0xff) return null;
        const marker = buffer[offset + 1];
        if (marker === 0xff) {
            offset += 1; // octet de remplissage
            continue;
        }
        if (marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
            offset += 2; // marqueur sans longueur
            continue;
        }
        const length = buffer.readUInt16BE(offset + 2);
        if (marker === 0xe1) orientation = exifOrientation(buffer, offset + 4, offset + 2 + length) ?? orientation;
        if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
            const height = buffer.readUInt16BE(offset + 5);
            const width = buffer.readUInt16BE(offset + 7);
            return orientation >= 5 ? { width: height, height: width } : { width, height };
        }
        offset += 2 + length;
    }
    return null;
}

function exifOrientation(buffer, start, end) {
    if (end > buffer.length || buffer.toString("latin1", start, start + 6) !== "Exif\0\0") return null;
    const tiff = start + 6;
    if (tiff + 8 > end) return null;
    const little = buffer.toString("latin1", tiff, tiff + 2) === "II";
    const u16 = (at) => (little ? buffer.readUInt16LE(at) : buffer.readUInt16BE(at));
    const ifd = tiff + (little ? buffer.readUInt32LE(tiff + 4) : buffer.readUInt32BE(tiff + 4));
    if (ifd + 2 > end) return null;
    for (let index = 0; index < u16(ifd); index++) {
        const entry = ifd + 2 + index * 12;
        if (entry + 12 > end) return null;
        if (u16(entry) === 0x0112) return u16(entry + 8);
    }
    return null;
}

export async function readMedia(name) {
    if (!MEDIA_NAME.test(name)) return null;
    try {
        return await readFile(path.join(mediaDir(), name));
    } catch (error) {
        if (error.code === "ENOENT") return null;
        throw error;
    }
}

export async function deleteMedia(name) {
    if (!MEDIA_NAME.test(name)) return;
    await unlink(path.join(mediaDir(), name)).catch((error) => {
        if (error.code !== "ENOENT") throw error;
    });
}
