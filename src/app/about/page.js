"use client";
import { motion, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Briefcase, GraduationCap, Code, Cpu, Globe, Zap, Terminal, Factory, Calendar } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import AICore from "../../components/AICore";
import { useTranslation } from "../../components/LanguageProvider";
import { useEffect, useRef } from "react";

// ─── Scroll progress bar (full width, fixed at top) ───
const ScrollProgressBar = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[200] pointer-events-none"
            style={{
                scaleX,
                background: "linear-gradient(to right, #00f0ff, #8b5cf6, #3b82f6)",
            }}
        />
    );
};

// ─── Floating particle ───
const FloatingParticle = ({ x, y, size, duration, delay, color }) => (
    <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
            left: `${x}%`,
            top: `${y}%`,
            width: size,
            height: size,
            background:
                color === "cyan"
                    ? "rgba(0,240,255,0.55)"
                    : color === "violet"
                    ? "rgba(168,85,247,0.55)"
                    : "rgba(59,130,246,0.55)",
            boxShadow:
                color === "cyan"
                    ? "0 0 6px rgba(0,240,255,0.6)"
                    : color === "violet"
                    ? "0 0 6px rgba(168,85,247,0.6)"
                    : "0 0 6px rgba(59,130,246,0.6)",
        }}
        animate={{ y: [0, -28, 0], opacity: [0.15, 0.65, 0.15], scale: [1, 1.5, 1] }}
        transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    />
);

const PARTICLES = [
    { x: 8,  y: 18, size: 3,   duration: 7,    delay: 0,   color: "cyan"   },
    { x: 90, y: 12, size: 2,   duration: 9,    delay: 1.5, color: "violet" },
    { x: 55, y: 80, size: 2.5, duration: 8,    delay: 0.8, color: "blue"   },
    { x: 22, y: 55, size: 2,   duration: 11,   delay: 2,   color: "cyan"   },
    { x: 75, y: 40, size: 3,   duration: 6.5,  delay: 1,   color: "violet" },
    { x: 40, y: 88, size: 2,   duration: 10,   delay: 3,   color: "cyan"   },
    { x: 65, y: 22, size: 2.5, duration: 8.5,  delay: 0.5, color: "blue"   },
    { x: 14, y: 70, size: 2,   duration: 9.5,  delay: 2.5, color: "violet" },
    { x: 83, y: 62, size: 3,   duration: 7.5,  delay: 1.8, color: "cyan"   },
    { x: 33, y: 30, size: 2,   duration: 12,   delay: 0.3, color: "blue"   },
    { x: 50, y: 48, size: 1.5, duration: 14,   delay: 4,   color: "violet" },
    { x: 95, y: 75, size: 2,   duration: 8,    delay: 1.2, color: "cyan"   },
];

// ─── AnimatedWord ───
const AnimatedWord = ({ children, delay = 0 }) => (
    <motion.span
        className="inline-block"
        variants={{
            hidden: { y: "105%", opacity: 0, filter: "blur(6px)" },
            visible: {
                y: 0, opacity: 1, filter: "blur(0px)",
                transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
            },
        }}
    >
        {children}
    </motion.span>
);

