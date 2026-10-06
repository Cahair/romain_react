"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useLenis } from "lenis/react";
import { useTheme } from "./ThemeProvider";
import { useTranslation, availableLocales } from "./LanguageProvider";
import Button from "./ui/Button";
import RollText from "./ui/RollText";
import { container } from "./ui/Section";
import { Emphasis } from "./ui/SectionTitle";
import { SERVICE_SLUGS, serviceNumber } from "@/lib/services";

const EASE = [0.76, 0, 0.24, 1];
const OUT = [0.16, 1, 0.3, 1];

export function Logo({ className = "" }) {
    const { t } = useTranslation();
    return (
        <Link href="/" aria-label={t("nav.homeAria")} className={`group flex items-center gap-3 ${className}`}>
            <span className="flex flex-col items-start leading-none">
                <span className="text-[1.6rem] font-semibold tracking-[-0.05em]">RK</span>
                <span className="mt-1 h-[3px] w-4 bg-primary transition-all duration-500 ease-expo group-hover:w-full" />
            </span>
            <span className="hidden text-sm font-medium tracking-tight sm:block">Romain Kantzer</span>
        </Link>
    );
}

function LanguageSwitch() {
    const { locale, setLocale, t } = useTranslation();
    return (
        <div role="group" aria-label={t("nav.language")} className="flex items-center text-xs font-medium uppercase tracking-[0.14em]">
            {availableLocales.map((language) => (
                <button
                    key={language.code}
                    type="button"
                    lang={language.code}
                    title={language.name}
                    aria-pressed={locale === language.code}
                    onClick={() => setLocale(language.code)}
                    className={`rounded-full px-2 py-1.5 transition-colors ${locale === language.code ? "text-foreground underline decoration-primary decoration-2 underline-offset-4" : "text-muted-foreground hover:text-foreground"}`}
                >
                    {language.code}
                </button>
            ))}
        </div>
    );
}

function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();
    const { t } = useTranslation();
    return (
        <button
            type="button"
            onClick={toggleTheme}
            aria-label={t("nav.theme")}
            className="flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.span
                    key={theme}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                >
                    {theme === "dark" ? <Sun className="size-4" aria-hidden="true" /> : <Moon className="size-4" aria-hidden="true" />}
                </motion.span>
            </AnimatePresence>
        </button>
    );
}

