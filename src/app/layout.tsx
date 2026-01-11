import { Inter, Oswald } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import PageTransition from "../components/PageTransition";
import { PageAccentProvider, PageAccentIndicator } from "../components/PageAccent";
import LoadingBar from "../components/LoadingBar";
import { ThemeProvider } from "../components/ThemeProvider";
import { LanguageProvider } from "../components/LanguageProvider";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });

export const metadata: Metadata = {
    metadataBase: new URL("https://romain-kantzer.com"),
    keywords: ["Romain Kantzer", "Développeur Web", "Expert IA", "Next.js", "React", "Automatisation", "Freelance Tech"],
    title: {
        default: "Romain Kantzer | Expert en Automatisation IA & Développement Web",
        template: "%s | Romain Kantzer",
    },
    description: "Portfolio et services de Romain Kantzer. Expert en création de sites web performants, design et stratégie digitale. Solutions d'IA pour votre business.",
    openGraph: {
        title: "Romain Kantzer | Expert en Automatisation IA & Développement Web",
        description: "Portfolio et services de Romain Kantzer. Expert en création de sites web performants, design et stratégie digitale.",
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
    twitter: {
        card: "summary_large_image",
        title: "Romain Kantzer | Expert en Automatisation IA",
        description: "Portfolio et services de Romain Kantzer. Expert en création de sites web performants, design et stratégie digitale.",
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
        "name": "Romain Kantzer",
        "url": "https://romain-kantzer.com",
        "jobTitle": "Développeur Web & Expert IA",
        "description": "Créateur de sites web rapides et optimisés. Expert en solutions d'intelligence artificielle.",
        "image": "https://romain-kantzer.com/og-image.jpg",
        "sameAs": [
            "https://www.linkedin.com/in/romain-kantzer", // Modifiez avec votre vrai lien
            "https://github.com/romainkantzer" // Modifiez avec votre vrai lien
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
                        </PageAccentProvider>
                    </LanguageProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
