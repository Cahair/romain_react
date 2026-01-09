"use client";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useTranslation } from "./LanguageProvider";
import AICore from "./AICore";

export default function Hero() {
    const { t } = useTranslation();
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);

    // Mouse follower for Aurora effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 700 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const { pageX, pageY } = e; // Use page coordinates to account for scroll
            // Center the effect on the mouse (600px / 2 = 300px offset)
            mouseX.set(pageX - 300);
            mouseY.set(pageY - 300);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <section className="relative h-screen min-h-[100dvh] flex items-center justify-center overflow-hidden bg-background">
            {/* Living Grid Background */}
            <div className="absolute inset-0 z-0 opacity-20">
                <div
                    className="absolute inset-0 bg-grid-pattern bg-[length:50px_50px]"
                    style={{
                        maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)'
                    }}
                />
            </div>

            {/* Aurora Effect */}
            <motion.div
                className="absolute z-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-secondary/40 rounded-full blur-[80px] md:blur-[120px] pointer-events-none mix-blend-screen"
                style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
            />


            <div className="container mx-auto px-4 relative z-10 flex flex-col items-center justify-center min-h-[100dvh] pt-20 pb-32 md:py-20">

                {/* Titan Typography */}
                <div className="relative w-full text-center flex flex-col items-center justify-center flex-grow">
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "circOut" }}
                        className="font-display font-bold text-5xl sm:text-6xl md:text-[12vw] leading-[1.1] md:leading-[0.85] tracking-tighter text-transparent select-none pt-20 md:pt-0"
                        style={{
                            WebkitTextStroke: '2px var(--text-stroke-color)',
                            // Removed mixBlendMode to ensure visibility in light mode
                        }}
                    >
                        {t("hero.titleLine1")}
                        <br />
                        <span className="relative inline-block">
                            {t("hero.titleLine2")}
                            {/* Glitch Overlay */}
                            <motion.span
                                className="absolute inset-0 text-primary/80 animate-glitch opacity-50"
                                style={{ WebkitTextStroke: '0px' }}
                                aria-hidden="true"
                            >
                                {t("hero.titleLine2")}
                            </motion.span>
                        </span>
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.8 }}
                        className="mt-8 md:mt-12 w-full max-w-5xl mx-auto"
                    >
                        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
                            {/* Texte à gauche */}
                            <div className="backdrop-blur-sm bg-background/30 p-4 md:p-6 rounded-2xl border border-white/5 flex-1 max-w-xl">
                                <h2 className="text-lg md:text-2xl font-light tracking-wide text-foreground/90 font-mono">
                                    {t("hero.highlightTitle")}
                                </h2>
                                <p className="text-muted-foreground mt-2 text-sm md:text-base whitespace-pre-line">
                                    {t("hero.description")}
                                </p>
                            </div>

                            {/* Animation AI Core à droite */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1.3, duration: 0.8 }}
                                className="flex-shrink-0"
                            >
                                <AICore size="landing" />
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Terminal Prompt CTA - Flowing naturally */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2.5, duration: 0.5 }}
                        className="mt-8 md:mt-12 pb-10"
                    >
                        <Link href="/contact" className="group relative inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-black/40 border-2 border-primary text-primary-neon font-mono text-base md:text-lg rounded-lg transition-all duration-300 hover:scale-105 hover:bg-primary/10 hover:shadow-neon-cyan shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                            <span className="text-secondary-neon me-2 group-hover:animate-pulse">&gt;</span>
                            {t("hero.cta")}
                            <span className="block w-2.5 h-5 bg-primary-neon animate-pulse ml-1 shadow-[0_0_10px_#00f0ff]" />
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3 }}
            >
                <span className="text-[10px] text-muted-foreground tracking-[0.2em] uppercase">{t("hero.scroll")}</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
            </motion.div>
        </section>
    );
}
