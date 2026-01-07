"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Globe, ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePageAccent } from "./PageAccent";
import { useTheme } from "./ThemeProvider";
import { useTranslation, availableLocales } from "./LanguageProvider";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [langMenu, setLangMenu] = useState(false);
    const pathname = usePathname();
    const accent = usePageAccent();
    const { theme, toggleTheme } = useTheme();
    const { locale, setLocale, t } = useTranslation();

    const navItems = [
        { name: t("nav.home"), path: "/" },
        { name: t("nav.services"), path: "/services" },
        { name: t("nav.about"), path: "/about" }
    ];

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close language menu when clicking outside
    useEffect(() => {
        const handleClick = () => setLangMenu(false);
        if (langMenu) {
            document.addEventListener("click", handleClick);
            return () => document.removeEventListener("click", handleClick);
        }
    }, [langMenu]);

    const currentLocale = availableLocales.find(l => l.code === locale);

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? "py-2 md:py-4" : "py-4 md:py-8"}`}>
            <div className="container mx-auto px-4 md:px-6">
                <div className={`glass px-4 md:px-6 py-2 md:py-3 rounded-full flex items-center justify-between transition-all duration-500 ${scrolled ? "shadow-2xl bg-background/80" : "bg-white/5"}`}>
                    <Link href="/" className="flex items-center gap-2">
                        <div
                            className={`w-10 h-10 bg-gradient-to-br ${accent.gradient} rounded-xl flex items-center justify-center font-black text-xl italic transition-all duration-500 ${accent.glow}`}
                        >
                            RK
                        </div>
                        <span className="hidden md:block font-black tracking-tighter text-2xl uppercase">
                            Kantzer<span style={{ color: accent.primary }} className="italic transition-colors duration-500">.ai</span>
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center gap-6">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={`text-sm font-bold tracking-widest uppercase transition-colors ${pathname === item.path ? "text-primary" : "hover:text-primary"
                                    }`}
                            >
                                {item.name}
                            </Link>
                        ))}

                        {/* Language Selector */}
                        <div className="relative">
                            <button
                                onClick={(e) => { e.stopPropagation(); setLangMenu(!langMenu); }}
                                className="flex items-center gap-1 p-2 rounded-full hover:bg-white/10 transition-all text-sm font-bold"
                            >
                                <span>{currentLocale?.flag}</span>
                                <ChevronDown className={`w-4 h-4 transition-transform ${langMenu ? "rotate-180" : ""}`} />
                            </button>

                            <AnimatePresence>
                                {langMenu && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                        className="absolute top-full right-0 mt-2 glass rounded-xl overflow-hidden min-w-[140px]"
                                    >
                                        {availableLocales.map((lang) => (
                                            <button
                                                key={lang.code}
                                                onClick={() => { setLocale(lang.code); setLangMenu(false); }}
                                                className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-white/10 transition-colors text-left ${locale === lang.code ? "bg-primary/20 text-primary" : ""}`}
                                            >
                                                <span>{lang.flag}</span>
                                                <span className="text-sm font-medium">{lang.name}</span>
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-white/10 transition-all"
                            aria-label="Toggle theme"
                        >
                            {theme === "dark" ? (
                                <Sun className="w-5 h-5 text-yellow-400" />
                            ) : (
                                <Moon className="w-5 h-5 text-slate-700" />
                            )}
                        </button>

                        <Link href="/contact" className="px-6 py-2 bg-white text-background rounded-full font-bold text-sm hover:scale-105 transition-transform active:scale-95">
                            {t("nav.audit")}
                        </Link>
                    </div>

                    <button className="md:hidden" onClick={() => setMobileMenu(!mobileMenu)}>
                        {mobileMenu ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {mobileMenu && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-24 left-6 right-6 glass rounded-3xl p-8 flex flex-col gap-6 md:hidden"
                    >
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={`text-lg font-bold uppercase tracking-widest ${pathname === item.path ? "text-primary" : ""
                                    }`}
                                onClick={() => setMobileMenu(false)}
                            >
                                {item.name}
                            </Link>
                        ))}

                        {/* Mobile Language Selector */}
                        <div className="flex gap-2 pt-4 border-t border-white/10">
                            {availableLocales.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => setLocale(lang.code)}
                                    className={`px-3 py-2 rounded-lg text-lg ${locale === lang.code ? "bg-primary/20" : "hover:bg-white/10"}`}
                                >
                                    {lang.flag}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
