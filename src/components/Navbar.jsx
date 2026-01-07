"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePageAccent } from "./PageAccent";
import { useTheme } from "./ThemeProvider";

const navItems = [
    { name: "Accueil", path: "/" },
    { name: "Services", path: "/services" },
    { name: "À Propos", path: "/about" }
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);
    const pathname = usePathname();
    const accent = usePageAccent();
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? "py-4" : "py-8"}`}>
            <div className="container mx-auto px-6">
                <div className={`glass px-6 py-3 rounded-full flex items-center justify-between transition-all duration-500 ${scrolled ? "shadow-2xl bg-background/80" : "bg-white/5"}`}>
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

                    <div className="hidden md:flex items-center gap-8">
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
                            AUDIT GRATUIT
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
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
