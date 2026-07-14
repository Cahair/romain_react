// Espacement vertical et gouttière standards pour toutes les sections de page.
// `spacing="compact"` : mobile resserré, identique au défaut à partir de md.
const spacings = {
    default: "py-16 md:py-24",
    compact: "py-10 md:py-24",
};

export default function Section({ id, spacing = "default", className = "", containerClassName = "", children }) {
    return (
        <section id={id} className={`relative ${spacings[spacing] || spacings.default} ${className}`}>
            <div className={`container mx-auto px-6 ${containerClassName}`}>
                {children}
            </div>
        </section>
    );
}
