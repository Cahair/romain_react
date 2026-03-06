"use client";
import { motion } from "framer-motion";

export default function StickyProcess({ process: processData }) {
    return (
        <section className="relative py-24 md:py-32 px-6 bg-background overflow-hidden">
            {/* Background accents */}
            <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto max-w-6xl relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <span className="font-mono text-blue-400 text-xs md:text-sm tracking-[0.3em] uppercase block mb-4">
                        {processData.overline}
                    </span>
                    <h2 className="font-display text-3xl md:text-5xl font-bold uppercase tracking-tight">
                        {processData.title} <span className="text-blue-400">{processData.titleHighlight}</span>
                    </h2>
                </motion.div>

                {/* Sticky Scroll Layout */}
                <div className="flex flex-col md:flex-row gap-12 md:gap-20">
                    {/* Left — Sticky Labels */}
                    <div className="md:w-1/3 md:sticky md:top-32 md:self-start">
                        <div className="hidden md:flex flex-col gap-6">
                            {processData.steps.map((step, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-center gap-4 group"
                                >
                                    <span className="text-4xl md:text-5xl font-display font-bold text-blue-500/20 group-hover:text-blue-400/60 transition-colors">
                                        {step.num}
                                    </span>
                                    <span className="text-lg font-display font-semibold uppercase tracking-wide text-gray-500 group-hover:text-white transition-colors">
                                        {step.title}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right — Scrolling Detail Cards */}
                    <div className="md:w-2/3 flex flex-col gap-8">
                        {processData.steps.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6 }}
                                className="relative backdrop-blur-md bg-white/[0.02] border border-white/10 rounded-2xl p-8 md:p-10 hover:border-blue-500/20 transition-colors group"
                            >
                                {/* Decorative line */}
                                <div className="absolute top-0 left-8 w-12 h-[2px] bg-gradient-to-r from-blue-500 to-transparent" />

                                {/* Step Number — visible on mobile */}
                                <div className="flex items-center gap-4 mb-4 md:hidden">
                                    <span className="text-3xl font-display font-bold text-blue-500/30">
                                        {step.num}
                                    </span>
                                    <span className="text-base font-display font-semibold uppercase tracking-wide text-blue-400">
                                        {step.title}
                                    </span>
                                </div>

                                {/* Title — desktop */}
                                <h3 className="hidden md:block text-xl font-display font-bold uppercase text-white mb-4 group-hover:text-blue-400 transition-colors">
                                    {step.title}
                                </h3>

                                <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                                    {step.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
