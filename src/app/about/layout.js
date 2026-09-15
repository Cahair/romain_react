export const metadata = {
    title: "À propos — Développeur web en Alsace",
    description:
        "Romain Kantzer crée des sites et des applications pour les TPE et les associations en Alsace, depuis Rountzenheim : parcours, méthode de travail et réalisation à Bischwiller.",
    alternates: { canonical: "/about" },
    openGraph: {
        title: "À propos de Romain Kantzer",
        description:
            "Développeur web : sites et applications pour les associations et les petites entreprises, depuis Rountzenheim, en Alsace.",
        url: "/about",
        images: ["/og-image.jpg"],
    },
};

const profilePageJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "ProfilePage",
            "@id": "https://romain-kantzer.com/about/#webpage",
            "url": "https://romain-kantzer.com/about",
            "name": "À propos de Romain Kantzer",
            "description": "Parcours et méthode de Romain Kantzer, développeur de sites et d'applications pour les TPE et les associations en Alsace.",
            "inLanguage": "fr-FR",
            "mainEntity": { "@id": "https://romain-kantzer.com/#person" },
            "breadcrumb": { "@id": "https://romain-kantzer.com/about/#breadcrumb" },
        },
        {
            "@type": "BreadcrumbList",
            "@id": "https://romain-kantzer.com/about/#breadcrumb",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Accueil",
                    "item": "https://romain-kantzer.com/",
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "À propos",
                    "item": "https://romain-kantzer.com/about",
                },
            ],
        },
    ],
};

export default function AboutLayout({ children }) {
    return (
        <>
            {children}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageJsonLd) }}
            />
        </>
    );
}
