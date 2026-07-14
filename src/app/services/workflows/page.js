"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { Database, Mail, MessageSquare, Zap, Cpu, Bell, CheckCircle2, User, Globe, ArrowRight, Server, FileText, Filter, Users } from "lucide-react";
import { useTranslation } from "../../../components/LanguageProvider";
import Button from "../../../components/ui/Button";

// --- Components for the Complex Visualization ---

// Classes statiques : Tailwind ne compile pas les classes construites dynamiquement (`border-${color}-...`).
const nodeStyles = {
    blue: { border: "border-blue-500/30", icon: "bg-blue-500/20 text-blue-400" },
    purple: { border: "border-purple-500/30", icon: "bg-purple-500/20 text-purple-400" },
    pink: { border: "border-pink-500/30", icon: "bg-pink-500/20 text-pink-400" },
    emerald: { border: "border-emerald-500/30", icon: "bg-emerald-500/20 text-emerald-400" },
    red: { border: "border-red-500/30", icon: "bg-red-500/20 text-red-400" },
};

const Node = ({ icon: Icon, label, color, x, y, delay = 0, isMobile = false }) => {
    const style = nodeStyles[color] || nodeStyles.blue;
    return (
        <motion.div
            className={`${isMobile ? 'relative w-full max-w-[200px]' : 'absolute'} p-4 rounded-2xl border ${style.border} bg-card/90 backdrop-blur-xl flex flex-col items-center gap-2 shadow-[0_0_30px_-5px_rgba(0,0,0,0.5)] z-20`}
            style={isMobile ? {} : { left: x, top: y }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay, duration: 0.5 }}
        >
            <div className={`p-3 rounded-xl ${style.icon}`}>
                <Icon size={24} />
            </div>
            <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground text-center">{label}</span>
        </motion.div>
    );
};

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


