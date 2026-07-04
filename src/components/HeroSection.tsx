"use client";

import { useRef } from "react";
import Link from "next/link";
import {
    motion,
    useMotionTemplate,
    useScroll,
    useTransform,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "./LanguageProvider";

// ─── Scroll-driven video hero ───
// The section is 200vh tall: the inner viewport stays sticky while the video
// "window" grows from 80vw/80vh to full-bleed, driven by scroll progress.
export default function HeroSection() {
    const { t, locale } = useTranslation();
    const sectionRef = useRef<HTMLElement | null>(null);

    // 0 when the section top reaches the viewport top, 1 when its bottom leaves it.
    // Everything below runs on MotionValues — no React re-render per scroll frame.
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });

    // Window expansion: done at 65% of the track, then holds fullscreen
    const width = useTransform(scrollYProgress, [0, 0.65], ["80vw", "100vw"]);
    const height = useTransform(scrollYProgress, [0, 0.65], ["80vh", "100vh"]);
    const borderRadius = useTransform(scrollYProgress, [0, 0.65], ["1.5rem", "0rem"]);

    // Depth shadow fades away as the window reaches the edges
    const shadowAlpha = useTransform(scrollYProgress, [0, 0.65], [0.5, 0]);
    const boxShadow = useMotionTemplate`0 25px 80px -12px rgba(0, 0, 0, ${shadowAlpha})`;

    // Overlaid content hands the stage over to the video early in the scroll
    const contentOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
    const contentY = useTransform(scrollYProgress, [0, 0.35], [0, -40]);
    const contentPointerEvents = useTransform(contentOpacity, (v) =>
        v < 0.05 ? ("none" as const) : ("auto" as const)
    );

    return (
        <section ref={sectionRef} className="relative h-[200vh] bg-background">
            <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
                <motion.div
                    style={{ width, height, borderRadius, boxShadow }}
                    className="relative overflow-hidden"
                >
                    {/* Background video — object-cover so it never distorts while growing */}
                    <video
                        className="absolute inset-0 h-full w-full object-cover"
                        src="/A_high_end_bright_and_minimal.mp4"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        aria-hidden="true"
                    />

                    {/* Contrast overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/10" />

                    {/* ── Overlaid hero content (fades out on scroll) ── */}
                    <motion.div
                        style={{
                            opacity: contentOpacity,
                            y: contentY,
                            pointerEvents: contentPointerEvents,
                        }}
                        className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-5 px-6 text-center md:gap-7"
                    >
                        <p className="font-mono text-xs uppercase tracking-[0.3em] text-secondary-neon md:text-sm">
                            {t("hero.highlightTitle")}
                        </p>

                        <h1
                            key={locale}
                            className="font-display text-4xl font-bold uppercase leading-[0.95] tracking-tighter text-primary-foreground sm:text-6xl md:text-7xl lg:text-8xl"
                        >
                            <span className="block">{t("hero.titleLine1")}</span>
                            <span className="shiny-text block">{t("hero.titleLine2")}</span>
                        </h1>

                        <p className="max-w-xl whitespace-pre-line text-sm leading-relaxed text-primary-foreground/85 md:text-base">
                            {t("hero.description")}
                        </p>

                        <Link
                            href="/contact"
                            className="group mt-2 inline-flex items-center gap-3 rounded-2xl border border-primary bg-primary px-7 py-3.5 text-base font-medium text-primary-foreground transition-all duration-500 hover:bg-primary-dark hover:shadow-[0_0_40px_rgba(59,130,246,0.35)] md:px-9 md:py-4"
                        >
                            {t("hero.cta")}
                            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    </motion.div>

                    {/* ── Scroll hint ── */}
                    <motion.div
                        style={{ opacity: contentOpacity }}
                        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
                    >
                        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary-foreground/70">
                            {t("hero.scroll")}
                        </span>
                        <motion.div
                            className="flex h-[34px] w-[22px] justify-center rounded-full border border-primary-foreground/30 pt-[6px]"
                            animate={{ y: [0, 6, 0] }}
                            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <motion.div
                                className="h-[6px] w-[2px] rounded-full bg-primary-neon"
                                animate={{ opacity: [1, 0, 1], y: [0, 4, 0] }}
                                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
