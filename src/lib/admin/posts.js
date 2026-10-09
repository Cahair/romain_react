import "server-only";
import { randomBytes, randomUUID } from "node:crypto";
import { mkdir, readFile, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { dataDir, readJson, writeJson } from "./files.mjs";
import { CATEGORIES } from "./categories";
import { MAX_UPLOAD_BYTES, prepareImage } from "./images";

// Actualités saisies dans l'espace admin, stockées dans data/actualites.json.
// Forme : { id, title, body, date, category, image, createdAt, updatedAt,
//           social?: { instagram?: { caption, status, generatedAt, updatedAt,
//                                    mediaId?, permalink?, publishedAt?, publishedBy? } } }
const POSTS_FILE = "actualites.json";

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

// Photo envoyée : convertie en JPEG publiable sur Instagram (voir images.js). `cropped` signale
// qu'elle a été recadrée pour entrer dans les proportions acceptées.
export async function saveMedia(file) {
    if (file.size > MAX_UPLOAD_BYTES) return { error: "La photo dépasse 15 Mo." };
    const prepared = await prepareImage(Buffer.from(await file.arrayBuffer()));
    if (prepared.error) return { error: prepared.error };
    const name = `${randomBytes(16).toString("hex")}.jpg`;
    await mkdir(mediaDir(), { recursive: true });
    await writeFile(path.join(mediaDir(), name), prepared.buffer);
    return { name, cropped: prepared.cropped };
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
