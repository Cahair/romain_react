"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

// ─── Circular Gauge (Lighthouse style) ───
function CircularGauge({ value, label, inView, delay = 0 }) {
    const [displayValue, setDisplayValue] = useState(0);
    const radius = 54;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (displayValue / 100) * circumference;

    useEffect(() => {
        if (!inView) return;
        const timeout = setTimeout(() => {
            const duration = 1800;
            const startTime = Date.now();
            const tick = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                setDisplayValue(Math.round(eased * value));
                if (progress < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
        }, delay);
        return () => clearTimeout(timeout);
    }, [inView, value, delay]);

    // Color based on score
    const color = value >= 90 ? "#22c55e" : value >= 50 ? "#f59e0b" : "#ef4444";
    const glowColor = value >= 90 ? "rgba(34,197,94,0.3)" : "rgba(245,158,11,0.3)";

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="relative w-28 h-28 md:w-36 md:h-36">
                {/* Glow */}
                <div
                    className="absolute inset-0 rounded-full blur-xl opacity-50 transition-opacity duration-1000"
                    style={{
                        backgroundColor: glowColor,
                        opacity: inView ? 0.4 : 0,
                    }}
                />

                <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                    {/* Background Track */}
                    <circle
                        cx="60" cy="60" r={radius}
                        fill="none"
                        stroke="rgba(255,255,255,0.06)"
                        strokeWidth="8"
                    />
                    {/* Progress Arc */}
                    <motion.circle
                        cx="60" cy="60" r={radius}
                        fill="none"
                        stroke={color}
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={inView ? strokeDashoffset : circumference}
                        style={{
                            transition: "stroke-dashoffset 1.8s cubic-bezier(0.22, 1, 0.36, 1)",
                            transitionDelay: `${delay}ms`,
                            filter: `drop-shadow(0 0 8px ${glowColor})`,
                        }}
                    />
                </svg>

                {/* Value */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <span
                        className="text-2xl md:text-3xl font-display font-bold tabular-nums"
                        style={{ color }}
                    >
                        {displayValue}
                    </span>
                </div>
            </div>

            {/* Label */}
            <span className="text-xs md:text-sm text-gray-400 font-mono uppercase tracking-wider text-center">
                {label}
            </span>
        </div>
    );
}

export default function MetricsCounter({ metrics }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section className="relative py-24 md:py-32 px-6 bg-background overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/8 rounded-full blur-[140px] pointer-events-none" />

            <div className="container mx-auto max-w-4xl relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16 md:mb-20"
                >
                    <span className="font-mono text-blue-400 text-xs md:text-sm tracking-[0.3em] uppercase block mb-4">
                        {metrics.overline}
                    </span>
                    <h2 className="font-display text-3xl md:text-5xl font-bold uppercase tracking-tight">
                        {metrics.title}{" "}
                        <span className="text-blue-400">{metrics.titleHighlight}</span>
                    </h2>
                </motion.div>

                {/* Gauges Row */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="backdrop-blur-md bg-white/[0.02] border border-white/10 rounded-3xl p-8 md:p-12"
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
                        {metrics.items.map((item, i) => (
                            <CircularGauge
                                key={i}
                                value={item.value}
                                label={item.label}
                                inView={inView}
                                delay={i * 200}
                            />
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
