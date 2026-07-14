"use client";
import { motion } from "framer-motion";
import MagneticCTA from "./MagneticCTA";

export default function FinalCta({ cta }) {
    if (!cta) return null;

    return (
        <section className="relative overflow-hidden bg-background px-6 py-16 md:py-24">
            {/* Background glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[160px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="container relative z-10 mx-auto max-w-3xl text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="font-display text-2xl md:text-3xl leading-[1.05] text-foreground"
                >
                    {cta.title}{" "}
                    <span className="text-primary">
                        {cta.titleHighlight}
                    </span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="mx-auto mt-5 max-w-xl text-sm text-muted-foreground md:text-lg"
                >
                    {cta.subtitle}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-10 md:mt-12"
                >
                    <MagneticCTA href="/contact">{cta.button}</MagneticCTA>
                </motion.div>
            </div>
        </section>
    );
}
