export const metadata = {
    title: "Contact — Discutons de votre projet",
    description:
        "Un projet de site web ou d'automatisation ? Contactez Romain Kantzer, développeur web à Haguenau (Bas-Rhin), par le formulaire, par email ou par téléphone.",
    alternates: { canonical: "/contact" },
    openGraph: {
        title: "Contact — Romain Kantzer",
        description:
            "Un projet de site web ou d'automatisation ? Contactez-moi par le formulaire, par email ou par téléphone.",
        url: "/contact",
        images: ["/og-image.jpg"],
    },
};

export default function ContactLayout({ children }) {
    return children;
}
