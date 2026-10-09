"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionTemplate, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useTranslation } from "../LanguageProvider";
import { usePageReady } from "../motion/TransitionProvider";
import AnimatedTitle from "../motion/AnimatedTitle";
import Button from "../ui/Button";
import Label, { LabelRule } from "../ui/Label";
import { container } from "../ui/Section";
import HeroStage from "./HeroStage";

const EASE = [0.76, 0, 0.24, 1];
const OUT = [0.16, 1, 0.3, 1];

export default function Hero() {
    const { t, tl } = useTranslation();
    const ready = usePageReady();
    const words = tl("home.hero.words");
    // Exemple affiché : le mot du titre et la vue éclatée changent ensemble (minuterie dans HeroStage).
    const [index, setIndex] = useState(0);
    const sectionRef = useRef(null);

    const rawX = useMotionValue(0);
    const rawY = useMotionValue(0);
    const pointerX = useSpring(rawX, { stiffness: 50, damping: 18 });
    const pointerY = useSpring(rawY, { stiffness: 50, damping: 18 });

    // Trame de points qui s'allume autour de la souris.
    const spotX = useMotionValue(-1000);
    const spotY = useMotionValue(-1000);
    const spotMask = useMotionTemplate`radial-gradient(280px circle at ${spotX}px ${spotY}px, black, transparent)`;

    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
    const textY = useTransform(scrollYProgress, [0, 1], [0, 140]);
    const textOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

    useEffect(() => {
        const onMove = (event) => {
            rawX.set(event.clientX / window.innerWidth - 0.5);
            rawY.set(event.clientY / window.innerHeight - 0.5);
            if (event.pointerType !== "mouse" || !sectionRef.current) return;
            const rect = sectionRef.current.getBoundingClientRect();
            spotX.set(event.clientX - rect.left);
            spotY.set(event.clientY - rect.top);
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        return () => window.removeEventListener("pointermove", onMove);
    }, [rawX, rawY, spotX, spotY]);

    const current = words.length ? words[index % words.length] : "";

    return (
        <section ref={sectionRef} className="relative flex min-h-[100svh] flex-col overflow-hidden pb-8 pt-24 md:pt-28">
            <div
                aria-hidden="true"
                className="dot-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_60%_55%_at_74%_45%,black,transparent)]"
            />
            <motion.div
                aria-hidden="true"
                className="dot-grid pointer-events-none absolute inset-0 [--dot-color:var(--primary)]"
                style={{ maskImage: spotMask, WebkitMaskImage: spotMask }}
            />

            <div className={`${container} relative flex flex-1 flex-col`}>
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={ready ? { opacity: 1, y: 0 } : undefined}
                    transition={{ duration: 0.8, ease: OUT, delay: 0.1 }}
                >
                    <Label>{t("home.hero.eyebrow")}</Label>
                </motion.div>

                <div className="grid flex-1 items-center gap-14 py-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-10 lg:py-6">
                    <motion.div style={{ y: textY, opacity: textOpacity }}>
                        <h1 className="text-[clamp(2.6rem,6.3vw,7.4rem)] font-normal leading-[0.96] tracking-[-0.04em]">
                            <span className="sr-only">{t("home.hero.srTitle")}</span>
                            <span aria-hidden="true" className="block">
                                <AnimatedTitle as="span" size="none" text={t("home.hero.before")} play={ready} delay={0.15} className="block" />
                                <span className="relative -mb-[0.16em] inline-grid overflow-hidden pb-[0.16em] pr-[0.12em] align-top">
                                    {words.map((word) => (
                                        <em key={word} className="invisible col-start-1 row-start-1 whitespace-nowrap font-serif font-normal italic">
                                            {word}
                                        </em>
                                    ))}
                                    <AnimatePresence initial={false}>
                                        <motion.em
                                            key={current}
                                            className="col-start-1 row-start-1 whitespace-nowrap font-serif font-normal italic text-primary"
                                            initial={{ y: "140%" }}
                                            animate={{ y: ready ? "0%" : "140%" }}
                                            exit={{ y: "-140%", transition: { duration: 0.95, ease: EASE } }}
                                            transition={{ duration: 0.95, ease: EASE, delay: index === 0 ? 0.35 : 0 }}
                                        >
                                            {current}
                                        </motion.em>
                                    </AnimatePresence>
                                </span>
                            </span>
                        </h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={ready ? { opacity: 1, y: 0 } : undefined}
                            transition={{ duration: 1, ease: OUT, delay: 0.55 }}
                            className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl"
                        >
                            {t("home.hero.lead")}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={ready ? { opacity: 1, y: 0 } : undefined}
                            transition={{ duration: 1, ease: OUT, delay: 0.7 }}
                            className="mt-10 flex flex-wrap items-center gap-3"
                        >
                            <Button href="/demarrer" size="lg">
                                {t("home.hero.cta")}
                                <ArrowRight className="size-4" aria-hidden="true" />
                            </Button>
                            <Button href="/services" variant="ghost" size="lg">
                                {t("home.hero.secondary")}
                            </Button>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="mx-auto w-full max-w-[40rem] lg:max-w-none"
                        initial={{ opacity: 0 }}
                        animate={ready ? { opacity: 1 } : undefined}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <HeroStage
                            index={index}
                            onIndexChange={setIndex}
                            play={ready}
                            pointerX={pointerX}
                            pointerY={pointerY}
                            words={words}
                        />
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={ready ? { opacity: 1 } : undefined}
                    transition={{ duration: 1, delay: 0.9 }}
                >
                    <LabelRule
                        left="Romain Kantzer"
                        center={t("home.hero.ruleCenter")}
                        right={
                            <span className="inline-flex items-center gap-2">
                                {t("home.hero.scroll")}
                                <ArrowDown className="size-3.5 animate-bounce" aria-hidden="true" />
                            </span>
                        }
                    />
                </motion.div>
            </div>
        </section>
    );
}
