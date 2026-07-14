// Surface standard : tokens de thème uniquement (pas de bg-white/*, bg-black/* ni .glass).
export default function Card({ className = "", padded = true, children, ...props }) {
    return (
        <div
            className={`rounded-2xl border border-border bg-card ${padded ? "p-6 md:p-8" : ""} ${className}`}
            {...props}
        >
            {children}
        </div>
    );
}
