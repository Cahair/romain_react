import { Hanken_Grotesk, Newsreader } from "next/font/google";
import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";
import { LanguageProvider } from "../components/LanguageProvider";
import SmoothScroll from "../components/motion/SmoothScroll";
import { SplashProvider } from "../components/motion/Splash";
import { TransitionProvider } from "../components/motion/TransitionProvider";
import Cursor from "../components/motion/Cursor";
import Chatbot from "../components/Chatbot";
import { SERVICE_META, SERVICE_SLUGS } from "../lib/services";
import { UMAMI_DOMAINS, UMAMI_SCRIPT_URL, UMAMI_WEBSITE_ID, umamiBeforeSendScript } from "../lib/analytics";

const hanken = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-hanken", display: "swap" });
const newsreader = Newsreader({
    subsets: ["latin"],
    variable: "--font-newsreader",
    style: ["normal", "italic"],
    axes: ["opsz"],
    display: "swap",
});

const SITE_URL = "https://romain-kantzer.com";
const DEFAULT_TITLE = "Romain Kantzer | Création de sites et d'applications en Alsace";
const DEFAULT_DESCRIPTION =
    "Développeur web à Rountzenheim (Bas-Rhin) : création de sites vitrines, de sites e-commerce, d'applications web et d'applications mobiles pour les TPE et les associations, en Alsace et à distance.";

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    keywords: [
        "Romain Kantzer",
        "Développeur web",
        "Création de site internet",
        "Site vitrine",
        "Site e-commerce",
        "Application web",
        "Application mobile",
        "Next.js",
        "React",
        "React Native",
        "Alsace",
        "Rountzenheim",
        "Haguenau",
        "Bas-Rhin",
        "Strasbourg",
    ],
    title: {
        default: DEFAULT_TITLE,
        template: "%s | Romain Kantzer",
    },
    description: DEFAULT_DESCRIPTION,
    openGraph: {
        title: DEFAULT_TITLE,
        description: DEFAULT_DESCRIPTION,
        url: SITE_URL,
        siteName: "Romain Kantzer",
        locale: "fr_FR",
        type: "website",
        images: [
            {
                url: "/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Romain Kantzer — sites et applications, faits en Alsace",
            },
        ],
    },
    verification: {
        google: "AL6RMl4Tf0BsMnPep86cLA2cDGERf0zBoono8-ETqYc",
    },
    twitter: {
        card: "summary_large_image",
        title: DEFAULT_TITLE,
        description:
            "Sites vitrines, e-commerce, applications web et mobiles pour les TPE et les associations, depuis Rountzenheim, en Alsace.",
        images: ["/og-image.jpg"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
};

// Thème et splash décidés avant le premier rendu pour éviter tout flash (pas de splash dans l'espace admin).
const bootScript = `(function(){try{var d=document.documentElement;if(localStorage.getItem('theme')==='light')d.classList.add('light');if(location.pathname.indexOf('/admin')===0||sessionStorage.getItem('rk-splash')==='1'||window.matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('splash-seen');}catch(e){}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const personJsonLd = {
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: "Romain Kantzer",
        givenName: "Romain",
        familyName: "Kantzer",
        url: SITE_URL,
        jobTitle: "Développeur web",
        description:
            "Création de sites vitrines, de sites e-commerce, d'applications web et d'applications mobiles pour les petites entreprises et les associations, depuis Rountzenheim, en Alsace.",
        image: {
            "@type": "ImageObject",
            url: `${SITE_URL}/romain-kantzer.jpg`,
            width: 1200,
            height: 1200,
        },
        email: "contact@romain-kantzer.com",
        telephone: "+33769603760",
        address: {
            "@type": "PostalAddress",
            addressLocality: "Rountzenheim",
            addressRegion: "Bas-Rhin",
            addressCountry: "FR",
        },
        worksFor: {
            "@type": "Organization",
            name: "RK.ai",
            url: SITE_URL,
        },
        alumniOf: [
            { "@type": "EducationalOrganization", name: "Icam Strasbourg-Europe" },
            { "@type": "EducationalOrganization", name: "IUT de Haguenau" },
        ],
        knowsAbout: ["Web Development", "Next.js", "React", "React Native", "TypeScript", "E-commerce", "Mobile Applications"],
        sameAs: ["https://www.linkedin.com/in/romain-kantzer-9323b920a/"],
    };

    const businessJsonLd = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/#business`,
        name: "Romain Kantzer — Création de sites et d'applications",
        url: SITE_URL,
        image: `${SITE_URL}/og-image.jpg`,
        email: "contact@romain-kantzer.com",
        telephone: "+33769603760",
        founder: { "@id": `${SITE_URL}/#person` },
        address: {
            "@type": "PostalAddress",
            addressLocality: "Rountzenheim",
            addressRegion: "Bas-Rhin",
            addressCountry: "FR",
        },
        areaServed: [
            { "@type": "City", name: "Haguenau" },
            { "@type": "City", name: "Strasbourg" },
            { "@type": "AdministrativeArea", name: "Bas-Rhin" },
            { "@type": "AdministrativeArea", name: "Alsace" },
            { "@type": "Country", name: "France" },
        ],
        knowsAbout: ["Création de sites internet", "Site vitrine", "E-commerce", "Application web", "Application mobile"],
        hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Création de sites et d'applications",
            itemListElement: SERVICE_SLUGS.map((slug) => ({
                "@type": "Offer",
                itemOffered: {
                    "@type": "Service",
                    name: SERVICE_META[slug].name,
                    url: `${SITE_URL}/services/${slug}`,
                },
            })),
        },
        sameAs: ["https://www.linkedin.com/in/romain-kantzer-9323b920a/"],
    };

    return (
        <html lang="fr" className={`${hanken.variable} ${newsreader.variable}`} suppressHydrationWarning>
            <head>
                <script dangerouslySetInnerHTML={{ __html: bootScript }} />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify([personJsonLd, businessJsonLd]) }}
                />
            </head>
            <body className="font-sans antialiased" suppressHydrationWarning>
                <ThemeProvider>
                    <LanguageProvider>
                        <SmoothScroll>
                            <SplashProvider>
                                <TransitionProvider>
                                    {children}
                                    <Cursor />
                                    <Chatbot />
                                </TransitionProvider>
                            </SplashProvider>
                        </SmoothScroll>
                    </LanguageProvider>
                </ThemeProvider>
                {UMAMI_WEBSITE_ID && (
                    <>
                        <script dangerouslySetInnerHTML={{ __html: umamiBeforeSendScript }} />
                        <Script
                            src={UMAMI_SCRIPT_URL}
                            data-website-id={UMAMI_WEBSITE_ID}
                            data-domains={UMAMI_DOMAINS}
                            data-before-send="umamiBeforeSend"
                            strategy="afterInteractive"
                        />
                    </>
                )}
            </body>
        </html>
    );
}
