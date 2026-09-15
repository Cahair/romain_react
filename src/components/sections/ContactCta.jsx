"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, Copy } from "lucide-react";
import { useTranslation } from "../LanguageProvider";
import AnimatedTitle from "../motion/AnimatedTitle";
import Magnetic from "../motion/Magnetic";
import Label from "../ui/Label";
import RollText from "../ui/RollText";
import Section from "../ui/Section";

export const EMAIL = "contact@romain-kantzer.com";
export const PHONE_DISPLAY = "07 69 60 37 60";
export const PHONE_HREF = "tel:+33769603760";

export function CopyEmail({ className = "" }) {
    const { t } = useTranslation();
    const [copied, setCopied] = useState(false);

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(EMAIL);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        } catch {
            window.location.href = `mailto:${EMAIL}`;
        }
    };

    return (
        <span className={`inline-flex flex-wrap items-center gap-3 ${className}`}>
            <a
                href={`mailto:${EMAIL}`}
                className="underline decoration-border underline-offset-[0.3em] transition-colors hover:decoration-primary"
            >
                {EMAIL}
            </a>
            <button
                type="button"
                onClick={copy}
                aria-live="polite"
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
            >
                {copied ? <Check className="size-3.5" aria-hidden="true" /> : <Copy className="size-3.5" aria-hidden="true" />}
                {copied ? t("common.copied") : t("common.copy")}
            </button>
        </span>
    );
}

// Traits dessinés à la main, tracés quand ils entrent dans l'écran.
function Doodle({ d, className = "", delay = 0, strokeWidth = 3 }) {
    return (
        <svg viewBox="0 0 160 120" aria-hidden="true" className={className} fill="none">
            <motion.path
                d={d}
                stroke="currentColor"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1], delay }}
            />
        </svg>
    );
}

export default function ContactCta() {
    const { t } = useTranslation();

    return (
        <Section spacing="none" className="overflow-hidden py-28 md:py-44">
            <div
                aria-hidden="true"
                className="dot-grid pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[min(92vw,54rem)] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 [mask-image:radial-gradient(circle,black_40%,transparent_70%)]"
            />
            <Doodle
                d="M20 20 L140 100 M140 20 L20 100 M80 8 L80 112 M8 60 L152 60"
                className="absolute right-[9%] top-[12%] hidden w-20 text-primary md:block"
            />
            <Doodle
                d="M10 90 C 30 20, 70 20, 60 60 S 30 100, 70 90 S 130 40, 150 30 M150 30 L134 28 M150 30 L144 44"
                className="absolute bottom-[16%] left-[9%] hidden w-40 text-foreground/40 md:block"
                delay={0.3}
            />
            <Doodle
                d="M8 70 Q 24 40, 40 70 T 72 70 T 104 70 T 136 70"
                className="absolute left-[14%] top-[18%] hidden w-28 text-secondary-neon md:block"
                delay={0.15}
                strokeWidth={4}
            />

            <div className="relative flex flex-col items-center text-center">
                <Label>{t("cta.label")}</Label>
                <AnimatedTitle as="h2" size="hero" text={t("cta.title")} className="mt-8 max-w-[13ch] text-balance" />
                <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">{t("cta.text")}</p>

                <Magnetic className="mt-12">
                    <Link
                        href="/contact"
                        className="group/roll flex size-36 flex-col items-center justify-center gap-2 rounded-full bg-primary text-center text-base font-medium text-primary-foreground transition-transform duration-500 ease-out-expo hover:scale-105 md:size-44 md:text-lg"
                    >
                        <RollText>{t("cta.button")}</RollText>
                        <ArrowRight className="size-5 transition-transform duration-500 group-hover/roll:translate-x-1" aria-hidden="true" />
                    </Link>
                </Magnetic>

                <div className="mt-12 flex flex-col items-center gap-4 text-lg md:flex-row md:gap-10">
                    <CopyEmail />
                    <a href={PHONE_HREF} className="tabular-nums transition-colors hover:text-primary">
                        {PHONE_DISPLAY}
                    </a>
                </div>
            </div>
        </Section>
    );
}
