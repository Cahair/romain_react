"use client";
import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { MessageSquare, Zap, Target, Database, ArrowRight, Bot, Share2, Search, BarChart3, Mail, Bell, Cpu } from "lucide-react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useTranslation } from "../../components/LanguageProvider";

// --- Visual Components (Constrained Height) ---

const ChatbotVisual = () => {
    return (
        <div className="relative w-full max-h-[40vh] aspect-square flex flex-col justify-center items-center">
            {/* Floating Messages */}
            <motion.div
                initial={{ opacity: 0, x: -30, y: 10 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white/10 backdrop-blur-md border border-white/10 p-3 rounded-2xl rounded-tl-none self-start mb-2 max-w-[70%]"
            >
                <div className="h-1.5 w-16 bg-white/20 rounded-full mb-1.5"></div>
                <div className="h-1.5 w-24 bg-white/10 rounded-full"></div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 30, y: 10 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="bg-primary/20 backdrop-blur-md border border-primary/30 p-3 rounded-2xl rounded-tr-none self-end mb-2 max-w-[70%]"
            >
                <div className="h-1.5 w-28 bg-primary-neon/40 rounded-full mb-1.5"></div>
                <div className="h-1.5 w-14 bg-primary-neon/20 rounded-full"></div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: -30, y: 10 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.5, delay: 1.4 }}
                className="bg-white/10 backdrop-blur-md border border-white/10 p-3 rounded-2xl rounded-tl-none self-start max-w-[70%]"
            >
                <div className="h-1.5 w-20 bg-white/20 rounded-full"></div>
            </motion.div>

            {/* Central Bot Icon Pulsing */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-primary-neon/10 rounded-full blur-2xl animate-pulse-slow pointer-events-none"></div>
        </div>
    );
};

const WorkflowVisual = () => {
    return (
        <div className="w-full max-h-[40vh] flex items-center justify-center relative">
            <svg className="w-full max-w-xl overflow-visible" viewBox="0 0 500 300" preserveAspectRatio="xMidYMid meet">
                {/* Connecting Lines */}
                {/* Path 1: Trigger -> Split */}
                <motion.path
                    d="M 60 150 L 140 150"
                    fill="none"
                    stroke="#8b5cf6"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                />

                {/* Path 2: Split -> Top Branch */}
                <motion.path
                    d="M 140 150 L 170 150 L 170 80 L 220 80"
                    fill="none"
                    stroke="#8b5cf6"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 0.8, ease: "easeInOut", delay: 0.5 }}
                />

                {/* Path 3: Split -> Bottom Branch */}
                <motion.path
                    d="M 140 150 L 170 150 L 170 220 L 220 220"
                    fill="none"
                    stroke="#8b5cf6"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 0.8, ease: "easeInOut", delay: 0.5 }}
                />

                {/* Path 4: Top Branch -> Final Top */}
                <motion.path
                    d="M 280 80 L 360 80"
                    fill="none"
                    stroke="#8b5cf6"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 0.5, ease: "easeInOut", delay: 1.5 }}
                />

                {/* Path 5: Bottom Branch -> Final Bottom */}
                <motion.path
                    d="M 280 220 L 360 220"
                    fill="none"
                    stroke="#8b5cf6"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 0.5, ease: "easeInOut", delay: 1.8 }}
                />


                {/* Nodes */}
                {/* 1. Trigger */}
                <g transform="translate(60, 150)">
                    <circle r="20" fill="#1e1b4b" stroke="#8b5cf6" strokeWidth="2" />
                    <Zap size={16} x="-8" y="-8" className="text-secondary-neon" />
                </g>

                {/* 2. Processing (Splitter) */}
                <motion.g
                    transform="translate(140, 150)"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <rect x="-20" y="-20" width="40" height="40" rx="6" fill="#1e1b4b" stroke="#8b5cf6" strokeWidth="2" />
                    <Cpu size={16} x="-8" y="-8" className="text-secondary-neon" />
                </motion.g>

                {/* 3. Action Top (Bot) */}
                <motion.g
                    transform="translate(250, 80)"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    <rect x="-24" y="-24" width="48" height="48" rx="8" fill="#1e1b4b" stroke="#8b5cf6" strokeWidth="2" />
                    <Bot size={20} x="-10" y="-10" className="text-secondary-neon" />
                </motion.g>

                {/* 4. Action Bottom (Email) */}
                <motion.g
                    transform="translate(250, 220)"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    <rect x="-24" y="-24" width="48" height="48" rx="8" fill="#1e1b4b" stroke="#8b5cf6" strokeWidth="2" />
                    <Mail size={20} x="-10" y="-10" className="text-secondary-neon" />
                </motion.g>

                {/* 5. Final Top (Database) */}
                <motion.g
                    transform="translate(390, 80)"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                >
                    <rect x="-24" y="-24" width="48" height="48" rx="8" fill="#1e1b4b" stroke="#8b5cf6" strokeWidth="2" />
                    <Database size={20} x="-10" y="-10" className="text-secondary-neon" />
                </motion.g>

                {/* 6. Final Bottom (Notify) */}
                <motion.g
                    transform="translate(390, 220)"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 1.4 }}
                >
                    <rect x="-24" y="-24" width="48" height="48" rx="8" fill="#1e1b4b" stroke="#8b5cf6" strokeWidth="2" />
                    <Bell size={20} x="-10" y="-10" className="text-secondary-neon" />
                </motion.g>
            </svg>
        </div>
    );
};

