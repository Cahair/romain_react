"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Sun, Moon } from "lucide-react";
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
                <div
                    className={`px-6 py-3 rounded-full flex items-center justify-between transition-all duration-500 border ${scrolled
                        ? "bg-background/95 backdrop-blur-xl shadow-xl shadow-black/40 border-white/20"
                        : "bg-background/40 backdrop-blur-sm border-white/5"
                        }`}
                >
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative flex items-center justify-center">
                            <span className="font-display font-bold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-violet-600 group-hover:to-blue-400 transition-all duration-500 tracking-tighter">
                                RK
                            </span>
                            <span className="text-muted-foreground font-mono text-xs ml-1 opacity-50 text-[10px] tracking-widest">
                                .AI
                            </span>
                            {/* Neon Glow under logo */}
                            <div className="absolute -bottom-1 left-0 right-0 h-[1px] bg-primary/50 blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>
                    </Link>

                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={`text-sm font-mono tracking-widest uppercase transition-all duration-300 hover:text-primary-neon ${pathname === item.path ? "text-primary-neon" : "text-muted-foreground"
                                    }`}
                            >
                                <span className="relative">
                                    {pathname === item.path && (
                                        <span className="absolute -left-3 top-1/2 -translate-y-1/2 text-xs text-primary leading-none">&gt;</span>
                                    )}
                                    {item.name}
                                </span>
                            </Link>
                        ))}

                        {/* Language Selector */}
                        <div className="relative border-l border-white/10 pl-6 ml-2">
                            <button
                                onClick={(e) => { e.stopPropagation(); setLangMenu(!langMenu); }}
                                className="flex items-center gap-2 p-1 rounded hover:bg-white/5 transition-all text-xs font-mono text-muted-foreground uppercase"
                            >
                                <span>{currentLocale?.code}</span>
                                <ChevronDown className={`w-3 h-3 transition-transform ${langMenu ? "rotate-180" : ""}`} />
                            </button>

                            <AnimatePresence>
                                {langMenu && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 5, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 5, scale: 0.95 }}
                                        className="absolute top-full right-0 mt-4 bg-[#0a0a0a] border border-white/10 rounded-lg overflow-hidden min-w-[100px] shadow-xl z-50"
                                    >
                                        {availableLocales.map((lang) => (
                                            <button
                                                key={lang.code}
                                                onClick={() => { setLocale(lang.code); setLangMenu(false); }}
                                                className={`w-full px-4 py-2 flex items-center gap-3 hover:bg-white/5 transition-colors text-left font-mono text-xs uppercase ${locale === lang.code ? "text-primary-neon" : "text-muted-foreground"}`}
                                            >
                                                <span>{lang.name}</span>
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Theme Toggle - DISABLED TEMPORARILY
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-white/5 transition-all text-muted-foreground hover:text-primary-neon"
                            aria-label="Toggle theme"
                        >
                            {theme === "dark" ? (
                                <Sun className="w-5 h-5" />
                            ) : (
                                <Moon className="w-5 h-5" />
                            )}
                        </button>
                        */}

                        {pathname === "/contact" ? (
                            <Link
                                href="/contact"
                                className="text-sm font-bold tracking-widest uppercase text-foreground transition-colors ml-4"
                            >
                                <span className="relative">
                                    <span className="absolute -left-3 top-1/2 -translate-y-1/2 text-xs text-primary leading-none">&gt;</span>
                                    {t("nav.contact")}
                                </span>
                            </Link>
                        ) : (
                            <Link href="/contact" className="ml-4 px-5 py-2 border border-primary/30 bg-primary/5 text-primary-neon rounded text-xs font-mono uppercase tracking-wider hover:bg-primary/20 hover:border-primary/60 transition-all duration-300">
                                {t("nav.audit")}
                            </Link>
                        )}
                    </div>

                    <button className="md:hidden text-foreground p-2" onClick={() => setMobileMenu(!mobileMenu)}>
                        {mobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {mobileMenu && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-20 left-4 right-4 bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col gap-6 md:hidden shadow-2xl z-50"
                    >
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={`text-lg font-mono font-bold uppercase tracking-widest ${pathname === item.path ? "text-primary-neon" : "text-foreground"
                                    }`}
                                onClick={() => setMobileMenu(false)}
                            >
                                <span className="flex items-center gap-2">
                                    {pathname === item.path && <span className="text-secondary-neon">&gt;</span>}
                                    {item.name}
                                </span>
                            </Link>
                        ))}

                        {/* Mobile Footer Actions */}
                        <div className="flex items-center justify-between pt-4 border-t border-white/10">
                            {/* Mobile Theme Toggle - DISABLED TEMPORARILY
                            <button
                                onClick={toggleTheme}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 text-foreground font-mono uppercase text-sm"
                            >
                                {theme === "dark" ? (
                                    <>
                                        <Sun className="w-4 h-4" />
                                        <span>Light</span>
                                    </>
                                ) : (
                                    <>
                                        <Moon className="w-4 h-4" />
                                        <span>Dark</span>
                                    </>
                                )}
                            </button>
                            */}

                            {/* Mobile Language Selector */}
                            <div className="flex gap-2">
                                {availableLocales.map((lang) => (
                                    <button
                                        key={lang.code}
                                        onClick={() => setLocale(lang.code)}
                                        className={`px-3 py-2 rounded-lg text-sm font-mono uppercase ${locale === lang.code ? "bg-primary/20 text-primary-neon" : "text-muted-foreground hover:bg-white/5"}`}
                                    >
                                        <span className="text-lg me-2">{lang.flag}</span>
                                        {lang.code}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
