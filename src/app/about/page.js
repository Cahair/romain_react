"use client";
import { motion } from "framer-motion";
import { ArrowDown, Briefcase, GraduationCap, Code, Cpu, Globe, Factory, Zap, Database } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTranslation } from "@/components/LanguageProvider";

const TimelineItem = ({ year, title, subtitle, description, colorClass, delay, icon: Icon }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay }}
        className="relative pl-8 pb-12 last:pb-0"
    >
        {/* Timeline Dot */}
        <div className={`absolute left-[-5px] top-2 w-3 h-3 rounded-full ${colorClass.replace('from-', 'bg-').split(' ')[0]} ring-4 ring-background z-10`} />

        {/* Card Wrapper for Glow */}
        <div className="relative group">
            {/* Glow Effect */}
            <div className={`absolute -inset-0.5 bg-gradient-to-r ${colorClass} rounded-xl blur opacity-0 group-hover:opacity-75 transition duration-500 group-hover:duration-200 animate-tilt`} />

            {/* Main Card Content */}
            <div className="relative bg-[#0a0a0a] border border-white/10 p-6 rounded-xl hover:border-white/20 transition-all hover:bg-[#111]">
                <div className={`text-xs font-black uppercase tracking-widest mb-2 ${colorClass.replace('from-', 'text-').split(' ')[0]}`}>
                    {year}
                </div>
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
                    {title}
                </h3>
                <div className="text-sm font-medium text-gray-400 mb-4 flex items-center gap-2">
                    {Icon && <Icon className="w-4 h-4 opacity-70" />}
                    {subtitle}
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                    {description}
                </p>
            </div>
        </div>
    </motion.div>
);

const SkillCard = ({ title, icon: Icon, skills, colorClass, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay }}
        className="relative group"
    >
        {/* Glow Effect */}
        <div className={`absolute -inset-0.5 bg-gradient-to-r ${colorClass} rounded-xl blur opacity-0 group-hover:opacity-75 transition duration-500 group-hover:duration-200 animate-tilt`} />

        <div className="relative bg-[#0a0a0a] border border-white/10 p-6 rounded-xl overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-br ${colorClass} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

            <div className="flex items-center gap-3 mb-4 relative z-10">
                <div className={`p-2 rounded-lg bg-white/5 ${colorClass.replace('from-', 'text-').split(' ')[0]}`}>
                    <Icon className="w-5 h-5" />
                </div>
                <h4 className={`text-lg font-bold ${colorClass.replace('from-', 'text-').split(' ')[0]}`}>{title}</h4>
            </div>

            <div className="flex flex-wrap gap-2 relative z-10">
                {skills.map((skill) => (
                    <span
                        key={skill}
                        className="px-3 py-1 bg-white/5 border border-white/5 rounded text-xs font-medium text-gray-300 hover:text-white hover:border-white/20 transition-colors cursor-default"
                    >
                        {skill}
                    </span>
                ))}
            </div>
        </div>
    </motion.div>
);

