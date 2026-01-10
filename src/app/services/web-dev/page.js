"use client";
import { motion } from "framer-motion";
import { ArrowRight, Globe, Zap, BarChart3, Code, Layers, Database, Server, Smartphone, LineChart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function WebDevPage() {
    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-blue-500/30 selection:text-white">
            <Navbar />

            <main className="relative overflow-hidden">
                {/* Background Elements */}
                <div className="fixed inset-0 z-0 pointer-events-none">
                    <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] mix-blend-screen" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] mix-blend-screen" />
                </div>

                {/* SECTION 1: HERO - Full Screen Browser Mockup */}
                <section className="relative min-h-screen flex flex-col justify-center items-center px-4 md:px-8 py-8 pt-24">
                    {/* Ambient Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 blur-3xl opacity-40" />

                    {/* Giant Browser Window - Takes 90% of viewport with navbar clearance */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="relative w-full max-w-[95vw] h-[82vh] z-10"
                    >
                        {/* Browser Chrome */}
                        <div className="relative w-full h-full backdrop-blur-md bg-black/70 border border-blue-500/40 rounded-xl overflow-hidden shadow-[0_0_80px_rgba(59,130,246,0.4)]">

                            {/* Browser Header */}
                            <motion.div
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.6 }}
                                className="bg-black/90 border-b border-white/10 px-4 md:px-6 py-3 md:py-4 flex items-center gap-3"
                            >
                                {/* Traffic Lights */}
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 md:w-3.5 md:h-3.5 rounded-full bg-red-500" />
                                    <div className="w-3 h-3 md:w-3.5 md:h-3.5 rounded-full bg-yellow-500" />
                                    <div className="w-3 h-3 md:w-3.5 md:h-3.5 rounded-full bg-green-500" />
                                </div>
                                {/* Address Bar */}
                                <div className="flex-1 ml-4 bg-white/5 rounded-lg px-4 py-2 text-xs md:text-sm font-mono text-gray-400 flex items-center gap-2">
                                    <Globe className="w-4 h-4 text-blue-400" />
                                    <span>https://votre-projet-sur-mesure.com</span>
                                </div>
                            </motion.div>

                            {/* Browser Content - Hero Content Inside */}
                            <div className="relative h-[calc(100%-60px)] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
                                {/* Grid Pattern Background */}
                                <div className="absolute inset-0 opacity-[0.03]">
                                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f620_1px,transparent_1px),linear-gradient(to_bottom,#3b82f620_1px,transparent_1px)] bg-[size:4rem_4rem]" />
                                </div>

                                {/* Decorative Elements */}
                                <motion.div
                                    animate={{
                                        scale: [1, 1.1, 1],
                                        opacity: [0.1, 0.15, 0.1],
                                    }}
                                    transition={{ duration: 8, repeat: Infinity }}
                                    className="absolute top-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
                                />
                                <motion.div
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        opacity: [0.1, 0.15, 0.1],
                                    }}
                                    transition={{ duration: 10, repeat: Infinity, delay: 1 }}
                                    className="absolute bottom-20 left-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
                                />

                                {/* Main Content Container - Centered */}
                                <div className="relative h-full flex flex-col items-center justify-center px-6 md:px-12 lg:px-20 text-center">

                                    {/* Overline */}
                                    <motion.span
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.5 }}
                                        className="inline-block font-mono text-blue-400 text-xs md:text-sm tracking-[0.3em] uppercase mb-6 md:mb-8"
                                    >
                                        // Développement Web Sur-Mesure
                                    </motion.span>

                                    {/* Main Title */}
                                    <motion.h1
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8, delay: 0.7 }}
                                        className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold uppercase leading-[0.95] tracking-tight mb-6 md:mb-8 max-w-5xl"
                                    >
                                        Développez Votre{" "}
                                        <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 drop-shadow-[0_0_60px_rgba(59,130,246,0.8)]">
                                            Interface
                                        </span>
                                        <span className="block mt-2">
                                            selon vos <span className="text-blue-400 drop-shadow-[0_0_40px_rgba(59,130,246,0.6)]">GOÛTS</span>
                                        </span>
                                    </motion.h1>

                                    {/* Subtitle */}
                                    <motion.p
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.9 }}
                                        className="text-base md:text-lg lg:text-xl text-gray-400 max-w-3xl mb-10 md:mb-12 leading-relaxed font-light"
                                    >
                                        Des interfaces web sur-mesure pensées pour votre métier. Du design à la production,
                                        nous codons l'expérience parfaite pour vos utilisateurs.
                                    </motion.p>

                                    {/* CTA Button */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 1.1 }}
                                    >
                                        <Link
                                            href="/contact"
                                            className="group inline-flex items-center gap-3 px-8 md:px-10 py-4 md:py-5 bg-blue-500 hover:bg-blue-600 text-white font-bold uppercase tracking-widest text-sm md:text-base transition-all duration-300 shadow-[0_0_40px_rgba(59,130,246,0.5)] hover:shadow-[0_0_60px_rgba(59,130,246,0.7)] hover:scale-105"
                                        >
                                            Discuter de mon projet
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </motion.div>

                                    {/* Decorative UI Elements - Bottom Corners */}
                                    <motion.div
                                        initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 1.3, duration: 0.8 }}
                                        className="absolute bottom-8 left-8 hidden lg:block"
                                    >
                                        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-lg p-4 space-y-3 w-64">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-400 rounded flex items-center justify-center">
                                                    <Code className="w-5 h-5 text-white" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="h-2 w-full bg-white/20 rounded mb-2" />
                                                    <div className="h-2 w-2/3 bg-white/10 rounded" />
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <motion.div
                                                    className="flex-1 h-16 bg-gradient-to-t from-blue-500/40 to-blue-400/20 rounded-t"
                                                    animate={{ height: ["2rem", "3.5rem", "2.5rem"] }}
                                                    transition={{ duration: 3, repeat: Infinity }}
                                                />
                                                <motion.div
                                                    className="flex-1 h-16 bg-gradient-to-t from-cyan-500/40 to-cyan-400/20 rounded-t"
                                                    animate={{ height: ["3rem", "4rem", "3.2rem"] }}
                                                    transition={{ duration: 3, repeat: Infinity, delay: 0.3 }}
                                                />
                                                <motion.div
                                                    className="flex-1 h-16 bg-gradient-to-t from-blue-500/40 to-blue-400/20 rounded-t"
                                                    animate={{ height: ["2.5rem", "3rem", "2.2rem"] }}
                                                    transition={{ duration: 3, repeat: Infinity, delay: 0.6 }}
                                                />
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Code Snippet - Bottom Right */}
                                    <motion.div
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 1.5, duration: 0.8 }}
                                        className="absolute bottom-8 right-8 hidden lg:block"
                                    >
                                        <div className="backdrop-blur-md bg-black/80 border border-blue-500/40 rounded-lg px-4 py-3 font-mono text-xs text-blue-400 shadow-lg space-y-1">
                                            <div className="flex gap-2">
                                                <span className="text-purple-400">const</span>
                                                <span className="text-cyan-400">design</span>
                                                <span className="text-white">=</span>
                                                <span className="text-green-400">"custom"</span>
                                            </div>
                                            <div className="flex gap-2">
                                                <span className="text-purple-400">const</span>
                                                <span className="text-cyan-400">quality</span>
                                                <span className="text-white">=</span>
                                                <span className="text-green-400">"premium"</span>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Top floating element */}
                                    <motion.div
                                        initial={{ opacity: 0, y: -30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 1.4, duration: 0.8 }}
                                        className="absolute top-8 right-8 hidden xl:block"
                                    >
                                        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-lg px-4 py-2 flex items-center gap-3">
                                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                                                <Zap className="w-4 h-4 text-white" />
                                            </div>
                                            <div className="text-xs text-gray-300 font-mono">Performance optimale</div>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* SECTION 2: PHILOSOPHIE */}
                <section className="relative py-20 px-6">
                    <div className="container mx-auto max-w-3xl text-center relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="backdrop-blur-md bg-white/[0.02] border border-white/10 p-8 md:p-12"
                        >
                            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto mb-6" />
                            <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light">
                                Un site web n'est plus une simple vitrine. C'est le{" "}
                                <span className="text-blue-400 font-medium">système nerveux</span> de votre entreprise.{" "}
                                Nous refusons les templates obsolètes pour coder des solutions{" "}
                                <span className="text-cyan-400 font-medium">sur-mesure</span>, rapides et évolutives.
                            </p>
                            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto mt-6" />
                        </motion.div>
                    </div>
                </section>

                {/* SECTION 3: LE CŒUR DE L'OFFRE - ZIG-ZAG LAYOUT */}
                <section className="relative py-32 px-6">
                    <div className="container mx-auto max-w-7xl relative z-10">
                        {/* Header */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-20 text-center"
                        >
                            <span className="font-mono text-blue-400 text-sm tracking-[0.3em] uppercase block mb-4">
                                // Notre Expertise
                            </span>
                            <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tight">
                                Le Cœur de <span className="text-blue-400">l'Offre</span>
                            </h2>
                        </motion.div>

                        <div className="space-y-32">
                            {/* BLOC 1: Sites Web & Corporate - Visual Left / Text Right */}
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8 }}
                                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                            >
                                {/* Visual Left */}
                                <div className="relative group order-2 lg:order-1">
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                                    <div className="relative aspect-square bg-black/40 backdrop-blur-md border border-blue-500/20 p-12 flex items-center justify-center group-hover:border-blue-400/40 transition-all duration-500">
                                        {/* Website Icon Animation */}
                                        <motion.div
                                            animate={{
                                                scale: [1, 1.05, 1],
                                                rotate: [0, 2, 0, -2, 0],
                                            }}
                                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                            className="relative"
                                        >
                                            <Globe className="w-32 h-32 text-blue-400/60" strokeWidth={1} />
                                            <motion.div
                                                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                                                transition={{ duration: 3, repeat: Infinity }}
                                                className="absolute inset-0 border-2 border-blue-400/30 rounded-full"
                                            />
                                        </motion.div>
                                    </div>
                                </div>

                                {/* Text Right */}
                                <div className="order-1 lg:order-2">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 text-blue-400 text-xs font-mono uppercase tracking-wider mb-6">
                                        <Globe className="w-3 h-3" />
                                        Vitrine Digitale
                                    </div>
                                    <h3 className="font-display text-3xl md:text-5xl font-bold uppercase mb-6 text-white">
                                        Vitesse, SEO & <span className="text-blue-400">Conversion</span>
                                    </h3>
                                    <p className="text-gray-400 text-lg leading-relaxed font-light">
                                        Des sites vitrines qui chargent instantanément et captent vos prospects. Une architecture
                                        technique pensée pour le référencement naturel dès la première ligne de code.
                                    </p>
                                    <div className="mt-8 flex flex-wrap gap-2">
                                        <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono uppercase">Next.js</span>
                                        <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono uppercase">React</span>
                                        <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono uppercase">Tailwind</span>
                                    </div>
                                </div>
                            </motion.div>

                            {/* BLOC 2: Web Apps & SaaS - Text Left / Visual Right */}
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8 }}
                                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                            >
                                {/* Text Left */}
                                <div>
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-6">
                                        <Code className="w-3 h-3" />
                                        Applications Métier
                                    </div>
                                    <h3 className="font-display text-3xl md:text-5xl font-bold uppercase mb-6 text-white">
                                        Applications Métier <span className="text-cyan-400">Sur-Mesure</span>
                                    </h3>
                                    <p className="text-gray-400 text-lg leading-relaxed font-light">
                                        Transformez vos processus complexes en interfaces fluides (React/Vue). Des outils internes
                                        sécurisés pour faire gagner du temps à vos équipes.
                                    </p>
                                    <div className="mt-8 flex flex-wrap gap-2">
                                        <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono uppercase">React</span>
                                        <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono uppercase">Node.js</span>
                                        <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono uppercase">PostgreSQL</span>
                                    </div>
                                </div>

                                {/* Visual Right */}
                                <div className="relative group">
                                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                                    <div className="relative aspect-square bg-black/40 backdrop-blur-md border border-cyan-500/20 p-12 flex items-center justify-center group-hover:border-cyan-400/40 transition-all duration-500">
                                        {/* App Layers Animation */}
                                        <div className="relative w-full h-full flex items-center justify-center">
                                            <motion.div
                                                animate={{ y: [0, -10, 0] }}
                                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                                className="absolute w-32 h-24 border-2 border-cyan-400/60 bg-cyan-500/5 backdrop-blur-sm"
                                            >
                                                <div className="p-3 space-y-2">
                                                    <div className="h-1 w-16 bg-cyan-400/40 rounded" />
                                                    <div className="h-1 w-12 bg-cyan-400/30 rounded" />
                                                    <div className="h-1 w-20 bg-cyan-400/20 rounded" />
                                                </div>
                                            </motion.div>
                                            <motion.div
                                                animate={{ y: [0, 10, 0] }}
                                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                                                className="absolute w-32 h-24 border-2 border-cyan-400/40 bg-cyan-500/5 backdrop-blur-sm translate-y-8 translate-x-8"
                                            >
                                                <div className="p-3 space-y-2">
                                                    <div className="h-1 w-12 bg-cyan-400/30 rounded" />
                                                    <div className="h-1 w-16 bg-cyan-400/20 rounded" />
                                                </div>
                                            </motion.div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* BLOC 3: Dashboards Intelligents - Visual Left / Text Right */}
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8 }}
                                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                            >
                                {/* Visual Left */}
                                <div className="relative group order-2 lg:order-1">
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                                    <div className="relative aspect-square bg-black/40 backdrop-blur-md border border-blue-500/20 p-12 flex items-center justify-center group-hover:border-blue-400/40 transition-all duration-500">
                                        {/* Dashboard Chart Animation */}
                                        <div className="relative w-full h-full flex items-center justify-center">
                                            <BarChart3 className="w-32 h-32 text-blue-400/60" strokeWidth={1} />
                                            <motion.div
                                                className="absolute bottom-8 left-8 flex gap-2 items-end h-20"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 0.6 }}
                                            >
                                                <motion.div
                                                    className="w-3 bg-blue-400/60 rounded-t"
                                                    animate={{ height: ["30%", "60%", "40%"] }}
                                                    transition={{ duration: 3, repeat: Infinity }}
                                                />
                                                <motion.div
                                                    className="w-3 bg-cyan-400/60 rounded-t"
                                                    animate={{ height: ["50%", "80%", "60%"] }}
                                                    transition={{ duration: 3, repeat: Infinity, delay: 0.3 }}
                                                />
                                                <motion.div
                                                    className="w-3 bg-blue-400/60 rounded-t"
                                                    animate={{ height: ["40%", "70%", "50%"] }}
                                                    transition={{ duration: 3, repeat: Infinity, delay: 0.6 }}
                                                />
                                            </motion.div>
                                        </div>
                                    </div>
                                </div>

                                {/* Text Right */}
                                <div className="order-1 lg:order-2">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 text-blue-400 text-xs font-mono uppercase tracking-wider mb-6">
                                        <BarChart3 className="w-3 h-3" />
                                        Intelligence Visuelle
                                    </div>
                                    <h3 className="font-display text-3xl md:text-5xl font-bold uppercase mb-6 text-white">
                                        Pilotage de <span className="text-blue-400">l'IA</span> & Data
                                    </h3>
                                    <p className="text-gray-400 text-lg leading-relaxed font-light">
                                        L'interface de contrôle de vos agents IA. Visualisez vos données en temps réel et
                                        interagissez avec vos modèles via des tableaux de bord dynamiques.
                                    </p>
                                    <div className="mt-8 flex flex-wrap gap-2">
                                        <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono uppercase">Chart.js</span>
                                        <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono uppercase">D3.js</span>
                                        <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono uppercase">Real-time</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* SECTION 4: STACK TECHNIQUE */}
                <section className="relative py-20 px-6">
                    <div className="container mx-auto max-w-6xl relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-12"
                        >
                            <span className="font-mono text-blue-400 text-sm tracking-[0.3em] uppercase block mb-4">
                                // Technologies Maîtrisées
                            </span>
                            <h2 className="font-display text-3xl md:text-5xl font-bold uppercase tracking-tight">
                                Stack <span className="text-blue-400">Technique</span>
                            </h2>
                        </motion.div>

                        {/* Technologies Grid */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
                        >
                            {[
                                { name: "React", icon: Code },
                                { name: "Next.js", icon: Zap },
                                { name: "Node.js", icon: Server },
                                { name: "Python", icon: Code },
                                { name: "Tailwind", icon: Layers },
                                { name: "Supabase", icon: Database }
                            ].map((tech, index) => (
                                <motion.div
                                    key={tech.name}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group relative backdrop-blur-md bg-white/[0.02] border border-white/10 hover:border-blue-400/40 p-6 transition-all duration-300 cursor-default"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/10 group-hover:to-cyan-500/10 transition-all duration-500" />
                                    <div className="relative flex flex-col items-center gap-3">
                                        <tech.icon className="w-8 h-8 text-blue-400/60 group-hover:text-blue-400 transition-colors" />
                                        <span className="font-mono text-sm text-gray-400 group-hover:text-white uppercase tracking-wider transition-colors">
                                            {tech.name}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* SECTION 5: CTA FINALE */}
                <section className="relative py-32 px-6">
                    <div className="container mx-auto max-w-5xl relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative backdrop-blur-md bg-white/[0.02] border border-blue-500/20 p-12 md:p-20 text-center overflow-hidden group"
                        >
                            {/* Decorative Corners */}
                            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-400/40" />
                            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-blue-400/40" />
                            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-blue-400/40" />
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-400/40" />

                            {/* Animated Background Glow */}
                            <motion.div
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.1, 0.2, 0.1],
                                }}
                                transition={{ duration: 5, repeat: Infinity }}
                                className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 blur-3xl pointer-events-none"
                            />

                            {/* Content */}
                            <div className="relative z-10">
                                <span className="font-mono text-blue-400 text-sm tracking-[0.3em] uppercase block mb-6">
                                    // Prêt à construire ?
                                </span>
                                <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold uppercase mb-6 tracking-tight">
                                    Prêt à construire votre{" "}
                                    <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                                        Infrastructure ?
                                    </span>
                                </h2>
                                <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10 font-light">
                                    Discutons de votre projet et bâtissons ensemble l'architecture web qui transformera votre
                                    vision en réalité.
                                </p>
                                <Link
                                    href="/contact"
                                    className="group inline-flex items-center gap-3 px-10 py-5 bg-blue-500 hover:bg-blue-600 text-white font-bold uppercase tracking-widest text-sm transition-all duration-300 shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:shadow-[0_0_50px_rgba(59,130,246,0.6)] hover:scale-105"
                                >
                                    Démarrer le Projet
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>

            <Footer />
        </div >
    );
}
