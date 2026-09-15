"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { useTranslation } from "../LanguageProvider";
import AnimatedTitle from "../motion/AnimatedTitle";
import Reveal from "../motion/Reveal";
import Label from "../ui/Label";
import Section from "../ui/Section";
import { Emphasis } from "../ui/SectionTitle";

// Étapes d'un projet, version verticale : titre collant à gauche, fil de progression à droite.
export default function ProcessList({ tone }) {
    const { t, tl } = useTranslation();
    const steps = tl("process.steps");
    const listRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 0.7", "end 0.6"] });

    return (
        <Section tone={tone}>
            <div className="grid gap-14 lg:grid-cols-12">
                <div className="self-start lg:sticky lg:top-32 lg:col-span-5">
                    <Label>{t("process.label")}</Label>
                    <AnimatedTitle text={t("process.title")} className="mt-6" />
                    <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">{t("process.intro")}</p>
                </div>
                <ol ref={listRef} className="relative lg:col-span-6 lg:col-start-7">
                    <span aria-hidden="true" className="absolute bottom-6 left-[1.1rem] top-2 w-px bg-border">
                        <motion.span className="block h-full w-full origin-top bg-primary" style={{ scaleY: scrollYProgress }} />
                    </span>
                    {steps.map((step, index) => (
                        <Reveal as="li" key={step.title} className="relative pb-14 pl-16 last:pb-0">
                            <span className="absolute left-0 top-0 flex size-9 items-center justify-center rounded-full border border-border bg-background text-xs tabular-nums">
                                {String(index + 1).padStart(2, "0")}
                            </span>
                            <h3 className="text-2xl tracking-[-0.025em] md:text-4xl">
                                <Emphasis text={step.title} />
                            </h3>
                            <p className="mt-3 max-w-lg leading-relaxed text-muted-foreground md:text-lg">{step.text}</p>
                        </Reveal>
                    ))}
                </ol>
            </div>
        </Section>
    );
}
