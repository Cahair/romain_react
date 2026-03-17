"use client";
import { motion } from "framer-motion";

const steps = [
    {
        icon: (
            /* Target / Compass */
            <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
                <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.3" />
                <circle cx="24" cy="24" r="12" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
                <circle cx="24" cy="24" r="6" stroke="currentColor" strokeWidth="2" />
                <circle cx="24" cy="24" r="2" fill="currentColor" />
                <line x1="24" y1="2" x2="24" y2="10" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
                <line x1="24" y1="38" x2="24" y2="46" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
                <line x1="2" y1="24" x2="10" y2="24" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
                <line x1="38" y1="24" x2="46" y2="24" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
            </svg>
        ),
        gradient: "from-blue-600/20 to-cyan-600/20",
        border: "group-hover:border-blue-500/40",
        iconColor: "text-blue-400",
        accentGlow: "bg-blue-500/20",
        numGradient: "from-blue-400 to-cyan-400",
    },
    {
        icon: (
            /* Pen Tool / Design */
            <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
                <rect x="8" y="8" width="32" height="32" rx="4" stroke="currentColor" strokeWidth="1.5" opacity="0.2" />
                <rect x="14" y="14" width="20" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
                <path d="M20 28l4-12 4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="21" y1="25" x2="27" y2="25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="36" cy="12" r="3" fill="currentColor" opacity="0.3" />
            </svg>
        ),
        gradient: "from-violet-600/20 to-fuchsia-600/20",
        border: "group-hover:border-violet-500/40",
        iconColor: "text-violet-400",
        accentGlow: "bg-violet-500/20",
        numGradient: "from-violet-400 to-fuchsia-400",
    },
    {
        icon: (
            /* Code Brackets */
            <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
                <path d="M16 14l-8 10 8 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M32 14l8 10-8 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="28" y1="10" x2="20" y2="38" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
                <circle cx="12" cy="24" r="1.5" fill="currentColor" opacity="0.3" />
                <circle cx="36" cy="24" r="1.5" fill="currentColor" opacity="0.3" />
            </svg>
        ),
        gradient: "from-cyan-600/20 to-emerald-600/20",
        border: "group-hover:border-cyan-500/40",
        iconColor: "text-cyan-400",
        accentGlow: "bg-cyan-500/20",
        numGradient: "from-cyan-400 to-emerald-400",
    },
    {
        icon: (
            /* Rocket */
            <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
                <path d="M24 6c-4 6-6 14-6 22h12c0-8-2-16-6-22z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                <path d="M18 28l-4 6h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
                <path d="M30 28l4 6h-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
                <circle cx="24" cy="20" r="3" stroke="currentColor" strokeWidth="1.5" />
                <path d="M20 36l4 6 4-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="22" y1="42" x2="22" y2="46" stroke="currentColor" strokeWidth="1" opacity="0.3" />
                <line x1="26" y1="42" x2="26" y2="45" stroke="currentColor" strokeWidth="1" opacity="0.3" />
            </svg>
        ),
        gradient: "from-amber-600/20 to-orange-600/20",
        border: "group-hover:border-amber-500/40",
        iconColor: "text-amber-400",
        accentGlow: "bg-amber-500/20",
        numGradient: "from-amber-400 to-orange-400",
    },
];

function VisualStepCard({ step, visual, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
            className={`group relative rounded-3xl border border-white/10 overflow-hidden transition-all duration-500 ${visual.border}`}
        >
            {/* Background gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${visual.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            <div className="absolute inset-0 backdrop-blur-md bg-white/[0.02]" />

            {/* Hover glow */}
            <div className={`absolute -inset-4 ${visual.accentGlow} rounded-3xl blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none`} />

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-4 md:gap-6 p-5 md:p-7">
                {/* Icon Area */}
                <div className="relative flex-shrink-0">
                    {/* Animated rotating ring */}
                    <motion.div
                        className={`absolute -inset-2 border border-dashed rounded-full opacity-10 ${visual.iconColor}`}
                        style={{ borderColor: "currentColor" }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    />
                    <div className={`w-14 h-14 md:w-16 md:h-16 ${visual.iconColor}`}>
                        {visual.icon}
                    </div>
                </div>

                {/* Text Content */}
                <div className="flex-1 text-center md:text-left">
                    {/* Step Number + Title */}
                    <div className="flex items-center gap-3 mb-2 justify-center md:justify-start">
                        <span className={`text-xs font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r ${visual.numGradient} tracking-wider`}>
                            {step.num}
                        </span>
                        <div className="w-4 h-[1px] bg-white/20" />
                        <h3 className="text-base md:text-lg font-display font-bold uppercase text-white tracking-wide">
                            {step.title}
                        </h3>
                    </div>

                    {/* Description */}
                    <p className="text-gray-400 text-xs md:text-sm leading-relaxed max-w-xl line-clamp-3 md:line-clamp-none">
                        {step.desc}
                    </p>
                </div>

                {/* Large faded number — desktop only */}
                <div className="hidden lg:block flex-shrink-0">
                    <span className={`text-6xl xl:text-7xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-br ${visual.numGradient} opacity-10 select-none leading-none`}>
                        {step.num}
                    </span>
                </div>
            </div>
        </motion.div>
    );
}

export default function ProcessTimeline({ process: processData }) {
    return (
        <section className="relative py-24 md:py-32 px-6 bg-background overflow-hidden flex flex-col justify-center">
            {/* Background accents */}
            <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-violet-500/5 rounded-full blur-[140px] pointer-events-none" />

            <div className="container mx-auto max-w-6xl relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-8 md:mb-12"
                >
                    <span className="font-mono text-blue-400 text-xs md:text-sm tracking-[0.3em] uppercase block mb-3">
                        {processData.overline}
                    </span>
                    <h2 className="font-display text-2xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight">
                        {processData.title}{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                            {processData.titleHighlight}
                        </span>
                    </h2>
                </motion.div>

                {/* Step Cards — 2x2 Grid */}
                <div className="relative">
                    {/* ═══ Sweeping Glow ═══ */}
                    <motion.div
                        className="absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full blur-[100px] md:blur-[140px] pointer-events-none z-0"
                        style={{
                            background: "radial-gradient(circle, rgba(59,130,246,0.35) 0%, rgba(139,92,246,0.25) 50%, transparent 80%)",
                        }}
                        animate={{
                            x: ["-10vw", "50vw", "50vw", "-10vw"],
                            y: ["-10vh", "-5vh", "20vh", "15vh"],
                        }}
                        transition={{
                            duration: 12,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut",
                        }}
                    />

                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                        {processData.steps.map((step, i) => (
                            <VisualStepCard
                                key={i}
                                step={step}
                                visual={steps[i]}
                                index={i}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
