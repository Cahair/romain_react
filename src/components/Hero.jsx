"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Code2, Atom, Paintbrush } from "lucide-react";
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
                className="group relative inline-flex items-center gap-3 px-7 py-3.5 md:px-9 md:py-4 bg-primary/10 border border-primary/50 text-foreground font-medium text-base rounded-2xl transition-all duration-500 hover:bg-primary/20 hover:border-primary hover:shadow-[0_0_40px_rgba(59,130,246,0.3)] overflow-hidden"
            >
                {/* Glow effect */}
                <span className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10" />
                <span className="relative z-10 flex items-center gap-3">
                    {children}
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
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
        <section ref={containerRef} className="relative min-h-screen min-h-[100dvh] overflow-hidden bg-background">

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
            <div className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-center items-center pt-24 md:pt-28 pb-6">

                <div className="flex flex-col items-center gap-5 md:gap-8 max-w-6xl w-full">

                    {/* ── Animated Title ── */}
                    <div className="text-center">
                        <motion.h1
                            key={locale}
                            className="font-display font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tighter uppercase w-full text-center"
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
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 w-full">

                        {/* Left: Text */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }}
                            className="max-w-lg text-center md:text-left"
                        >
                            <h2 className="text-base md:text-xl font-light tracking-wide text-foreground/90 font-mono mb-2">
                                {t("hero.highlightTitle")}
                            </h2>
                            <p className="text-muted-foreground text-sm whitespace-pre-line leading-relaxed">
                                {t("hero.description")}
                            </p>
                        </motion.div>

                        {/* Right: Floating UI Cards */}
                        <div className="relative w-[240px] h-[190px] md:w-[290px] md:h-[220px] flex-shrink-0">
                            <FloatingCard
                                mouseX={mouseX}
                                mouseY={mouseY}
                                offsetX={-10}
                                offsetY={-20}
                                delay={0}
                                className="top-0 left-0 px-4 py-3 md:px-5 md:py-4 z-30"
                            >
                                <div className="flex items-center gap-3">
                                    <motion.div 
                                        className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center"
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                    >
                                        <Code2 className="w-5 h-5 text-primary-neon" />
                                    </motion.div>
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
                                    <motion.div 
                                        className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center"
                                        whileHover={{ scale: 1.1, rotate: 180 }}
                                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                    >
                                        <Atom className="w-5 h-5 text-blue-400" />
                                    </motion.div>
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
                                    <motion.div 
                                        className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center"
                                        whileHover={{ scale: 1.1, rotate: -15 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                    >
                                        <Paintbrush className="w-5 h-5 text-cyan-400" />
                                    </motion.div>
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

                    {/* Scroll Indicator */}
                    <motion.div
                        className="flex flex-col items-center gap-3 mt-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2.5 }}
                    >
                        <span className="text-[10px] text-muted-foreground tracking-[0.3em] uppercase font-mono">{t("hero.scroll")}</span>
                        <motion.div
                            className="relative flex flex-col items-center"
                            animate={{ y: [0, 6, 0] }}
                            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                        >
                            {/* Mouse icon */}
                            <div className="w-[22px] h-[34px] rounded-full border border-white/20 flex justify-center pt-[6px]">
                                <motion.div
                                    className="w-[2px] h-[6px] rounded-full bg-primary-neon"
                                    animate={{ opacity: [1, 0, 1], y: [0, 4, 0] }}
                                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
