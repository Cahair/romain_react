import { Inter, Oswald } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import PageTransition from "../components/PageTransition";
import { PageAccentProvider, PageAccentIndicator } from "../components/PageAccent";
import LoadingBar from "../components/LoadingBar";
import { ThemeProvider } from "../components/ThemeProvider";
import { LanguageProvider } from "../components/LanguageProvider";
import Chatbot from "../components/Chatbot";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });

export const metadata: Metadata = {
    metadataBase: new URL("https://romain-kantzer.com"),
    keywords: ["Romain Kantzer", "Développeur Web", "Création de site", "Next.js", "React", "Site vitrine", "Alsace", "Rountzenheim", "Haguenau", "Bas-Rhin", "Strasbourg", "Expert IA", "Automatisation", "Agents IA", "Freelance Tech"],
    title: {
        default: "Romain Kantzer | Développeur Web & IA en Alsace",
        template: "%s | Romain Kantzer",
    },
    description: "Création de sites web (Next.js, React) et automatisation IA pour les petites entreprises et les associations — depuis Rountzenheim, en Alsace (Bas-Rhin), sur place ou à distance.",

    openGraph: {
        title: "Romain Kantzer | Développeur Web & IA en Alsace",
        description: "Création de sites web (Next.js, React) et automatisation IA pour les petites entreprises et les associations — depuis Rountzenheim, en Alsace (Bas-Rhin), sur place ou à distance.",
        url: "https://romain-kantzer.com",
        siteName: "Romain Kantzer",
        locale: "fr_FR",
        type: "website",
        images: [
            {
                url: "/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Romain Kantzer - Expert IA & Web",
            },
        ],
    },
    verification: {
        google: "AL6RMl4Tf0BsMnPep86cLA2cDGERf0zBoono8-ETqYc",
    },
    twitter: {
        card: "summary_large_image",
        title: "Romain Kantzer | Développeur Web & IA en Alsace",
        description: "Sites web (Next.js, React) et automatisation IA pour petites entreprises et associations, depuis Rountzenheim, en Alsace.",
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": "https://romain-kantzer.com/#person",
        "name": "Romain Kantzer",
        "givenName": "Romain",
        "familyName": "Kantzer",
        "url": "https://romain-kantzer.com",
        "jobTitle": "Web Developer & AI Engineer",
        "description": "Création de sites web et automatisation IA pour les petites entreprises et les associations, depuis Rountzenheim, en Alsace.",
        "image": {
            "@type": "ImageObject",
            "url": "https://romain-kantzer.com/romain-kantzer.jpg",
            "width": 1200,
            "height": 1200
        },
        "email": "contact@romain-kantzer.com",
        "telephone": "+33769603760",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Rountzenheim",
            "addressRegion": "Bas-Rhin",
            "addressCountry": "FR"
        },
        "worksFor": {
            "@type": "Organization",
            "name": "RK.ai",
            "url": "https://romain-kantzer.com"
        },
        "alumniOf": [
            {
                "@type": "EducationalOrganization",
                "name": "Icam Strasbourg-Europe"
            },
            {
                "@type": "EducationalOrganization",
                "name": "IUT de Haguenau"
            }
        ],
        "knowsAbout": ["Artificial Intelligence", "Web Development", "AI Agents", "LLMs", "RAG", "Next.js", "React", "Automation"],
        "sameAs": [
            "https://www.linkedin.com/in/romain-kantzer-9323b920a/"
        ]
    };

    const localBusinessJsonLd = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": "https://romain-kantzer.com/#business",
        "name": "Romain Kantzer — Création de sites web & automatisation IA",
        "url": "https://romain-kantzer.com",
        "image": "https://romain-kantzer.com/og-image.jpg",
        "email": "contact@romain-kantzer.com",
        "telephone": "+33769603760",
        "founder": { "@id": "https://romain-kantzer.com/#person" },
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Rountzenheim",
            "addressRegion": "Bas-Rhin",
            "addressCountry": "FR"
        },
        "areaServed": [
            { "@type": "City", "name": "Haguenau" },
            { "@type": "City", "name": "Strasbourg" },
            { "@type": "AdministrativeArea", "name": "Bas-Rhin" },
            { "@type": "AdministrativeArea", "name": "Alsace" },
            { "@type": "Country", "name": "France" }
        ],
        "knowsAbout": ["Création de sites web", "Next.js", "React", "Automatisation", "Agents IA"],
        "sameAs": [
            "https://www.linkedin.com/in/romain-kantzer-9323b920a/"
        ]
    };

    return (
        <html lang="fr" className="scroll-smooth" suppressHydrationWarning>
            <head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light')document.documentElement.classList.add('light')}catch(e){}})()`
                    }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify([jsonLd, localBusinessJsonLd]) }}
                />
            </head>
            <body className={`${inter.variable} ${oswald.variable} font-sans antialiased`} suppressHydrationWarning>
                <ThemeProvider>
                    <LanguageProvider>
                        <PageAccentProvider>
                            <Suspense fallback={null}>
                                <LoadingBar />
                            </Suspense>
                            <PageAccentIndicator />
                            <PageTransition>
                                {children}
                            </PageTransition>
                            <Chatbot />
                        </PageAccentProvider>
                    </LanguageProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
