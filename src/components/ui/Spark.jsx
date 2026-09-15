// Astérisque graphique à huit branches, utilisé comme séparateur dans les bandeaux.
export default function Spark({ className = "" }) {
    return (
        <svg viewBox="0 0 100 100" aria-hidden="true" className={className} fill="currentColor">
            <path d="M46 0h8l2 38 27-28 6 6-28 27 39 2v8l-39 2 28 27-6 6-27-28-2 39h-8l-2-39-27 28-6-6 28-27L0 54v-8l39-2-28-27 6-6 27 28z" />
        </svg>
    );
}
