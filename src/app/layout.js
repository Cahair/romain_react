import { Inter } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import PageTransition from "@/components/PageTransition";
import { PageAccentProvider, PageAccentIndicator } from "@/components/PageAccent";
import LoadingBar from "@/components/LoadingBar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/components/LanguageProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Kantzer.ai | L'Agence d'Automatisation IA",
  description: "Optimisez vos opérations et automatisez votre croissance avec les solutions IA de pointe de Romain Kantzer.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
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
