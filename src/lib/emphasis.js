// Balisage des traductions : les mots entre *astérisques* sont mis en valeur
// (serif italique, couleur primaire). Ex. : "Parlons de *votre projet*."

export function parseEmphasis(text) {
    if (typeof text !== "string") return [];
    return text
        .split(/(\*[^*]+\*)/g)
        .filter(Boolean)
        .map((part) =>
            part.length > 2 && part.startsWith("*") && part.endsWith("*")
                ? { text: part.slice(1, -1), em: true }
                : { text: part, em: false }
        );
}

export function stripEmphasis(text) {
    return typeof text === "string" ? text.replace(/\*/g, "") : "";
}

// Découpe en mots pour les animations mot à mot. Un mot peut mêler texte normal et
// mis en valeur (ex. « projet. »), ce qui évite d'isoler la ponctuation en fin de ligne.
// Seuls les espaces ASCII séparent les mots : une espace insécable ( ) dans une
// traduction garde ses voisins sur la même ligne (ex. « de A à Z »).
const SEPARATOR = /([ \t\r\n]+)/;
const ONLY_SEPARATOR = /^[ \t\r\n]+$/;

export function tokenizeWords(text) {
    const tokens = [];
    let word = null;
    const flush = () => {
        if (word) tokens.push(word);
        word = null;
    };

    for (const segment of parseEmphasis(text)) {
        for (const piece of segment.text.split(SEPARATOR)) {
            if (!piece) continue;
            if (ONLY_SEPARATOR.test(piece)) {
                flush();
                tokens.push({ type: piece.includes("\n") ? "br" : "space" });
                continue;
            }
            if (!word) word = { type: "word", runs: [] };
            word.runs.push({ text: piece, em: segment.em });
        }
    }
    flush();
    return tokens;
}
