export const metadata = {
    title: "Services — Sites vitrines, e-commerce, applications web et mobiles",
    description:
        "Création de sites vitrines, de sites e-commerce, d'applications web et d'applications mobiles pour les TPE et les associations, depuis Rountzenheim (Bas-Rhin), en Alsace et à distance.",
    alternates: { canonical: "/services" },
    openGraph: {
        title: "Services — Romain Kantzer",
        description:
            "Sites vitrines, e-commerce, applications web et mobiles : conception, design, développement et mise en ligne, depuis Rountzenheim, en Alsace.",
        url: "/services",
        images: ["/og-image.jpg"],
    },
};

export default function ServicesLayout({ children }) {
    return children;
}
