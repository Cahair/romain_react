export const metadata = {
    title: "Génération de leads assistée par IA",
    description:
        "Prospection ciblée et personnalisée : scraping et enrichissement de données, emails personnalisés et suivi automatisé de vos prospects.",
    alternates: { canonical: "/services/lead-gen" },
    openGraph: {
        title: "Génération de leads — Romain Kantzer",
        description:
            "Prospection ciblée : scraping et enrichissement de données, emails personnalisés et suivi automatisé de vos prospects.",
        url: "/services/lead-gen",
        images: ["/og-image.jpg"],
    },
};

export default function LeadGenLayout({ children }) {
    return children;
}
