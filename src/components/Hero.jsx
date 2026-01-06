"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const typewriterText = [
    "système intelligent.",
    "croissance automatisée.",
    "futur compétitif.",
];

export default function Hero() {
    const [textIndex, setTextIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentText = typewriterText[textIndex];
        const speed = isDeleting ? 50 : 100;

        const timeout = setTimeout(() => {
            if (!isDeleting && displayText === currentText) {
                setTimeout(() => setIsDeleting(true), 2000);
            } else if (isDeleting && displayText === "") {
                setIsDeleting(false);
                setTextIndex((prev) => (prev + 1) % typewriterText.length);
            } else {
                setDisplayText(
                    isDeleting
                        ? currentText.substring(0, displayText.length - 1)
                        : currentText.substring(0, displayText.length + 1)
                );
            }
        }, speed);

        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, textIndex]);

    return (
        <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden">
            {/* Background Effect */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] animate-pulse delay-1000" />
            </div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-none">
                        Ne construisez pas <br />
                        <span className="text-white">juste un site.</span> <br />
                        <span className="text-gradient">Construisez un </span>
                        <span className="inline-block min-w-[300px] text-primary">
                            {displayText}
                            <span className="animate-pulse">|</span>
                        </span>
                    </h1>

                    <p className="text-gray-400 text-lg md:text-2xl max-w-3xl mx-auto mb-12">
                        L'Agence AI qui automatise votre croissance et transforme vos opérations en un moteur de performance autonome.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <Link href="/contact" className="group relative px-8 py-4 bg-primary rounded-full font-bold text-background transition-all hover:scale-105 active:scale-95 shadow-neon-cyan">
                            Auditer mon business
                            <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link href="/services" className="px-8 py-4 glass rounded-full font-bold transition-all hover:bg-white/10 active:scale-95">
                            Voir nos solutions
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Floating Elements */}
            <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/3 right-10 md:right-20 hidden lg:block"
            >
                <div className="glass p-4 rounded-2xl w-48 shadow-neon-violet">
                    <div className="h-2 w-12 bg-secondary rounded-full mb-3" />
                    <div className="h-2 w-full bg-white/10 rounded-full mb-2" />
                    <div className="h-2 w-3/4 bg-white/10 rounded-full" />
                </div>
            </motion.div>
        </section>
    );
}
