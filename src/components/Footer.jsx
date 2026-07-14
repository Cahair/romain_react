"use client";
import { ArrowRight, Linkedin } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "./LanguageProvider";
import Button from "./ui/Button";

export default function Footer() {
    const { t } = useTranslation();

    return (
        <footer id="contact" className="py-16 md:py-32 bg-background border-t border-border relative overflow-hidden">
            {/* Top Glow Line */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary-neon/50 to-transparent" />

            {/* Background Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Massive CTA */}
                <div className="flex flex-col items-center text-center justify-center min-h-[40vh]">
                    <h2 className="font-display font-bold text-[8vw] md:text-[9vw] leading-none text-foreground uppercase tracking-tighter hover:text-primary-neon transition-colors duration-500 cursor-default">
                        {t("footer.title")}
                    </h2>
                    <h2 className="font-display font-bold text-[8vw] md:text-[9vw] leading-none text-transparent stroke-text uppercase tracking-tighter">
                        {t("footer.titleHighlight")}
                    </h2>

                    <Button href="/contact" size="lg" className="group mt-16">
                        {t("footer.form.submit")}
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                </div>

                {/* Bottom Bar */}
                <div className="mt-32 pt-12 border-t border-border flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex gap-8">
                        <a href="https://www.linkedin.com/in/romain-kantzer-9323b920a/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary-neon transition-colors">
                            <Linkedin className="w-6 h-6" />
                        </a>
                    </div>

                    <div className="text-muted-foreground text-xs font-mono tracking-widest uppercase">
                        <span suppressHydrationWarning>© {new Date().getFullYear()} Romain Kantzer — {t("footer.legal.rights")}</span>
                        <span className="mx-2">•</span>
                        <Link href="/legal" className="hover:text-primary-neon transition-colors">
                            {t("footer.legal.mentions")}
                        </Link>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                .stroke-text {
                    -webkit-text-stroke: 2px var(--text-stroke-color);
                }
            `}</style>
        </footer>
    );
}
