"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "../LanguageProvider";
import AnimatedTitle from "../motion/AnimatedTitle";
import Label from "../ui/Label";
import { container } from "../ui/Section";
import { Emphasis } from "../ui/SectionTitle";

// Étapes d'un projet. Desktop : section épinglée dont les cartes défilent à l'horizontale
// au rythme du scroll vertical. Mobile : cartes empilées.
export default function ProcessScroller({ tone }) {
    const { t, tl } = useTranslation();
    const steps = tl("process.steps");
    const sectionRef = useRef(null);
    const trackRef = useRef(null);
    const [distance, setDistance] = useState(0);
    const distanceValue = useMotionValue(0);
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
    const x = useTransform(() => -scrollYProgress.get() * distanceValue.get());

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;
        const desktop = window.matchMedia("(min-width: 1024px)");
        const measure = () => {
            const next = desktop.matches ? Math.max(0, track.scrollWidth - window.innerWidth) : 0;
            distanceValue.set(next);
            setDistance(next);
        };
        measure();
        const observer = new ResizeObserver(measure);
        observer.observe(track);
        desktop.addEventListener("change", measure);
        window.addEventListener("resize", measure);
        return () => {
            observer.disconnect();
            desktop.removeEventListener("change", measure);
            window.removeEventListener("resize", measure);
        };
    }, [distanceValue, steps.length]);

    const toneClass = tone === "invert" ? "tone-invert bg-background text-foreground" : "";

    return (
        <section
            ref={sectionRef}
            className={`relative ${toneClass}`}
            style={distance ? { height: `calc(100vh + ${distance}px)` } : undefined}
        >
            <div className="py-24 md:py-32 lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:overflow-hidden lg:py-0">
                <div className={container}>
                    <div className="flex flex-wrap items-end justify-between gap-6">
                        <div>
                            <Label>{t("process.label")}</Label>
                            <AnimatedTitle text={t("process.title")} className="mt-6 max-w-3xl" />
                        </div>
                        <p className="max-w-sm leading-relaxed text-muted-foreground">{t("process.intro")}</p>
                    </div>
                </div>

                <motion.ol
                    ref={trackRef}
                    style={{ x }}
                    className="mt-12 flex flex-col gap-4 px-5 md:px-10 lg:mt-14 lg:w-max lg:flex-row lg:gap-6 lg:pl-[max(2.5rem,calc((100vw-1600px)/2+2.5rem))] lg:pr-[12vw]"
                >
                    {steps.map((step, index) => (
                        <li
                            key={step.title}
                            className="flex min-h-[19rem] flex-col justify-between gap-10 rounded-3xl border border-border bg-card p-7 md:p-10 lg:h-[54vh] lg:w-[min(36rem,40vw)]"
                        >
                            <div className="flex items-start justify-between gap-6">
                                <span className="text-sm tabular-nums text-secondary-neon">({String(index + 1).padStart(2, "0")})</span>
                                <span
                                    aria-hidden="true"
                                    className="text-[5rem] font-light leading-[0.8] tracking-[-0.06em] text-foreground/10 md:text-[8rem]"
                                >
                                    {String(index + 1).padStart(2, "0")}
                                </span>
                            </div>
                            <div>
                                <h3 className="text-3xl tracking-[-0.03em] md:text-5xl">
                                    <Emphasis text={step.title} />
                                </h3>
                                <p className="mt-4 max-w-md leading-relaxed text-muted-foreground md:text-lg">{step.text}</p>
                            </div>
                        </li>
                    ))}
                </motion.ol>

                <div className={`${container} mt-10 hidden lg:block`}>
                    <div className="h-px w-full bg-border">
                        <motion.div className="h-full origin-left bg-primary" style={{ scaleX: scrollYProgress }} />
                    </div>
                </div>
            </div>
        </section>
    );
}
