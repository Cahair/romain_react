"use client";

import { motion } from "framer-motion";
import { useTranslation } from "../LanguageProvider";
import AnimatedTitle from "../motion/AnimatedTitle";
import Reveal from "../motion/Reveal";
import Label from "../ui/Label";
import Section from "../ui/Section";

const pad = (value) => String(value).padStart(2, "0");

// « Pour qui » : grande liste numérotée, section inversée.
export function ForWho({ slug }) {
    const { t, tl } = useTranslation();
    const items = tl(`services.items.${slug}.forWho`);

    return (
        <Section tone="invert">
            <div className="grid gap-12 lg:grid-cols-12">
                <div className="lg:col-span-4">
                    <Label>{t("services.forWhoLabel")}</Label>
                    <AnimatedTitle text={t("services.forWhoTitle")} className="mt-6" />
                </div>
                <ul className="border-t border-border lg:col-span-8">
                    {items.map((item, index) => (
                        <Reveal
                            as="li"
                            key={item}
                            delay={index * 0.05}
                            className="group flex items-baseline gap-6 border-b border-border py-6 md:py-8"
                        >
                            <span className="text-sm tabular-nums text-secondary-neon">({pad(index + 1)})</span>
                            <span className="text-2xl leading-tight tracking-[-0.025em] transition-transform duration-500 ease-out-expo group-hover:translate-x-3 md:text-4xl">
                                {item}
                            </span>
                        </Reveal>
                    ))}
                </ul>
            </div>
        </Section>
    );
}

// « Ce qui est inclus » : livrables en deux colonnes.
export function Deliverables({ slug }) {
    const { t, tl } = useTranslation();
    const items = tl(`services.items.${slug}.included`);

    return (
        <Section id="livrables" className="scroll-mt-20">
            <Label>{t("services.includedLabel")}</Label>
            <AnimatedTitle text={t("services.includedTitle")} className="mt-6" />
            <div className="mt-14 grid gap-x-12 md:grid-cols-2">
                {items.map((item, index) => (
                    <Reveal key={item.title} delay={(index % 2) * 0.08} className="flex gap-6 border-t border-border py-8 md:py-10">
                        <span className="pt-1.5 text-sm tabular-nums text-secondary-neon">({pad(index + 1)})</span>
                        <div>
                            <h3 className="text-2xl tracking-[-0.02em] md:text-3xl">{item.title}</h3>
                            <p className="mt-3 max-w-md leading-relaxed text-muted-foreground">{item.text}</p>
                        </div>
                    </Reveal>
                ))}
            </div>
        </Section>
    );
}

// « Comment je le construis » : approche technique et outils.
export function BuildWith({ slug }) {
    const { t, tl } = useTranslation();
    const tags = tl(`services.items.${slug}.build.tags`);

    return (
        <Section spacing="compact">
            <div className="grid gap-10 rounded-3xl border border-border bg-card p-8 md:p-14 lg:grid-cols-12">
                <div className="lg:col-span-5">
                    <Label>{t("services.buildLabel")}</Label>
                    <AnimatedTitle text={t("services.buildTitle")} className="mt-6" />
                </div>
                <div className="lg:col-span-7">
                    <p className="text-xl leading-[1.45] tracking-[-0.01em] md:text-2xl">{t(`services.items.${slug}.build.text`)}</p>
                    <ul className="mt-8 flex flex-wrap gap-2">
                        {tags.map((tag, index) => (
                            <motion.li
                                key={tag}
                                initial={{ opacity: 0, scale: 0.6 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ type: "spring", stiffness: 260, damping: 18, delay: index * 0.06 }}
                                className="rounded-full border border-border px-4 py-2 text-sm"
                            >
                                {tag}
                            </motion.li>
                        ))}
                    </ul>
                </div>
            </div>
        </Section>
    );
}