const LeadGenVisual = () => {
    return (
        <div className="w-full max-h-[40vh] max-w-sm mx-auto aspect-square relative flex items-center justify-center">
            {/* Radar Circles */}
            <div className="absolute inset-0 border border-pink-500/20 rounded-full"></div>
            <div className="absolute inset-8 border border-pink-500/20 rounded-full"></div>
            <div className="absolute inset-16 border border-pink-500/20 rounded-full"></div>
            <div className="absolute inset-1/2 w-1.5 h-1.5 bg-pink-500 rounded-full -translate-x-1/2 -translate-y-1/2"></div>

            {/* Scanning Line */}
            <motion.div
                className="absolute inset-0 rounded-full border-r border-transparent"
                style={{
                    background: "conic-gradient(from 0deg, transparent 0deg, rgba(236, 72, 153, 0.3) 60deg, transparent 60deg)",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />

            {/* Detected Avatars */}
            <motion.div
                className="absolute top-1/4 left-1/4 w-6 h-6 rounded-full bg-pink-500/20 border border-pink-500 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: [0, 1, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
            >
                <div className="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
            </motion.div>
            <motion.div
                className="absolute bottom-1/3 right-1/4 w-6 h-6 rounded-full bg-pink-500/20 border border-pink-500 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: [0, 1, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 2.5 }}
            >
                <div className="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
            </motion.div>
        </div>
    );
};

const DataVisual = () => {
    return (
        <div className="w-full max-h-[40vh] max-w-lg mx-auto aspect-video perspective-1000 relative">
            <motion.div
                className="w-full h-full bg-black/40 backdrop-blur-xl border border-emerald-500/30 rounded-xl p-4 shadow-2xl"
                initial={{ rotateX: 20, rotateY: -20, opacity: 0, y: 50 }}
                whileInView={{ rotateX: 10, rotateY: -10, opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                style={{ transformStyle: "preserve-3d" }}
            >
                <div className="flex justify-between items-center mb-4">
                    <div className="h-3 w-24 bg-emerald-500/20 rounded"></div>
                    <div className="h-6 w-6 bg-emerald-500/10 rounded-full"></div>
                </div>

                <div className="flex gap-3 h-24 items-end mb-4">
                    {[40, 70, 50, 90, 60, 80].map((h, i) => (
                        <motion.div
                            key={i}
                            className="flex-1 bg-gradient-to-t from-emerald-500/10 to-emerald-500/60 rounded-t-md"
                            initial={{ height: 0 }}
                            whileInView={{ height: `${h}%` }}
                            transition={{ duration: 1, delay: i * 0.1 }}
                        />
                    ))}
                </div>

                {/* Floating Elements */}
                <motion.div
                    className="absolute -right-6 top-8 bg-black/80 border border-emerald-500/50 p-2 rounded-lg shadow-xl"
                    initial={{ x: 20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1 }}
                    style={{ transform: "translateZ(30px)" }}
                >
                    <div className="text-emerald-400 font-mono font-bold text-lg">+125%</div>
                </motion.div>
            </motion.div>
        </div>
    );
};


// --- Main Page Component ---

export default function ServicesPage() {
    const { t } = useTranslation();

    return (
        <main className="h-screen w-full overflow-y-scroll snap-y snap-mandatory bg-background text-foreground scroll-smooth overflow-x-hidden">
            <Navbar />

            {/* Intro Hero Section */}
            <section className="h-screen w-full snap-start flex flex-col items-center justify-center relative overflow-hidden bg-background px-4">
                {/* Background Effects */}
                <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vh] h-[60vh] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

                <div className="container mx-auto px-4 text-center relative z-10 flex flex-col justify-center h-full max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col gap-4"
                    >
                        <h1 className="font-display font-black uppercase tracking-tighter text-[clamp(2.5rem,8vw,6rem)] leading-none">
                            {t("servicesPage.intro.titlePrefix")}{" "}
                            <span className="text-transparent stroke-text block md:inline">{t("servicesPage.intro.titleHighlight")}</span>
                        </h1>
                        <p
                            className="text-[clamp(1rem,2vw,1.5rem)] text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: t("servicesPage.intro.subtitle") }}
                        />
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute bottom-[5vh] left-1/2 -translate-x-1/2 z-20 cursor-pointer"
                >
                    <a href="#chatbots" className="flex flex-col items-center gap-2 group">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground group-hover:text-primary-neon transition-colors">{t("servicesPage.intro.scroll")}</span>
                        <motion.div
                            animate={{ y: [0, 5, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <ArrowRight className="rotate-90 text-primary-neon w-5 h-5 group-hover:scale-110 transition-transform" />
                        </motion.div>
                    </a>
                </motion.div>
            </section>

            {/* Section 1: Chatbots */}
            <section id="chatbots" className="h-screen w-full snap-start flex items-center justify-center relative overflow-hidden px-4 md:px-8">
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full max-h-[90vh]">
                    <div className="order-2 md:order-1 flex flex-col justify-center gap-4 md:gap-6">
                        <motion.h2
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="text-[clamp(2rem,5vw,4rem)] font-black uppercase leading-tight"
                        >
                            {t("servicesPage.chatbots.titlePrefix")} <span className="text-primary-neon block">{t("servicesPage.chatbots.titleHighlight")}</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-[clamp(0.875rem,1.2vw,1.125rem)] text-muted-foreground leading-relaxed max-w-lg"
                        >
                            {t("servicesPage.chatbots.desc")}
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <Link href="/services/chatbots" className="inline-flex items-center gap-3 px-6 py-3 bg-primary/10 border border-primary/50 rounded-full hover:bg-primary/20 transition-all group">
                                <span className="uppercase tracking-widest font-bold text-sm text-primary-neon">{t("servicesPage.chatbots.button")}</span>
                                <ArrowRight className="w-4 h-4 text-primary-neon group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                    </div>
                    <div className="order-1 md:order-2 flex justify-center items-center h-[40vh] md:h-auto">
                        <ChatbotVisual />
                    </div>
                </div>
            </section>

            {/* Section 2: Workflows */}
            <section className="h-screen w-full snap-start flex items-center justify-center relative overflow-hidden px-4 md:px-8 bg-black/20">
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full max-h-[90vh]">
                    <div className="order-2 md:order-1 flex justify-center items-center h-[40vh] md:h-auto">
                        <WorkflowVisual />
                    </div>
                    <div className="order-1 md:order-2 text-right md:text-left flex flex-col justify-center gap-4 md:gap-6 items-end md:items-start">
                        <motion.h2
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="text-[clamp(2rem,5vw,4rem)] font-black uppercase leading-tight"
                        >
                            {t("servicesPage.workflows.titlePrefix")} <span className="text-secondary-neon block">{t("servicesPage.workflows.titleHighlight")}</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-[clamp(0.875rem,1.2vw,1.125rem)] text-muted-foreground leading-relaxed max-w-lg ml-auto md:ml-0"
                        >
                            {t("servicesPage.workflows.desc")}
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <Link href="/services/workflows" className="inline-flex items-center gap-3 px-6 py-3 bg-secondary/10 border border-secondary/50 rounded-full hover:bg-secondary/20 transition-all group">
                                <span className="uppercase tracking-widest font-bold text-sm text-secondary-neon">{t("servicesPage.workflows.button")}</span>
                                <ArrowRight className="w-4 h-4 text-secondary-neon group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Section 3: Lead Gen */}
            <section className="h-screen w-full snap-start flex items-center justify-center relative overflow-hidden px-4 md:px-8">
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full max-h-[90vh]">
                    <div className="order-2 md:order-1 flex flex-col justify-center gap-4 md:gap-6">
                        <motion.h2
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="text-[clamp(2rem,5vw,4rem)] font-black uppercase leading-tight"
                        >
                            {t("servicesPage.leadGen.titlePrefix")} <span className="text-pink-500 block">{t("servicesPage.leadGen.titleHighlight")}</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-[clamp(0.875rem,1.2vw,1.125rem)] text-muted-foreground leading-relaxed max-w-lg"
                        >
                            {t("servicesPage.leadGen.desc")}
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <Link href="/services/lead-gen" className="inline-flex items-center gap-3 px-6 py-3 bg-pink-500/10 border border-pink-500/50 rounded-full hover:bg-pink-500/20 transition-all group">
                                <span className="uppercase tracking-widest font-bold text-sm text-pink-500">{t("servicesPage.leadGen.button")}</span>
                                <ArrowRight className="w-4 h-4 text-pink-500 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                    </div>
                    <div className="order-1 md:order-2 flex justify-center items-center h-[40vh] md:h-auto">
                        <LeadGenVisual />
                    </div>
                </div>
            </section>

            {/* Section 4: Data */}
            <section className="h-screen w-full snap-start flex items-center justify-center relative overflow-hidden px-4 md:px-8 bg-black/20">
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full max-h-[90vh]">
                    <div className="order-2 md:order-1 flex justify-center items-center h-[40vh] md:h-auto">
                        <DataVisual />
                    </div>
                    <div className="order-1 md:order-2 text-right md:text-left flex flex-col justify-center gap-4 md:gap-6 items-end md:items-start">
                        <motion.h2
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="text-[clamp(2rem,5vw,4rem)] font-black uppercase leading-tight"
                        >
                            {t("servicesPage.data.titlePrefix")} <span className="text-emerald-500 block">{t("servicesPage.data.titleHighlight")}</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-[clamp(0.875rem,1.2vw,1.125rem)] text-muted-foreground leading-relaxed max-w-lg ml-auto md:ml-0"
                        >
                            {t("servicesPage.data.desc")}
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <Link href="/services/data" className="inline-flex items-center gap-3 px-6 py-3 bg-emerald-500/10 border border-emerald-500/50 rounded-full hover:bg-emerald-500/20 transition-all group">
                                <span className="uppercase tracking-widest font-bold text-sm text-emerald-500">{t("servicesPage.data.button")}</span>
                                <ArrowRight className="w-4 h-4 text-emerald-500 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Footer styled as simple copyright at the end of scroll */}
            <div className="snap-start w-full">
                <Footer />
            </div>
        </main>
    );
}
