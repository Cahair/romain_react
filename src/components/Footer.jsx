"use client";
import { Send, Linkedin, Github } from "lucide-react";
import { useTranslation } from "./LanguageProvider";

export default function Footer() {
    const { t } = useTranslation();

    return (
        <footer id="contact" className="py-32 bg-background border-t border-white/5 relative overflow-hidden">
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

                    <a
                        href="mailto:romainkantzer10@gmail.com"
                        className="mt-16 group relative inline-flex items-center gap-4 px-12 py-6 bg-primary/10 border border-primary/50 rounded-full overflow-hidden hover:bg-primary/20 transition-all duration-500 hover:scale-105"
                    >
                        <span className="font-mono text-xl text-primary-neon uppercase tracking-widest z-10">
                            {t("footer.form.submit")}
                        </span>
                        <Send className="w-6 h-6 text-primary-neon z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </a>
                </div>

                {/* Bottom Bar */}
                <div className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex gap-8">
                        <a href="https://www.linkedin.com/in/romain-kantzer-9323b920a/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary-neon transition-colors">
                            <Linkedin className="w-6 h-6" />
                        </a>
                        <a href="https://github.com/Cahair" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary-neon transition-colors">
                            <Github className="w-6 h-6" />
                        </a>
                    </div>

                    <div className="text-muted-foreground text-xs font-mono tracking-widest uppercase">
                        <span suppressHydrationWarning>© {new Date().getFullYear()} KANTZER.AI — {t("footer.legal.rights")}</span>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                .stroke-text {
                    -webkit-text-stroke: 2px rgba(255, 255, 255, 0.8);
                }
            `}</style>
        </footer>
    );
}
