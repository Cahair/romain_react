"use client";
import { motion } from "framer-motion";

// Alternate primary (blue) / secondary (indigo) so the grid stays on-theme
const steps = [
    {
        gradient: "from-primary/20 to-secondary/20",
        border: "group-hover:border-primary/40",
        accentGlow: "bg-primary/20",
        numGradient: "from-primary-neon to-secondary-neon",
    },
    {
        gradient: "from-secondary/20 to-primary/20",
        border: "group-hover:border-secondary/40",
        accentGlow: "bg-secondary/20",
        numGradient: "from-secondary-neon to-primary-neon",
    },
    {
        gradient: "from-primary/20 to-secondary/20",
        border: "group-hover:border-primary/40",
        accentGlow: "bg-primary/20",
        numGradient: "from-primary-neon to-secondary-neon",
    },
    {
        gradient: "from-secondary/20 to-primary/20",
        border: "group-hover:border-secondary/40",
        accentGlow: "bg-secondary/20",
        numGradient: "from-secondary-neon to-primary-neon",
    },
];

function VisualStepCard({ step, visual, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
            className={`group relative rounded-2xl border border-border overflow-hidden transition-all duration-500 ${visual.border}`}
        >
            {/* Background gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${visual.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            <div className="absolute inset-0 bg-card/80" />

            {/* Hover glow */}
            <div className={`absolute -inset-4 ${visual.accentGlow} rounded-3xl blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none`} />

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-4 md:gap-6 p-5 md:p-7">
                {/* Text Content */}
                <div className="flex-1 text-center md:text-left">
                    {/* Step Number + Title */}
                    <div className="flex items-center gap-3 mb-2 justify-center md:justify-start">
                        <span className={`text-xs font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r ${visual.numGradient} tracking-wider`}>
                            {step.num}
                        </span>
                        <div className="w-4 h-[1px] bg-white/20" />
                        <h3 className="text-base md:text-lg font-display font-bold uppercase text-foreground tracking-wide">
                            {step.title}
                        </h3>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground text-xs md:text-sm leading-relaxed max-w-xl line-clamp-3 md:line-clamp-none">
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
        <section className="relative py-16 md:py-24 px-6 bg-background overflow-hidden flex flex-col justify-center">
            {/* Background accents */}
            <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[140px] pointer-events-none" />

            <div className="container mx-auto max-w-6xl relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-8 md:mb-12"
                >
                    <span className="font-mono text-primary-neon text-xs md:text-sm tracking-[0.3em] uppercase block mb-3">
                        {processData.overline}
                    </span>
                    <h2 className="font-display text-2xl md:text-3xl text-foreground">
                        {processData.title}{" "}
                        <span className="text-primary">
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
                            background: "radial-gradient(circle, color-mix(in srgb, var(--primary) 35%, transparent) 0%, color-mix(in srgb, var(--secondary) 25%, transparent) 50%, transparent 80%)",
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
