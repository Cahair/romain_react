"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "./LanguageProvider";

import ImpactCharts from "./ImpactCharts";

export default function Storytelling() {
    const { t } = useTranslation();
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const xMove = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
    const xMoveReverse = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

    return (
        <section ref={containerRef} className="py-16 md:py-32 relative overflow-hidden bg-background">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary-neon/20 rounded-full blur-[140px] pointer-events-none z-0" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col gap-16 md:gap-24">

                    {/* Part 1: Massive Title */}
                    <div className="relative">
                        <motion.span
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="block font-mono text-primary-neon text-sm tracking-[0.5em] mb-4 uppercase"
                        >
                             // {t("storytelling.badge")}
                        </motion.span>

                        <h2 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl lg:text-8xl leading-[0.9] text-foreground uppercase break-words">
                            <motion.div style={{ x: xMove }} className="whitespace-normal md:whitespace-nowrap">
                                {t("storytelling.title")} <span className="text-transparent stroke-text">{t("storytelling.titleHighlight")}</span>
                            </motion.div>
                            <motion.div style={{ x: xMoveReverse }} className="text-right whitespace-normal md:whitespace-nowrap">
                                {t("storytelling.titleEnd")}
                            </motion.div>
                        </h2>
                    </div>

                    {/* Part 2: Statement - AMPLIFIED */}
                    <div className="relative pt-24 border-t border-border">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-100px" }}
                                variants={{
                                    hidden: {},
                                    visible: {
                                        transition: {
                                            staggerChildren: 0.15
                                        }
                                    }
                                }}
                                className="text-center md:text-left"
                            >
                                {/* Line 1 */}
                                <motion.div
                                    className="overflow-hidden"
                                    variants={{
                                        hidden: { y: "100%", opacity: 0 },
                                        visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
                                    }}
                                >
                                    <p className="font-display font-bold text-3xl sm:text-5xl md:text-7xl lg:text-8xl leading-[0.8] text-foreground uppercase tracking-tighter">
                                        {t("storytelling.subtitle1")}
                                    </p>
                                </motion.div>

                                {/* Highlight Line */}
                                <motion.div
                                    className="relative z-10 py-2"
                                    variants={{
                                        hidden: { scale: 0.9, opacity: 0, filter: "blur(10px)" },
                                        visible: { scale: 1, opacity: 1, filter: "blur(0px)", transition: { duration: 0.8 } }
                                    }}
                                >
                                    <div className="relative inline-block">
                                        <span className="font-display font-bold text-3xl sm:text-5xl md:text-7xl lg:text-8xl leading-[0.8] uppercase tracking-tighter text-blue-500 drop-shadow-[0_0_35px_rgba(59,130,246,0.8)]">
                                            {t("storytelling.subtitleHighlight")}
                                        </span>
                                        {/* Back glow */}
                                        <div className="absolute -inset-4 bg-blue-500/40 blur-3xl opacity-60 -z-10 animate-pulse-slow pointer-events-none" />
                                    </div>
                                </motion.div>

                                {/* Line 3 */}
                                <motion.div
                                    className="overflow-hidden"
                                    variants={{
                                        hidden: { y: "100%", opacity: 0 },
                                        visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
                                    }}
                                >
                                    <p className="font-display font-bold text-3xl sm:text-5xl md:text-7xl lg:text-8xl leading-[0.8] text-foreground uppercase tracking-tighter">
                                        {t("storytelling.subtitle2")}
                                    </p>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ delay: 0.6, duration: 0.8 }}
                                    className="mt-12 md:max-w-xl"
                                >
                                    <p className="font-mono text-lg text-muted-foreground border-l-4 border-primary-neon pl-6 py-2">
                                        {t("storytelling.description")}
                                    </p>
                                </motion.div>
                            </motion.div>

                            {/* Right Column: Animated Charts */}
                            <div className="w-full h-full flex items-center justify-center">
                                <ImpactCharts />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                .stroke-text {
                    -webkit-text-stroke: 1px var(--text-stroke-color);
                }
            `}</style>
        </section>
    );
}