export default function AboutPage() {
    const { t } = useTranslation();

    const scrollToCV = () => {
        const cvSection = document.getElementById('cv');
        if (cvSection) {
            cvSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const getList = (key) => {
        const items = t(key);
        return Array.isArray(items) ? items : [];
    };

    const experiences = getList("about.cv.experience.items");
    const education = getList("about.cv.education.items");

    // Colors
    const colors = {
        primary: "from-cyan-400 to-blue-500",
        secondary: "from-purple-400 to-pink-500",
    };

    return (
        <main className="bg-background min-h-screen flex flex-col overflow-x-hidden">
            <Navbar />

            {/* Header Section */}
            <div className="pt-24 pb-12 text-center container mx-auto px-6">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-6xl font-black tracking-tighter mb-4"
                >
                    {t("about.cv.title")} <span className="text-gradient">{t("about.cv.titleHighlight")}</span>
                </motion.h1>
                <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full opacity-50" />
            </div>

            {/* Timeline Layout */}
            <div id="cv" className="container mx-auto px-4 pb-24 max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

                    {/* LEFT COLUMN: EXPERIENCE */}
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-2xl font-bold flex items-center gap-3 text-cyan-400 mb-8"
                        >
                            <Briefcase className="w-6 h-6" /> {t("about.cv.experience.title")}
                        </motion.h2>

                        {/* Continuous Vertical Line Container */}
                        <div className="border-l-2 border-white/10 ml-3 space-y-2">
                            {experiences[0] && (
                                <TimelineItem
                                    delay={0.1}
                                    year={experiences[0].year}
                                    title="Founder & AI Architect"
                                    subtitle="Kantzer.ai"
                                    description={experiences[0].description}
                                    colorClass={colors.primary}
                                />
                            )}
                            {experiences[1] && ( // ERAS
                                <TimelineItem
                                    delay={0.2}
                                    year={experiences[1].year}
                                    title="Apprentice Engineer"
                                    subtitle="ERAS"
                                    description={experiences[1].description}
                                    colorClass={colors.primary}
                                />
                            )}
                            {experiences[2] && ( // Freelance
                                <TimelineItem
                                    delay={0.3}
                                    year={experiences[2].year}
                                    title="Freelance Developer"
                                    subtitle="Independent"
                                    description={experiences[2].description}
                                    colorClass={colors.primary}
                                    icon={Globe}
                                />
                            )}
                            {experiences[3] && ( // Clemessy
                                <TimelineItem
                                    delay={0.4}
                                    year={experiences[3].year}
                                    title="Automation Apprentice"
                                    subtitle="Clemessy"
                                    description={experiences[3].description}
                                    colorClass={colors.primary}
                                    icon={Zap}
                                />
                            )}
                        </div>
                    </div>

                    {/* RIGHT COLUMN: EDUCATION & SKILLS */}
                    <div className="space-y-16">

                        {/* EDUCATION SECTION */}
                        <div>
                            <motion.h2
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="text-2xl font-bold flex items-center gap-3 text-purple-400 mb-8"
                            >
                                <GraduationCap className="w-6 h-6" /> {t("about.cv.education.title")}
                            </motion.h2>

                            <div className="border-l-2 border-white/10 ml-3 space-y-2">
                                {education[0] && (
                                    <TimelineItem
                                        delay={0.2}
                                        year={education[0].year}
                                        title="Industrial Digital Systems"
                                        subtitle="Icam Strasbourg-Europe"
                                        description={education[0].description}
                                        colorClass={colors.secondary}
                                    />
                                )}
                                {education[1] && (
                                    <TimelineItem
                                        delay={0.3}
                                        year={education[1].year}
                                        title="System Automated & Ind. Computing"
                                        subtitle="IUT de Haguenau"
                                        description={education[1].description}
                                        colorClass={colors.secondary}
                                    />
                                )}
                                {education[2] && (
                                    <TimelineItem
                                        delay={0.4}
                                        year={education[2].year}
                                        title="GEII"
                                        subtitle="IUT"
                                        description={education[2].description}
                                        colorClass={colors.secondary}
                                    />
                                )}
                            </div>
                        </div>

                        {/* SKILLS SECTION */}
                        <div>
                            <motion.h2
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="text-2xl font-bold flex items-center gap-3 text-cyan-400 mb-8"
                            >
                                <Code className="w-6 h-6" /> {t("about.cv.skills.title")}
                            </motion.h2>

                            <div className="space-y-6">
                                <SkillCard
                                    delay={0.5}
                                    title={t("about.cv.skills.categories.ai")}
                                    icon={Cpu}
                                    skills={["OpenAI", "Anthropic", "Make", "n8n", "Python", "RAG", "LangChain"]}
                                    colorClass={colors.primary}
                                />
                                <SkillCard
                                    delay={0.6}
                                    title={t("about.cv.skills.categories.dev")}
                                    icon={Globe}
                                    skills={["Next.js", "React", "TypeScript", "TailwindCSS", "Node.js", "PostgreSQL", "Supabase"]}
                                    colorClass={colors.secondary}
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
