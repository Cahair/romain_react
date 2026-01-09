"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { MessageSquare, Zap, Target, Database, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "./LanguageProvider";
import { useEffect, useRef } from "react";

export default function Services() {
    const { t } = useTranslation();
    const sectionRef = useRef(null);

    // Removed mouse follower logic as requested

    const services = [
        {
            title: t("services.items.chatbot.title"),
            desc: t("services.items.chatbot.desc"),
            icon: MessageSquare,
            gradient: "from-primary to-primary-neon",
            highlightColor: "text-blue-400",
            shadowColor: "drop-shadow-[0_0_35px_rgba(96,165,250,0.8)]",
            glowColor: "bg-blue-500/40"
        },
        {
            title: t("services.items.workflows.title"),
            desc: t("services.items.workflows.desc"),
            icon: Zap,
            gradient: "from-secondary to-secondary-neon",
            highlightColor: "text-purple-400",
            shadowColor: "drop-shadow-[0_0_35px_rgba(192,132,252,0.8)]",
            glowColor: "bg-purple-500/40"
        },
        {
            title: t("services.items.leadgen.title"),
            desc: t("services.items.leadgen.desc"),
            icon: Target,
            gradient: "from-pink-500 to-rose-500",
            highlightColor: "text-pink-400",
            shadowColor: "drop-shadow-[0_0_35px_rgba(244,114,182,0.8)]",
            glowColor: "bg-pink-500/40"
        },
        {
            title: t("services.items.data.title"),
            desc: t("services.items.data.desc"),
            icon: Database,
            gradient: "from-emerald-400 to-cyan-500",
            highlightColor: "text-emerald-400",
            shadowColor: "drop-shadow-[0_0_35px_rgba(52,211,153,0.8)]",
            glowColor: "bg-emerald-500/40"
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.95 },
        show: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 20
            }
        }
    };

    return (
        <section ref={sectionRef} id="services" className="py-16 md:py-32 bg-background relative overflow-hidden">
            {/* Living Grid Background */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <div
                    className="absolute inset-0 bg-grid-pattern bg-[length:50px_50px]"
                    style={{
                        maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)'
                    }}
                />
            </div>

            {/* Aurora Effect Removed */}
            <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-primary-neon/30 rounded-full blur-[120px] pointer-events-none z-0" />

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="max-w-full"
                    >
                        <span className="text-primary-neon font-mono text-xs tracking-[0.3em] uppercase mb-4 block">
                            // {t("services.badge")}
                        </span>
                        <h2 className="font-display font-bold text-2xl md:text-7xl uppercase text-foreground leading-none break-words hyphens-auto">
                            {t("services.title")} <br />
                            <span className="relative inline text-blue-500 drop-shadow-[0_0_35px_rgba(59,130,246,0.8)] break-words hyphens-auto decoration-clone">
                                {t("services.titleHighlight")}
                                {/* Back glow */}
                                <span className="absolute -inset-4 bg-blue-500/40 blur-3xl opacity-60 -z-10 animate-pulse-slow pointer-events-none" />
                            </span>
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="md:w-1/3 text-right"
                    >
                        <p className="text-muted-foreground leading-relaxed font-light">
                            {t("services.subtitle")}
                        </p>
                    </motion.div>
                </div>

                {/* Bento Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {services.map((service, i) => {
                        const Icon = service.icon;
                        const spanClass = i === 0 || i === 3 ? "md:col-span-2" : "md:col-span-1";

                        return (
                            <motion.div
                                key={i}
                                variants={itemVariants}
                                className={`${spanClass} group relative min-h-[320px] p-8 rounded-3xl border border-white/10 bg-[#0a0a0a] md:bg-white/5 md:backdrop-blur-md md:hover:bg-white/10 transition-all duration-500 overflow-hidden flex flex-col justify-between transform-gpu will-change-transform`}
                            >
                                {/* Hover Glow */}
                                <div className={`absolute inset-0 opacity-0 md:group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br ${service.gradient}`} />
                                <div className="absolute -right-12 -top-12 opacity-5 md:group-hover:opacity-20 transition-opacity duration-500 rotate-12">
                                    <Icon className="w-64 h-64" />
                                </div>

                                {/* Content */}
                                <div className="relative z-10">
                                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 shadow-lg shadow-black/20 md:group-hover:scale-110 transition-transform duration-300`}>
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="font-display font-bold text-2xl uppercase mb-3 text-foreground tracking-wide">
                                        {/* Parse title for highlight tags */}
                                        {(() => {
                                            const parts = service.title.split(/(<highlight>.*?<\/highlight>)/);
                                            return parts.map((part, index) => {
                                                if (part.startsWith('<highlight>') && part.endsWith('</highlight>')) {
                                                    const content = part.replace(/<\/?highlight>/g, '');
                                                    return (
                                                        <span key={index} className={`relative inline-block ${service.highlightColor} ${service.shadowColor} mx-1`}>
                                                            {content}
                                                            {/* Back glow */}
                                                            <span className={`absolute -inset-4 ${service.glowColor} blur-3xl opacity-60 -z-10 animate-pulse-slow pointer-events-none`} />
                                                        </span>
                                                    );
                                                }
                                                return part;
                                            });
                                        })()}
                                    </h3>
                                    <p className="text-muted-foreground font-mono text-sm leading-relaxed">
                                        {service.desc}
                                    </p>
                                </div>

                                <div className="pt-8 relative z-10">
                                    <Link href="/services" className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white/40 md:group-hover:text-primary-neon transition-colors">
                                        <span>{t("services.discover")}</span>
                                        <ArrowRight className="w-3 h-3 md:group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>

                                {/* Decor corner */}
                                <div className="absolute top-4 right-4 text-[10px] font-mono text-white/10 md:group-hover:text-primary-neon/50 transition-colors">
                                    0{i + 1}
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
