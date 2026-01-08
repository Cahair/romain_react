"use client";
import { useState } from "react";
import { Send, Linkedin, Github, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { useTranslation } from "./LanguageProvider";

export default function Footer() {
    const { t } = useTranslation();

    return (
        <footer id="contact" className="py-24 bg-background border-t border-border">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-24 items-center">
                    <div>
                        <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-8 leading-tight text-foreground">
                            {t("footer.title")} <br />
                            <span className="text-gradient">{t("footer.titleHighlight")}</span>
                        </h2>
                        <p className="text-muted-foreground text-lg mb-12 max-w-md">
                            {t("footer.subtitle")}
                        </p>

                        <div className="flex gap-6">
                            <a href="https://www.linkedin.com/in/romain-kantzer-9323b920a/" target="_blank" rel="noopener noreferrer" className="p-4 bg-card border border-border rounded-2xl hover:bg-primary/20 transition-all hover:shadow-neon-cyan text-foreground">
                                <Linkedin className="w-6 h-6" />
                            </a>
                            <a href="https://github.com/Cahair" target="_blank" rel="noopener noreferrer" className="p-4 bg-card border border-border rounded-2xl hover:bg-primary/20 transition-all hover:shadow-neon-cyan text-foreground">
                                <Github className="w-6 h-6" />
                            </a>
                        </div>
                    </div>

                    <div className="bg-card border border-border p-10 rounded-[3rem] relative overflow-hidden shadow-lg flex flex-col justify-center items-center text-center">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl" />

                        <div className="relative z-10 w-full">
                            <h3 className="text-2xl font-bold mb-6 text-foreground">Contact Direct</h3>

                            <a
                                href="mailto:romainkantzer10@gmail.com"
                                className="w-full py-6 bg-gradient-to-r from-primary to-secondary rounded-2xl font-black uppercase tracking-[0.2em] shadow-lg hover:shadow-neon-cyan transition-all active:scale-[0.98] text-white flex items-center justify-center gap-3 mb-4 group"
                            >
                                <Send className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                                {t("footer.form.submit")}
                            </a>

                            <p className="text-sm text-muted-foreground font-medium">
                                romainkantzer10@gmail.com
                            </p>
                        </div>
                    </div>
                </div>

                <div className="pt-12 border-t border-border flex flex-col md:flex-row justify-between items-center gap-8 text-muted-foreground text-sm font-bold tracking-widest uppercase">
                    <div suppressHydrationWarning>© {new Date().getFullYear()} KANTZER.AI — {t("footer.legal.rights")}</div>
                    <div className="flex gap-12">
                        <a href="#" className="hover:text-primary transition-colors">{t("footer.legal.privacy")}</a>
                        <a href="#" className="hover:text-primary transition-colors">{t("footer.legal.terms")}</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
