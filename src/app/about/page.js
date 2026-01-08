"use client";
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { ArrowDown, Briefcase, GraduationCap, Code, Cpu, Globe, Zap, Database, Terminal, Factory, ChevronDown, Calendar, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTranslation } from "@/components/LanguageProvider";
import { useEffect, useRef, useState } from "react";

const InteractiveTimelineItem = ({ year, title, subtitle, description, isLast, icon: Icon, index }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const itemRef = useRef(null);

    return (
        <motion.div
            ref={itemRef}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="relative pl-8 md:pl-12 pb-12 last:pb-0 group"
        >
            {/* Timeline Line - Animated Gradient */}
            {!isLast && (
                <div className="absolute left-[11px] top-8 bottom-0 w-[2px]">
                    <div className="w-full h-full bg-white/5 mx-auto" />
                    <motion.div
                        initial={{ height: "0%" }}
                        whileInView={{ height: "100%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
                        className="absolute top-0 left-0 w-full bg-gradient-to-b from-primary-neon via-secondary-neon to-transparent shadow-[0_0_10px_rgba(0,240,255,0.2)]"
                    />
                </div>
            )}

            {/* Timeline Dot - Pulsing Node */}
            <div className="absolute left-0 top-0 w-6 h-6 z-10">
                <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 300, damping: 20, delay: index * 0.1 }}
                    className="w-full h-full bg-background border border-primary-neon flex items-center justify-center relative shadow-[0_0_15px_rgba(0,240,255,0.4)] group-hover:shadow-[0_0_25px_rgba(0,240,255,0.6)] transition-shadow duration-500"
                >
                    <div className="w-2 h-2 bg-primary-neon animate-pulse-slow" />
                </motion.div>
            </div>

            {/* Card Content - Glassmorphic Accordion */}
            <motion.div
                onClick={() => setIsExpanded(!isExpanded)}
                className="relative backdrop-blur-md bg-white/[0.03] border border-white/10 hover:border-primary-neon/40 transition-all duration-300 rounded-xl overflow-hidden cursor-pointer group/card"
            >
                {/* Header Section */}
                <div className="p-6 relative z-10">
                    <div className="flex justify-between items-start gap-4">
                        <div className="flex-grow">
                            {/* Year Badge */}
                            <div className="flex items-center gap-3 mb-3">
                                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-primary-neon/10 border border-primary-neon/20 text-xs font-mono text-primary-neon tracking-wider uppercase">
                                    <Calendar className="w-3 h-3" />
                                    {year}
                                </span>
                                {Icon && <Icon className="w-4 h-4 text-muted-foreground group-hover/card:text-secondary-neon transition-colors" />}
                            </div>

                            {/* Title */}
                            <h3 className="font-display font-bold text-xl md:text-2xl text-white mb-1 group-hover/card:text-primary-neon transition-colors duration-300">
                                {title}
                            </h3>

                            {/* Subtitle/Company */}
                            <div className="text-sm font-mono text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                <span className="w-2 h-[1px] bg-primary-neon"></span>
                                {subtitle}
                            </div>
                        </div>

                        {/* Expand Icon */}
                        <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            className="bg-white/5 p-2 rounded-full text-muted-foreground group-hover/card:text-white group-hover/card:bg-white/10 transition-colors"
                        >
                            <ChevronDown className="w-5 h-5" />
                        </motion.div>
                    </div>

                    {/* Short Summary (Visible when collapsed) */}
                    {!isExpanded && description && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="mt-4 text-sm text-gray-500 line-clamp-2 font-light"
                        >
                            {typeof description === 'string' ? description.split('.')[0] : ""} .
                        </motion.div>
                    )}
                </div>

                {/* Expanded Content */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                            <div className="px-6 pb-6 pt-0 border-t border-white/5 mt-2">
                                <motion.p
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.1 }}
                                    className="text-gray-400 text-sm leading-relaxed font-light mt-4"
                                >
                                    {description}
                                </motion.p>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="mt-4 flex gap-2"
                                >
                                    <span className="text-[10px] uppercase tracking-widest text-white/20 font-mono">More details...</span>
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Decorative Hover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-neon/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
        </motion.div>
    );
};

