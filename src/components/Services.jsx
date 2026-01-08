"use client";
import { motion } from "framer-motion";
import { MessageSquare, Zap, Target, TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "./LanguageProvider";

export default function Services() {
    const { t } = useTranslation();

    const services = [
        {
            title: t("services.items.chatbot.title"),
            desc: t("services.items.chatbot.desc"),
            icon: MessageSquare,
            color: "cyan",
            gradient: "from-cyan-500 to-blue-500",
            glow: "shadow-[0_0_30px_rgba(6,182,212,0.4)]",
            size: "md:col-span-2 md:row-span-1",
            id: "chatbot"
        },
        {
            title: t("services.items.workflows.title"),
            desc: t("services.items.workflows.desc"),
            icon: Zap,
            color: "violet",
            gradient: "from-violet-500 to-purple-500",
            glow: "shadow-[0_0_30px_rgba(139,92,246,0.4)]",
            size: "md:col-span-1 md:row-span-1",
            id: "workflows"
        },
        {
            title: t("services.items.leadgen.title"),
            desc: t("services.items.leadgen.desc"),
            icon: Target,
            color: "emerald",
            gradient: "from-emerald-500 to-teal-500",
            glow: "shadow-[0_0_30px_rgba(16,185,129,0.4)]",
            size: "md:col-span-1 md:row-span-1",
            id: "leadgen"
        },
        {
            title: t("services.items.data.title"),
            desc: t("services.items.data.desc"),
            icon: TrendingUp,
            color: "amber",
            gradient: "from-amber-500 to-orange-500",
            glow: "shadow-[0_0_30px_rgba(245,158,11,0.4)]",
            size: "md:col-span-2 md:row-span-1",
            id: "data"
        },
    ];

    return (
        <section id="services" className="py-20 md:py-32 bg-background relative overflow-hidden">
            {/* Circuit pattern background */}
            <div className="absolute inset-0 opacity-[0.03]">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                            <path d="M0 50h40M60 50h40M50 0v40M50 60v40" stroke="currentColor" strokeWidth="0.5" fill="none" />
                            <circle cx="50" cy="50" r="3" fill="currentColor" />
                            <circle cx="0" cy="50" r="2" fill="currentColor" />
                            <circle cx="100" cy="50" r="2" fill="currentColor" />
                            <circle cx="50" cy="0" r="2" fill="currentColor" />
                            <circle cx="50" cy="100" r="2" fill="currentColor" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#circuit)" />
                </svg>
            </div>

            {/* Gradient orbs */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-20 right-10 w-72 h-72 bg-secondary/10 rounded-full blur-[100px]" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-2 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-mono uppercase tracking-widest mb-6">
                        {t("services.badge")}
                    </span>
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-6 text-foreground">
                        {t("services.title")}{" "}
                        <span className="text-gradient">{t("services.titleHighlight")}</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        {t("services.subtitle")}
                    </p>
                </motion.div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {services.map((service, i) => {
                        const IconComponent = service.icon;
                        return (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                className={`group ${service.size}`}
                            >
                                {/* Gradient Border Wrapper */}
                                <div className={`relative p-[1px] rounded-3xl bg-gradient-to-br ${service.gradient} opacity-50 group-hover:opacity-100 transition-opacity duration-500`}>
                                    {/* Card Inner */}
                                    <div className={`relative bg-card rounded-3xl p-8 h-full min-h-[280px] flex flex-col overflow-hidden transition-all duration-500 shadow-lg group-hover:shadow-xl`}>
                                        {/* Circuit lines decoration */}
                                        <div className="absolute top-0 right-0 w-32 h-32 opacity-10 group-hover:opacity-20 transition-opacity">
                                            <svg viewBox="0 0 100 100" className="w-full h-full">
                                                <path d="M100 0 L100 30 L70 30 L70 70 L30 70" stroke="currentColor" strokeWidth="1" fill="none" className="text-foreground" />
                                                <circle cx="30" cy="70" r="4" fill="currentColor" className="text-foreground" />
                                            </svg>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1">
                                            {/* Icon with glow */}
                                            <motion.div
                                                whileHover={{ scale: 1.1, rotate: 5 }}
                                                className={`mb-6 w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} p-[1px] transition-shadow duration-500`}
                                            >
                                                <div className="w-full h-full rounded-2xl bg-card flex items-center justify-center">
                                                    <IconComponent className={`w-8 h-8 text-${service.color}-500`} />
                                                </div>
                                            </motion.div>

                                            {/* Title */}
                                            <h3 className="text-2xl md:text-3xl font-black mb-4 text-foreground tracking-tight">
                                                {service.title}
                                            </h3>

                                            {/* Description */}
                                            <p className="text-muted-foreground text-base leading-relaxed">
                                                {service.desc}
                                            </p>
                                        </div>

                                        {/* CTA Link */}
                                        <Link
                                            href="/services"
                                            className={`mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-${service.color}-400 group-hover:text-${service.color}-300 transition-colors`}
                                        >
                                            <span className="relative">
                                                {t("services.discover")}
                                                <span className={`absolute bottom-0 left-0 w-0 h-[2px] bg-${service.color}-400 group-hover:w-full transition-all duration-300`} />
                                            </span>
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </Link>

                                        {/* Hover gradient overlay */}
                                        <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 rounded-3xl pointer-events-none`} />
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-16"
                >
                    <Link
                        href="/services"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-secondary rounded-full font-bold text-white hover:shadow-neon-cyan transition-all hover:scale-105 active:scale-95"
                    >
                        {t("services.viewAll")}
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
