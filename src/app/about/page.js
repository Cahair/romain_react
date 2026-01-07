"use client";
import React from 'react';
import { motion } from "framer-motion";
import { ArrowDown, Briefcase, GraduationCap, Code, Cpu, Globe, Factory, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTranslation } from "@/components/LanguageProvider";

// Animated Neon Card Component
const NeonCard = ({ children, colorClass, delay = 0 }) => {
    return (
        <div className="relative group rounded-2xl p-[1px] overflow-hidden">
            {/* Rotating Gradient Border */}
            <div className={`absolute inset-[-100%] bg-gradient-to-r ${colorClass} animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                style={{ animationDuration: '3s', animationTimingFunction: 'linear', animationIterationCount: 'infinite' }} />

            {/* Blur Effect behind */}
            <div className={`absolute inset-0 bg-gradient-to-r ${colorClass} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`} />

            {/* Content Container */}
            <div className="relative bg-[#0a0a0a] rounded-2xl h-full border border-white/10 group-hover:border-transparent transition-colors z-10">
                {children}
            </div>
        </div>
    );
};

export default function AboutPage() {
    const { t } = useTranslation();

    const scrollToCV = () => {
        const cvSection = document.getElementById('cv');
        if (cvSection) {
            cvSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Helper to get array from translation
    const getList = (key) => {
        const items = t(key);
        return Array.isArray(items) ? items : [];
    };

    return (
        <main className="bg-background min-h-screen flex flex-col">
            <style jsx global>{`
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 4s linear infinite;
                }
            `}</style>
            <Navbar />

            {/* Hero Section */}
            <section className="relative min-h-screen flex flex-col justify-center pt-24 pb-8 overflow-hidden">
                {/* Background Blobs */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] animate-pulse delay-1000" />

                <div className="container mx-auto px-6 relative z-10 text-center flex-1 flex flex-col justify-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto w-full"
                    >
                        {/* Reduced title size and margin */}
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter mb-6 leading-tight pt-4">
                            {t("about.title")} <br className="hidden md:block" />
                            <span className="text-gradient">{t("about.titleHighlight1")}</span> {t("about.titleMiddle")} <span className="text-gradient">{t("about.titleHighlight2")}</span>
                        </h1>

                        <div className="glass p-6 md:p-8 rounded-3xl mb-6 backdrop-blur-xl border border-white/10 shadow-2xl">
                            <h2 className="text-xl md:text-2xl font-bold mb-3 flex items-center justify-center gap-3">
                                <span className="text-2xl">👋</span> {t("about.story.title")}
                            </h2>
                            <p className="text-base md:text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
                                {t("about.story.text")}
                            </p>
                            <div className="mt-4 text-base md:text-lg font-bold text-white">
                                <span className="text-gradient">{t("about.story.highlight")}</span>
                            </div>
                        </div>

                        <button
                            onClick={scrollToCV}
                            className="group flex flex-col items-center gap-2 mx-auto text-gray-400 hover:text-white transition-colors pb-2"
                        >
                            <span className="text-xs font-black tracking-[0.2em] uppercase">{t("about.cv.button")}</span>
                            <div className="w-10 h-10 rounded-full glass flex items-center justify-center group-hover:bg-primary/20 transition-all group-hover:scale-110">
                                <ArrowDown className="w-5 h-5 animate-bounce" />
                            </div>
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* CV Section */}
            <section id="cv" className="py-24 relative">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">
                            {t("about.cv.title")} <span className="text-gradient">{t("about.cv.titleHighlight")}</span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                        {/* Left Column: Experience */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-primary">
                                <Briefcase className="w-6 h-6" /> {t("about.cv.experience.title")}
                            </h3>

                            <div className="space-y-8 pl-4 border-l-2 border-white/10">
                                {getList("about.cv.experience.items").map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.2 + (i * 0.1) }}
                                        className="relative pl-8 group"
                                    >
                                        <div className="absolute -left-[9px] top-8 w-4 h-4 rounded-full bg-primary ring-4 ring-background transition-all group-hover:bg-white group-hover:scale-125 z-20" />

                                        <NeonCard colorClass="from-cyan-400 via-blue-500 to-cyan-400" delay={i * 0.1}>
                                            <div className="p-6">
                                                <div className="text-sm font-black text-primary/80 uppercase tracking-widest mb-1">{item.year}</div>
                                                <h4 className="text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors">{item.role}</h4>
                                                <div className="text-gray-400 font-medium mb-4">{item.company}</div>
                                                <p className="text-gray-300 leading-relaxed text-sm">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </NeonCard>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Right Column: Education & Skills */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="space-y-16"
                        >
                            {/* Education */}
                            <div>
                                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-secondary">
                                    <GraduationCap className="w-6 h-6" /> {t("about.cv.education.title")}
                                </h3>
                                <div className="space-y-8 pl-4 border-l-2 border-white/10">
                                    {getList("about.cv.education.items").map((item, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: 20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.4 + (i * 0.1) }}
                                            className="relative pl-8 group"
                                        >
                                            <div className="absolute -left-[9px] top-8 w-4 h-4 rounded-full bg-secondary ring-4 ring-background transition-all group-hover:bg-white group-hover:scale-125 z-20" />

                                            <NeonCard colorClass="from-purple-500 via-pink-500 to-purple-500" delay={i * 0.1}>
                                                <div className="p-6">
                                                    <div className="text-sm font-black text-secondary/80 uppercase tracking-widest mb-1">{item.year}</div>
                                                    <h4 className="text-xl font-bold text-white mb-1 group-hover:text-secondary transition-colors">{item.degree}</h4>
                                                    <div className="text-gray-400 font-medium mb-4">{item.school}</div>
                                                    <p className="text-gray-300 leading-relaxed text-sm">
                                                        {item.description}
                                                    </p>
                                                </div>
                                            </NeonCard>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Skills */}
                            <div>
                                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-accent">
                                    <Code className="w-6 h-6" /> {t("about.cv.skills.title")}
                                </h3>
                                <div className="space-y-6">
                                    {/* AI Skills */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        className="glass p-6 rounded-2xl border border-primary/20 relative overflow-hidden group"
                                    >
                                        <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors duration-500" />
                                        <div className="relative z-10">
                                            <div className="flex items-center gap-3 mb-4 text-primary">
                                                <div className="p-2 bg-primary/20 rounded-lg">
                                                    <Cpu className="w-5 h-5" />
                                                </div>
                                                <span className="font-black text-lg tracking-wide">{t("about.cv.skills.categories.ai")}</span>
                                            </div>
                                            <div className="flex flex-wrap gap-3">
                                                {["OpenAI", "Anthropic", "Make", "n8n", "Python", "RAG", "LangChain"].map((skill, i) => (
                                                    <motion.span
                                                        key={skill}
                                                        initial={{ opacity: 0, scale: 0.8 }}
                                                        whileInView={{ opacity: 1, scale: 1 }}
                                                        viewport={{ once: true }}
                                                        transition={{ delay: 0.1 + (i * 0.05) }}
                                                        className="px-3 py-1.5 bg-background/50 backdrop-blur-md rounded-lg text-sm font-bold text-gray-200 border border-white/10 hover:border-primary/50 hover:text-primary hover:shadow-neon-cyan transition-all cursor-default"
                                                    >
                                                        {skill}
                                                    </motion.span>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Dev Skills */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.2 }}
                                        className="glass p-6 rounded-2xl border border-secondary/20 relative overflow-hidden group"
                                    >
                                        <div className="absolute inset-0 bg-secondary/5 group-hover:bg-secondary/10 transition-colors duration-500" />
                                        <div className="relative z-10">
                                            <div className="flex items-center gap-3 mb-4 text-secondary">
                                                <div className="p-2 bg-secondary/20 rounded-lg">
                                                    <Globe className="w-5 h-5" />
                                                </div>
                                                <span className="font-black text-lg tracking-wide">{t("about.cv.skills.categories.dev")}</span>
                                            </div>
                                            <div className="flex flex-wrap gap-3">
                                                {["Next.js", "React", "TypeScript", "TailwindCSS", "Node.js", "PostgreSQL", "Supabase"].map((skill, i) => (
                                                    <motion.span
                                                        key={skill}
                                                        initial={{ opacity: 0, scale: 0.8 }}
                                                        whileInView={{ opacity: 1, scale: 1 }}
                                                        viewport={{ once: true }}
                                                        transition={{ delay: 0.3 + (i * 0.05) }}
                                                        className="px-3 py-1.5 bg-background/50 backdrop-blur-md rounded-lg text-sm font-bold text-gray-200 border border-white/10 hover:border-secondary/50 hover:text-secondary hover:shadow-neon-violet transition-all cursor-default"
                                                    >
                                                        {skill}
                                                    </motion.span>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
