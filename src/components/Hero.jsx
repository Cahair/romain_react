"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useTranslation } from "./LanguageProvider";

// ─── Animated Word Component ───
const AnimatedWord = ({ children, delay = 0, isShiny = false }) => (
    <motion.span
        className={`inline-block ${isShiny ? "shiny-text" : ""}`}
        variants={{
            hidden: { y: "100%", opacity: 0, filter: "blur(4px)" },
            visible: {
                y: 0,
                opacity: 1,
                filter: "blur(0px)",
                transition: {
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                    delay,
                },
            },
        }}
    >
        {children}
    </motion.span>
);

// ─── Floating UI Card ───
const FloatingCard = ({ children, className = "", offsetX = 0, offsetY = 0, mouseX, mouseY, delay = 0 }) => {
    const x = useTransform(mouseX, [-0.5, 0.5], [offsetX - 15, offsetX + 15]);
    const y = useTransform(mouseY, [-0.5, 0.5], [offsetY - 10, offsetY + 10]);
    const springX = useSpring(x, { stiffness: 150, damping: 20 });
    const springY = useSpring(y, { stiffness: 150, damping: 20 });

    return (
        <motion.div
            className={`absolute backdrop-blur-xl bg-white/[0.06] border border-white/[0.12] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] ${className}`}
            style={{ x: springX, y: springY }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2 + delay, duration: 0.8, ease: "easeOut" }}
        >
            {children}
            {/* Subtle glow */}
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 -z-10 blur-sm" />
        </motion.div>
    );
};

// ─── Magnetic Button ───
const MagneticButton = ({ children, href }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 300, damping: 20 });
    const springY = useSpring(y, { stiffness: 300, damping: 20 });

    const handleMouseMove = (e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) * 0.3;
        const deltaY = (e.clientY - centerY) * 0.3;
        x.set(Math.max(-20, Math.min(20, deltaX)));
        y.set(Math.max(-12, Math.min(12, deltaY)));
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            style={{ x: springX, y: springY }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="inline-block"
        >
            <Link
                href={href}
                className="group relative inline-flex items-center gap-3 px-8 py-4 md:px-10 md:py-5 bg-primary/10 border border-primary/50 text-foreground font-medium text-base md:text-lg rounded-2xl transition-all duration-500 hover:bg-primary/20 hover:border-primary hover:shadow-[0_0_40px_rgba(6,182,212,0.3)] overflow-hidden"
            >
                {/* Glow effect */}
                <span className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10" />
                <span className="relative z-10 flex items-center gap-3">
                    {children}
                    <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </span>
            </Link>
        </motion.div>
    );
};

