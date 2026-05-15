"use client";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Gauge, Zap, Accessibility, CheckCircle2, X } from "lucide-react";

const gaugeIcons = [Gauge, Zap, Accessibility, CheckCircle2];

// ─── Circular Gauge (Lighthouse style) ───
function CircularGauge({ value, label, inView, delay = 0, Icon, onClick }) {
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
        <div className="flex flex-col items-center gap-4 cursor-pointer group" onClick={onClick}>
            <div className="relative w-28 h-28 md:w-36 md:h-36 group-hover:scale-105 transition-transform duration-300">
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
                <div className="absolute inset-0 flex flex-col items-center justify-center mt-2">
                    {Icon && (
                        <motion.div 
                            whileHover={{ scale: 1.2, rotate: 10 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="mb-0"
                            style={{ color }}
                        >
                            <Icon size={18} strokeWidth={2.5} className="opacity-80" />
                        </motion.div>
                    )}
                    <span
                        className="text-2xl md:text-3xl font-display font-bold tabular-nums leading-none mt-1"
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
    const [selectedItem, setSelectedItem] = useState(null);

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
                        {metrics.items.map((item, i) => {
                            const IconComponent = gaugeIcons[i % gaugeIcons.length];
                            return (
                                <CircularGauge
                                    key={i}
                                    value={item.value}
                                    label={item.label}
                                    inView={inView}
                                    delay={i * 200}
                                    Icon={IconComponent}
                                    onClick={() => setSelectedItem(item)}
                                />
                            );
                        })}
                    </div>
                </motion.div>

                {/* Modal */}
                <AnimatePresence>
                    {selectedItem && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedItem(null)}
                            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
                        >
                            <motion.div
                                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                                onClick={(e) => e.stopPropagation()}
                                className="relative w-full max-w-md bg-card/90 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-3xl shadow-2xl overflow-hidden"
                            >
                                {/* Glow Effect */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-emerald-500/10 rounded-full blur-[60px] pointer-events-none" />

                                <button
                                    onClick={() => setSelectedItem(null)}
                                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/5 transition-colors"
                                >
                                    <X size={20} className="text-gray-400" />
                                </button>

                                <div className="flex items-center gap-4 mb-4 relative z-10">
                                    <div className="text-4xl font-display font-bold tabular-nums text-emerald-400">
                                        {selectedItem.value}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold uppercase tracking-tight">
                                            {selectedItem.label}
                                        </h3>
                                    </div>
                                </div>
                                <p className="text-gray-400 leading-relaxed relative z-10 text-sm md:text-base">
                                    {selectedItem.desc || "Explication à venir."}
                                </p>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
