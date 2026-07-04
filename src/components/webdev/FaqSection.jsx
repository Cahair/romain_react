"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus } from "lucide-react";

function FaqItem({ item, isOpen, onToggle, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className={`overflow-hidden rounded-2xl border backdrop-blur-md bg-white/[0.02] transition-colors duration-300 ${isOpen ? "border-primary/40" : "border-white/10 hover:border-white/20"}`}
        >
            <button
                type="button"
                onClick={onToggle}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left md:px-8 md:py-6"
            >
                <span className="font-display text-sm font-bold uppercase tracking-wide text-foreground md:text-base">
                    {item.q}
                </span>
                <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className={`shrink-0 transition-colors ${isOpen ? "text-primary-neon" : "text-muted-foreground"}`}
                >
                    <Plus size={20} />
                </motion.span>
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <p className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground md:px-8 md:text-base">
                            {item.a}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default function FaqSection({ faq }) {
    const [openIndex, setOpenIndex] = useState(0);

    if (!faq?.items?.length) return null;

    return (
        <section className="relative overflow-hidden bg-background px-6 py-24 md:py-32">
            {/* Background accent */}
            <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[140px] pointer-events-none" />

            <div className="container relative z-10 mx-auto max-w-3xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12 text-center md:mb-14"
                >
                    <span className="mb-4 block font-mono text-xs uppercase tracking-[0.3em] text-primary-neon md:text-sm">
                        {faq.overline}
                    </span>
                    <h2 className="font-display text-3xl font-bold uppercase tracking-tight md:text-5xl">
                        {faq.title}{" "}
                        <span className="text-primary-neon">{faq.titleHighlight}</span>
                    </h2>
                </motion.div>

                {/* Items */}
                <div className="flex flex-col gap-3 md:gap-4">
                    {faq.items.map((item, i) => (
                        <FaqItem
                            key={i}
                            item={item}
                            index={i}
                            isOpen={openIndex === i}
                            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
