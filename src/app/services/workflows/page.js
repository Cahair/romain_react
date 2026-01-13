"use client";
import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { Database, Mail, MessageSquare, Zap, Cpu, Bell, CheckCircle2, User, Globe, ArrowRight, Server, FileText, Filter, Users } from "lucide-react";

// --- Components for the Complex Visualization ---

const Node = ({ icon: Icon, label, color, x, y, delay = 0, isMobile = false }) => (
    <motion.div
        className={`${isMobile ? 'relative w-full max-w-[200px]' : 'absolute'} p-4 rounded-2xl border border-${color}-500/30 bg-black/80 backdrop-blur-xl flex flex-col items-center gap-2 shadow-[0_0_30px_-5px_rgba(0,0,0,0.5)] z-20`}
        style={isMobile ? {} : { left: x, top: y }}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay, duration: 0.5 }}
    >
        <div className={`p-3 rounded-xl bg-${color}-500/20 text-${color}-400`}>
            <Icon size={24} />
        </div>
        <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground text-center">{label}</span>
    </motion.div>
);

const Connection = ({ start, end, color = "gray", delay = 0 }) => {
    // Simple straight line or curved implementation could be complex dynamically. 
    // For this specific layout, we'll use SVG paths with hardcoded coordinates relative to the container.
    return (
        <motion.path
            d={`M ${start.x} ${start.y} C ${start.x + 50} ${start.y}, ${end.x - 50} ${end.y}, ${end.x} ${end.y}`}
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeDasharray="10 5"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.4 }}
            transition={{ delay, duration: 1 }}
        />
    );
};

const PulsingPacket = ({ path, delay = 0, color = "#fff" }) => {
    return (
        <motion.circle
            r="4"
            fill={color}
            initial={{ offsetDistance: "0%" }}
            animate={{ offsetDistance: "100%" }}
            transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
                delay
            }}
            style={{ offsetPath: `path("${path}")` }}
        />
    );
};

const MobileArrow = ({ color = "text-gray-600" }) => (
    <div className={`flex justify-center my-4 ${color}`}>
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <ArrowRight className="rotate-90" size={24} />
        </motion.div>
    </div>
);


