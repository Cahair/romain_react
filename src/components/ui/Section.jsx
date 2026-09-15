// Gouttière et largeur standard de tout le site.
export const container = "mx-auto w-full max-w-[1600px] px-5 md:px-10";

const spacings = {
    default: "py-24 md:py-36",
    compact: "py-16 md:py-24",
    none: "",
};

// Section standard. `tone="invert"` inverse localement la palette (section claire en
// thème sombre, sombre en thème clair) pour rythmer la page.
export default function Section({
    id,
    spacing = "default",
    tone,
    className = "",
    containerClassName = "",
    children,
    ...props
}) {
    const toneClass = tone === "invert" ? "tone-invert bg-background text-foreground" : "";
    return (
        <section id={id} className={`relative ${toneClass} ${spacings[spacing] ?? spacings.default} ${className}`} {...props}>
            <div className={`${container} ${containerClassName}`}>{children}</div>
        </section>
    );
}
