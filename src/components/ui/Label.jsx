const labelClasses = "text-[0.7rem] font-medium uppercase tracking-[0.2em] text-muted-foreground md:text-xs";

// Libellé entre crochets, repère typographique des sections : [ Ce que je fais ]
export default function Label({ as: Tag = "p", className = "", children }) {
    return (
        <Tag className={`${labelClasses} ${className}`}>
            <span aria-hidden="true">[ </span>
            {children}
            <span aria-hidden="true"> ]</span>
        </Tag>
    );
}

// Ligne de repères : texte à gauche, [ libellé ] au centre, texte à droite, reliés par des filets.
export function LabelRule({ left, center, right, className = "" }) {
    return (
        <div className={`flex items-center gap-4 ${labelClasses} ${className}`}>
            {left && <span className="shrink-0">{left}</span>}
            {center && (
                <>
                    <span className="hidden h-px flex-1 bg-border sm:block" />
                    <span className="hidden shrink-0 sm:block">
                        <span aria-hidden="true">[ </span>
                        {center}
                        <span aria-hidden="true"> ]</span>
                    </span>
                </>
            )}
            <span className="h-px flex-1 bg-border" />
            {right && <span className="shrink-0">{right}</span>}
        </div>
    );
}
