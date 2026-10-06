import "server-only";
import { categoryLabel } from "./categories";

// Branchement vers l'outil d'automatisation (n8n, Make…) : le site envoie l'actualité à un
// webhook, le workflow appelle l'IA et répond avec la légende proposée.
//
// Requête : POST AUTOMATION_WEBHOOK_URL, JSON
//   { event: "actualite.generer", network: "instagram", actualite: {…}, imageUrl }
//   + en-tête Authorization: Bearer AUTOMATION_WEBHOOK_SECRET si défini.
// Réponse attendue : JSON { "caption": "…" } (ou du texte brut).
const TIMEOUT_MS = 60_000;

export const SITE_URL = (process.env.SITE_URL || "https://romain-kantzer.com").replace(/\/$/, "");

export const isAutomationConfigured = () => Boolean(process.env.AUTOMATION_WEBHOOK_URL);

export const mediaUrl = (name) => (name ? `${SITE_URL}/medias/${name}` : null);

export async function requestCaption(post) {
    const headers = { "content-type": "application/json", accept: "application/json, text/plain" };
    if (process.env.AUTOMATION_WEBHOOK_SECRET) headers.authorization = `Bearer ${process.env.AUTOMATION_WEBHOOK_SECRET}`;

    const response = await fetch(process.env.AUTOMATION_WEBHOOK_URL, {
        method: "POST",
        headers,
        body: JSON.stringify({
            event: "actualite.generer",
            network: "instagram",
            actualite: {
                id: post.id,
                title: post.title,
                body: post.body,
                date: post.date || null,
                category: post.category,
                categoryLabel: categoryLabel(post.category),
            },
            imageUrl: mediaUrl(post.image),
        }),
        signal: AbortSignal.timeout(TIMEOUT_MS),
        cache: "no-store",
    });

    const text = await response.text();
    if (!response.ok) throw new Error(`Le workflow a répondu ${response.status}${text ? ` : ${text.slice(0, 200)}` : ""}`);

    let caption = text;
    try {
        const json = JSON.parse(text);
        // n8n renvoie souvent un tableau d'éléments : on prend le premier.
        const item = Array.isArray(json) ? json[0] : json;
        caption = typeof item === "string" ? item : (item?.caption ?? item?.text ?? item?.output ?? "");
    } catch {
        // réponse en texte brut : utilisée telle quelle
    }
    caption = String(caption ?? "").trim();
    if (!caption) throw new Error("Le workflow n'a renvoyé aucune légende (champ « caption » attendu).");
    return caption.slice(0, 2200); // limite d'une légende Instagram
}
