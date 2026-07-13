export const metadata = {
    title: "À propos — Romain Kantzer, sites web pour TPE et associations en Alsace",
    description:
        "Je viens de Rountzenheim, en Alsace. De l'automatisme industriel aux sites web pour petites entreprises et associations : qui je suis, comment je travaille et mon parcours.",
    alternates: { canonical: "/about" },
    openGraph: {
        title: "À propos de Romain Kantzer",
        description:
            "Je crée des sites web pour les petites entreprises et les associations, depuis Rountzenheim, en Alsace.",
        url: "/about",
        images: ["/og-image.jpg"],
    },
};

export default function AboutLayout({ children }) {
    return children;
}
