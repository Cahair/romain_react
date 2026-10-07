"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLenis } from "lenis/react";
import { useTranslation } from "./LanguageProvider";
import Button from "./ui/Button";
import Logo from "./ui/Logo";
import RollText from "./ui/RollText";
import { container } from "./ui/Section";
import { Emphasis } from "./ui/SectionTitle";
import { SERVICE_SLUGS } from "@/lib/services";

const OUT = [0.16, 1, 0.3, 1];
const WORDMARK = "Romain Kantzer";

function useLocalTime(timeZone) {
    const [time, setTime] = useState("");
    useEffect(() => {
        const format = new Intl.DateTimeFormat("fr-FR", { hour: "2-digit", minute: "2-digit", timeZone });
        const tick = () => setTime(format.format(new Date()));
        tick();
        const interval = setInterval(tick, 20000);
        return () => clearInterval(interval);
    }, [timeZone]);
    return time;
}

function Column({ title, className = "", children }) {
    return (
        <div className={className}>
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-muted-foreground md:text-xs">{title}</p>
            <ul className="mt-5 space-y-2.5">{children}</ul>
        </div>
    );
}

function FooterLink({ href, external = false, children }) {
    const classes = "group/roll inline-flex items-center gap-1.5 text-foreground/80 transition-colors hover:text-foreground";
    if (external) {
        return (
            <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
                <RollText>{children}</RollText>
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </a>
        );
    }
    if (href.startsWith("mailto:") || href.startsWith("tel:")) {
        return (
            <a href={href} className={classes}>
                <RollText>{children}</RollText>
            </a>
        );
    }
    return (
        <Link href={href} className={classes}>
            <RollText>{children}</RollText>
        </Link>
    );
}

export default function Footer() {
    const { t } = useTranslation();
    const reduceMotion = useReducedMotion();
    const lenis = useLenis();
    const ref = useRef(null);
    const time = useLocalTime("Europe/Paris");
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
    const y = useTransform(scrollYProgress, [0, 1], [-140, 0]);

    const navigation = [
        { href: "/", label: t("nav.home") },
        { href: "/services", label: t("nav.services") },
        { href: "/about", label: t("nav.about") },
        { href: "/contact", label: t("nav.contact") },
    ];

    const backToTop = () => (lenis ? lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: "smooth" }));

    return (
        <footer ref={ref} className="relative overflow-hidden border-t border-border bg-background">
            <motion.div style={{ y }} className={`${container} pt-20 md:pt-28`}>
                <div className="grid gap-12 md:grid-cols-12">
                    <div className="md:col-span-5">
                        <p className="max-w-md text-3xl leading-[1.08] tracking-[-0.025em] md:text-4xl">
                            <Emphasis text={t("footer.tagline")} />
                        </p>
                        <Button href="/demarrer" className="mt-8">
                            {t("nav.cta")}
                        </Button>
                    </div>

                    <Column title={t("footer.navTitle")} className="md:col-span-2 md:col-start-7">
                        {navigation.map((link) => (
                            <li key={link.href}>
                                <FooterLink href={link.href}>{link.label}</FooterLink>
                            </li>
                        ))}
                    </Column>

                    <Column title={t("footer.servicesTitle")} className="md:col-span-2">
                        {SERVICE_SLUGS.map((slug) => (
                            <li key={slug}>
                                <FooterLink href={`/services/${slug}`}>{t(`services.items.${slug}.name`)}</FooterLink>
                            </li>
                        ))}
                    </Column>

                    <Column title={t("footer.contactTitle")} className="md:col-span-2">
                        <li>
                            <FooterLink href="mailto:contact@romain-kantzer.com">{t("footer.email")}</FooterLink>
                        </li>
                        <li>
                            <FooterLink href="tel:+33769603760">07 69 60 37 60</FooterLink>
                        </li>
                        <li>
                            <FooterLink href="https://www.linkedin.com/in/romain-kantzer-9323b920a/" external>
                                LinkedIn
                            </FooterLink>
                        </li>
                    </Column>
                </div>

                {/* Le déclencheur est sur le conteneur : le logo, masqué sous lui, n'est jamais « visible » pour l'observer. */}
                <motion.div
                    className="mt-20 overflow-hidden md:mt-28"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.5 }}
                >
                    <motion.div
                        variants={{
                            hidden: reduceMotion ? { opacity: 0 } : { y: "100%" },
                            show: reduceMotion ? { opacity: 1 } : { y: "0%", transition: { duration: 1.1, ease: OUT } },
                        }}
                    >
                        <Logo tagline title="Romain Kantzer — RK.ai" className="h-auto w-full" />
                    </motion.div>
                </motion.div>

                <div className="flex flex-col gap-4 border-t border-border pb-24 pt-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between md:pb-6 md:pr-20">
                    <p>
                        <span suppressHydrationWarning>© {new Date().getFullYear()}</span> Romain Kantzer — {t("footer.rights")}
                    </p>
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                        <Link href="/legal" className="transition-colors hover:text-foreground">
                            {t("footer.legal")}
                        </Link>
                        <span>
                            {t("footer.localTime")}{" "}
                            <span className="tabular-nums text-foreground" suppressHydrationWarning>
                                {time || "--:--"}
                            </span>
                        </span>
                        <button type="button" onClick={backToTop} className="transition-colors hover:text-foreground">
                            {t("footer.backToTop")} ↑
                        </button>
                    </div>
                </div>
            </motion.div>
        </footer>
    );
}
