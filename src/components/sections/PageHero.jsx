"use client";

import { motion } from "framer-motion";
import { usePageReady } from "../motion/TransitionProvider";
import AnimatedTitle from "../motion/AnimatedTitle";
import Label from "../ui/Label";
import { container } from "../ui/Section";

const OUT = [0.16, 1, 0.3, 1];

// En-tête standard des pages intérieures : libellé, grand titre révélé, chapeau.
export default function PageHero({ label, title, lead, children, className = "" }) {
    const ready = usePageReady();

    return (
        <section className={`relative pb-16 pt-32 md:pb-24 md:pt-44 ${className}`}>
            <div className={container}>
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={ready ? { opacity: 1, y: 0 } : undefined}
                    transition={{ duration: 0.8, ease: OUT }}
                >
                    <Label>{label}</Label>
                </motion.div>
                <AnimatedTitle as="h1" size="hero" text={title} play={ready} delay={0.1} className="mt-8 max-w-[16ch]" />
                {lead && (
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={ready ? { opacity: 1, y: 0 } : undefined}
                        transition={{ duration: 1, ease: OUT, delay: 0.45 }}
                        className="mt-10 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl"
                    >
                        {lead}
                    </motion.p>
                )}
                {children && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={ready ? { opacity: 1, y: 0 } : undefined}
                        transition={{ duration: 1, ease: OUT, delay: 0.6 }}
                    >
                        {children}
                    </motion.div>
                )}
            </div>
        </section>
    );
}
