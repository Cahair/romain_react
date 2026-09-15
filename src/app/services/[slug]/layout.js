import { notFound } from "next/navigation";
import fr from "../../../translations/fr.json";
import { SERVICE_META, SERVICE_SLUGS } from "../../../lib/services";

const SITE_URL = "https://romain-kantzer.com";

// Seuls les quatre services existent : toute autre adresse renvoie une 404.
export const dynamicParams = false;

export function generateStaticParams() {
    return SERVICE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const meta = SERVICE_META[slug];
    if (!meta) return {};

    return {
        title: meta.title,
        description: meta.description,
        alternates: { canonical: `/services/${slug}` },
        openGraph: {
            title: `${meta.title} — Romain Kantzer`,
            description: meta.description,
            url: `/services/${slug}`,
            images: ["/og-image.jpg"],
        },
    };
}

export default async function ServiceLayout({ children, params }) {
    const { slug } = await params;
    const meta = SERVICE_META[slug];
    const content = fr.services.items[slug];
    if (!meta || !content) notFound();

    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Service",
                "@id": `${SITE_URL}/services/${slug}#service`,
                name: meta.name,
                description: meta.description,
                url: `${SITE_URL}/services/${slug}`,
                provider: { "@id": `${SITE_URL}/#business` },
                areaServed: [
                    { "@type": "AdministrativeArea", name: "Alsace" },
                    { "@type": "Country", name: "France" },
                ],
            },
            {
                "@type": "FAQPage",
                mainEntity: content.faq.map(({ q, a }) => ({
                    "@type": "Question",
                    name: q,
                    acceptedAnswer: { "@type": "Answer", text: a },
                })),
            },
            {
                "@type": "BreadcrumbList",
                itemListElement: [
                    { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
                    { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
                    { "@type": "ListItem", position: 3, name: content.name, item: `${SITE_URL}/services/${slug}` },
                ],
            },
        ],
    };

    return (
        <>
            {children}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        </>
    );
}
