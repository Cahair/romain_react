"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useTranslation } from "../../components/LanguageProvider";
import { usePageReady } from "../../components/motion/TransitionProvider";
import AnimatedTitle from "../../components/motion/AnimatedTitle";
import Reveal from "../../components/motion/Reveal";
import Button from "../../components/ui/Button";
import Label from "../../components/ui/Label";
import { container } from "../../components/ui/Section";
import { CopyEmail, EMAIL, PHONE_DISPLAY, PHONE_HREF } from "../../components/sections/ContactCta";

const OUT = [0.16, 1, 0.3, 1];
const LINKEDIN_URL = "https://www.linkedin.com/in/romain-kantzer-9323b920a/";
const pad = (value) => String(value).padStart(2, "0");

function Card({ icon: Icon, label, hint, children }) {
    return (
        <div className="rounded-2xl border border-border bg-card p-6 transition-colors duration-300 hover:border-foreground/30 md:p-7">
            <p className="flex items-center gap-2.5 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-muted-foreground md:text-xs">
                <Icon className="size-4 text-primary" aria-hidden="true" />
                {label}
            </p>
            <div className="mt-4 text-lg tracking-tight md:text-xl">{children}</div>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{hint}</p>
        </div>
    );
}

export default function ContactPage() {
    const { t, tl } = useTranslation();
    const ready = usePageReady();

    const reveal = (delay) => ({
        initial: { opacity: 0, y: 24 },
        animate: ready ? { opacity: 1, y: 0 } : undefined,
        transition: { duration: 1, ease: OUT, delay },
    });

    return (
        <>
            <Navbar />
            <main className="pb-24 pt-28 md:pb-32 md:pt-36">
                <div className={container}>
                    <motion.div {...reveal(0)}>
                        <Label>{t("contact.label")}</Label>
                    </motion.div>
                    <AnimatedTitle
                        as="h1"
                        size="none"
                        text={t("contact.title")}
                        play={ready}
                        delay={0.1}
                        className="mt-6 max-w-[14ch] text-[clamp(2.5rem,6vw,6rem)] font-normal leading-[0.96] tracking-[-0.035em]"
                    />
                    <motion.p {...reveal(0.4)} className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                        {t("contact.lead")}
                    </motion.p>

                    <div className="mt-14 grid gap-10 md:mt-20 lg:grid-cols-12 lg:gap-x-16">
                        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
                            <Reveal delay={0.05}>
                                <Card icon={Mail} label={t("contact.cards.email.label")} hint={t("contact.cards.email.hint")}>
                                    <CopyEmail />
                                </Card>
                            </Reveal>
                            <Reveal delay={0.1}>
                                <Card icon={Phone} label={t("contact.cards.phone.label")} hint={t("contact.cards.phone.hint")}>
                                    <a href={PHONE_HREF} className="tabular-nums transition-colors hover:text-primary">
                                        {PHONE_DISPLAY}
                                    </a>
                                </Card>
                            </Reveal>
                            <Reveal delay={0.15}>
                                <Card icon={MapPin} label={t("contact.cards.location.label")} hint={t("contact.cards.location.hint")}>
                                    {t("contact.cards.location.value")}
                                </Card>
                            </Reveal>
                            <Reveal delay={0.2}>
                                <Card icon={Linkedin} label={t("contact.cards.linkedin.label")} hint={t("contact.cards.linkedin.hint")}>
                                    <a
                                        href={LINKEDIN_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group inline-flex items-center gap-1.5 transition-colors hover:text-primary"
                                    >
                                        Romain Kantzer
                                        <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:rotate-45" aria-hidden="true" />
                                    </a>
                                </Card>
                            </Reveal>
                        </div>

                        <motion.aside {...reveal(0.45)} className="space-y-8 lg:col-span-5">
                            {/* Appel à l'action : le parcours « Démarrer un projet ». */}
                            <div className="tone-invert rounded-3xl bg-background p-8 text-foreground shadow-[0_40px_100px_-40px_rgb(0_0_0/0.6)] ring-1 ring-border md:p-10">
                                <h2 className="text-3xl tracking-[-0.025em] md:text-4xl">{t("contact.start.title")}</h2>
                                <p className="mt-4 leading-relaxed text-muted-foreground">{t("contact.start.text")}</p>
                                <Button href="/demarrer" size="lg" className="mt-8 w-full sm:w-auto">
                                    {t("contact.start.button")}
                                    <ArrowRight className="size-4" aria-hidden="true" />
                                </Button>
                            </div>

                            <div className="rounded-3xl border border-border p-7 md:p-8">
                                <p className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-muted-foreground md:text-xs">
                                    {t("contact.next.title")}
                                </p>
                                <ol className="mt-6 space-y-5">
                                    {tl("contact.next.steps").map((step, index) => (
                                        <li key={step} className="flex gap-4">
                                            <span className="pt-0.5 text-sm tabular-nums text-secondary-neon">({pad(index + 1)})</span>
                                            <span className="leading-relaxed">{step}</span>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </motion.aside>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
