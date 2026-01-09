"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    Globe,
    Linkedin,
    MapPin,
    Cpu,
    Sparkles,
    Mail,
    Calendar,
    TrendingUp,
    Search
} from "lucide-react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.3,
            delayChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { type: "spring", stiffness: 100 }
    }
};

export default function LeadGenPage() {
    return (
        <div className="min-h-screen bg-background text-foreground overflow-hidden font-sans selection:bg-primary/30">
            <Navbar />

            <main className="pt-32 pb-20 container mx-auto px-4 relative">
                {/* Background Elements */}
                <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse-slow" />
                <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -z-10 animate-pulse-slow delay-1000" />

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        <span className="text-gradient">Lead Gen IA</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Un système d'acquisition automatisé et hyper-ciblé.
                    </p>
                </motion.div>

                {/* FUNNEL CONTAINER */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-4xl mx-auto flex flex-col items-center gap-2 relative"
                >
                    {/* STEP 1: TOP (Wide) */}
                    <motion.div
                        variants={itemVariants}
                        className="w-full relative group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent blur-md -z-10 rounded-xl" />
                        <div
                            className="w-full bg-card/80 backdrop-blur-md border border-primary/30 rounded-t-3xl rounded-b-lg p-8 md:p-12 relative overflow-hidden"
                            style={{
                                clipPath: "polygon(0 0, 100% 0, 95% 100%, 5% 100%)"
                            }}
                        >
                            <div className="flex flex-col md:flex-row items-center justify-between gap-8 px-4 md:px-12">
                                <div className="flex-1 text-center md:text-left">
                                    <h2 className="text-2xl font-bold text-primary mb-2">Ciblage & Scraping</h2>
                                    <p className="text-muted-foreground font-medium">
                                        Identification de vos prospects idéaux sur tout le web.
                                    </p>
                                </div>

                                {/* Visual Icons */}
                                <div className="flex items-center gap-6 text-primary animate-float">
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="p-3 bg-primary/10 rounded-lg">
                                            <Linkedin size={32} />
                                        </div>
                                        <span className="text-xs font-mono opacity-70">LinkedIn</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="p-3 bg-primary/10 rounded-lg">
                                            <MapPin size={32} />
                                        </div>
                                        <span className="text-xs font-mono opacity-70">Maps</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="p-3 bg-primary/10 rounded-lg">
                                            <Globe size={32} />
                                        </div>
                                        <span className="text-xs font-mono opacity-70">Web</span>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative Lines */}
                            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
                        </div>
                    </motion.div>

                    {/* Connection Line 1 */}
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 40 }}
                        transition={{ delay: 1, duration: 0.5 }}
                        className="w-[2px] bg-gradient-to-b from-primary/50 to-secondary/50"
                    />

                    {/* STEP 2: MIDDLE (Medium) */}
                    <motion.div
                        variants={itemVariants}
                        className="w-[85%] relative group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-transparent blur-md -z-10 rounded-xl" />
                        <div
                            className="w-full bg-card/80 backdrop-blur-md border border-secondary/30 rounded-lg p-8 md:p-10 relative overflow-hidden"
                            style={{
                                clipPath: "polygon(0 0, 100% 0, 90% 100%, 10% 100%)"
                            }}
                        >
                            <div className="flex flex-col md:flex-row-reverse items-center justify-between gap-8 px-4 md:px-8">
                                <div className="flex-1 text-center md:text-right">
                                    <h2 className="text-2xl font-bold text-secondary mb-2">Enrichissement & IA</h2>
                                    <p className="text-muted-foreground font-medium">
                                        Qualification et écriture de messages hyper-personnalisés par l'IA.
                                    </p>
                                </div>

                                {/* Visual Icons */}
                                <div className="flex items-center gap-6 text-secondary">
                                    <div className="relative p-4 bg-secondary/10 rounded-full border border-secondary/20 shadow-neon-violet">
                                        <Cpu size={40} className="animate-pulse" />
                                        <Sparkles size={20} className="absolute -top-2 -right-2 text-yellow-400 animate-spin-slow" />
                                    </div>
                                    <div className="h-12 w-[1px] bg-secondary/30 hidden md:block" />
                                    <Mail size={32} className="opacity-80" />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Connection Line 2 */}
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 40 }}
                        transition={{ delay: 1.2, duration: 0.5 }}
                        className="w-[2px] bg-gradient-to-b from-secondary/50 to-accent/50"
                    />

                    {/* STEP 3: BOTTOM (Narrow) */}
                    <motion.div
                        variants={itemVariants}
                        className="w-[60%] relative group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent blur-md -z-10 rounded-xl" />
                        <div
                            className="w-full bg-card/80 backdrop-blur-md border border-accent/30 rounded-t-lg rounded-b-3xl p-8 md:p-10 relative overflow-hidden"
                            style={{
                                clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
                            }}
                        >
                            <div className="flex flex-col items-center text-center gap-6">
                                {/* Visual Icons */}
                                <div className="flex items-center gap-4 text-accent mb-2">
                                    <div className="p-4 bg-accent/10 rounded-full shadow-neon-cyan ring-1 ring-accent/50">
                                        <Calendar size={48} />
                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-2xl font-bold text-accent mb-2">Conversion</h2>
                                    <p className="text-muted-foreground font-medium">
                                        Des leads chauds livrés directement dans votre agenda.
                                    </p>
                                </div>

                                <div className="flex items-center gap-2 text-sm text-green-400 font-mono bg-green-900/20 px-3 py-1 rounded-full">
                                    <TrendingUp size={16} />
                                    <span>+300% ROI</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="text-center mt-20"
                >
                    <a
                        href="/contact"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-full hover:scale-105 transition-transform shadow-lg shadow-primary/25"
                    >
                        <span>Lancer ma campagne</span>
                        <Sparkles size={18} />
                    </a>
                </motion.div>

            </main>
            <Footer />
        </div>
    );
}
