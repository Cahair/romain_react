import { readMedia } from "@/lib/admin/posts";

export const runtime = "nodejs";

// Photos des actualités, publiques : Instagram doit pouvoir les télécharger par URL pour
// les publier. Les noms sont aléatoires (non devinables) et les fichiers ne sont pas indexés.
export async function GET(_request, { params }) {
    const { name } = await params;
    const file = await readMedia(name);
    if (!file) return new Response("Introuvable", { status: 404 });

    return new Response(file, {
        headers: {
            "content-type": "image/jpeg",
            "cache-control": "public, max-age=31536000, immutable",
            "x-robots-tag": "noindex",
        },
    });
}
