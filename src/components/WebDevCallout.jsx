"use client";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "./LanguageProvider";
import Button from "./ui/Button";
import Card from "./ui/Card";
import Section from "./ui/Section";
import SectionTitle, { Highlight } from "./ui/SectionTitle";

export default function WebDevCallout() {
    const { t } = useTranslation();
    const shouldReduceMotion = useReducedMotion();
    const rawItems = t("homeWebDev.items");
    const items = Array.isArray(rawItems) ? rawItems : [];

    const reveal = {
        initial: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: shouldReduceMotion ? 0 : 0.45, ease: "easeOut" },
    };

    return (
        <Section id="services">
            <motion.div {...reveal}>
                <Card padded={false} className="overflow-hidden">
                    <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
                        <div className="p-6 py-10 md:p-10 lg:p-12">
                            <p className="text-sm font-medium uppercase tracking-[0.16em] text-primary">
                                {t("homeWebDev.eyebrow")}
                            </p>
                            <SectionTitle className="mt-3">
                                {t("homeWebDev.titleBefore")}
                                <Highlight>{t("homeWebDev.titleHighlight")}</Highlight>
                                {t("homeWebDev.titleAfter")}
                            </SectionTitle>
                            <p className="mt-5 max-w-xl leading-relaxed text-muted-foreground md:text-lg">
                                {t("homeWebDev.text")}
                            </p>
                            <Button href="/services/web-dev" size="lg" className="mt-8">
                                {t("homeWebDev.cta")}
                                <ArrowRight className="h-4 w-4" aria-hidden="true" />
                            </Button>
                        </div>

                        {/* Repères numérotés : colonne bordée sur desktop, empilée sous le texte sur mobile. */}
                        <ol className="flex flex-col justify-center border-t border-border lg:border-l lg:border-t-0">
                            {items.map((item, index) => (
                                <motion.li
                                    key={item.title}
                                    {...reveal}
                                    transition={{ ...reveal.transition, delay: index * 0.08 }}
                                    className="flex gap-5 border-b border-border p-6 last:border-b-0 md:px-10 md:py-7"
                                >
                                    <span className="pt-0.5 text-sm font-medium tabular-nums text-primary">
                                        0{index + 1}
                                    </span>
                                    <div>
                                        <h3 className="font-medium text-foreground">{item.title}</h3>
                                        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                                            {item.text}
                                        </p>
                                    </div>
                                </motion.li>
                            ))}
                        </ol>
                    </div>
                </Card>
            </motion.div>
        </Section>
    );
}