// ─── Main Hero ───
export default function Hero() {
    const { t, locale } = useTranslation();
    const containerRef = useRef(null);

    // Normalised mouse position (-0.5 to 0.5)
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Aurora mouse follower
    const auroraX = useMotionValue(0);
    const auroraY = useMotionValue(0);
    const springAuroraX = useSpring(auroraX, { damping: 25, stiffness: 700 });
    const springAuroraY = useSpring(auroraY, { damping: 25, stiffness: 700 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            const { innerWidth, innerHeight } = window;
            mouseX.set((e.clientX / innerWidth) - 0.5);
            mouseY.set((e.clientY / innerHeight) - 0.5);
            auroraX.set(e.pageX - 300);
            auroraY.set(e.pageY - 300);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY, auroraX, auroraY]);

    // Split title into words for stagger animation
    const titleLine1Words = t("hero.titleLine1").split(" ");
    const titleLine2Words = t("hero.titleLine2").split(" ");

    return (
        <section ref={containerRef} className="relative h-screen min-h-[100dvh] overflow-hidden bg-background">

            {/* ═══ BACKGROUND LAYER ═══ */}

            {/* Grid Pattern with radial fade */}
            <div className="absolute inset-0 z-0 opacity-[0.15]">
                <div
                    className="absolute inset-0 bg-grid-pattern bg-[length:60px_60px]"
                    style={{
                        maskImage: 'radial-gradient(ellipse 80% 70% at 50% 40%, black 30%, transparent 100%)',
                        WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 40%, black 30%, transparent 100%)',
                    }}
                />
            </div>

            {/* Mesh Gradient Blobs */}
            <motion.div
                className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-primary/20 rounded-full blur-[120px] pointer-events-none"
                animate={{
                    x: [0, 30, -20, 0],
                    y: [0, -20, 30, 0],
                    scale: [1, 1.1, 0.95, 1],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] md:w-[700px] md:h-[700px] bg-secondary/15 rounded-full blur-[120px] pointer-events-none"
                animate={{
                    x: [0, -30, 20, 0],
                    y: [0, 20, -30, 0],
                    scale: [1, 0.95, 1.1, 1],
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Aurora Mouse Follower */}
            <motion.div
                className="absolute z-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-secondary/30 rounded-full blur-[100px] md:blur-[140px] pointer-events-none mix-blend-screen"
                style={{ x: springAuroraX, y: springAuroraY }}
            />

            {/* ═══ CONTENT ═══ */}
            <div className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-center items-center">

                <div className="flex flex-col items-center gap-8 md:gap-12 max-w-6xl w-full">

                    {/* ── Animated Title ── */}
                    <div className="text-center">
                        <motion.h1
                            key={locale}
                            className="font-display font-bold text-5xl sm:text-6xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tighter uppercase w-full text-center"
                            initial="hidden"
                            animate="visible"
                            variants={{
                                hidden: {},
                                visible: {
                                    transition: { staggerChildren: 0.08, delayChildren: 0.3 },
                                },
                            }}
                        >
                            {/* Line 1 — Stroke outline */}
                            <span className="block overflow-hidden pb-2 text-center">
                                {titleLine1Words.map((word, i) => (
                                    <AnimatedWord key={i}>
                                        <span
                                            className="text-transparent select-none"
                                            style={{ WebkitTextStroke: '2px var(--text-stroke-color)' }}
                                        >
                                            {word}
                                        </span>
                                        {i < titleLine1Words.length - 1 ? " " : ""}
                                    </AnimatedWord>
                                ))}
                            </span>

                            {/* Line 2 — Shiny gradient text */}
                            <span className="block overflow-hidden pb-2 text-center">
                                {titleLine2Words.map((word, i) => (
                                    <AnimatedWord key={i} isShiny>
                                        {word}
                                        {i < titleLine2Words.length - 1 ? "\u00A0" : ""}
                                    </AnimatedWord>
                                ))}
                            </span>
                        </motion.h1>
                    </div>

                    {/* ── Subtitle + Floating Cards Row ── */}
                    <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 w-full">

                        {/* Left: Text */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }}
                            className="max-w-lg text-center md:text-left"
                        >
                            <h2 className="text-lg md:text-2xl font-light tracking-wide text-foreground/90 font-mono mb-3">
                                {t("hero.highlightTitle")}
                            </h2>
                            <p className="text-muted-foreground text-sm md:text-base whitespace-pre-line leading-relaxed">
                                {t("hero.description")}
                            </p>
                        </motion.div>

                        {/* Right: Floating UI Cards */}
                        <div className="relative w-[240px] h-[200px] md:w-[320px] md:h-[260px] flex-shrink-0">
                            <FloatingCard
                                mouseX={mouseX}
                                mouseY={mouseY}
                                offsetX={-10}
                                offsetY={-20}
                                delay={0}
                                className="top-0 left-0 px-4 py-3 md:px-5 md:py-4 z-30"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                                        <svg className="w-5 h-5 text-primary-neon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground">Framework</p>
                                        <p className="text-sm font-semibold text-foreground">Next.js</p>
                                    </div>
                                </div>
                            </FloatingCard>

                            <FloatingCard
                                mouseX={mouseX}
                                mouseY={mouseY}
                                offsetX={30}
                                offsetY={10}
                                delay={0.15}
                                className="top-[45%] right-0 px-4 py-3 md:px-5 md:py-4 z-20"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                                        <svg className="w-5 h-5 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.31 0-.592.068-.828.197C4.45 2.33 3.8 4.41 4.048 7.303c-2.09.636-3.442 1.664-3.442 2.697 0 2.08 3.445 3.942 7.687 4.2.525 2.79 1.712 4.8 3.202 4.8 1.49 0 2.677-2.01 3.202-4.8 4.242-.257 7.687-2.12 7.687-4.2 0-1.033-1.352-2.06-3.442-2.697.247-2.894-.403-4.973-2.23-5.786a1.558 1.558 0 0 0-.83-.203z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground">Library</p>
                                        <p className="text-sm font-semibold text-foreground">React</p>
                                    </div>
                                </div>
                            </FloatingCard>

                            <FloatingCard
                                mouseX={mouseX}
                                mouseY={mouseY}
                                offsetX={-20}
                                offsetY={20}
                                delay={0.3}
                                className="bottom-0 left-[10%] px-4 py-3 md:px-5 md:py-4 z-10"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                                        <svg className="w-5 h-5 text-cyan-400" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 6.036l-6.95 4.012L12 14.065l6.95-4.017L12 6.036zM5.05 14.048L12 18.065l6.95-4.017L12 18.065l-6.95-4.017z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground">Styling</p>
                                        <p className="text-sm font-semibold text-foreground">Tailwind</p>
                                    </div>
                                </div>
                            </FloatingCard>

                            {/* Ambient light particles */}
                            <motion.div
                                className="absolute top-1/2 left-1/2 w-32 h-32 bg-primary/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                                animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </div>
                    </div>

                    {/* ── Magnetic CTA ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5, duration: 0.6 }}
                    >
                        <MagneticButton href="/contact">
                            {t("hero.cta")}
                        </MagneticButton>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    className="absolute bottom-6 flex flex-col items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.5 }}
                >
                    <span className="text-[10px] text-muted-foreground tracking-[0.2em] uppercase">{t("hero.scroll")}</span>
                    <motion.div
                        className="w-[1px] h-8 md:h-12 bg-gradient-to-b from-primary/60 to-transparent"
                        animate={{ scaleY: [1, 0.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                </motion.div>
            </div>
        </section>
    );
}
