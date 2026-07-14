export const metadata = {
    title: "Designs — Concepts visuels",
    description:
        "Sélection de concepts visuels et d'explorations de design web réalisés par Romain Kantzer.",
    alternates: { canonical: "/designs" },
    // Page de travail : ne pas indexer tant qu'elle n'est pas intégrée au site public.
    robots: { index: false, follow: false },
};

export default function DesignsLayout({ children }) {
    return children;
}
