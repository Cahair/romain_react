"use client";
import { motion } from "framer-motion";
import { ArrowDown, Briefcase, GraduationCap, Code, Cpu, Globe, Palette } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTranslation } from "@/components/LanguageProvider";

export default function AboutPage() {
    const { t, locale } = useTranslation();

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
            <Navbar />

            {/* Hero Section */}
            <section className="relative min-h-screen flex flex-col justify-center pt-32 pb-10 overflow-hidden">
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
                        <h1 className="text-4xl md:text-7xl font-black tracking-tighter mb-8 leading-tight pt-8">
                            {t("about.title")} <br className="hidden md:block" />
                            <span className="text-gradient">{t("about.titleHighlight1")}</span> {t("about.titleMiddle")} <span className="text-gradient">{t("about.titleHighlight2")}</span>
                        </h1>

                        <div className="glass p-8 md:p-10 rounded-3xl mb-8 backdrop-blur-xl border border-white/10 shadow-2xl">
                            <h2 className="text-2xl font-bold mb-4 flex items-center justify-center gap-3">
                                <span className="text-3xl">👋</span> {t("about.story.title")}
                            </h2>
                            <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
                                {t("about.story.text")}
                            </p>
                            <div className="mt-6 text-lg font-bold text-white">
                                <span className="text-gradient">{t("about.story.highlight")}</span>
                            </div>
                        </div>

                        <button
                            onClick={scrollToCV}
                            className="group flex flex-col items-center gap-3 mx-auto text-gray-400 hover:text-white transition-colors pb-4"
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
                        <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
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
                                        <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-primary ring-4 ring-background transition-all group-hover:bg-white group-hover:scale-125" />
                                        <div className="glass p-6 rounded-2xl hover:bg-white/5 transition-all hover:scale-[1.02] hover:shadow-neon-cyan duration-300">
                                            <div className="text-sm font-black text-primary/80 uppercase tracking-widest mb-1">{item.year}</div>
                                            <h4 className="text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors">{item.role}</h4>
                                            <div className="text-gray-400 font-medium mb-4">{item.company}</div>
                                            <p className="text-gray-300 leading-relaxed text-sm">
                                                {item.description}
                                            </p>
                                        </div>
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
                                            <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-secondary ring-4 ring-background transition-all group-hover:bg-white group-hover:scale-125" />
                                            <div className="glass p-6 rounded-2xl hover:bg-white/5 transition-all hover:scale-[1.02] hover:shadow-neon-violet duration-300">
                                                <div className="text-sm font-black text-secondary/80 uppercase tracking-widest mb-1">{item.year}</div>
                                                <h4 className="text-xl font-bold text-white mb-1 group-hover:text-secondary transition-colors">{item.degree}</h4>
                                                <div className="text-gray-400 font-medium mb-4">{item.school}</div>
                                                <p className="text-gray-300 leading-relaxed text-sm">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Skills */}
                            <div>
                                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-accent">
                                    <Code className="w-6 h-6" /> {t("about.cv.skills.title")}
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="glass p-5 rounded-2xl">
                                        <div className="flex items-center gap-3 mb-3 text-primary">
                                            <Cpu className="w-5 h-5" />
                                            <span className="font-bold">{t("about.cv.skills.categories.ai")}</span>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {["OpenAI", "Anthropic", "Make", "n8n", "Python", "RAG"].map(skill => (
                                                <span key={skill} className="px-2 py-1 bg-white/5 rounded text-xs text-gray-300 border border-white/10">{skill}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="glass p-5 rounded-2xl">
                                        <div className="flex items-center gap-3 mb-3 text-secondary">
                                            <Globe className="w-5 h-5" />
                                            <span className="font-bold">{t("about.cv.skills.categories.dev")}</span>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {["Next.js", "React", "TypeScript", "TailwindCSS", "Node.js"].map(skill => (
                                                <span key={skill} className="px-2 py-1 bg-white/5 rounded text-xs text-gray-300 border border-white/10">{skill}</span>
                                            ))}
                                        </div>
                                    </div>
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
