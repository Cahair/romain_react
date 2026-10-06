// Champs de formulaire de l'espace admin (tokens de thème uniquement).
export const inputClasses =
    "w-full rounded-xl border border-border bg-background px-4 py-3 text-[0.95rem] text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary focus:outline-none aria-[invalid=true]:border-destructive";

export default function Field({ label, htmlFor, hint, error, children }) {
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={htmlFor} className="text-sm font-medium">
                {label}
            </label>
            {children}
            {hint && !error && <p className="text-xs text-muted-foreground">{hint}</p>}
            {error && (
                <p id={`${htmlFor}-error`} className="text-sm text-destructive">
                    {error}
                </p>
            )}
        </div>
    );
}

export function Notice({ tone = "info", children }) {
    const tones = {
        info: "border-border bg-muted text-muted-foreground",
        success: "border-primary/30 bg-primary/10 text-foreground",
        error: "border-destructive/30 bg-destructive/10 text-foreground",
    };
    return (
        <p role={tone === "error" ? "alert" : "status"} className={`rounded-xl border px-4 py-3 text-sm ${tones[tone]}`}>
            {children}
        </p>
    );
}
