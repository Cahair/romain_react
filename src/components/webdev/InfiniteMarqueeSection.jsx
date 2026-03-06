"use client";
import { motion, useAnimation } from "framer-motion";
import { useState, useEffect, useRef } from "react";

// ─── Marquee Row ───
function MarqueeRow({ children, direction = "left", speed = 35, className = "" }) {
    const [isPaused, setIsPaused] = useState(false);
    const containerRef = useRef(null);
    const [contentWidth, setContentWidth] = useState(0);

    useEffect(() => {
        if (containerRef.current) {
            // Measure the first set of children
            const firstSet = containerRef.current.querySelector("[data-marquee-set]");
            if (firstSet) setContentWidth(firstSet.scrollWidth);
        }
    }, []);

    const translateFrom = direction === "left" ? 0 : -(contentWidth || 2000);
    const translateTo = direction === "left" ? -(contentWidth || 2000) : 0;

    return (
        <div
            className={`relative overflow-hidden ${className}`}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <motion.div
                ref={containerRef}
                className="flex gap-4 md:gap-6 w-max"
                animate={{ x: [translateFrom, translateTo] }}
                transition={{
                    x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: speed,
                        ease: "linear",
                    },
                }}
                style={{
                    animationPlayState: isPaused ? "paused" : "running",
                }}
                // Framer Motion pause via custom speed
                {...(isPaused ? { transition: { x: { repeat: Infinity, repeatType: "loop", duration: speed * 4, ease: "linear" } } } : {})}
            >
                {/* Set 1 */}
                <div className="flex gap-4 md:gap-6 flex-shrink-0" data-marquee-set>
                    {children}
                </div>
                {/* Set 2 — duplicate for seamless loop */}
                <div className="flex gap-4 md:gap-6 flex-shrink-0" aria-hidden>
                    {children}
                </div>
            </motion.div>
        </div>
    );
}

// ─── Process Step Card ───
function StepCard({ step, variant = "default" }) {
    const colors = {
        "01": { accent: "from-blue-500 to-cyan-500", border: "hover:border-blue-500/30", glow: "bg-blue-500/10" },
        "02": { accent: "from-violet-500 to-fuchsia-500", border: "hover:border-violet-500/30", glow: "bg-violet-500/10" },
        "03": { accent: "from-cyan-500 to-emerald-500", border: "hover:border-cyan-500/30", glow: "bg-cyan-500/10" },
        "04": { accent: "from-amber-500 to-orange-500", border: "hover:border-amber-500/30", glow: "bg-amber-500/10" },
    };
    const c = colors[step.num] || colors["01"];

    return (
        <div
            className={`relative flex-shrink-0 w-[280px] md:w-[340px] backdrop-blur-md bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 transition-all duration-300 cursor-default group ${c.border}`}
        >
            {/* Top Accent Bar */}
            <div className={`absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r ${c.accent} rounded-full opacity-50 group-hover:opacity-100 transition-opacity`} />

            {/* Step Number */}
            <div className="flex items-center gap-3 mb-4">
                <span className={`text-3xl md:text-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-br ${c.accent}`}>
                    {step.num}
                </span>
                <span className="text-sm md:text-base font-display font-semibold uppercase tracking-wide text-white/80">
                    {step.title}
                </span>
            </div>

            {/* Description */}
            <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                {step.desc}
            </p>

            {/* Glow on hover */}
            <div className={`absolute -inset-2 ${c.glow} rounded-3xl blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none`} />
        </div>
    );
}

// ─── Decorative Floating Word ───
function FloatingWord({ text, className = "" }) {
    return (
        <div className={`flex-shrink-0 px-4 md:px-6 py-2 md:py-3 border border-white/5 rounded-full text-white/10 text-xs md:text-sm font-mono uppercase tracking-[0.2em] select-none ${className}`}>
            {text}
        </div>
    );
}

// ─── Main Component ───
export default function InfiniteMarqueeSection({ process: processData }) {
    const decorativeWords = [
        "Stratégie", "Wireframe", "Prototype", "React", "Next.js", "Deploy",
        "SEO", "Responsive", "Tailwind", "TypeScript", "CI/CD", "Performance",
        "Design", "Code", "Itération", "Production", "Tests", "Monitoring",
    ];

    return (
        <section className="relative w-full h-screen overflow-hidden flex flex-col justify-center items-center bg-transparent">
            {/* ═══ FADE MASKS ═══ */}
            <div className="absolute inset-y-0 left-0 w-16 md:w-32 z-20 pointer-events-none bg-gradient-to-r from-background to-transparent" />
            <div className="absolute inset-y-0 right-0 w-16 md:w-32 z-20 pointer-events-none bg-gradient-to-l from-background to-transparent" />
            <div className="absolute inset-x-0 top-0 h-20 md:h-32 z-20 pointer-events-none bg-gradient-to-b from-background to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-20 md:h-32 z-20 pointer-events-none bg-gradient-to-t from-background to-transparent" />

            {/* ═══ BACKGROUND ═══ */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[140px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-violet-500/5 rounded-full blur-[140px]" />
            </div>

            {/* ═══ HEADER ═══ */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative z-10 text-center mb-8 md:mb-12 px-4"
            >
                <span className="font-mono text-blue-400 text-xs md:text-sm tracking-[0.3em] uppercase block mb-3 md:mb-4">
                    {processData.overline}
                </span>
                <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight">
                    {processData.title}{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                        {processData.titleHighlight}
                    </span>
                </h2>
            </motion.div>

            {/* ═══ MARQUEE ROWS ═══ */}
            <div className="relative z-10 w-full flex flex-col gap-4 md:gap-6">
                {/* Row 1 — Decorative words → LEFT */}
                <MarqueeRow direction="left" speed={50} className="opacity-40">
                    {decorativeWords.map((word, i) => (
                        <FloatingWord key={i} text={word} />
                    ))}
                </MarqueeRow>

                {/* Row 2 — Main step cards → RIGHT */}
                <MarqueeRow direction="right" speed={40}>
                    {processData.steps.map((step, i) => (
                        <StepCard key={i} step={step} />
                    ))}
                    {/* Extra cards for density */}
                    {processData.steps.map((step, i) => (
                        <StepCard key={`extra-${i}`} step={step} />
                    ))}
                </MarqueeRow>

                {/* Row 3 — Step cards in reverse → LEFT */}
                <MarqueeRow direction="left" speed={45}>
                    {[...processData.steps].reverse().map((step, i) => (
                        <StepCard key={i} step={step} />
                    ))}
                    {[...processData.steps].reverse().map((step, i) => (
                        <StepCard key={`extra-${i}`} step={step} />
                    ))}
                </MarqueeRow>

                {/* Row 4 — Decorative words → RIGHT */}
                <MarqueeRow direction="right" speed={55} className="opacity-40">
                    {decorativeWords.slice().reverse().map((word, i) => (
                        <FloatingWord key={i} text={word} />
                    ))}
                </MarqueeRow>
            </div>
        </section>
    );
}
