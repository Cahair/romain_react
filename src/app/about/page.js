"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useTranslation } from "../../components/LanguageProvider";
import { usePageReady } from "../../components/motion/TransitionProvider";
import AnimatedTitle from "../../components/motion/AnimatedTitle";
import ScrollWords from "../../components/motion/ScrollWords";
import Reveal from "../../components/motion/Reveal";
import Button from "../../components/ui/Button";
import Label from "../../components/ui/Label";
import Section, { container } from "../../components/ui/Section";
import FeaturedProject from "../../components/sections/FeaturedProject";
import ContactCta from "../../components/sections/ContactCta";

const OUT = [0.16, 1, 0.3, 1];
const LINKEDIN_URL = "https://www.linkedin.com/in/romain-kantzer-9323b920a/";
const pad = (value) => String(value).padStart(2, "0");

// Portrait dévoilé par le bas (clip-path), puis en parallaxe au scroll.
function Portrait({ play }) {
    const { t } = useTranslation();
    const reduceMotion = useReducedMotion();
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

    return (
        <motion.div
            ref={ref}
            className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted"
            initial={reduceMotion ? false : { clipPath: "inset(100% 0% 0% 0% round 16px)" }}
            animate={play ? { clipPath: "inset(0% 0% 0% 0% round 16px)" } : undefined}
            transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1], delay: 0.35 }}
        >
            <motion.div className="absolute inset-x-0 -inset-y-[9%]" style={{ y }}>
                <Image
                    src="/romain-kantzer.jpg"
                    alt={t("about.imageAlt")}
                    fill
                    priority
                    sizes="(min-width: 1024px) 32vw, 100vw"
                    className="object-cover"
                />
            </motion.div>
        </motion.div>
    );
}

// Parcours : frise dont le fil se remplit au scroll.
function Timeline() {
    const { t, tl } = useTranslation();
    const items = tl("about.path.items");
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.55"] });

    return (
        <Section tone="invert">
            <div className="grid gap-12 lg:grid-cols-12">
                <div className="lg:col-span-4">
                    <Label>{t("about.path.label")}</Label>
                    <AnimatedTitle text={t("about.path.title")} className="mt-6" />
                </div>
                <ol ref={ref} className="relative lg:col-span-7 lg:col-start-6">
                    <span aria-hidden="true" className="absolute bottom-2 left-[5px] top-2 w-px bg-border">
                        <motion.span className="block h-full w-full origin-top bg-primary" style={{ scaleY: scrollYProgress }} />
                    </span>
                    {items.map((item, index) => (
                        <Reveal
                            as="li"
                            key={`${item.year}-${index}`}
                            className="relative grid gap-2 pb-10 pl-10 last:pb-0 md:grid-cols-[9rem_1fr] md:gap-8"
                        >
                            <span aria-hidden="true" className="absolute left-0 top-2 size-[11px] rounded-full border-2 border-primary bg-background" />
                            <p className="text-sm tabular-nums text-muted-foreground md:pt-1">{item.year}</p>
                            <p className="text-lg leading-snug tracking-tight md:text-xl">{item.text}</p>
                        </Reveal>
                    ))}
                </ol>
            </div>
        </Section>
    );
}

export default function AboutPage() {
    const { t, tl } = useTranslation();
    const ready = usePageReady();
    const how = tl("about.how.items");

    return (
        <>
            <Navbar />
            <main>
                <section className="pb-20 pt-32 md:pb-28 md:pt-44">
                    <div className={container}>
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={ready ? { opacity: 1, y: 0 } : undefined}
                            transition={{ duration: 0.8, ease: OUT }}
                        >
                            <Label>{t("about.label")}</Label>
                        </motion.div>
                        <div className="mt-8 grid items-end gap-12 lg:grid-cols-12">
                            <div className="lg:col-span-7">
                                <AnimatedTitle as="h1" size="hero" text={t("about.title")} play={ready} delay={0.1} />
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={ready ? { opacity: 1, y: 0 } : undefined}
                                    transition={{ duration: 1, ease: OUT, delay: 0.45 }}
                                    className="mt-10 max-w-xl text-xl leading-relaxed text-muted-foreground md:text-2xl"
                                >
                                    {t("about.intro")}
                                </motion.p>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={ready ? { opacity: 1, y: 0 } : undefined}
                                    transition={{ duration: 1, ease: OUT, delay: 0.6 }}
                                    className="mt-10 flex flex-wrap gap-3"
                                >
                                    <Button href="/contact" size="lg">
                                        <Mail className="size-4" aria-hidden="true" />
                                        {t("about.contactButton")}
                                    </Button>
                                    <Button href={LINKEDIN_URL} external variant="ghost" size="lg">
                                        LinkedIn
                                        <ArrowUpRight className="size-4" aria-hidden="true" />
                                    </Button>
                                </motion.div>
                            </div>
                            <div className="lg:col-span-4 lg:col-start-9">
                                <Portrait play={ready} />
                            </div>
                        </div>
                    </div>
                </section>

                <Section className="border-t border-border">
                    <div className="grid gap-12 lg:grid-cols-12">
                        <div className="lg:col-span-4">
                            <Label>{t("about.story.label")}</Label>
                            <AnimatedTitle text={t("about.story.title")} className="mt-6" />
                        </div>
                        <div className="text-lg leading-relaxed text-foreground/85 md:text-xl md:leading-[1.6] lg:col-span-7 lg:col-start-6">
                            <Reveal as="p">{t("about.story.p1")}</Reveal>
                        </div>
                    </div>

                    <ScrollWords
                        as="blockquote"
                        text={t("about.story.quote")}
                        className="mx-auto my-20 max-w-5xl text-center font-serif text-[clamp(2rem,4.5vw,4.25rem)] italic leading-[1.1] tracking-[-0.02em] md:my-32"
                    />

                    <div className="grid gap-12 lg:grid-cols-12">
                        <div className="space-y-6 text-lg leading-relaxed text-foreground/85 md:text-xl md:leading-[1.6] lg:col-span-7 lg:col-start-6">
                            <Reveal as="p">{t("about.story.p2")}</Reveal>
                            <Reveal as="p">{t("about.story.p3")}</Reveal>
                        </div>
                    </div>
                </Section>

                <FeaturedProject tone="invert" />

                <Section>
                    <div className="grid gap-12 lg:grid-cols-12">
                        <div className="lg:col-span-4">
                            <Label>{t("about.how.label")}</Label>
                            <AnimatedTitle text={t("about.how.title")} className="mt-6" />
                        </div>
                        <div className="grid gap-x-10 sm:grid-cols-2 lg:col-span-8">
                            {how.map((item, index) => (
                                <Reveal key={item.title} delay={(index % 2) * 0.08} className="border-t border-border py-8">
                                    <span className="text-sm tabular-nums text-secondary-neon">({pad(index + 1)})</span>
                                    <h3 className="mt-4 text-2xl tracking-[-0.02em] md:text-3xl">{item.title}</h3>
                                    <p className="mt-3 leading-relaxed text-muted-foreground">{item.text}</p>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </Section>

                <Timeline />
                <ContactCta />
            </main>
            <Footer />
        </>
    );
}
