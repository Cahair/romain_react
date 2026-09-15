"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionTemplate, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "../LanguageProvider";
import AnimatedTitle from "../motion/AnimatedTitle";
import Reveal from "../motion/Reveal";
import Label from "../ui/Label";
import RollText from "../ui/RollText";
import Section from "../ui/Section";

const CLUB_URL = "https://bischwiller-echecs.com";

// Le projet fondateur : le Cercle d'Échecs de Bischwiller (seule réalisation livrée).
export default function FeaturedProject({ tone }) {
    const { t, tl } = useTranslation();
    const frameRef = useRef(null);
    const reduceMotion = useReducedMotion();

    // L'image s'ouvre (clip-path) et se désature du zoom en arrivant au centre de l'écran.
    const { scrollYProgress } = useScroll({ target: frameRef, offset: ["start end", "center center"] });
    const inset = useTransform(scrollYProgress, [0, 1], [reduceMotion ? 0 : 14, 0]);
    const clipPath = useMotionTemplate`inset(${inset}% ${inset}% ${inset}% ${inset}% round 20px)`;
    const scale = useTransform(scrollYProgress, [0, 1], [reduceMotion ? 1 : 1.35, 1]);

    const roles = tl("home.project.roles");

    return (
        <Section tone={tone} spacing="none" className="py-24 md:py-36">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <Label>{t("home.project.label")}</Label>
                <p className="text-sm text-muted-foreground">{t("home.project.meta")}</p>
            </div>

            <AnimatedTitle as="h2" size="h1" text={t("home.project.title")} className="mt-8 max-w-5xl" />

            <a
                ref={frameRef}
                href={CLUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor={t("common.visit")}
                aria-label={t("home.project.link")}
                className="relative mt-12 block md:mt-16"
            >
                <motion.div
                    style={{ clipPath }}
                    className="relative aspect-[4/3] overflow-hidden bg-muted sm:aspect-[16/10] lg:aspect-[16/8]"
                >
                    <motion.div className="absolute inset-0" style={{ scale }}>
                        <Image
                            src="/images/case-studies/bischwiller-echecs-hero.jpg"
                            alt={t("home.project.imageAlt")}
                            fill
                            sizes="(min-width: 1600px) 1520px, 100vw"
                            className="object-cover object-top"
                        />
                    </motion.div>
                </motion.div>
            </a>

            <div className="mt-12 grid gap-12 md:mt-16 md:grid-cols-12">
                <Reveal className="md:col-span-4">
                    <p className="text-sm text-muted-foreground">{t("home.project.rolesTitle")}</p>
                    <ul className="mt-4">
                        {roles.map((role, index) => (
                            <li key={role} className="flex items-baseline gap-4 border-t border-border py-3 text-lg tracking-tight">
                                <span className="text-xs tabular-nums text-secondary-neon">0{index + 1}</span>
                                {role}
                            </li>
                        ))}
                    </ul>
                </Reveal>
                <Reveal className="md:col-span-7 md:col-start-6" delay={0.1}>
                    <p className="text-2xl leading-[1.3] tracking-[-0.015em] md:text-3xl">{t("home.project.text")}</p>
                    <a
                        href={CLUB_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/roll mt-8 inline-flex items-center gap-2 font-medium text-primary"
                    >
                        <RollText>{t("home.project.link")}</RollText>
                        <ArrowUpRight className="size-4 transition-transform duration-500 group-hover/roll:rotate-45" aria-hidden="true" />
                    </a>
                </Reveal>
            </div>
        </Section>
    );
}
