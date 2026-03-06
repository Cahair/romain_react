"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useTranslation } from "@/components/LanguageProvider";
import HeroVideoParallax from "@/components/webdev/HeroVideoParallax";
import MetricsCounter from "@/components/webdev/MetricsCounter";
import TechBento from "@/components/webdev/TechBento";
import ProcessTimeline from "@/components/webdev/ProcessTimeline";

// ─── Magnetic Button ───
function MagneticCTA({ children, href }) {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 300, damping: 20 });
    const springY = useSpring(y, { stiffness: 300, damping: 20 });

    const handleMouseMove = (e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.25;
        const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.25;
        x.set(Math.max(-25, Math.min(25, dx)));
        y.set(Math.max(-15, Math.min(15, dy)));
    };

    const handleMouseLeave = () => { x.set(0); y.set(0); };

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
                className="group relative inline-flex items-center gap-3 px-10 py-5 md:px-14 md:py-6 bg-blue-500 hover:bg-blue-600 text-white font-bold uppercase tracking-widest text-sm md:text-base transition-all duration-300 shadow-[0_0_40px_rgba(59,130,246,0.4)] hover:shadow-[0_0_60px_rgba(59,130,246,0.7)] hover:scale-105 overflow-hidden"
            >
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative z-10 flex items-center gap-3">
                    {children}
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </span>
            </Link>
        </motion.div>
    );
}

export default function WebDevPage() {
    const { t } = useTranslation();
    const data = t("webDevPage");

    if (!data || typeof data !== "object" || !data.hero) return null;

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-blue-500/30 selection:text-white">
            <Navbar />

            <main className="relative overflow-hidden">
                {/* 1. Hero Video Parallax */}
                <HeroVideoParallax hero={data.hero} />

                {/* 2. Metrics / Lighthouse Scores */}
                <MetricsCounter metrics={data.metrics} />

                {/* 3. Tech Stack Bento */}
                <TechBento tech={data.tech} />

                {/* 4. Process Timeline */}
                <ProcessTimeline process={data.process} />

                {/* 5. Giant CTA */}
                <section className="relative py-28 md:py-40 px-6 overflow-hidden">
                    {/* Background */}
                    <div className="absolute inset-0 bg-gradient-to-b from-background via-blue-950/20 to-background" />
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                        transition={{ duration: 6, repeat: Infinity }}
                        className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 blur-3xl pointer-events-none"
                    />

                    <div className="container mx-auto max-w-5xl relative z-10 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight mb-6 leading-[0.95]">
                                {data.cta.title}{" "}
                                <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                                    {data.cta.titleHighlight}
                                </span>
                            </h2>
                            <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto mb-10 md:mb-14 font-light">
                                {data.cta.subtitle}
                            </p>
                            <MagneticCTA href="/contact">
                                {data.cta.button}
                            </MagneticCTA>
                        </motion.div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
