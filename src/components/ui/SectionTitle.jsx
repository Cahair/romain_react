// Échelle typographique unique des titres (référence : page À propos).
// `as` fixe la balise, `size` l'échelle ("hero" pour les heros marketing).
const scales = {
    h1: "text-4xl md:text-5xl",
    hero: "text-4xl md:text-6xl lg:text-7xl",
    h2: "text-2xl md:text-3xl",
};

export default function SectionTitle({ as = "h2", size, className = "", children }) {
    const Tag = as;
    const scale = scales[size || as] || scales.h2;
    return (
        <Tag className={`font-display ${scale} text-foreground ${className}`}>
            {children}
        </Tag>
    );
}

// Seul traitement autorisé pour la mise en valeur d'un mot du titre.
export function Highlight({ className = "text-primary", children }) {
    return <span className={className}>{children}</span>;
}
