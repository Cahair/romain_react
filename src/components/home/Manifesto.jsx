"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionTemplate, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "../LanguageProvider";
import ScrollWords from "../motion/ScrollWords";
import Button from "../ui/Button";
import Label, { LabelRule } from "../ui/Label";
import { container } from "../ui/Section";

// Section inversée qui s'élargit en entrant dans l'écran (clip-path), texte qui s'allume
// au scroll, portrait en parallaxe et repères factuels.
export default function Manifesto() {
    const { t, tl } = useTranslation();
    const sectionRef = useRef(null);
    const imageRef = useRef(null);
    const reduceMotion = useReducedMotion();

    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "start 0.15"] });
    const inset = useTransform(scrollYProgress, [0, 1], [reduceMotion ? 0 : 5, 0]);
    const radius = useTransform(scrollYProgress, [0, 1], [reduceMotion ? 0 : 56, 0]);
    const clipPath = useMotionTemplate`inset(0% ${inset}% 0% ${inset}% round ${radius}px)`;

    const { scrollYProgress: imageProgress } = useScroll({ target: imageRef, offset: ["start end", "end start"] });
    const imageY = useTransform(imageProgress, [0, 1], ["-9%", "9%"]);

    const facts = tl("home.about.facts");

    return (
        <motion.section
            ref={sectionRef}
            style={{ clipPath }}
            className="tone-invert relative bg-background py-24 text-foreground md:py-40"
        >
            <div className={container}>
                <div className="grid gap-10 lg:grid-cols-12">
                    <div className="lg:col-span-3">
                        <Label>{t("home.about.label")}</Label>
                    </div>
                    <div className="lg:col-span-9">
                        <ScrollWords
                            text={t("home.about.text")}
                            className="text-[clamp(1.7rem,3.4vw,3.4rem)] leading-[1.15] tracking-[-0.025em]"
                        />
                        <Button href="/about" variant="ghost" size="lg" className="mt-12">
                            {t("home.about.cta")}
                            <ArrowRight className="size-4" aria-hidden="true" />
                        </Button>
                    </div>
                </div>

                <div className="mt-20 grid items-end gap-10 md:mt-32 md:grid-cols-12">
                    <div ref={imageRef} className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted md:col-span-5 lg:col-span-4">
                        <motion.div className="absolute inset-x-0 -inset-y-[10%]" style={{ y: imageY }}>
                            <Image
                                src="/romain-kantzer.jpg"
                                alt={t("home.about.imageAlt")}
                                fill
                                sizes="(min-width: 1024px) 30vw, (min-width: 768px) 40vw, 100vw"
                                className="object-cover"
                            />
                        </motion.div>
                    </div>
                    <dl className="md:col-span-7 md:col-start-6 lg:col-span-6 lg:col-start-7">
                        {facts.map((fact) => (
                            <div
                                key={fact.label}
                                className="grid grid-cols-[7.5rem_1fr] gap-4 border-t border-border py-5 md:grid-cols-[11rem_1fr] md:py-6"
                            >
                                <dt className="text-sm text-muted-foreground">{fact.label}</dt>
                                <dd className="text-lg tracking-tight md:text-xl">{fact.value}</dd>
                            </div>
                        ))}
                    </dl>
                </div>

                <LabelRule className="mt-20 md:mt-28" left="Romain Kantzer" center={t("home.about.ruleCenter")} right="Bas-Rhin" />
            </div>
        </motion.section>
    );
}
