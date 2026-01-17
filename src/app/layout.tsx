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
    // J'ai ajouté des mots-clés issus de votre fr.json (LLMs, RAG, Agents)
    keywords: ["Romain Kantzer", "Développeur Web", "Expert IA", "Next.js", "React", "Automatisation", "Agents IA", "LLMs", "RAG", "Freelance Tech"],
    title: {
        default: "Romain Kantzer | Expert en Automatisation IA & Développement Web",
        template: "%s | Romain Kantzer",
    },
    // 👇 MODIFICATION POUR GOOGLE
    description: "Expert en Ingénierie IA & Développement Web. Conception d'agents autonomes, LLMs optimisés et workflows sur-mesure pour maximiser votre ROI et votre productivité.",

    openGraph: {
        title: "Romain Kantzer | Expert en Automatisation IA & Développement Web",
        // 👇 MODIFICATION POUR FACEBOOK / LINKEDIN
        description: "Expert en Ingénierie IA et Développement Web. Conception d'agents autonomes, LLMs optimisés et workflows sur-mesure pour maximiser votre ROI et votre productivité.",
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
        title: "Romain Kantzer | Expert en Automatisation IA",
        // 👇 MODIFICATION POUR TWITTER
        description: "Expert en Ingénierie IA & Développement Web. Conception d'agents autonomes, LLMs optimisés et workflows sur-mesure pour maximiser votre ROI et votre productivité.",
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
        "jobTitle": "AI Architect & Web Developer",
        "description": "Expert en Ingénierie IA & Développement Web. Conception d'agents autonomes, LLMs optimisés et workflows sur-mesure.",
        "image": {
            "@type": "ImageObject",
            "url": "https://romain-kantzer.com/romain-profile.png",
            "width": 400,
            "height": 400
        },
        "email": "romainkantzer@gmail.com",
        "telephone": "+33769603760",
        "address": {
            "@type": "PostalAddress",
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
            "https://www.linkedin.com/in/romain-kantzer",
            "https://github.com/romainkantzer"
        ]
    };

    return (
        <html lang="fr" className="scroll-smooth" suppressHydrationWarning>
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
