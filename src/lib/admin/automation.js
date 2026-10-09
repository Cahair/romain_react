import "server-only";
import { categoryLabel } from "./categories";
import { imageSize, ratioIssue } from "./images";
import { readMedia } from "./posts";

// Branchement vers l'outil d'automatisation (n8n, Make…) : le site envoie l'actualité à un
// webhook unique, le workflow aiguille selon le champ « event ».
//
// Requête : POST AUTOMATION_WEBHOOK_URL, JSON
//   { event, network: "instagram", actualite: {…}, imageUrl, caption? }
//   + en-tête Authorization: Bearer AUTOMATION_WEBHOOK_SECRET si défini.
// - event "actualite.generer" : le workflow appelle l'IA et répond { "caption": "…" } (ou du texte brut).
// - event "actualite.publier" : le workflow publie imageUrl + caption sur Instagram et répond
//   { "id": "<identifiant du média>", "permalink": "https://www.instagram.com/p/…" } (permalink facultatif).
const CAPTION_TIMEOUT_MS = 60_000;
const PUBLISH_TIMEOUT_MS = 90_000;

export const SITE_URL = (process.env.SITE_URL || "https://romain-kantzer.com").replace(/\/$/, "");

export const isAutomationConfigured = () => Boolean(process.env.AUTOMATION_WEBHOOK_URL);

export const mediaUrl = (name) => (name ? `${SITE_URL}/medias/${name}` : null);

async function callWorkflow(payload, timeoutMs) {
    const headers = { "content-type": "application/json", accept: "application/json, text/plain" };
    if (process.env.AUTOMATION_WEBHOOK_SECRET) headers.authorization = `Bearer ${process.env.AUTOMATION_WEBHOOK_SECRET}`;

    const response = await fetch(process.env.AUTOMATION_WEBHOOK_URL, {
        method: "POST",
        headers,
        body: JSON.stringify({ network: "instagram", ...payload }),
        signal: AbortSignal.timeout(timeoutMs),
        cache: "no-store",
    });

    const text = await response.text();
    if (!response.ok) throw new Error(`Le workflow a répondu ${response.status}${text ? ` : ${text.slice(0, 200)}` : ""}`);
    return text;
}

// Réponse du workflow : JSON (n8n renvoie souvent un tableau d'éléments : on prend le premier)
// ou texte brut, renvoyé tel quel.
function firstItem(text) {
    try {
        const json = JSON.parse(text);
        return Array.isArray(json) ? json[0] : json;
    } catch {
        return text;
    }
}

const actualite = (post) => ({
    id: post.id,
    title: post.title,
    body: post.body,
    date: post.date || null,
    category: post.category,
    categoryLabel: categoryLabel(post.category),
});

export async function requestCaption(post) {
    const text = await callWorkflow(
        { event: "actualite.generer", actualite: actualite(post), imageUrl: mediaUrl(post.image) },
        CAPTION_TIMEOUT_MS,
    );
    const item = firstItem(text);
    const caption = String((typeof item === "string" ? item : (item?.caption ?? item?.text ?? item?.output)) ?? "").trim();
    if (!caption) throw new Error("Le workflow n'a renvoyé aucune légende (champ « caption » attendu).");
    return caption.slice(0, 2200); // limite d'une légende Instagram
}

// Ce qui empêche de publier la photo de l'actualité, ou null si elle convient à Instagram.
export async function instagramImageIssue(post) {
    if (!post.image) return "Ajouter une photo à l'actualité : Instagram ne publie pas de post sans image.";
    const file = await readMedia(post.image);
    if (!file) return "La photo de l'actualité est introuvable sur le serveur : la remplacer.";
    const size = await imageSize(file);
    if (!size) return "Impossible de lire la photo : la remplacer.";
    // Les photos envoyées depuis le recadrage automatique sont toujours conformes ; reste le cas
    // des photos plus anciennes.
    if (ratioIssue(size)) {
        return `Photo trop ${ratioIssue(size)} pour Instagram (${size.width} × ${size.height}) : la renvoyer, elle sera recadrée automatiquement.`;
    }
    return null;
}

// Instagram télécharge la photo à son adresse publique : depuis le site lancé en local, elle
// n'existe pas sur le site en ligne. Une erreur réseau ne bloque pas (Instagram tentera quand même).
export async function isPublicImageMissing(post) {
    try {
        const response = await fetch(mediaUrl(post.image), {
            method: "HEAD",
            cache: "no-store",
            signal: AbortSignal.timeout(10_000),
        });
        return response.status === 404;
    } catch {
        return false;
    }
}

export async function requestPublication(post) {
    const text = await callWorkflow(
        {
            event: "actualite.publier",
            actualite: actualite(post),
            imageUrl: mediaUrl(post.image),
            caption: post.social.instagram.caption,
        },
        PUBLISH_TIMEOUT_MS,
    );
    const item = firstItem(text);
    const mediaId = typeof item === "object" ? (item?.id ?? item?.mediaId ?? item?.media_id) : null;
    if (!mediaId) {
        throw new Error(
            "Le workflow a répondu sans identifiant de publication (champ « id » attendu). Vérifier sur Instagram avant de réessayer : le post a peut-être été publié.",
        );
    }
    const permalink = typeof item.permalink === "string" && item.permalink.startsWith("https://") ? item.permalink : null;
    return { mediaId: String(mediaId), permalink };
}
