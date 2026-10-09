import "server-only";
import sharp from "sharp";

// Photos des actualités, préparées dès l'envoi pour être publiables telles quelles sur Instagram :
// l'API n'accepte que du JPEG, dans des proportions allant de 4:5 (portrait) à 1,91:1 (paysage),
// et réduit de toute façon ce qui dépasse 1 440 px de large.
export const MAX_UPLOAD_BYTES = 15 * 1024 * 1024;
const INPUT_FORMATS = new Set(["jpeg", "png", "webp"]);
const MAX_WIDTH = 1440;
const RATIO_MIN = 4 / 5;
const RATIO_MAX = 1.91;
const RATIO_TOLERANCE = 0.001;

// Dimensions affichées (orientation du téléphone comprise) et format, ou null si illisible.
export async function imageSize(buffer) {
    try {
        const { autoOrient, format } = await sharp(buffer).metadata();
        return autoOrient ? { width: autoOrient.width, height: autoOrient.height, format } : null;
    } catch {
        return null;
    }
}

// « haute » ou « large » si la photo sort des proportions acceptées par Instagram, sinon null.
export function ratioIssue({ width, height }) {
    const ratio = width / height;
    if (ratio < RATIO_MIN - RATIO_TOLERANCE) return "haute";
    if (ratio > RATIO_MAX + RATIO_TOLERANCE) return "large";
    return null;
}

// Photo envoyée → JPEG redressé, réduit, recadré si besoin en gardant la zone la plus riche
// (visages, sujets nets), sans métadonnées : la position GPS enregistrée par un téléphone ne
// doit pas partir sur les réseaux.
export async function prepareImage(buffer) {
    const size = await imageSize(buffer);
    if (!size || !INPUT_FORMATS.has(size.format)) return { error: "La photo doit être au format JPEG, PNG ou WebP." };

    const scale = Math.min(1, MAX_WIDTH / size.width);
    let width = Math.round(size.width * scale);
    let height = Math.round(size.height * scale);
    const issue = ratioIssue({ width, height });
    if (issue === "haute") height = Math.floor(width / RATIO_MIN);
    if (issue === "large") width = Math.floor(height * RATIO_MAX);

    const output = await sharp(buffer)
        .rotate()
        .resize({ width, height, fit: "cover", position: sharp.strategy.attention })
        .flatten({ background: "#ffffff" })
        .jpeg({ quality: 85, mozjpeg: true })
        .toBuffer();
    return { buffer: output, width, height, cropped: issue !== null };
}
