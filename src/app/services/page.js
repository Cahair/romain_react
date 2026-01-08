"use client";
import { motion, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";
import { MessageSquare, Zap, Target, Database, ArrowRight, Terminal, Cpu, Share2 } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTranslation } from "@/components/LanguageProvider";
import { useEffect, useRef } from "react";

export default function ServicesPage() {
    const { t } = useTranslation();
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

    // Mouse follower for Aurora effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 700 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            mouseX.set(clientX);
            mouseY.set(clientY);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    const services = [
        {
            icon: MessageSquare,
            title: t("services.items.chatbot.title"),
            description: t("services.items.chatbot.desc"),
            features: [
                t("services.items.chatbot.features.0"),
                t("services.items.chatbot.features.1"),
                t("services.items.chatbot.features.2")
            ],
            tech: ["LLM", "RAG", "Python"],
            highlightColor: "text-blue-400",
            shadowColor: "drop-shadow-[0_0_35px_rgba(96,165,250,0.8)]",
            glowColor: "bg-blue-500/40"
        },
        {
            icon: Zap,
            title: t("services.items.workflows.title"),
            description: t("services.items.workflows.desc"),
            features: [
                t("services.items.workflows.features.0"),
                t("services.items.workflows.features.1"),
                t("services.items.workflows.features.2")
            ],
            tech: ["n8n", "Make", "API"],
            highlightColor: "text-purple-400",
            shadowColor: "drop-shadow-[0_0_35px_rgba(192,132,252,0.8)]",
            glowColor: "bg-purple-500/40"
        },
        {
            icon: Target,
            title: t("services.items.leadgen.title"),
            description: t("services.items.leadgen.desc"),
            features: [
                t("services.items.leadgen.features.0"),
                t("services.items.leadgen.features.1"),
                t("services.items.leadgen.features.2")
            ],
            tech: ["Scraping", "Enrichment", "CRM"],
            highlightColor: "text-pink-400",
            shadowColor: "drop-shadow-[0_0_35px_rgba(244,114,182,0.8)]",
            glowColor: "bg-pink-500/40"
        },
        {
            icon: Database,
            title: t("services.items.data.title"),
            description: t("services.items.data.desc"),
            features: [
                "Data Analysis",
                "Visualization",
                "Insights"
            ],
            tech: ["SQL", "Pandas", "PowerBI"],
            highlightColor: "text-emerald-400",
            shadowColor: "drop-shadow-[0_0_35px_rgba(52,211,153,0.8)]",
            glowColor: "bg-emerald-500/40"
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 20,
                stiffness: 100
            }
        }
    };

    return (
        <main className="bg-background min-h-screen flex flex-col overflow-x-hidden selection:bg-primary-neon/30 selection:text-white" ref={containerRef}>
            <Navbar />

            {/* Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div
                    className="absolute inset-0 bg-grid-pattern bg-[length:50px_50px] opacity-20"
                    style={{
                        maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)'
                    }}
                />
                <motion.div
                    className="absolute w-[800px] h-[800px] bg-primary-neon/10 rounded-full blur-[120px] mix-blend-screen"
                    style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
                />
            </div>

            <div className="relative z-10 pt-32 pb-24">
                <div className="container mx-auto px-6">

                    {/* Hero / Landing Section */}
                    <div className="min-h-[80vh] flex flex-col justify-center max-w-5xl mx-auto mb-24">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1 }}
                        >
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="flex items-center gap-4 mb-8"
                            >
                                <span className="h-[1px] w-12 bg-primary-neon"></span>
                                <span className="font-mono text-primary-neon text-sm tracking-[0.5em] uppercase">
                                    // {t("services.badge")}
                                </span>
                            </motion.div>

                            <h1 className="font-display font-bold text-5xl md:text-9xl uppercase leading-[0.9] text-foreground mb-12 break-words hyphens-auto text-left">
                                <motion.span
                                    initial={{ filter: "blur(20px)", opacity: 0, scale: 1.1 }}
                                    animate={{ filter: "blur(0px)", opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    className="block"
                                >
                                    {t("services.title")}
                                </motion.span>
                                <motion.span
                                    className="block relative text-blue-500 drop-shadow-[0_0_35px_rgba(59,130,246,0.8)] decoration-clone"
                                    initial={{ x: -100, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 50 }}
                                >
                                    {t("services.titleHighlight")}
                                    {/* Back glow */}
                                    <span className="absolute -inset-4 bg-blue-500/40 blur-3xl opacity-60 -z-10 animate-pulse-slow pointer-events-none" />
                                </motion.span>
                            </h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="text-2xl md:text-3xl text-muted-foreground font-light max-w-3xl leading-relaxed text-left border-l-4 border-primary-neon pl-8"
                            >
                                {t("services.subtitle")}
                            </motion.p>
                        </motion.div>
                    </div>

                    {/* Services Grid with Stagger */}
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        {services.map((service, index) => {
                            const Icon = service.icon;
                            return (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    className="group relative min-h-[320px] bg-white/[0.02] border border-white/10 backdrop-blur-md p-6 overflow-hidden hover:bg-white/[0.04] transition-colors duration-500 hover:border-primary-neon/30"
                                >
                                    {/* Hover Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary-neon/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    {/* Giant Background Icon - Parallax & Rotate */}
                                    <motion.div
                                        className="absolute -right-12 -bottom-12 text-white/[0.02] group-hover:text-primary-neon/[0.05] transition-colors duration-500"
                                        style={{ rotate: -15, y }}
                                        whileHover={{ scale: 1.1, rotate: -10 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <Icon size={180} strokeWidth={1} />
                                    </motion.div>

                                    {/* Content */}
                                    <div className="relative z-10 h-full flex flex-col">
                                        <div className="flex justify-between items-start mb-8">
                                            <div className="w-16 h-16 bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-primary-neon/50 group-hover:scale-110 transition-all duration-300">
                                                <Icon className="w-8 h-8 text-white group-hover:text-primary-neon transition-colors" />
                                            </div>
                                            <span className="font-mono text-white/20 text-2xl font-bold">0{index + 1}</span>
                                        </div>

                                        <h2 className="font-display text-xl md:text-2xl uppercase text-white mb-4 group-hover:text-primary-neon transition-colors duration-300 group-hover:translate-x-2 transform">
                                            {/* Parse title for highlight tags */}
                                            {(() => {
                                                const parts = service.title.split(/(<highlight>.*?<\/highlight>)/);
                                                return parts.map((part, index) => {
                                                    if (part.startsWith('<highlight>') && part.endsWith('</highlight>')) {
                                                        const content = part.replace(/<\/?highlight>/g, '');
                                                        return (
                                                            <span key={index} className={`relative inline-block ${service.highlightColor} ${service.shadowColor} mx-2`}>
                                                                {content}
                                                                {/* Back glow */}
                                                                <span className={`absolute -inset-4 ${service.glowColor} blur-3xl opacity-60 -z-10 animate-pulse-slow pointer-events-none`} />
                                                            </span>
                                                        );
                                                    }
                                                    return part;
                                                });
                                            })()}
                                        </h2>

                                        <p className="text-muted-foreground font-light leading-relaxed mb-8 flex-grow group-hover:text-gray-300 transition-colors">
                                            {service.description}
                                        </p>

                                        {/* Tech Stack Tags */}
                                        <div className="flex flex-wrap gap-2 mb-8">
                                            {service.tech.map((tech, i) => (
                                                <span key={i} className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-primary-neon border border-primary-neon/20 bg-primary-neon/5 hover:bg-primary-neon hover:text-black transition-colors">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Features List */}
                                        <ul className="space-y-3 border-t border-white/10 pt-6">
                                            {service.features.map((feature, i) => (
                                                <motion.li
                                                    key={i}
                                                    className="flex items-center gap-3 text-sm text-gray-400 font-mono"
                                                    whileHover={{ x: 5 }}
                                                >
                                                    <span className="w-1.5 h-1.5 bg-primary-neon rounded-full group-hover:animate-pulse" />
                                                    {feature}
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Decorative Corners */}
                                    <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/10 group-hover:border-primary-neon/50 transition-colors" />
                                    <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/10 group-hover:border-primary-neon/50 transition-colors" />
                                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/10 group-hover:border-primary-neon/50 transition-colors" />
                                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/10 group-hover:border-primary-neon/50 transition-colors" />
                                </motion.div>
                            );
                        })}
                    </motion.div>

                    {/* CTA Section */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative p-12 md:p-20 border border-white/10 bg-white/[0.02] backdrop-blur-xl overflow-hidden text-center group"
                    >
                        <div className="absolute inset-0 bg-grid-pattern opacity-10 group-hover:opacity-20 transition-opacity" />

                        <h2 className="relative z-10 font-display text-4xl md:text-6xl uppercase font-bold mb-6">
                            {t("services.cta.title")} <br />
                            <span className="text-primary-neon inline-block hover:scale-105 transition-transform duration-300">{t("services.cta.titleHighlight")}</span>
                        </h2>

                        <p className="relative z-10 text-muted-foreground text-lg max-w-2xl mx-auto mb-12 font-light">
                            {t("services.cta.subtitle")}
                        </p>

                        <div className="relative z-10">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center gap-4 px-8 py-4 bg-white text-black font-display font-bold uppercase tracking-widest hover:bg-primary-neon transition-colors duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)]"
                                >
                                    {t("services.cta.button")}
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>

                </div>
            </div>

            <Footer />
        </main>
    );
}