function ServicesDropdown({ onNavigate }) {
    const { t } = useTranslation();
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3, ease: OUT }}
            className="absolute left-1/2 top-full w-[27rem] -translate-x-1/2 pt-4"
        >
            <ul className="rounded-2xl border border-border bg-background p-2 shadow-2xl">
                {SERVICE_SLUGS.map((slug) => (
                    <li key={slug}>
                        <Link
                            href={`/services/${slug}`}
                            onClick={onNavigate}
                            className="flex items-baseline gap-4 rounded-xl px-4 py-3 transition-colors hover:bg-muted"
                        >
                            <span className="text-xs tabular-nums text-secondary-neon">({serviceNumber(slug)})</span>
                            <span>
                                <span className="block text-lg tracking-tight text-foreground">
                                    <Emphasis text={t(`services.items.${slug}.title`)} />
                                </span>
                                <span className="mt-0.5 block text-sm leading-snug text-muted-foreground">
                                    {t(`services.items.${slug}.short`)}
                                </span>
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </motion.div>
    );
}

export default function Navbar() {
    const { t } = useTranslation();
    const pathname = usePathname();
    const lenis = useLenis();
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [servicesOpen, setServicesOpen] = useState(false);

    // Barre masquée quand on descend, réaffichée dès qu'on remonte.
    useMotionValueEvent(scrollY, "change", (current) => {
        const previous = scrollY.getPrevious() ?? 0;
        setScrolled(current > 40);
        setHidden(current > previous && current > 180);
    });

    useEffect(() => {
        if (!menuOpen) return;
        lenis?.stop();
        return () => lenis?.start();
    }, [menuOpen, lenis]);

    const links = [
        { href: "/services", label: t("nav.services") },
        { href: "/about", label: t("nav.about") },
        { href: "/contact", label: t("nav.contact") },
    ];
    const mobileLinks = [{ href: "/", label: t("nav.home") }, ...links];
    const isActive = (href) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`));
    const closeMenu = () => setMenuOpen(false);

    return (
        <>
            <motion.header
                className="fixed inset-x-0 top-0 z-50"
                animate={{ y: hidden && !menuOpen ? "-100%" : "0%" }}
                transition={{ duration: 0.5, ease: EASE }}
            >
                <div
                    className={`border-b transition-colors duration-500 ${scrolled && !menuOpen ? "border-border bg-background/80 backdrop-blur-md" : "border-transparent"}`}
                >
                    <nav aria-label={t("nav.mainAria")} className={`${container} flex h-16 items-center justify-between md:h-20`}>
                        <Logo />

                        <div className="hidden items-center gap-7 lg:flex">
                            <ul className="flex items-center gap-7 text-[0.95rem]">
                                {links.map((link) => (
                                    <li
                                        key={link.href}
                                        className="relative"
                                        onMouseEnter={link.href === "/services" ? () => setServicesOpen(true) : undefined}
                                        onMouseLeave={link.href === "/services" ? () => setServicesOpen(false) : undefined}
                                    >
                                        <Link
                                            href={link.href}
                                            aria-current={isActive(link.href) ? "page" : undefined}
                                            className={`group/roll flex items-center gap-2 py-2 transition-colors ${isActive(link.href) ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                                        >
                                            {isActive(link.href) && <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />}
                                            <RollText>{link.label}</RollText>
                                        </Link>
                                        {link.href === "/services" && (
                                            <AnimatePresence>
                                                {servicesOpen && <ServicesDropdown onNavigate={() => setServicesOpen(false)} />}
                                            </AnimatePresence>
                                        )}
                                    </li>
                                ))}
                            </ul>
                            <span className="h-5 w-px bg-border" aria-hidden="true" />
                            <LanguageSwitch />
                            <ThemeToggle />
                            <Button href="/demarrer" size="sm">
                                {t("nav.cta")}
                            </Button>
                        </div>

                        <button
                            type="button"
                            onClick={() => setMenuOpen((open) => !open)}
                            aria-expanded={menuOpen}
                            aria-controls="mobile-menu"
                            className="flex items-center gap-3 py-2 lg:hidden"
                        >
                            <span className="text-sm font-medium">{menuOpen ? t("nav.close") : t("nav.menu")}</span>
                            <span className="relative block h-3 w-6" aria-hidden="true">
                                <span
                                    className={`absolute left-0 h-[1.5px] w-full bg-foreground transition-all duration-500 ease-expo ${menuOpen ? "top-1/2 rotate-45" : "top-0"}`}
                                />
                                <span
                                    className={`absolute left-0 h-[1.5px] w-full bg-foreground transition-all duration-500 ease-expo ${menuOpen ? "top-1/2 -rotate-45" : "top-full"}`}
                                />
                            </span>
                        </button>
                    </nav>
                </div>
            </motion.header>

            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        id="mobile-menu"
                        data-lenis-prevent
                        className="fixed inset-0 z-40 overflow-y-auto bg-background lg:hidden"
                        initial={{ clipPath: "circle(0% at 90% 2rem)" }}
                        animate={{ clipPath: "circle(150% at 90% 2rem)" }}
                        exit={{ clipPath: "circle(0% at 90% 2rem)" }}
                        transition={{ duration: 0.8, ease: EASE }}
                    >
                        <div className={`${container} flex min-h-full flex-col pb-8 pt-24`}>
                            <ul>
                                {mobileLinks.map((link, index) => (
                                    <li key={link.href} className="overflow-hidden">
                                        <motion.div
                                            initial={{ y: "110%" }}
                                            animate={{ y: "0%" }}
                                            exit={{ y: "110%" }}
                                            transition={{ duration: 0.8, ease: EASE, delay: 0.15 + index * 0.06 }}
                                        >
                                            <Link
                                                href={link.href}
                                                onClick={closeMenu}
                                                aria-current={isActive(link.href) ? "page" : undefined}
                                                className={`flex items-baseline gap-4 py-1 text-[clamp(2.6rem,12vw,4.5rem)] leading-[1.08] tracking-[-0.035em] ${isActive(link.href) ? "text-foreground" : "text-foreground/55"}`}
                                            >
                                                <span className="text-sm tabular-nums text-secondary-neon">0{index + 1}</span>
                                                {link.label}
                                            </Link>
                                        </motion.div>
                                    </li>
                                ))}
                            </ul>

                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.6, ease: OUT, delay: 0.45 }}
                                className="mt-10 border-t border-border pt-6"
                            >
                                <p className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                                    {t("nav.services")}
                                </p>
                                <ul className="mt-4 grid gap-3">
                                    {SERVICE_SLUGS.map((slug) => (
                                        <li key={slug}>
                                            <Link href={`/services/${slug}`} onClick={closeMenu} className="text-xl tracking-tight">
                                                <Emphasis text={t(`services.items.${slug}.title`)} />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.6, ease: OUT, delay: 0.5 }}
                                className="mt-8"
                            >
                                <Button href="/demarrer" size="lg" onClick={closeMenu} className="w-full">
                                    {t("nav.cta")}
                                </Button>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.6, delay: 0.55 }}
                                className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-10"
                            >
                                <a href="mailto:contact@romain-kantzer.com" className="text-sm text-muted-foreground">
                                    contact@romain-kantzer.com
                                </a>
                                <div className="flex items-center gap-2">
                                    <LanguageSwitch />
                                    <ThemeToggle />
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
