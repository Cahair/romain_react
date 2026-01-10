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
    const [hoveredPath, setHoveredPath] = useState(null);
    const [expandedMobile, setExpandedMobile] = useState(null);

    const pathname = usePathname();
    const accent = usePageAccent();
    const { theme, toggleTheme } = useTheme();
    const { locale, setLocale, t } = useTranslation();

    const navItems = [
        { name: t("nav.home"), path: "/" },
        {
            name: t("nav.services"),
            path: "/services",
            subItems: [
                { name: "Agents IA", path: "/services/agents" },
                { name: "Workflows IA", path: "/services/workflows" },
                { name: "Lead Gen IA", path: "/services/lead-gen" },
                { name: "Data Analysis", path: "/services/data" },
                { name: "Développement Web", path: "/services/web-dev" },
            ]
        },
        { name: t("nav.about"), path: "/about" }
    ];

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close language menu when clicking outside
    useEffect(() => {
        const handleClick = () => {
            setLangMenu(false);
            setHoveredPath(null);
        };
        if (langMenu || hoveredPath) {
            document.addEventListener("click", handleClick);
            return () => document.removeEventListener("click", handleClick);
        }
    }, [langMenu, hoveredPath]);

    const currentLocale = availableLocales.find(l => l.code === locale);

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? "py-2 md:py-4" : "py-2 md:py-8"}`}>
            <div className="container mx-auto px-4 md:px-6">
                <div
                    className={`px-6 py-3 rounded-full flex items-center justify-between transition-all duration-500 border relative ${scrolled
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

                    {/* DESKTOP MENU */}
                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <div
                                key={item.path}
                                className="relative"
                                onMouseEnter={() => setHoveredPath(item.path)}
                                onMouseLeave={() => setHoveredPath(null)}
                            >
                                <Link
                                    href={item.path}
                                    className={`text-sm font-mono tracking-widest uppercase transition-all duration-300 hover:text-primary-neon ${pathname.startsWith(item.path) && item.path !== "/"
                                        ? "text-primary-neon"
                                        : pathname === item.path ? "text-primary-neon" : "text-muted-foreground"
                                        }`}
                                >
                                    <span className="relative flex items-center gap-1">
                                        {pathname === item.path && (
                                            <span className="absolute -left-3 top-1/2 -translate-y-1/2 text-xs text-primary leading-none">&gt;</span>
                                        )}
                                        {item.name}
                                        {item.subItems && (
                                            <ChevronDown size={12} className={`transition-transform duration-300 ${hoveredPath === item.path ? "rotate-180" : ""}`} />
                                        )}
                                    </span>
                                </Link>

                                {/* Dropdown Menu */}
                                <AnimatePresence>
                                    {item.subItems && hoveredPath === item.path && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 5, scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute top-full left-1/2 -translate-x-1/2 pt-6 w-56 transform z-50"
                                        >
                                            <div className="bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden shadow-2xl backdrop-blur-xl p-2 flex flex-col gap-1 ring-1 ring-white/5">
                                                {/* Decorative top arrow */}
                                                <div className="absolute -top-[5px] left-1/2 -translate-x-1/2 w-3 h-3 bg-[#0a0a0a] border-t border-l border-white/10 rotate-45 transform" />

                                                {item.subItems.map((sub) => (
                                                    <Link
                                                        key={sub.path}
                                                        href={sub.path}
                                                        className={`block px-4 py-3 rounded-lg text-xs font-mono uppercase transition-all duration-200 hover:bg-white/5 ${pathname === sub.path ? "text-primary-neon bg-white/5" : "text-muted-foreground hover:text-foreground"
                                                            }`}
                                                    >
                                                        {sub.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
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

            {/* MOBILE MENU */}
            <AnimatePresence>
                {mobileMenu && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-20 left-4 right-4 bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col gap-6 md:hidden shadow-2xl z-50 overflow-hidden"
                    >
                        {navItems.map((item) => (
                            <div key={item.path} className="flex flex-col">
                                <div className="flex items-center justify-between">
                                    <Link
                                        href={item.path}
                                        className={`text-lg font-mono font-bold uppercase tracking-widest ${pathname.startsWith(item.path) && item.path !== "/"
                                            ? "text-primary-neon"
                                            : pathname === item.path ? "text-primary-neon" : "text-foreground"
                                            }`}
                                        onClick={() => !item.subItems && setMobileMenu(false)}
                                    >
                                        <span className="flex items-center gap-2">
                                            {pathname === item.path && <span className="text-secondary-neon">&gt;</span>}
                                            {item.name}
                                        </span>
                                    </Link>
                                    {item.subItems && (
                                        <button
                                            onClick={() => setExpandedMobile(expandedMobile === item.path ? null : item.path)}
                                            className="p-2 text-muted-foreground"
                                        >
                                            <ChevronDown className={`transition-transform duration-300 ${expandedMobile === item.path ? "rotate-180" : ""}`} />
                                        </button>
                                    )}
                                </div>

                                {/* Mobile Submenu */}
                                <AnimatePresence>
                                    {item.subItems && expandedMobile === item.path && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="flex flex-col gap-3 pl-6 pt-3 border-l border-white/10 ml-2 mt-2">
                                                {item.subItems.map(sub => (
                                                    <Link
                                                        key={sub.path}
                                                        href={sub.path}
                                                        className={`text-sm font-mono uppercase tracking-wider ${pathname === sub.path ? "text-primary-neon" : "text-muted-foreground"
                                                            }`}
                                                        onClick={() => setMobileMenu(false)}
                                                    >
                                                        {sub.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}

                        {/* Mobile Footer Actions */}
                        <div className="flex items-center justify-between pt-4 border-t border-white/10">
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
