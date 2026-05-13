"use client";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "./LanguageProvider";
import { Activity, Award, Briefcase, Clock } from "lucide-react";

const STATS = [
    { value: 100, suffix: "/100", labelKey: "statsBar.lighthouse", accent: "cyan", Icon: Activity },
    { value: 7,   suffix: "+",    labelKey: "statsBar.experience",  accent: "violet", Icon: Award },
    { value: 15,  suffix: "+",    labelKey: "statsBar.projects",    accent: "blue", Icon: Briefcase },
    { value: 24,  suffix: "/7",   labelKey: "statsBar.availability", accent: "cyan", Icon: Clock },
];

const AnimatedCounter = ({ value }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isInView) return;
        const steps = 40;
        const increment = value / steps;
        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
                setCount(value);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, 35);
        return () => clearInterval(timer);
    }, [isInView, value]);

    return <span ref={ref}>{count}</span>;
};

const accentColor = {
    cyan:   { suffix: "text-primary-neon", bar: "from-primary-neon/0 via-primary-neon to-primary-neon/0", iconBg: "bg-primary-neon/10", iconText: "text-primary-neon" },
    violet: { suffix: "text-purple-400",   bar: "from-purple-400/0 via-purple-400 to-purple-400/0", iconBg: "bg-purple-500/10", iconText: "text-purple-400" },
    blue:   { suffix: "text-blue-400",     bar: "from-blue-400/0 via-blue-400 to-blue-400/0", iconBg: "bg-blue-500/10", iconText: "text-blue-400" },
};

const StatItem = ({ stat, index }) => {
    const { t } = useTranslation();
    const colors = accentColor[stat.accent];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
            className={`flex flex-col items-center text-center px-6 py-2 ${
                index < STATS.length - 1 ? "md:border-r md:border-border/30" : ""
            }`}
        >
            <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: index * 0.12 + 0.2 }}
                className={`mb-4 p-3 rounded-2xl ${colors.iconBg} ${colors.iconText}`}
            >
                <stat.Icon className="w-6 h-6" />
            </motion.div>
            <div className="flex items-end gap-0.5">
                <span className="font-display font-bold text-4xl md:text-5xl text-white">
                    <AnimatedCounter value={stat.value} />
                </span>
                <span className={`font-mono text-lg mb-1 ${colors.suffix}`}>
                    {stat.suffix}
                </span>
            </div>

            <p className="font-mono text-[11px] text-muted-foreground uppercase tracking-[0.2em] mt-2">
                {t(stat.labelKey)}
            </p>

            <motion.div
                className={`h-[1px] mt-3 bg-gradient-to-r ${colors.bar}`}
                initial={{ width: 0 }}
                whileInView={{ width: 40 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.12 + 0.4, ease: "easeOut" }}
            />
        </motion.div>
    );
};

export default function StatsBar() {
    return (
        <section className="relative border-t border-b border-border bg-background py-10 md:py-14 overflow-hidden">
            {/* Decorative glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[120px] bg-primary-neon/[0.04] rounded-full blur-[60px]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0">
                    {STATS.map((stat, i) => (
                        <StatItem key={i} stat={stat} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
