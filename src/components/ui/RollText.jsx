// Survol « texte qui roule » : le texte sort par le haut, sa copie entre par le bas.
// L'élément parent doit porter la classe `group/roll`.
export default function RollText({ children, className = "" }) {
    return (
        <span className={`relative inline-flex overflow-hidden ${className}`}>
            <span className="inline-flex items-center gap-2 transition-transform duration-500 ease-expo group-hover/roll:-translate-y-full">
                {children}
            </span>
            <span
                aria-hidden="true"
                className="absolute inset-0 inline-flex translate-y-full items-center gap-2 transition-transform duration-500 ease-expo group-hover/roll:translate-y-0"
            >
                {children}
            </span>
        </span>
    );
}