// ─── Section label (animated line + text) ───
const SectionLabel = ({ color = "cyan", children }) => (
    <div className="flex items-center gap-3 mb-3">
        <motion.div
            className={`h-[1px] ${color === "cyan" ? "bg-primary-neon" : "bg-purple-500"}`}
            initial={{ width: 0 }}
            whileInView={{ width: 40 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
        />
        <motion.span
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className={`font-mono text-xs tracking-[0.4em] uppercase ${color === "cyan" ? "text-primary-neon" : "text-purple-400"}`}
        >
            {children}
        </motion.span>
    </div>
);

// ─── Section title ───
const SectionTitle = ({ children }) => (
    <motion.h2
        initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="font-display font-bold text-4xl md:text-5xl uppercase text-foreground leading-none"
    >
        {children}
    </motion.h2>
);

// ─── Sidebar Identity Card ───
const SidebarIdentityCard = ({ t }) => (
    <aside className="hidden lg:flex flex-col sticky top-0 h-screen w-[35%] max-w-[420px] flex-shrink-0 border-r border-white/5 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
            <div
                className="absolute inset-0 bg-grid-pattern bg-[length:40px_40px] opacity-[0.08]"
                style={{
                    maskImage: "radial-gradient(ellipse at 50% 50%, black 0%, transparent 75%)",
                    WebkitMaskImage: "radial-gradient(ellipse at 50% 50%, black 0%, transparent 75%)",
                }}
            />
            <motion.div
                className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-purple-500/15 rounded-full blur-[100px]"
                animate={{ scale: [1, 1.2, 1], opacity: [0.25, 0.45, 0.25], x: [0, 20, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute bottom-1/4 left-1/3 w-[200px] h-[200px] bg-primary-neon/10 rounded-full blur-[80px]"
                animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.3, 0.15], x: [0, -15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full px-8 gap-7">
            {/* Profile photo */}
            <div className="relative w-36 h-36 flex-shrink-0">
                <motion.div
                    className="absolute inset-0 rounded-full border-2 border-primary-neon/50"
                    animate={{ scale: [1, 1.08, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute -inset-2 rounded-full border border-dashed border-purple-500/30"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                    className="absolute -inset-4 rounded-full border border-white/[0.05]"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                />
                <motion.div 
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="absolute inset-3 rounded-full overflow-hidden bg-black z-10"
                >
                    <img
                        src="/romain-profile.jpg"
                        alt="Romain Kantzer"
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    />
                </motion.div>
                <div className="absolute bottom-2 right-0 bg-black border border-primary-neon p-1.5 rounded z-20">
                    <Terminal className="w-3 h-3 text-primary-neon" />
                </div>
            </div>

            {/* Name + title */}
            <div className="text-center">
                <h2 className="font-display font-bold text-2xl uppercase tracking-wide text-white">Romain Kantzer</h2>
                <p className="font-mono text-xs text-primary-neon tracking-[0.25em] uppercase mt-1">{t("about.titleHighlight2")}</p>
            </div>

            {/* Quote */}
            <div className="border-l-2 border-purple-500/50 pl-4 text-left max-w-[220px]">
                <p className="font-mono text-[11px] text-gray-400 italic leading-relaxed">
                    &ldquo;{t("about.story.highlight")}&rdquo;
                </p>
            </div>

            {/* Terminal badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/[0.03] border border-white/10 rounded font-mono text-[10px] text-gray-500 uppercase">
                <Terminal className="w-3 h-3 text-primary-neon" />
                <span>romain@kantzer.ai:~$</span>
                <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity, ease: "steps(1)" }}
                >_</motion.span>
            </div>

            {/* Social links */}
            <div className="flex gap-5">
                <motion.a 
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    href="https://github.com/romainkantzer" target="_blank" rel="noopener noreferrer"
                    className="text-gray-500 hover:text-primary-neon transition-colors duration-200">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                </motion.a>
                <motion.a 
                    whileHover={{ scale: 1.2, rotate: -5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    href="https://www.linkedin.com/in/romain-kantzer" target="_blank" rel="noopener noreferrer"
                    className="text-gray-500 hover:text-primary-neon transition-colors duration-200">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                </motion.a>
            </div>

            <div className="absolute bottom-6 w-full px-8">
                <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-3" />
                <p className="text-center font-mono text-[9px] text-gray-600 uppercase tracking-[0.3em]">scroll to explore</p>
            </div>
        </div>
    </aside>
);

// ─── Mobile Top Bar ───
const MobileTopBar = ({ t }) => (
    <div className="flex lg:hidden items-center gap-4 px-6 py-4 border-b border-white/5 bg-background/80 backdrop-blur-md sticky top-16 z-30">
        <div className="w-10 h-10 rounded-full overflow-hidden border border-primary-neon/40 flex-shrink-0">
            <img src="/romain-profile.jpg" alt="Romain Kantzer" className="w-full h-full object-cover grayscale" />
        </div>
        <div>
            <p className="font-display text-sm font-bold uppercase text-white tracking-wide">Romain Kantzer</p>
            <p className="font-mono text-[10px] text-primary-neon tracking-widest uppercase">{t("about.titleHighlight2")}</p>
        </div>
    </div>
);

// ─── Diamond Timeline Node ───
const DiamondNode = ({ color = "cyan", index }) => (
    <div className="absolute left-0 top-5 z-10 -translate-x-[9px] rotate-45">
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
            className={`w-[18px] h-[18px] border ${
                color === "cyan"
                    ? "border-primary-neon/70 bg-black shadow-[0_0_14px_rgba(0,240,255,0.5)]"
                    : "border-purple-500/70 bg-black shadow-[0_0_14px_rgba(168,85,247,0.5)]"
            }`}
        >
            <motion.div
                animate={{ opacity: [0.3, 0.9, 0.3], scale: [1, 1.6, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
                className={`absolute inset-0 blur-sm ${color === "cyan" ? "bg-primary-neon/30" : "bg-purple-500/30"}`}
            />
        </motion.div>
    </div>
);

// ─── Continuous pipeline ───
const Pipeline = ({ color = "cyan" }) => (
    <div className="absolute left-0 top-0 bottom-0 w-[2px] z-0 pointer-events-none">
        <div className="w-full h-full border-l border-dashed border-white/[0.07]" />
        <div className="absolute inset-0 overflow-hidden">
            <motion.div
                initial={{ top: "-25%" }}
                animate={{ top: "125%" }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                className={`absolute left-1/2 -translate-x-1/2 w-[6px] h-[180px] bg-gradient-to-b from-transparent ${
                    color === "cyan" ? "via-primary-neon" : "via-purple-500"
                } to-transparent blur-md opacity-70`}
            />
        </div>
    </div>
);

// ─── Timeline Item — zoom + 3D rotate + blur on scroll entry ───
const TimelineItem = ({ year, title, subtitle, description, type = "experience", icon: Icon, index }) => {
    const isCyan = type === "experience";
    return (
        <motion.div
            initial={{ opacity: 0, y: 70, scale: 0.88, rotateX: 14, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.75, delay: index * 0.13, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformPerspective: 1200 }}
            className="relative pl-8 pb-10 last:pb-0 group"
        >
            <DiamondNode color={isCyan ? "cyan" : "violet"} index={index} />

            {/* Card with 3D hover */}
            <motion.div
                whileHover={{ rotateX: -4, rotateY: 5, scale: 1.02, y: -3 }}
                transition={{ type: "spring", stiffness: 280, damping: 18 }}
                style={{ transformPerspective: 900, transformStyle: "preserve-3d" }}
                className={`relative backdrop-blur-md bg-white/[0.03] border rounded-xl p-5 cursor-default transition-all duration-300 ${
                    isCyan
                        ? "border-primary-neon/20 hover:border-primary-neon/55 hover:shadow-[0_0_30px_rgba(0,240,255,0.10)]"
                        : "border-purple-500/20 hover:border-purple-500/55 hover:shadow-[0_0_30px_rgba(168,85,247,0.10)]"
                }`}
            >
                {/* Year chip */}
                <div className="flex items-center gap-3 mb-3">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono border tracking-wider uppercase shrink-0 ${
                        isCyan
                            ? "bg-primary-neon/10 border-primary-neon/20 text-primary-neon"
                            : "bg-purple-500/10 border-purple-500/20 text-purple-400"
                    }`}>
                        <Calendar className="w-3 h-3" />
                        {year}
                    </span>
                    <div className="group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300 ease-out">
                        {Icon && <Icon className={`w-4 h-4 text-muted-foreground shrink-0 transition-colors duration-300 ${isCyan ? 'group-hover:text-primary-neon' : 'group-hover:text-purple-400'}`} />}
                    </div>
                </div>

                <h3 className="font-display font-bold text-lg text-white mb-1 leading-tight">{title}</h3>
                <div className="flex items-center gap-2 mb-3">
                    <span className={`w-2 h-[1px] ${isCyan ? "bg-primary-neon" : "bg-purple-400"}`} />
                    <span className="font-mono text-[11px] text-gray-500 uppercase tracking-widest">{subtitle}</span>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed font-light">{description}</p>

                {/* Hover gradient overlay */}
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-br to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
                    isCyan ? "from-primary-neon/[0.05]" : "from-purple-500/[0.05]"
                }`} />

                {/* Animated bottom shimmer line on scroll-in */}
                <motion.div
                    className={`absolute bottom-0 left-0 h-[1px] rounded-full ${isCyan ? "bg-gradient-to-r from-primary-neon/80 to-transparent" : "bg-gradient-to-r from-purple-500/80 to-transparent"}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: "40%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: index * 0.13 + 0.5, ease: "easeOut" }}
                />
            </motion.div>
        </motion.div>
    );
};

// ─── Skill tag with spring bounce-in ───
const SkillTag = ({ skill, index, accentColor, cardIndex }) => (
    <motion.span
        initial={{ opacity: 0, scale: 0.65, y: 12 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 380, damping: 18, delay: cardIndex * 0.15 + index * 0.045 }}
        whileHover={{
            y: -3, scale: 1.09,
            boxShadow: accentColor === "cyan" ? "0 0 18px rgba(0,240,255,0.5)" : "0 0 18px rgba(168,85,247,0.5)",
        }}
        className={`px-3 py-1 bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-gray-400 uppercase tracking-wider rounded cursor-default transition-colors duration-200 hover:text-white hover:bg-white/[0.07] ${
            accentColor === "cyan" ? "hover:border-primary-neon/45" : "hover:border-purple-500/45"
        }`}
    >
        {skill}
    </motion.span>
);

// ─── Skill Card — slides in from alternate sides ───
const SkillCard = ({ title, icon: Icon, skills, delay, accentColor = "cyan", showAICore = false, cardIndex = 0 }) => (
    <motion.div
        initial={{ opacity: 0, x: cardIndex % 2 === 0 ? -50 : 50, scale: 0.93 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
        className="relative group"
    >
        {/* Ambient glow behind card */}
        <div className={`absolute -inset-1 rounded-2xl blur-xl opacity-0 group-hover:opacity-55 transition-opacity duration-700 bg-gradient-to-br to-transparent ${
            accentColor === "cyan" ? "from-primary-neon/20" : "from-purple-500/20"
        }`} />

        <div className="relative bg-white/[0.02] border border-white/10 rounded-xl p-6 hover:border-white/20 transition-colors duration-300 overflow-hidden">
            {showAICore && (
                <div className="absolute -top-4 -right-4 opacity-25 pointer-events-none z-0">
                    <AICore size="landing" />
                </div>
            )}

            {/* Animated top border that draws in on scroll */}
            <motion.div
                className={`absolute top-0 left-0 h-[2px] rounded-t-xl ${
                    accentColor === "cyan"
                        ? "bg-gradient-to-r from-primary-neon/0 via-primary-neon to-primary-neon/0"
                        : "bg-gradient-to-r from-purple-500/0 via-purple-500 to-purple-500/0"
                }`}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                style={{ transformOrigin: cardIndex % 2 === 0 ? "left" : "right" }}
                transition={{ duration: 0.9, delay: delay + 0.3, ease: "easeOut" }}
            />

            {/* Header with icon that rotates on hover */}
            <div className="relative z-10 flex items-center gap-3 mb-5">
                <motion.div
                    whileHover={{ scale: 1.12, rotate: 8 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                        accentColor === "cyan"
                            ? "bg-primary-neon/10 border border-primary-neon/20"
                            : "bg-purple-500/10 border border-purple-500/20"
                    }`}
                >
                    <Icon className={`w-5 h-5 ${accentColor === "cyan" ? "text-primary-neon" : "text-purple-400"}`} />
                </motion.div>
                <h4 className="font-display font-bold text-base uppercase tracking-wide text-white">{title}</h4>
            </div>

            {/* Tags with stagger */}
            <div className="relative z-10 flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                    <SkillTag key={skill} skill={skill} index={i} accentColor={accentColor} cardIndex={cardIndex} />
                ))}
            </div>
        </div>
    </motion.div>
);

// ─── Main Page ───
export default function AboutPage() {
    const { t } = useTranslation();

    // Mouse aurora follower
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { damping: 25, stiffness: 700 });
    const springY = useSpring(mouseY, { damping: 25, stiffness: 700 });

    useEffect(() => {
        const handleMouseMove = (e) => { mouseX.set(e.pageX); mouseY.set(e.pageY); };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    // Hero parallax (tracks the hero section exiting the viewport)
    const heroRef = useRef(null);
    const { scrollYProgress: heroProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    });
    // 4 layers at different speeds — creates depth
    const bgLayerY    = useTransform(heroProgress, [0, 1], [0, -60]);   // deepest, barely moves
    const blobLayerY  = useTransform(heroProgress, [0, 1], [0, -130]);  // mid
    const ptLayerY    = useTransform(heroProgress, [0, 1], [0, -200]);  // particles, close
    const titleY      = useTransform(heroProgress, [0, 1], [0, -90]);   // text
    const aiCoreY     = useTransform(heroProgress, [0, 1], [0, -220]);  // AICore, closest
    const heroOpacity = useTransform(heroProgress, [0.55, 0.9], [1, 0]);

    const getList = (key) => { const items = t(key); return Array.isArray(items) ? items : []; };
    const experiences = getList("about.cv.experience.items");
    const education   = getList("about.cv.education.items");

    return (
        <main className="bg-background min-h-screen selection:bg-primary-neon/30 selection:text-white">
            <ScrollProgressBar />
            <Navbar />

            <div className="flex flex-col lg:flex-row pt-[72px]">
                <SidebarIdentityCard t={t} />
                <MobileTopBar t={t} />

                <div className="flex-1 min-w-0 overflow-x-hidden">

                    {/* ══════════ HERO ══════════ */}
                    <section ref={heroRef} className="relative min-h-screen flex flex-col justify-center px-8 md:px-12 py-24">

                        {/* Layer 0 — Grid, slowest */}
                        <motion.div className="absolute inset-0 z-0 pointer-events-none" style={{ y: bgLayerY }}>
                            <div
                                className="absolute inset-0 bg-grid-pattern bg-[length:50px_50px] opacity-[0.09]"
                                style={{
                                    maskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
                                    WebkitMaskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
                                }}
                            />
                        </motion.div>

                        {/* Layer 1 — Blobs, medium */}
                        <motion.div className="absolute inset-0 z-0 pointer-events-none" style={{ y: blobLayerY }}>
                            <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-secondary/12 rounded-full blur-[130px]" />
                            <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[80px]" />
                        </motion.div>

                        {/* Layer 2 — Particles & Floating Icons, fast */}
                        <motion.div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" style={{ y: ptLayerY }}>
                            {PARTICLES.map((p, i) => <FloatingParticle key={i} {...p} />)}
                            
                            {/* Floating Lucide Icons */}
                            <motion.div
                                className="absolute left-[20%] top-[30%] text-primary-neon/20 hidden md:block"
                                animate={{ y: [0, -30, 0], rotate: [0, 20, 0], scale: [1, 1.1, 1] }}
                                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <Code className="w-12 h-12" />
                            </motion.div>
                            <motion.div
                                className="absolute right-[25%] top-[60%] text-purple-500/20 hidden lg:block"
                                animate={{ y: [0, 40, 0], rotate: [0, -15, 0], scale: [1, 1.2, 1] }}
                                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            >
                                <Cpu className="w-16 h-16" />
                            </motion.div>
                            <motion.div
                                className="absolute left-[40%] top-[80%] text-blue-500/20 hidden md:block"
                                animate={{ y: [0, -20, 0], rotate: [0, 30, 0] }}
                                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                            >
                                <Zap className="w-10 h-10" />
                            </motion.div>
                        </motion.div>

                        {/* Mouse aurora */}
                        <motion.div
                            className="absolute z-0 w-[450px] h-[450px] bg-secondary/12 rounded-full blur-[120px] pointer-events-none mix-blend-screen"
                            style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
                        />

                        {/* Layer 3 — Title (fades out + moves up as hero exits) */}
                        <motion.div
                            style={{ y: titleY, opacity: heroOpacity }}
                            className="relative z-10 max-w-2xl"
                            initial="hidden"
                            animate="visible"
                            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }}
                        >
                            {/* L1: outline */}
                            <div className="overflow-hidden">
                                <AnimatedWord>
                                    <span
                                        className="block font-display font-bold text-5xl md:text-7xl uppercase leading-[0.9] tracking-tighter"
                                        style={{ WebkitTextStroke: "1px var(--text-stroke-color)", color: "transparent" }}
                                    >
                                        {t("about.title")}
                                    </span>
                                </AnimatedWord>
                            </div>

                            {/* L2: muted */}
                            <div className="overflow-hidden mt-1">
                                <AnimatedWord delay={0.1}>
                                    <span className="block font-display font-light text-4xl md:text-6xl uppercase leading-[0.9] tracking-tighter text-white/30">
                                        {t("about.titleMiddle")}
                                    </span>
                                </AnimatedWord>
                            </div>

                            {/* L3: blue glow — glow div outside overflow-hidden */}
                            <div className="relative mt-1">
                                <div className="absolute -inset-4 bg-blue-500/20 blur-3xl opacity-50 animate-pulse-slow pointer-events-none" />
                                <div className="overflow-hidden">
                                    <AnimatedWord delay={0.2}>
                                        <span className="block font-display font-bold text-5xl md:text-7xl uppercase leading-[0.9] tracking-tighter text-blue-500 drop-shadow-[0_0_25px_rgba(59,130,246,0.6)]">
                                            {t("about.titleHighlight2")}
                                        </span>
                                    </AnimatedWord>
                                </div>
                            </div>
                        </motion.div>

                        {/* Story text */}
                        <motion.p
                            className="relative z-10 mt-10 max-w-xl font-mono text-sm text-gray-400 leading-relaxed"
                            initial={{ opacity: 0, y: 35, filter: "blur(5px)" }}
                            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        >
                            {t("about.story.text")}
                        </motion.p>

                        {/* Scroll hint */}
                        <motion.div
                            className="relative z-10 mt-14 flex items-center gap-3"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            transition={{ delay: 1.6 }}
                        >
                            <div className="h-[1px] w-8 bg-primary-neon" />
                            <span className="font-mono text-[10px] text-primary-neon tracking-[0.4em] uppercase">{t("about.cv.button")}</span>
                            <ArrowDown className="w-3 h-3 text-primary-neon animate-bounce" />
                        </motion.div>

                        {/* Layer 4 — AICore, closest (moves most) */}
                        <motion.div
                            style={{ y: aiCoreY }}
                            className="absolute right-8 top-1/2 -translate-y-1/2 z-10 hidden xl:block"
                            initial={{ opacity: 0, x: 55, scale: 0.75 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            transition={{ delay: 0.9, duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <AICore size="default" />
                        </motion.div>
                    </section>

                    {/* ══════════ TIMELINE ══════════ */}
                    <section id="cv" className="relative px-8 md:px-12 py-24">
                        {/* Ambient background blob */}
                        <div className="absolute inset-0 pointer-events-none overflow-hidden">
                            <motion.div
                                className="absolute top-0 right-0 w-[450px] h-[450px] bg-purple-500/[0.05] rounded-full blur-[110px]"
                                animate={{ scale: [1, 1.35, 1], x: [0, 40, 0], y: [0, 30, 0] }}
                                transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </div>

                        {/* Header */}
                        <motion.div className="mb-16" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                            <SectionLabel color="violet">// mon parcours</SectionLabel>
                            <SectionTitle>
                                {t("about.cv.title")}{" "}
                                <span className="text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.22)" }}>
                                    Log
                                </span>
                            </SectionTitle>
                        </motion.div>

                        {/* Experience */}
                        <div className="mb-16">
                            <motion.h3
                                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }} transition={{ duration: 0.55 }}
                                className="font-display text-xl uppercase tracking-widest mb-10 flex items-center gap-3 border-b border-primary-neon/10 pb-3"
                            >
                                <Briefcase className="w-4 h-4 text-primary-neon" />
                                {t("about.cv.experience.title")}
                            </motion.h3>
                            <div className="relative pl-5">
                                <Pipeline color="cyan" />
                                {experiences.map((exp, i) => (
                                    <TimelineItem key={i} index={i} type="experience"
                                        year={exp.year} title={exp.role} subtitle={exp.company} description={exp.description}
                                        icon={i === 0 ? Cpu : i === 1 ? Factory : i === 2 ? Globe : Zap}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Education */}
                        <div>
                            <motion.h3
                                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }} transition={{ duration: 0.55 }}
                                className="font-display text-xl uppercase tracking-widest mb-10 flex items-center gap-3 border-b border-purple-500/10 pb-3"
                            >
                                <GraduationCap className="w-4 h-4 text-purple-400" />
                                {t("about.cv.education.title")}
                            </motion.h3>
                            <div className="relative pl-5">
                                <Pipeline color="violet" />
                                {education.map((edu, i) => (
                                    <TimelineItem key={i} index={i} type="education"
                                        year={edu.year} title={edu.degree} subtitle={edu.school} description={edu.description}
                                        icon={GraduationCap}
                                    />
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* ══════════ SKILLS ══════════ */}
                    <section className="relative px-8 md:px-12 py-16 pb-28">
                        {/* Moving ambient blob */}
                        <div className="absolute inset-0 pointer-events-none overflow-hidden">
                            <motion.div
                                className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary-neon/[0.04] rounded-full blur-[130px]"
                                animate={{ x: [0, 70, 0], y: [0, -50, 0] }}
                                transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </div>

                        <motion.div className="mb-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                            <SectionLabel color="cyan">// stack & outils</SectionLabel>
                            <SectionTitle>{t("about.cv.skills.title")}</SectionTitle>
                        </motion.div>

                        {/* Stats with spring pop-in */}
                        <motion.div
                            className="mb-10 flex items-center gap-4 font-mono flex-wrap"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.15 }}
                        >
                            <motion.span
                                className="text-3xl font-display font-bold text-white"
                                initial={{ opacity: 0, scale: 0.4 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ type: "spring", stiffness: 320, damping: 14, delay: 0.2 }}
                            >7</motion.span>
                            <span className="text-xs uppercase tracking-widest text-gray-500">{t("about.cv.skills.yearsLabel")}</span>
                            <span className="w-8 h-[1px] bg-white/10" />
                            <motion.span
                                className="text-3xl font-display font-bold text-primary-neon"
                                initial={{ opacity: 0, scale: 0.4 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ type: "spring", stiffness: 320, damping: 14, delay: 0.35 }}
                            >2</motion.span>
                            <span className="text-xs uppercase tracking-widest text-gray-500">{t("about.cv.skills.domainsLabel")}</span>
                        </motion.div>

                        <div className="space-y-5">
                            <SkillCard
                                delay={0.1} cardIndex={0}
                                title={t("about.cv.skills.categories.ai")} icon={Cpu}
                                accentColor="cyan" showAICore={true}
                                skills={["OpenAI", "Anthropic", "Make", "n8n", "Python", "RAG", "LangChain"]}
                            />
                            <SkillCard
                                delay={0.2} cardIndex={1}
                                title={t("about.cv.skills.categories.dev")} icon={Code}
                                accentColor="violet"
                                skills={["Next.js", "React", "TypeScript", "TailwindCSS", "Node.js", "PostgreSQL", "Supabase"]}
                            />
                        </div>
                    </section>
                </div>
            </div>

            <Footer />
        </main>
    );
}
