import { parseEmphasis } from "@/lib/emphasis";

// Échelle typographique unique des titres. `as` fixe la balise, `size` l'échelle.
export const titleScales = {
    hero: "text-[clamp(2.75rem,8vw,8.75rem)] font-normal leading-[0.94] tracking-[-0.035em]",
    h1: "text-[clamp(2.5rem,6vw,6rem)] font-normal leading-[0.96] tracking-[-0.03em]",
    h2: "text-[clamp(2.1rem,4.4vw,4.5rem)] font-normal leading-[1] tracking-[-0.028em]",
    h3: "text-2xl font-medium leading-tight tracking-[-0.015em] md:text-3xl",
};

export default function SectionTitle({ as = "h2", size, text, className = "", children }) {
    const Tag = as;
    const scale = titleScales[size || as] || titleScales.h2;
    return (
        <Tag className={`${scale} text-balance ${className}`}>
            {text !== undefined ? <Emphasis text={text} /> : children}
        </Tag>
    );
}

// Seul traitement de mise en valeur d'un mot : serif italique en couleur unie.
export function Highlight({ className = "text-primary", children }) {
    return <em className={`font-serif font-normal italic ${className}`}>{children}</em>;
}

// Rend une chaîne traduite contenant du balisage *mis en valeur*.
export function Emphasis({ text, emClassName }) {
    return parseEmphasis(text).map((segment, index) =>
        segment.em ? (
            <Highlight key={index} className={emClassName}>
                {segment.text}
            </Highlight>
        ) : (
            <span key={index}>{segment.text}</span>
        )
    );
}
