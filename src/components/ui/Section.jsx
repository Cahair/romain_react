// Espacement vertical et gouttière standards pour toutes les sections de page.
export default function Section({ id, className = "", containerClassName = "", children }) {
    return (
        <section id={id} className={`relative py-16 md:py-24 ${className}`}>
            <div className={`container mx-auto px-6 ${containerClassName}`}>
                {children}
            </div>
        </section>
    );
}