const SkillCard = ({ title, icon: Icon, skills, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay }}
        className="group relative"
    >
        <div className="absolute inset-0 bg-gradient-to-br from-primary-neon/20 to-secondary-neon/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
        <div className="relative bg-[#050505] border border-white/10 p-6 h-full hover:border-primary-neon/50 transition-colors duration-300">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-primary-neon" />
                </div>
                <h4 className="font-display font-bold text-xl uppercase tracking-wide">{title}</h4>
            </div>

            {/* Skills List */}
            <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                    <span
                        key={skill}
                        className="px-3 py-1 bg-white/5 border border-white/5 text-xs font-mono text-gray-400 uppercase tracking-wider hover:text-primary-neon hover:border-primary-neon/50 transition-all cursor-default"
                    >
                        {skill}
                    </span>
                ))}
            </div>
        </div>

        {/* Decor Corner */}
        <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-primary-neon/30 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-primary-neon/30 opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
);

export default function AboutPage() {
    const { t } = useTranslation();

    // Mouse follower for Aurora effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 700 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const { pageX, pageY } = e;
            mouseX.set(pageX);
            mouseY.set(pageY);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

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

    return (
        <main className="bg-background min-h-screen flex flex-col overflow-x-hidden selection:bg-primary-neon/30 selection:text-white">
            <Navbar />

            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex flex-col justify-center py-20 overflow-hidden">
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

                {/* Aurora Effect */}
                <motion.div
                    className="absolute z-0 w-[500px] h-[500px] bg-primary-neon/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen"
                    style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
                />

                <div className="container mx-auto px-6 relative z-10 w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                        {/* LEFT: Title - Titan Typography */}
                        <motion.div
                            className="lg:col-span-7"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <motion.span
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="font-mono text-primary-neon text-sm tracking-[0.5em] uppercase block mb-6"
                            >
                                // {t("about.titleHighlight1")}
                            </motion.span>

                            <motion.h1
                                initial={{ filter: "blur(20px)", opacity: 0, scale: 1.1 }}
                                animate={{ filter: "blur(0px)", opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="block break-words hyphens-auto text-4xl md:text-8xl font-display font-bold uppercase leading-[0.85] tracking-tighter text-foreground mb-8"
                            >
                                {t("about.title")}
                            </motion.h1>

                            <span className="block text-3xl md:text-5xl text-white/50 my-2 font-light tracking-normal">
                                {t("about.titleMiddle")}
                            </span>

                            <motion.span
                                className="block relative text-blue-500 drop-shadow-[0_0_35px_rgba(59,130,246,0.8)]"
                                initial={{ x: -100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 50 }}
                            >
                                {t("about.titleHighlight2")}
                                {/* Back glow */}
                                <span className="absolute -inset-4 bg-blue-500/40 blur-3xl opacity-60 -z-10 animate-pulse-slow pointer-events-none" />
                            </motion.span>
                        </motion.div>

                        {/* RIGHT: Story Card - Industrial Glass with Fade Up */}
                        <motion.div
                            className="lg:col-span-5 w-full"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                        >
                            <div className="group relative backdrop-blur-md bg-white/[0.02] border border-white/10 p-8 hover:border-primary-neon/30 transition-all duration-500 w-full">
                                {/* Decorative Elements */}
                                <div className="absolute top-0 left-0 w-2 h-2 bg-white/20" />
                                <div className="absolute top-0 right-0 w-2 h-2 bg-white/20" />
                                <div className="absolute bottom-0 left-0 w-2 h-2 bg-white/20" />
                                <div className="absolute bottom-0 right-0 w-2 h-2 bg-white/20" />

                                <div className="flex flex-col items-center text-center">
                                    {/* Profile Image - Cyberpunk Border */}
                                    <div className="relative shrink-0 w-40 h-40 mb-6">
                                        <div className="absolute inset-0 border-2 border-primary-neon/50 rounded-full animate-pulse-slow" />
                                        <div className="absolute inset-2 border border-white/20 rounded-full" />
                                        <div className="absolute inset-4 rounded-full overflow-hidden bg-black">
                                            <img
                                                src="/romain-profile.jpg"
                                                alt="Romain Kantzer"
                                                className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
                                            />
                                        </div>
                                        <div className="absolute bottom-2 right-2 bg-black border border-primary-neon p-1.5">
                                            <Terminal className="w-4 h-4 text-primary-neon" />
                                        </div>
                                    </div>

                                    {/* Text Content */}
                                    <div>
                                        <h2 className="font-display text-2xl uppercase mb-4 flex items-center justify-center gap-2">
                                            <span className="text-primary-neon">&gt;</span>
                                            {t("about.story.title")}
                                        </h2>
                                        <p className="font-light text-base text-muted-foreground leading-relaxed font-mono mb-6">
                                            {t("about.story.text")}
                                        </p>
                                        <div className="pt-6 border-t border-white/5">
                                            <p className="text-lg text-white font-display uppercase tracking-wide">
                                                {t("about.story.highlight")}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                    </div>

                    {/* Scroll Button */}
                    <motion.button
                        onClick={scrollToCV}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2, duration: 1 }}
                        className="flex flex-col items-center gap-4 mx-auto mt-16 group cursor-pointer"
                    >
                        <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-muted-foreground group-hover:text-primary-neon transition-colors mb-2">
                            {t("about.cv.button")}
                        </span>
                        <ArrowDown className="w-5 h-5 text-primary-neon animate-bounce" />
                        <div className="h-12 w-[1px] bg-gradient-to-b from-primary-neon to-transparent group-hover:h-20 transition-all duration-500" />
                    </motion.button>
                </div>
            </section>

            {/* Timeline Header */}
            <div id="cv" className="container mx-auto px-6 mb-24 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="h-[1px] w-12 bg-primary-neon" />
                        <span className="font-mono text-primary-neon text-sm tracking-widest uppercase">
                            // EXPERIENCES & SKILLS
                        </span>
                    </div>
                    <h2 className="font-display font-bold text-5xl md:text-7xl uppercase text-foreground leading-none">
                        {t("about.cv.title")} <span className="text-transparent" style={{ WebkitTextStroke: '1px var(--text-stroke-color)' }}>Log</span>
                    </h2>
                </div>
            </div>

            {/* Timeline Layout */}
            <div className="container mx-auto px-4 pb-32 max-w-6xl relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">

                    {/* LEFT COLUMN: EXPERIENCE */}
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="font-display text-2xl uppercase tracking-widest mb-12 flex items-center gap-4 border-b border-white/10 pb-4"
                        >
                            <Briefcase className="w-5 h-5 text-primary-neon" />
                            {t("about.cv.experience.title")}
                        </motion.h2>

                        {/* Interactive Timeline Items */}
                        <div className="ml-2 border-l border-white/5 pl-2">
                            {experiences.map((exp, index) => (
                                <InteractiveTimelineItem
                                    key={index}
                                    index={index}
                                    year={exp.year}
                                    title={exp.role}
                                    subtitle={exp.company}
                                    description={exp.description}
                                    icon={index === 0 ? Cpu : index === 1 ? Factory : index === 2 ? Globe : Zap}
                                    isLast={index === experiences.length - 1}
                                />
                            ))}
                        </div>
                    </div>

                    {/* RIGHT COLUMN: EDUCATION & SKILLS */}
                    <div className="space-y-24">

                        {/* EDUCATION SECTION */}
                        <div>
                            <motion.h2
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="font-display text-2xl uppercase tracking-widest mb-12 flex items-center gap-4 border-b border-white/10 pb-4"
                            >
                                <GraduationCap className="w-5 h-5 text-secondary-neon" />
                                {t("about.cv.education.title")}
                            </motion.h2>

                            <div className="ml-2 border-l border-white/5 pl-2">
                                {education.map((edu, index) => (
                                    <InteractiveTimelineItem
                                        key={index}
                                        index={index}
                                        year={edu.year}
                                        title={edu.degree}
                                        subtitle={edu.school}
                                        description={edu.description}
                                        icon={GraduationCap}
                                        isLast={index === education.length - 1}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* SKILLS SECTION */}
                        <div>
                            <motion.h2
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="font-display text-2xl uppercase tracking-widest mb-8 flex items-center gap-4 border-b border-white/10 pb-4"
                            >
                                <Terminal className="w-5 h-5 text-primary-neon" />
                                {t("about.cv.skills.title")}
                            </motion.h2>

                            <div className="grid grid-cols-1 gap-6">
                                <SkillCard
                                    delay={0.5}
                                    title={t("about.cv.skills.categories.ai")}
                                    icon={Cpu}
                                    skills={["OpenAI", "Anthropic", "Make", "n8n", "Python", "RAG", "LangChain"]}
                                />
                                <SkillCard
                                    delay={0.6}
                                    title={t("about.cv.skills.categories.dev")}
                                    icon={Code}
                                    skills={["Next.js", "React", "TypeScript", "TailwindCSS", "Node.js", "PostgreSQL", "Supabase"]}
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <Footer />
        </main >
    );
}

// Helper icon component since Settings wasn't imported
function Settings(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.47a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    )
}
