"use client";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

// Visual accents alternate between primary (blue) and secondary (indigo)
const accents = [
    {
        badge: "bg-primary/10 border-primary/30 text-primary-neon",
        border: "hover:border-primary/40",
        screen: "from-primary/25 via-primary/10 to-transparent",
        block: "bg-primary/30",
        blockSoft: "bg-primary/15",
        metric: "text-primary-neon",
    },
    {
        badge: "bg-secondary/10 border-secondary/30 text-secondary-neon",
        border: "hover:border-secondary/40",
        screen: "from-secondary/25 via-secondary/10 to-transparent",
        block: "bg-secondary/30",
        blockSoft: "bg-secondary/15",
        metric: "text-secondary-neon",
    },
    {
        badge: "bg-primary/10 border-primary/30 text-primary-neon",
        border: "hover:border-primary/40",
        screen: "from-primary/25 via-primary/10 to-transparent",
        block: "bg-primary/30",
        blockSoft: "bg-primary/15",
        metric: "text-primary-neon",
    },
];

// Abstract UI skeleton — one layout per project type (showcase / e-commerce / app)
function MockupContent({ index, accent }) {
    if (index === 1) {
        // E-commerce: product grid
        return (
            <div className="grid grid-cols-3 gap-2 p-4">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="space-y-1.5">
                        <div className={`aspect-square rounded ${i % 2 === 0 ? accent.block : accent.blockSoft}`} />
                        <div className="h-1.5 w-4/5 rounded-full bg-white/15" />
                        <div className="h-1.5 w-2/5 rounded-full bg-white/25" />
                    </div>
                ))}
            </div>
        );
    }
    if (index === 2) {
        // Web app: sidebar + chart
        return (
            <div className="flex gap-3 p-4 h-full">
                <div className="w-1/4 space-y-2">
                    <div className={`h-2 rounded-full ${accent.block}`} />
                    <div className="h-2 rounded-full bg-white/15" />
                    <div className="h-2 rounded-full bg-white/15" />
                    <div className="h-2 rounded-full bg-white/15" />
                </div>
                <div className="flex-1 flex items-end gap-2 pb-1">
                    {[40, 65, 50, 80, 60, 95].map((h, i) => (
                        <div
                            key={i}
                            className={`flex-1 rounded-t ${i === 5 ? accent.block : accent.blockSoft}`}
                            style={{ height: `${h}%` }}
                        />
                    ))}
                </div>
            </div>
        );
    }
    // Showcase site: hero + text lines + CTA
    return (
        <div className="p-4 space-y-2.5">
            <div className={`h-16 rounded-lg bg-gradient-to-r ${accent.screen} border border-white/10`} />
            <div className="h-2 w-3/4 rounded-full bg-white/25" />
            <div className="h-2 w-1/2 rounded-full bg-white/15" />
            <div className={`h-6 w-24 rounded-full ${accent.block} mt-3`} />
        </div>
    );
}

function CaseCard({ item, index }) {
    const accent = accents[index % accents.length];

    return (
        <motion.article
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.12 }}
            className={`group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 backdrop-blur-md bg-white/[0.02] transition-colors duration-500 ${accent.border}`}
        >
            {/* Browser mockup */}
            <div className="relative m-4 mb-0 overflow-hidden rounded-xl border border-white/10 bg-black/30">
                {/* Chrome bar */}
                <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/[0.04] px-3 py-2">
                    <span className="h-2 w-2 rounded-full bg-white/20" />
                    <span className="h-2 w-2 rounded-full bg-white/20" />
                    <span className="h-2 w-2 rounded-full bg-white/20" />
                    <span className="ml-2 h-3 flex-1 max-w-[60%] rounded-full bg-white/10" />
                </div>
                {/* Screen */}
                <div className={`relative h-40 bg-gradient-to-br ${accent.screen} transition-transform duration-700 group-hover:scale-[1.03]`}>
                    <MockupContent index={index} accent={accent} />
                </div>
            </div>

            {/* Text */}
            <div className="flex flex-1 flex-col p-6 md:p-7">
                <span className={`w-fit rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-widest ${accent.badge}`}>
                    {item.tag}
                </span>
                <h3 className="mt-4 font-display text-lg md:text-xl font-bold uppercase tracking-wide text-foreground">
                    {item.title}
                </h3>
                <p className="mt-2 flex-1 text-xs md:text-sm leading-relaxed text-muted-foreground">
                    {item.desc}
                </p>

                {/* Metrics */}
                <div className="mt-6 grid grid-cols-2 gap-4 border-t border-white/10 pt-5">
                    {item.metrics?.map((metric, i) => (
                        <div key={i}>
                            <div className={`flex items-center gap-1.5 font-display text-xl md:text-2xl font-bold tabular-nums ${accent.metric}`}>
                                {i === 0 && <TrendingUp size={16} className="shrink-0 opacity-70" />}
                                {metric.value}
                            </div>
                            <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                                {metric.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </motion.article>
    );
}

export default function CaseStudies({ caseStudies }) {
    if (!caseStudies?.items?.length) return null;

    return (
        <section className="relative overflow-hidden bg-background px-6 py-24 md:py-32">
            {/* Background accents */}
            <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

            <div className="container relative z-10 mx-auto max-w-6xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-14 text-center md:mb-16"
                >
                    <span className="mb-4 block font-mono text-xs uppercase tracking-[0.3em] text-primary-neon md:text-sm">
                        {caseStudies.overline}
                    </span>
                    <h2 className="font-display text-3xl font-bold uppercase tracking-tight md:text-5xl">
                        {caseStudies.title}{" "}
                        <span className="text-primary-neon">{caseStudies.titleHighlight}</span>
                    </h2>
                    {caseStudies.subtitle && (
                        <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground md:text-base">
                            {caseStudies.subtitle}
                        </p>
                    )}
                </motion.div>

                {/* Cards */}
                <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
                    {caseStudies.items.map((item, i) => (
                        <CaseCard key={i} item={item} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
