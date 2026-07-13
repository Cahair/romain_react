export const metadata = {
    title: "Création de site web en Alsace — Next.js & React",
    description:
        "Création de sites vitrines et d'applications web avec Next.js et React, depuis Rountzenheim (Bas-Rhin), en Alsace et à distance.",
    alternates: { canonical: "/services/web-dev" },
    openGraph: {
        title: "Création de site web en Alsace — Romain Kantzer",
        description:
            "Sites vitrines et applications web avec Next.js et React, depuis Rountzenheim, en Alsace.",
        url: "/services/web-dev",
        images: ["/og-image.jpg"],
    },
};

export default function WebDevLayout({ children }) {
    return children;
}
