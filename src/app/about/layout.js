export const metadata = {
    title: "À propos — Développeur Web & Ingénieur IA",
    description:
        "De l'automatisation industrielle au développement web et à l'IA : le parcours de Romain Kantzer, développeur freelance basé à Haguenau, en Alsace.",
    alternates: { canonical: "/about" },
    openGraph: {
        title: "À propos de Romain Kantzer",
        description:
            "De l'automatisation industrielle au développement web et à l'IA : mon parcours et ma vision.",
        url: "/about",
        images: ["/og-image.jpg"],
    },
};

export default function AboutLayout({ children }) {
    return children;
}
