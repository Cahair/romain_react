export const metadata = {
    title: "Création de site web en Alsace — Next.js & React",
    description:
        "Développeur web à Haguenau (Bas-Rhin) : création de sites vitrines et d'applications web performants avec Next.js et React, en Alsace et à distance.",
    alternates: { canonical: "/services/web-dev" },
    openGraph: {
        title: "Création de site web en Alsace — Romain Kantzer",
        description:
            "Développeur web à Haguenau (Bas-Rhin) : sites vitrines et applications web performants avec Next.js et React.",
        url: "/services/web-dev",
        images: ["/og-image.jpg"],
    },
};

export default function WebDevLayout({ children }) {
    return children;
}