const ComplexWorkflowVisual = ({ t }) => {
    return (
        <div className="w-full my-10 md:my-20">
            {/* Mobile View */}
            <div className="md:hidden flex flex-col items-center w-full space-y-2">

                {/* 1. Ingestion */}
                <Node isMobile icon={Globe} label="Webhook / API" color="blue" />

                <MobileArrow color="text-blue-500/50" />

                {/* 2. Enrichment */}
                <div className="flex flex-col items-center w-full">
                    <Node isMobile icon={Database} label={t("workflowsPage.viz.enrichment")} color="purple" />
                    <div className="mt-2 text-xs text-gray-400 text-center bg-gray-900/50 px-3 py-1 rounded-full border border-gray-800">
                        {t("workflowsPage.viz.linkedinDataShort")}
                    </div>
                </div>

                <MobileArrow color="text-purple-500/50" />

                {/* 3. AI Analysis */}
                <div className="flex flex-col items-center w-full">
                    <Node isMobile icon={Cpu} label={t("workflowsPage.viz.aiQualif")} color="pink" />
                    <div className="mt-2 text-xs text-pink-500 font-bold border border-pink-500/30 px-2 py-1 rounded bg-pink-500/10">
                        {t("workflowsPage.viz.scoring")}
                    </div>
                </div>

                <div className="w-full grid grid-cols-2 gap-4 mt-8">
                    {/* Branch Left: Hot */}
                    <div className="flex flex-col items-center">
                        <div className="h-8 w-0.5 bg-gradient-to-b from-pink-500/50 to-emerald-500/50 mb-2"></div>
                        <Node isMobile icon={Zap} label={t("workflowsPage.viz.highPriority")} color="emerald" />
                        <div className="flex flex-col gap-2 mt-4 items-center">
                            <span className="flex items-center gap-2 text-[10px] text-emerald-400"><CheckCircle2 size={10} /> Deal CRM</span>
                            <span className="flex items-center gap-2 text-[10px] text-emerald-400"><MessageSquare size={10} /> Slack</span>
                        </div>
                    </div>

                    {/* Branch Right: Cold */}
                    <div className="flex flex-col items-center">
                        <div className="h-8 w-0.5 bg-gradient-to-b from-pink-500/50 to-red-500/50 mb-2"></div>
                        <Node isMobile icon={Filter} label={t("workflowsPage.viz.nurturing")} color="red" />
                        <div className="flex flex-col gap-2 mt-4 items-center">
                            <span className="flex items-center gap-2 text-[10px] text-gray-400"><User size={10} /> Newsletter</span>
                        </div>
                    </div>
                </div>

            </div>

            {/* Desktop View */}
            <div className="hidden md:block relative w-full h-[800px] bg-grid-pattern overflow-hidden rounded-2xl border border-border">
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
                        <Connection start={{ x: 550, y: 400 }} end={{ x: 850, y: 400 }} color="rgba(79,70,229, 0.5)" delay={0.4} />
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
                    <Node icon={Database} label={t("workflowsPage.viz.enrichment")} color="purple" x={0} y={0} delay={0.2} />
                    <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-gray-500">
                        {t("workflowsPage.viz.linkedinData")}
                    </div>
                </div>

                {/* 3. AI Analysis */}
                <div className="absolute top-1/2 left-[60%] -translate-y-1/2 -translate-x-1/2">
                    <Node icon={Cpu} label={t("workflowsPage.viz.aiQualif")} color="pink" x={0} y={0} delay={0.4} />
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-pink-500 font-bold border border-pink-500/30 px-2 py-1 rounded bg-pink-500/10">
                        {t("workflowsPage.viz.scoring")}
                    </div>
                </div>

                {/* 4. Branches */}
                {/* Hot Lead */}
                <div className="absolute top-[25%] right-[10%] -translate-y-1/2 -translate-x-1/2">
                    <Node icon={Zap} label={t("workflowsPage.viz.highPriority")} color="emerald" x={0} y={0} delay={0.6} />
                    <div className="flex flex-col gap-2 mt-4 ml-8">
                        <span className="flex items-center gap-2 text-xs text-emerald-400"><CheckCircle2 size={12} /> {t("workflowsPage.viz.dealCrm")}</span>
                        <span className="flex items-center gap-2 text-xs text-emerald-400"><MessageSquare size={12} /> {t("workflowsPage.viz.slackSales")}</span>
                        <span className="flex items-center gap-2 text-xs text-emerald-400"><Mail size={12} /> {t("workflowsPage.viz.emailPerso")}</span>
                    </div>
                </div>

                {/* Cold Lead */}
                <div className="absolute bottom-[25%] right-[10%] translate-y-1/2 -translate-x-1/2">
                    <Node icon={Filter} label={t("workflowsPage.viz.nurturing")} color="red" x={0} y={0} delay={0.6} />
                    <div className="flex flex-col gap-2 mt-4 ml-8">
                        <span className="flex items-center gap-2 text-xs text-gray-400"><User size={12} /> {t("workflowsPage.viz.newsletter")}</span>
                        <span className="flex items-center gap-2 text-xs text-gray-400"><Server size={12} /> {t("workflowsPage.viz.updateDb")}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function WorkflowsPage() {
    const { t } = useTranslation();
    const steps = t("workflowsPage.steps");
    return (
        <main className="bg-background min-h-screen text-foreground selection:bg-primary-neon selection:text-white overflow-x-hidden">
            <Navbar />

            <div className="pt-32 pb-20 container mx-auto px-6">
                {/* Header */}
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary-neon text-xs font-mono uppercase tracking-widest mb-6"
                    >
                        <Zap size={14} />
                        {t("workflowsPage.badge")}
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-display text-4xl md:text-6xl lg:text-7xl leading-[1.05] text-foreground mb-6"
                    >
                        {t("workflowsPage.titlePrefix")} <span className="text-primary">{t("workflowsPage.titleHighlight")}</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
                    >
                        {t("workflowsPage.subtitle")}
                    </motion.p>
                </div>

                {/* The Complex Visualization */}
                <ComplexWorkflowVisual t={t} />

                {/* Workflow Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="p-6 rounded-2xl bg-card border border-border hover:border-blue-500/30 transition-colors"
                    >
                        <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 mb-4">
                            <Globe size={24} />
                        </div>
                        <h3 className="text-xl font-bold mb-3">{steps[0]?.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            {steps[0]?.desc}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="p-6 rounded-2xl bg-card border border-border hover:border-purple-500/30 transition-colors"
                    >
                        <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center text-purple-400 mb-4">
                            <Cpu size={24} />
                        </div>
                        <h3 className="text-xl font-bold mb-3">{steps[1]?.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            {steps[1]?.desc}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="p-6 rounded-2xl bg-card border border-border hover:border-emerald-500/30 transition-colors"
                    >
                        <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-400 mb-4">
                            <Zap size={24} />
                        </div>
                        <h3 className="text-xl font-bold mb-3">{steps[2]?.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            <strong className="text-emerald-400">{steps[2]?.hotLeads}</strong> {steps[2]?.hotDesc}
                            <br /><br />
                            <strong className="text-red-400">{steps[2]?.others}</strong> {steps[2]?.othersDesc}
                        </p>
                    </motion.div>
                </div>

                {/* CTA */}
                <div className="flex justify-center mt-20">
                    <Button href="/contact" size="lg" className="group">
                        {t("workflowsPage.cta")}
                        <ArrowRight className="transition-transform group-hover:translate-x-1" size={20} />
                    </Button>
                </div>
            </div>

            <Footer />
        </main>
    );
}
