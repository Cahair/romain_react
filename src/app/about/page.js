"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useTranslation } from "../../components/LanguageProvider";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Section from "../../components/ui/Section";
import SectionTitle from "../../components/ui/SectionTitle";

const reveal = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.45, ease: "easeOut" },
};

const LinkedInIcon = () => (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
);

export default function AboutPage() {
    const { t } = useTranslation();
    const getList = (key) => {
        const items = t(key);
        return Array.isArray(items) ? items : [];
    };

    const how = getList("about.how.items");
    const path = getList("about.path.items");

    return (
        <main className="min-h-screen bg-background">
            <Navbar />

            <div className="mx-auto max-w-7xl px-6 pb-24 pt-28 md:pt-36">
                <div className="grid gap-12 lg:grid-cols-[minmax(16rem,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
                    <aside className="lg:col-span-1">
                        <div className="lg:sticky lg:top-28">
                            <Image
                                src="/romain-profile.jpg"
                                alt="Romain Kantzer, créateur de sites web à Rountzenheim"
                                width={472}
                                height={1024}
                                sizes="(min-width: 1024px) 26vw, (min-width: 640px) 18rem, 100vw"
                                priority
                                className="aspect-square w-full max-w-[18rem] rounded-2xl border border-border object-cover object-[center_22%]"
                            />

                            <p className="mt-8 text-sm font-medium uppercase tracking-[0.16em] text-primary">
                                RK.ai
                            </p>
                            <SectionTitle as="h1" size="hero" className="mt-3 leading-[0.9] tracking-tight">
                                Romain Kantzer
                            </SectionTitle>
                            <p className="mt-6 max-w-md text-xl leading-relaxed text-muted-foreground">
                                {t("about.intro")}
                            </p>

                            <div className="mt-8 flex flex-wrap items-center gap-3">
                                <a
                                    href="https://www.linkedin.com/in/romain-kantzer-9323b920a/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary hover:bg-accent"
                                >
                                    <LinkedInIcon />
                                    LinkedIn
                                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                                </a>
                                <Button href="/contact" size="md">
                                    <Mail className="h-4 w-4" aria-hidden="true" />
                                    {t("about.contact.button")}
                                </Button>
                            </div>
                        </div>
                    </aside>

                    <article className="min-w-0 lg:col-span-1">
                        <Section containerClassName="px-0" className="pt-0 md:pt-0">
                            <motion.div {...reveal}>
                                <SectionTitle>{t("about.story.title")}</SectionTitle>
                                <div className="mt-6 space-y-5 text-lg leading-8 text-foreground/85">
                                    <p>{t("about.story.p1")}</p>
                                    <p>{t("about.story.p2")}</p>
                                    <p>{t("about.story.p3")}</p>
                                    <p>
                                        {t("about.story.serviceBefore")}
                                        <Link
                                            href="/services/web-dev"
                                            className="font-medium text-primary transition-colors hover:text-primary-neon hover:underline hover:underline-offset-4"
                                        >
                                            {t("about.story.serviceLink")}
                                        </Link>
                                        {t("about.story.serviceAfter")}
                                    </p>
                                    <p>
                                        {t("about.story.contactBefore")}
                                        <Link
                                            href="/contact"
                                            className="font-medium text-primary transition-colors hover:text-primary-neon hover:underline hover:underline-offset-4"
                                        >
                                            {t("about.story.contactLink")}
                                        </Link>
                                    </p>
                                </div>
                            </motion.div>
                        </Section>

                        <Section containerClassName="px-0" className="border-t border-border">
                            <motion.div {...reveal}>
                                <p className="text-sm font-medium uppercase tracking-[0.16em] text-primary">
                                    {t("about.proof.eyebrow")}
                                </p>
                                <SectionTitle className="mt-3">{t("about.proof.title")}</SectionTitle>

                                <Card className="mt-8 overflow-hidden p-0 transition duration-300 hover:-translate-y-1 hover:border-primary">
                                    <div className="relative aspect-[16/9] overflow-hidden border-b border-border">
                                        <Image
                                            src="/images/case-studies/bischwiller-echecs.png"
                                            alt={t("about.proof.imageAlt")}
                                            fill
                                            sizes="(min-width: 1024px) 48vw, 100vw"
                                            className="object-cover object-top"
                                        />
                                    </div>
                                    <div className="p-6 md:p-8">
                                        <p className="max-w-2xl leading-relaxed text-muted-foreground">
                                            {t("about.proof.description")}
                                        </p>
                                        <a
                                            href="https://bischwiller-echecs.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-5 inline-flex items-center gap-1.5 font-medium text-primary transition-colors hover:text-primary-neon hover:underline hover:underline-offset-4"
                                        >
                                            {t("about.proof.link")}
                                            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                                        </a>
                                    </div>
                                </Card>
                            </motion.div>
                        </Section>

                        <Section containerClassName="px-0" className="border-t border-border">
                            <motion.div {...reveal}>
                                <SectionTitle>{t("about.how.title")}</SectionTitle>
                                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                                    {how.map((item, index) => (
                                        <motion.div
                                            key={item.title}
                                            {...reveal}
                                            transition={{ ...reveal.transition, delay: index * 0.06 }}
                                        >
                                            <Card className="h-full transition duration-300 hover:-translate-y-1 hover:border-primary">
                                                <h3 className="text-lg font-medium text-foreground">{item.title}</h3>
                                                <p className="mt-3 leading-relaxed text-muted-foreground">{item.text}</p>
                                            </Card>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </Section>

                        <Section containerClassName="px-0" className="border-t border-border">
                            <motion.div {...reveal}>
                                <SectionTitle>{t("about.path.title")}</SectionTitle>
                                <ol className="relative mt-8 ml-1 border-l border-border">
                                    {path.map((item) => (
                                        <li key={`${item.year}-${item.text}`} className="relative pb-8 pl-8 last:pb-0">
                                            <span className="absolute left-[-5px] top-1.5 h-2.5 w-2.5 rounded-full border border-border bg-background" />
                                            <p className="text-sm tabular-nums text-muted-foreground">{item.year}</p>
                                            <p className="mt-1 leading-relaxed text-foreground/85">{item.text}</p>
                                        </li>
                                    ))}
                                </ol>
                            </motion.div>
                        </Section>

                        <Section containerClassName="px-0" className="border-t border-border pb-0 md:pb-0">
                            <motion.div {...reveal}>
                                <p className="text-xl leading-relaxed text-foreground">{t("about.contact.text")}</p>
                                <Button href="/contact" size="lg" className="mt-6">
                                    <Mail className="h-4 w-4" aria-hidden="true" />
                                    {t("about.contact.button")}
                                </Button>
                            </motion.div>
                        </Section>
                    </article>
                </div>
            </div>

            <Footer />
        </main>
    );
}
