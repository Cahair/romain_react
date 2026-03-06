"use client";
import { motion } from "framer-motion";
import { MessageSquare, Zap, Target, BarChart3, ArrowRight, Bot, Cpu, Share2, Database, Code2, Globe } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "./LanguageProvider";

const Card = ({ className, children, href, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
        className={`group relative overflow-hidden rounded-3xl bg-black/40 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-500 ${className}`}
    >
        <Link href={href} className="absolute inset-0 z-20" />
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative z-10 h-full p-6 flex flex-col">
            {children}
        </div>
    </motion.div>
);

export default function ServicesBento() {
    const { t } = useTranslation();

    return (
        <section className="py-24 bg-background relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6">
                <div className="mb-16 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-display text-4xl md:text-5xl font-bold uppercase mb-4"
                    >
                        {t("servicesBento.titlePrefix")} <span className="text-primary-neon">{t("servicesBento.titleSuffix")}</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-muted-foreground max-w-2xl mx-auto"
                    >
                        {t("servicesBento.subtitle")}
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[280px]">

                    {/* 1. Main Card: Web Development (Span 2 cols) - PRIORITÉ #1 */}
                    <Card href="/services/web-dev" className="md:col-span-2 group border-blue-500/20 hover:border-blue-500/50">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
                                <Code2 size={32} />
                            </div>
                            <div className="px-3 py-1 rounded-full border border-blue-500/30 text-blue-400 text-xs font-mono uppercase tracking-wider">
                                {t("servicesBento.popular")}
                            </div>
                        </div>

                        <div className="mt-auto">
                            <h3 className="text-3xl font-display font-bold uppercase mb-2 text-white group-hover:text-blue-400 transition-colors">
                                {t("servicesBento.items.webDev.title")}
                            </h3>
                            <p className="text-gray-400 max-w-md text-sm mb-6">
                                {t("servicesBento.items.webDev.desc")}
                            </p>
                            <div className="flex items-center gap-2 text-blue-400 font-bold uppercase tracking-widest text-sm group-hover:gap-4 transition-all">
                                {t("servicesBento.explore")} <ArrowRight size={16} />
                            </div>
                        </div>

                        {/* Web Visual */}
                        <div className="absolute top-8 right-8 w-64 h-full hidden md:block opacity-50 group-hover:opacity-100 transition-opacity">
                            <div className="space-y-3">
                                <motion.div
                                    className="bg-white/10 p-3 rounded-2xl w-3/4 ml-auto blur-[1px] group-hover:blur-0 transition-all flex items-center gap-2"
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <Globe size={14} className="text-blue-400/60" />
                                    <div className="h-2 bg-blue-400/30 rounded w-1/2"></div>
                                </motion.div>
                                <motion.div
                                    className="bg-blue-500/10 border border-blue-500/20 p-3 rounded-2xl w-3/4 blur-[1px] group-hover:blur-0 transition-all"
                                    animate={{ y: [0, 5, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                                >
                                    <div className="h-2 bg-blue-400/40 rounded w-2/3"></div>
                                </motion.div>
                            </div>
                        </div>
                    </Card>

                    {/* 2. Vertical Card: Workflows (Span 1 col, 2 rows) */}
                    <Card href="/services/workflows" className="row-span-2 md:col-start-3 border-purple-500/20 hover:border-purple-500/50" delay={0.2}>
                        <div className="flex flex-col h-full">
                            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 w-fit mb-auto">
                                <Zap size={32} />
                            </div>

                            {/* Visual Chain */}
                            <div className="flex-1 flex flex-col items-center justify-center gap-4 my-8 opacity-50 group-hover:opacity-100 transition-opacity">
                                <div className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center bg-white/5">
                                    <Share2 size={20} className="text-gray-400" />
                                </div>
                                <div className="w-0.5 h-8 bg-gradient-to-b from-white/10 to-purple-500/50"></div>
                                <div className="w-12 h-12 rounded-xl border border-purple-500/30 flex items-center justify-center bg-purple-500/10 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                                    <Cpu size={20} className="text-purple-400" />
                                </div>
                                <div className="w-0.5 h-8 bg-gradient-to-b from-purple-500/50 to-white/10"></div>
                                <div className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center bg-white/5">
                                    <Database size={20} className="text-gray-400" />
                                </div>
                            </div>

                            <div className="mt-auto">
                                <h3 className="text-2xl font-display font-bold uppercase mb-2 text-white group-hover:text-purple-400 transition-colors">
                                    {t("servicesBento.items.workflows.title")}
                                </h3>
                                <p className="text-gray-400 text-sm mb-4">
                                    {t("servicesBento.items.workflows.desc")}
                                </p>
                                <div className="flex items-center gap-2 text-purple-400 font-bold uppercase tracking-widest text-sm group-hover:gap-4 transition-all">
                                    {t("servicesBento.explore")} <ArrowRight size={16} />
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* 3. Square Card: Agents IA */}
                    <Card href="/services/agents" className="border-primary-neon/20 hover:border-primary-neon/50" delay={0.3}>
                        <div className="p-3 rounded-xl bg-primary-neon/10 text-primary-neon w-fit mb-4">
                            <Bot size={32} />
                        </div>
                        <h3 className="text-xl font-display font-bold uppercase mb-2 text-white group-hover:text-primary-neon transition-colors">
                            {t("servicesBento.items.agents.title")}
                        </h3>
                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                            {t("servicesBento.items.agents.desc")}
                        </p>
                        {/* Bot Visual */}
                        <div className="absolute top-4 right-4 text-primary-neon/20 group-hover:text-primary-neon/40 transition-colors">
                            <Bot size={64} strokeWidth={1} />
                        </div>
                    </Card>

                    {/* 4. Square Card: Lead Gen */}
                    <Card href="/services/lead-gen" className="border-pink-500/20 hover:border-pink-500/50" delay={0.4}>
                        <div className="p-3 rounded-xl bg-pink-500/10 text-pink-500 w-fit mb-4">
                            <Target size={32} />
                        </div>
                        <h3 className="text-xl font-display font-bold uppercase mb-2 text-white group-hover:text-pink-500 transition-colors">
                            {t("servicesBento.items.leadGen.title")}
                        </h3>
                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                            {t("servicesBento.items.leadGen.desc")}
                        </p>
                        {/* Radar Visual */}
                        <div className="absolute top-4 right-4 text-pink-500/20 group-hover:text-pink-500/40 transition-colors">
                            <Target size={64} strokeWidth={1} />
                        </div>
                    </Card>

                    {/* 5. Full-Width Card: Data */}
                    <Card href="/services/data" className="md:col-span-3 border-emerald-500/20 hover:border-emerald-500/50" delay={0.5}>
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between h-full gap-6">
                            <div className="flex items-start gap-6 flex-1">
                                <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500 w-fit flex-shrink-0">
                                    <BarChart3 size={32} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl md:text-3xl font-display font-bold uppercase mb-2 text-white group-hover:text-emerald-500 transition-colors">
                                        {t("servicesBento.items.dataViz.title")}
                                    </h3>
                                    <p className="text-gray-400 text-sm md:text-base max-w-3xl">
                                        {t("servicesBento.items.dataViz.desc")}
                                    </p>
                                </div>
                            </div>

                            {/* Bar Chart Visual */}
                            <div className="flex items-end gap-1 h-12 opacity-30 group-hover:opacity-60 transition-opacity">
                                <motion.div className="w-2 bg-emerald-500 rounded-t" animate={{ height: [10, 30, 20] }} transition={{ duration: 2, repeat: Infinity }} />
                                <motion.div className="w-2 bg-emerald-500 rounded-t" animate={{ height: [20, 40, 25] }} transition={{ duration: 2, repeat: Infinity, delay: 0.2 }} />
                                <motion.div className="w-2 bg-emerald-500 rounded-t" animate={{ height: [15, 35, 20] }} transition={{ duration: 2, repeat: Infinity, delay: 0.4 }} />
                            </div>
                        </div>
                    </Card>

                </div>
            </div>
        </section>
    );
}
