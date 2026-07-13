export const metadata = {
    title: "Services — Sites web & automatisation IA en Alsace",
    description:
        "Création de sites web (Next.js, React), agents IA, automatisation de workflows et analyse de données, depuis Rountzenheim et dans tout le Bas-Rhin.",
    alternates: { canonical: "/services" },
    openGraph: {
        title: "Services — Romain Kantzer",
        description:
            "Création de sites web, agents IA, automatisation de workflows, génération de leads et analyse de données.",
        url: "/services",
        images: ["/og-image.jpg"],
    },
};

export default function ServicesLayout({ children }) {
    return children;
}
