export const metadata = {
    title: "Démarrer un projet — décrivez votre besoin en quelques questions",
    description:
        "Type de projet, avancement, échéance, budget : quelques questions pour cadrer votre site ou votre application. Romain Kantzer, développeur web à Rountzenheim (Bas-Rhin), en Alsace et à distance.",
    alternates: { canonical: "/demarrer" },
    openGraph: {
        title: "Démarrer un projet — Romain Kantzer",
        description:
            "Quelques questions pour cadrer votre projet de site ou d'application. Premier échange gratuit, réponse personnelle.",
        url: "/demarrer",
        images: ["/og-image.jpg"],
    },
};

export default function StartProjectLayout({ children }) {
    return children;
}
