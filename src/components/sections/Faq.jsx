"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import AnimatedTitle from "../motion/AnimatedTitle";
import Label from "../ui/Label";
import Section from "../ui/Section";

function FaqItem({ item, open, onToggle }) {
    const id = useId();

    return (
        <div className="border-b border-border">
            <h3>
                <button
                    type="button"
                    id={`${id}-button`}
                    onClick={onToggle}
                    aria-expanded={open}
                    aria-controls={`${id}-panel`}
                    className="flex w-full items-start justify-between gap-6 py-6 text-left text-xl tracking-tight transition-colors hover:text-primary md:py-8 md:text-2xl"
                >
                    <span>{item.q}</span>
                    <span
                        className={`mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border border-border transition-all duration-500 ease-expo ${open ? "rotate-45 border-foreground bg-foreground text-background" : ""}`}
                    >
                        <Plus className="size-4" aria-hidden="true" />
                    </span>
                </button>
            </h3>
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        id={`${id}-panel`}
                        role="region"
                        aria-labelledby={`${id}-button`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                        className="overflow-hidden"
                    >
                        <p className="max-w-2xl pb-8 leading-relaxed text-muted-foreground md:text-lg">{item.a}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// Questions fréquentes en accordéon (la première est ouverte).
export default function Faq({ label, title, items = [], tone }) {
    const [open, setOpen] = useState(0);

    return (
        <Section tone={tone}>
            <div className="grid gap-12 lg:grid-cols-12">
                <div className="lg:col-span-4">
                    <Label>{label}</Label>
                    <AnimatedTitle text={title} className="mt-6" />
                </div>
                <div className="border-t border-border lg:col-span-8">
                    {items.map((item, index) => (
                        <FaqItem
                            key={item.q}
                            item={item}
                            open={open === index}
                            onToggle={() => setOpen(open === index ? -1 : index)}
                        />
                    ))}
                </div>
            </div>
        </Section>
    );
}
