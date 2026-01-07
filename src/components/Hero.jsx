"use client";
import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "./LanguageProvider";

export default function Hero() {
    const { t, locale } = useTranslation();
    const [textIndex, setTextIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    // Get typewriter texts from translations
    const typewriterTexts = useMemo(() => {
        const texts = t("hero.typewriter");
        return Array.isArray(texts) ? texts : [
            "un système intelligent.",
            "une croissance automatisée.",
            "un futur compétitif."
        ];
    }, [t, locale]);

    // Reset typewriter when language changes
    useEffect(() => {
        setTextIndex(0);
        setDisplayText("");
        setIsDeleting(false);
    }, [locale]);

    useEffect(() => {
        const currentText = typewriterTexts[textIndex];
        const speed = isDeleting ? 50 : 100;

        const timeout = setTimeout(() => {
            if (!isDeleting && displayText === currentText) {
                setTimeout(() => setIsDeleting(true), 2000);
            } else if (isDeleting && displayText === "") {
                setIsDeleting(false);
                setTextIndex((prev) => (prev + 1) % typewriterTexts.length);
            } else {
                setDisplayText(
                    isDeleting
                        ? currentText.substring(0, displayText.length - 1)
                        : currentText.substring(0, displayText.length + 1)
                );
            }
        }, speed);

        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, textIndex, typewriterTexts]);

    return (
        <section className="relative min-h-screen flex items-center justify-center pt-24 md:pt-32 pb-12 md:pb-20 overflow-hidden">
            {/* Background Effect - smaller on mobile */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-48 md:w-96 h-48 md:h-96 bg-primary/20 rounded-full blur-[80px] md:blur-[120px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-48 md:w-96 h-48 md:h-96 bg-secondary/20 rounded-full blur-[80px] md:blur-[120px] animate-pulse delay-1000" />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Optimized title for mobile */}
                    <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter mb-4 md:mb-8 leading-tight md:leading-none">
                        <span className="block">{t("hero.line1")}</span>
                        <span className="block text-white">{t("hero.line2")}</span>
                        <span className="text-gradient">{t("hero.line3")}</span>
                        <span className="block text-primary text-2xl sm:text-3xl md:text-5xl lg:text-7xl mt-2">
                            {displayText}
                            <span className="animate-pulse">|</span>
                        </span>
                    </h1>

                    <p className="text-gray-400 text-sm sm:text-base md:text-xl lg:text-2xl max-w-3xl mx-auto mb-8 md:mb-12 px-2">
                        {t("hero.subtitle")}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-6">
                        <Link href="/contact" className="group w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-primary rounded-full font-bold text-background text-sm md:text-base transition-all hover:scale-105 active:scale-95 shadow-neon-cyan">
                            {t("hero.cta1")}
                            <ArrowRight className="inline-block ml-2 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link href="/services" className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 glass rounded-full font-bold text-sm md:text-base transition-all hover:bg-white/10 active:scale-95">
                            {t("hero.cta2")}
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Floating Elements - hidden on mobile */}
            <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/3 right-10 md:right-20 hidden lg:block"
            >
                <div className="glass p-4 rounded-2xl w-48 shadow-neon-violet">
                    <div className="h-2 w-12 bg-secondary rounded-full mb-3" />
                    <div className="h-2 w-full bg-white/10 rounded-full mb-2" />
                    <div className="h-2 w-3/4 bg-white/10 rounded-full" />
                </div>
            </motion.div>
        </section>
    );
}