const ComplexWorkflowVisual = () => {
    return (
        <div className="w-full my-10 md:my-20">
            {/* Mobile View */}
            <div className="md:hidden flex flex-col items-center w-full space-y-2">

                {/* 1. Ingestion */}
                <Node isMobile icon={Globe} label="Webhook / API" color="blue" />

                <MobileArrow color="text-blue-500/50" />

                {/* 2. Enrichment */}
                <div className="flex flex-col items-center w-full">
                    <Node isMobile icon={Database} label="Enrichissement" color="purple" />
                    <div className="mt-2 text-xs text-gray-400 text-center bg-gray-900/50 px-3 py-1 rounded-full border border-gray-800">
                        + LinkedIn, Email
                    </div>
                </div>

                <MobileArrow color="text-purple-500/50" />

                {/* 3. AI Analysis */}
                <div className="flex flex-col items-center w-full">
                    <Node isMobile icon={Cpu} label="Qualif. IA" color="pink" />
                    <div className="mt-2 text-xs text-pink-500 font-bold border border-pink-500/30 px-2 py-1 rounded bg-pink-500/10">
                        Scoring & Intent
                    </div>
                </div>

                <div className="w-full grid grid-cols-2 gap-4 mt-8">
                    {/* Branch Left: Hot */}
                    <div className="flex flex-col items-center">
                        <div className="h-8 w-0.5 bg-gradient-to-b from-pink-500/50 to-emerald-500/50 mb-2"></div>
                        <Node isMobile icon={Zap} label="Priorité Haute" color="emerald" />
                        <div className="flex flex-col gap-2 mt-4 items-center">
                            <span className="flex items-center gap-2 text-[10px] text-emerald-400"><CheckCircle2 size={10} /> Deal CRM</span>
                            <span className="flex items-center gap-2 text-[10px] text-emerald-400"><MessageSquare size={10} /> Slack</span>
                        </div>
                    </div>

                    {/* Branch Right: Cold */}
                    <div className="flex flex-col items-center">
                        <div className="h-8 w-0.5 bg-gradient-to-b from-pink-500/50 to-red-500/50 mb-2"></div>
                        <Node isMobile icon={Filter} label="Nurturing" color="red" />
                        <div className="flex flex-col gap-2 mt-4 items-center">
                            <span className="flex items-center gap-2 text-[10px] text-gray-400"><User size={10} /> Newsletter</span>
                        </div>
                    </div>
                </div>

            </div>

            {/* Desktop View */}
            <div className="hidden md:block relative w-full h-[800px] bg-grid-pattern overflow-hidden rounded-3xl border border-white/10">
                {/* Background Glows */}
                <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]" />

                <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-full h-full absolute inset-0 pointer-events-none">
                        {/* Define Paths for Animation */}
                        <defs>
                            <path id="path1" d="M 150 400 C 250 400, 350 400, 450 400" /> {/* Ingest -> Enrich */}
                            <path id="path2" d="M 550 400 C 650 400, 750 400, 850 400" /> {/* Enrich -> AI */}
                            <path id="path3" d="M 950 400 C 1050 400, 1050 200, 1150 200" /> {/* AI -> Hot */}
                            <path id="path4" d="M 950 400 C 1050 400, 1050 600, 1150 600" /> {/* AI -> Cold */}
                        </defs>

                        {/* Visual Connections */}
                        <Connection start={{ x: 150, y: 400 }} end={{ x: 450, y: 400 }} color="rgba(59, 130, 246, 0.5)" delay={0.2} />
                        <Connection start={{ x: 550, y: 400 }} end={{ x: 850, y: 400 }} color="rgba(168, 85, 247, 0.5)" delay={0.4} />
                        <Connection start={{ x: 950, y: 400 }} end={{ x: 1150, y: 200 }} color="rgba(34, 197, 94, 0.5)" delay={0.6} />
                        <Connection start={{ x: 950, y: 400 }} end={{ x: 1150, y: 600 }} color="rgba(239, 68, 68, 0.5)" delay={0.6} />
                    </svg>

                    {/* Animated Packets along paths - Note: offset-path support in React via style string needs specific handling or just visual simulation */}
                    {/* For reliability, we'll use simple Framer Motion translate animations simulating flow */}

                    {/* Flow 1: Ingest */}
                    <motion.div
                        className="absolute w-3 h-3 bg-blue-400 rounded-full blur-[2px]"
                        initial={{ left: 150, top: 400, opacity: 0 }}
                        animate={{ left: 450, opacity: [0, 1, 1, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />

                    {/* Flow 2: Enrich */}
                    <motion.div
                        className="absolute w-3 h-3 bg-purple-400 rounded-full blur-[2px]"
                        initial={{ left: 550, top: 400, opacity: 0 }}
                        animate={{ left: 850, opacity: [0, 1, 1, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    />

                    {/* Flow 3: Hot Leads */}
                    <motion.div
                        className="absolute w-3 h-3 bg-emerald-400 rounded-full blur-[2px]"
                        initial={{ left: 950, top: 400, opacity: 0 }}
                        animate={{ left: 1150, top: 200, opacity: [0, 1, 1, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    />

                    {/* Flow 4: Cold Leads */}
                    <motion.div
                        className="absolute w-3 h-3 bg-red-400 rounded-full blur-[2px]"
                        initial={{ left: 950, top: 400, opacity: 0 }}
                        animate={{ left: 1150, top: 600, opacity: [0, 1, 1, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
                    />
                </div>

                {/* Nodes Positioned Absolute */}
                {/* 1. Ingestion */}
                <div className="absolute top-1/2 left-[10%] -translate-y-1/2 -translate-x-1/2">
                    <Node icon={Globe} label="Webhook / API" color="blue" x={0} y={0} delay={0} />
                </div>

                {/* 2. Data Enrichment */}
                <div className="absolute top-1/2 left-[35%] -translate-y-1/2 -translate-x-1/2">
                    <Node icon={Database} label="Enrichissement" color="purple" x={0} y={0} delay={0.2} />
                    <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-gray-500">
                        + LinkedIn, Email, Company Data
                    </div>
                </div>

                {/* 3. AI Analysis */}
                <div className="absolute top-1/2 left-[60%] -translate-y-1/2 -translate-x-1/2">
                    <Node icon={Cpu} label="Qualif. IA" color="pink" x={0} y={0} delay={0.4} />
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-pink-500 font-bold border border-pink-500/30 px-2 py-1 rounded bg-pink-500/10">
                        Scoring & Intent
                    </div>
                </div>

                {/* 4. Branches */}
                {/* Hot Lead */}
                <div className="absolute top-[25%] right-[10%] -translate-y-1/2 -translate-x-1/2">
                    <Node icon={Zap} label="Priorité Haute" color="emerald" x={0} y={0} delay={0.6} />
                    <div className="flex flex-col gap-2 mt-4 ml-8">
                        <span className="flex items-center gap-2 text-xs text-emerald-400"><CheckCircle2 size={12} /> Création Deal CRM</span>
                        <span className="flex items-center gap-2 text-xs text-emerald-400"><MessageSquare size={12} /> Slack Alert Sales</span>
                        <span className="flex items-center gap-2 text-xs text-emerald-400"><Mail size={12} /> Email Personnalisé</span>
                    </div>
                </div>

                {/* Cold Lead */}
                <div className="absolute bottom-[25%] right-[10%] translate-y-1/2 -translate-x-1/2">
                    <Node icon={Filter} label="Nurturing" color="red" x={0} y={0} delay={0.6} />
                    <div className="flex flex-col gap-2 mt-4 ml-8">
                        <span className="flex items-center gap-2 text-xs text-gray-400"><User size={12} /> Ajout Newsletter</span>
                        <span className="flex items-center gap-2 text-xs text-gray-400"><Server size={12} /> Update Database</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function WorkflowsPage() {
    return (
        <main className="bg-background min-h-screen text-foreground selection:bg-primary-neon selection:text-white overflow-x-hidden">
            <Navbar />

            <div className="pt-32 pb-20 container mx-auto px-4 md:px-6">
                {/* Header */}
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary-neon text-xs font-mono uppercase tracking-widest mb-6"
                    >
                        <Zap size={14} />
                        Workflow Signature
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-display font-black uppercase tracking-tighter leading-none mb-6"
                    >
                        Lead Gen <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Autopilot</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
                    >
                        Un système complet, autonome et intelligent qui transforme vos visiteurs en opportunités qualifiées sans intervention humaine.
                    </motion.p>
                </div>

                {/* The Complex Visualization */}
                <ComplexWorkflowVisual />

                {/* Workflow Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-colors"
                    >
                        <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 mb-4">
                            <Globe size={24} />
                        </div>
                        <h3 className="text-xl font-bold mb-3">1. Capture & Enrichissement</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Dès qu'un lead soumet un formulaire, le système l'intercepte. Nous interrogeons instantanément des bases de données externes (Clearbit, Apollo) pour récupérer poste, taille d'entreprise et stack technique.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-colors"
                    >
                        <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center text-purple-400 mb-4">
                            <Cpu size={24} />
                        </div>
                        <h3 className="text-xl font-bold mb-3">2. Analyse IA</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Un LLM (GPT-4o) analyse le profil enrichi. Il score le lead de 0 à 100 selon votre ICP, détecte l'intention d'achat et décide de la stratégie à adopter.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/30 transition-colors"
                    >
                        <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-400 mb-4">
                            <Zap size={24} />
                        </div>
                        <h3 className="text-xl font-bold mb-3">3. Action Ciblée</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            <strong className="text-emerald-400">Hot Leads :</strong> Slack immédiat aux sales + Draft email ultra-personnalisé envoyé dans le CRM.
                            <br /><br />
                            <strong className="text-red-400">Autres :</strong> Ajout sequence nurturing éducative.
                        </p>
                    </motion.div>
                </div>

                {/* CTA */}
                <div className="flex justify-center mt-20">
                    <Link href="/contact" className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-primary-dark px-8 font-medium text-white transition-all duration-300 hover:bg-primary hover:scale-105 hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]">
                        <span className="mr-2">Installer ce système</span>
                        <ArrowRight className="transition-transform group-hover:translate-x-1" size={20} />
                        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 translate-x-[-100%] group-hover:animate-shine" />
                    </Link>
                </div>
            </div>

            <Footer />
        </main>
    );
}
