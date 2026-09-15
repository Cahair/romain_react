export const metadata = {
    title: "Contact — Discutons de votre projet",
    description:
        "Un projet de site vitrine, de boutique en ligne ou d'application ? Contactez Romain Kantzer, développeur web à Rountzenheim, en Alsace, par le formulaire, par e-mail ou par téléphone.",
    alternates: { canonical: "/contact" },
    openGraph: {
        title: "Contact — Romain Kantzer",
        description:
            "Un projet de site ou d'application ? Contactez-moi par le formulaire, par e-mail ou par téléphone. Le premier échange est gratuit.",
        url: "/contact",
        images: ["/og-image.jpg"],
    },
};

export default function ContactLayout({ children }) {
    return children;
}
