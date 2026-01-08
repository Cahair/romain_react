"use client";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowDown, Briefcase, GraduationCap, Code, Cpu, Globe, Zap, Database, Terminal, Factory } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTranslation } from "@/components/LanguageProvider";
import { useEffect, useRef } from "react";

const TimelineItem = ({ year, title, subtitle, description, isLast, icon: Icon }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="relative pl-12 pb-16 last:pb-0 group"
    >
        {/* Timeline Line */}
        {!isLast && (
            <div className="absolute left-[11px] top-8 bottom-0 w-[1px] bg-gradient-to-b from-primary-neon/50 to-transparent" />
        )}

        {/* Timeline Dot */}
        <div className="absolute left-0 top-2 w-6 h-6 rounded-none bg-background border border-primary-neon flex items-center justify-center z-10 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_10px_rgba(0,240,255,0.3)]">
            <div className="w-2 h-2 bg-primary-neon" />
        </div>

        {/* Card Content */}
        <div className="relative backdrop-blur-md bg-white/5 border border-white/10 p-6 rounded-r-lg rounded-bl-lg hover:bg-white/10 hover:border-primary-neon/50 transition-all duration-300">
            <div className="absolute -top-3 -right-3 text-4xl text-white/5 group-hover:text-primary-neon/10 transition-colors font-display font-bold select-none">
                {year}
            </div>

            <div className="flex items-center gap-3 mb-2">
                <span className="font-mono text-xs text-primary-neon tracking-widest uppercase">[{year}]</span>
                {Icon && <Icon className="w-4 h-4 text-muted-foreground group-hover:text-primary-neon transition-colors" />}
            </div>

            <h3 className="font-display font-bold text-2xl text-white mb-1 tracking-wide uppercase">
                {title}
            </h3>
            <div className="text-sm font-mono text-gray-400 mb-4 uppercase tracking-wider">
                // {subtitle}
            </div>
            <p className="text-gray-400 text-sm leading-relaxed font-light">
                {description}
            </p>
        </div>
    </motion.div>
);

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

                            <h1 className="font-display font-bold text-6xl md:text-8xl uppercase leading-[0.85] tracking-tighter text-foreground mb-8">
                                <motion.span
                                    initial={{ filter: "blur(20px)", opacity: 0, scale: 1.1 }}
                                    animate={{ filter: "blur(0px)", opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    className="block"
                                >
                                    {t("about.title")}
                                </motion.span>

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
                            </h1>
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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

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

                        {/* Timeline Items */}
                        <div className="ml-2">
                            {experiences[0] && (
                                <TimelineItem
                                    year={experiences[0].year}
                                    title="Founder & Architect"
                                    subtitle="Kantzer.ai"
                                    description={experiences[0].description}
                                    icon={Cpu}
                                />
                            )}
                            {experiences[1] && (
                                <TimelineItem
                                    year={experiences[1].year}
                                    title="Apprentice Engineer"
                                    subtitle="ERAS"
                                    description={experiences[1].description}
                                    icon={Factory}
                                />
                            )}
                            {experiences[2] && (
                                <TimelineItem
                                    year={experiences[2].year}
                                    title="Freelance Dev"
                                    subtitle="Independent"
                                    description={experiences[2].description}
                                    icon={Globe}
                                />
                            )}
                            {experiences[3] && (
                                <TimelineItem
                                    year={experiences[3].year}
                                    title="Automation Appr."
                                    subtitle="Clemessy"
                                    description={experiences[3].description}
                                    icon={Zap}
                                    isLast={true}
                                />
                            )}
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

                            <div className="ml-2">
                                {education[0] && (
                                    <TimelineItem
                                        year={education[0].year}
                                        title="Industrial Systems"
                                        subtitle="Icam Strasbourg"
                                        description={education[0].description}
                                        icon={GraduationCap}
                                    />
                                )}
                                {education[1] && (
                                    <TimelineItem
                                        year={education[1].year}
                                        title="Automated Systems"
                                        subtitle="IUT Haguenau"
                                        description={education[1].description}
                                        icon={Settings}
                                        isLast={true}
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
        </main>
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
