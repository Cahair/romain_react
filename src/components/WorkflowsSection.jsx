"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    FileText,
    Settings,
    CheckCircle,
    User,
    Search,
    Sparkles,
    Image as ImageIcon,
    Palette,
    ArrowRight
} from "lucide-react";

const WorkflowsSection = () => {
    const workflows = [
        {
            id: 1,
            title: "Rédaction d'article SEO",
            input: { icon: FileText, label: "Sujet Brut" },
            process: { icon: Sparkles, label: "IA Générative" },
            output: { icon: CheckCircle, label: "Article Optimisé" },
            gradient: "from-blue-500 to-cyan-400"
        },
        {
            id: 2,
            title: "Analyse de Lead",
            input: { icon: User, label: "Lead Entrant" },
            process: { icon: Search, label: "Analyse Data" },
            output: { icon: Settings, label: "Score & Action" },
            gradient: "from-purple-500 to-pink-400"
        },
        {
            id: 3,
            title: "Génération d'Image",
            input: { icon: Palette, label: "Prompt Texte" },
            process: { icon: ImageIcon, label: "Diffusion" },
            output: { icon: Sparkles, label: "Visuel HD" },
            gradient: "from-amber-500 to-orange-400"
        }
    ];

    return (
        <section className="py-24 bg-gradient-to-b from-slate-900 to-black text-white relative overflow-hidden">
            <div className="container mx-auto px-4 z-10 relative">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 mb-4"
                    >
                        Workflows IA
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-400 text-lg max-w-2xl mx-auto"
                    >
                        De la donnée brute au résultat final, visualisez comment nos agents transforment votre travail.
                    </motion.p>
                </div>

                <div className="space-y-12 md:space-y-16">
                    {workflows.map((workflow, index) => (
                        <div key={workflow.id} className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                            <div className="relative p-6 md:p-8 bg-slate-950/50 border border-slate-800 rounded-xl backdrop-blur-sm">

                                <h3 className="text-xl font-semibold mb-8 text-slate-200 flex items-center gap-2">
                                    <span className={`w-2 h-8 rounded-full bg-gradient-to-b ${workflow.gradient}`}></span>
                                    {workflow.title}
                                </h3>

                                <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">

                                    {/* INPUT */}
                                    <div className="flex-1 w-full md:w-auto p-4 bg-slate-900/50 rounded-lg border border-slate-800/50 flex flex-col items-center text-center hover:border-slate-700 transition">
                                        <div className="p-3 bg-slate-800 rounded-full mb-3 text-slate-300">
                                            <workflow.input.icon size={24} />
                                        </div>
                                        <span className="text-sm font-medium text-slate-300">{workflow.input.label}</span>
                                        <span className="text-xs text-slate-500 mt-1">Input</span>
                                    </div>

                                    {/* CONNECTOR 1 */}
                                    <div className="hidden md:flex flex-1 items-center justify-center relative h-12">
                                        <div className="absolute h-[2px] w-full bg-slate-800 overflow-hidden">
                                            <motion.div
                                                initial={{ x: "-100%" }}
                                                whileInView={{ x: "100%" }}
                                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: index * 0.2 }}
                                                className={`w-1/2 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent`}
                                            />
                                        </div>
                                        <ArrowRight className="text-slate-600 z-10" />
                                    </div>
                                    {/* Mobile Connector */}
                                    <ArrowRight className="md:hidden text-slate-600 rotate-90 my-2" />

                                    {/* BLACK BOX / PROCESS */}
                                    <div className="flex-1 w-full md:w-auto p-6 relative rounded-lg border border-slate-700 bg-slate-900 flex flex-col items-center text-center shadow-lg group-hover:shadow-blue-900/10 transition">
                                        <div className={`absolute inset-0 bg-gradient-to-br ${workflow.gradient} opacity-5 rounded-lg`}></div>
                                        <motion.div
                                            animate={{ scale: [1, 1.1, 1] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                            className="p-4 bg-black rounded-full mb-3 text-white border border-slate-700 shadow-inner z-10"
                                        >
                                            <workflow.process.icon size={28} />
                                        </motion.div>
                                        <span className="text-sm font-bold text-white z-10">{workflow.process.label}</span>
                                        <span className="text-xs text-blue-400 mt-1 z-10">Processing...</span>
                                    </div>

                                    {/* CONNECTOR 2 */}
                                    <div className="hidden md:flex flex-1 items-center justify-center relative h-12">
                                        <div className="absolute h-[2px] w-full bg-slate-800 overflow-hidden">
                                            <motion.div
                                                initial={{ x: "-100%" }}
                                                whileInView={{ x: "100%" }}
                                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: (index * 0.2) + 0.75 }}
                                                className={`w-1/2 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent`}
                                            />
                                        </div>
                                        <ArrowRight className="text-slate-600 z-10" />
                                    </div>
                                    {/* Mobile Connector */}
                                    <ArrowRight className="md:hidden text-slate-600 rotate-90 my-2" />

                                    {/* OUTPUT */}
                                    <div className="flex-1 w-full md:w-auto p-4 bg-slate-900/50 rounded-lg border border-slate-800/50 flex flex-col items-center text-center hover:border-green-900/30 transition">
                                        <div className={`p-3 bg-gradient-to-br ${workflow.gradient} rounded-full mb-3 text-white shadow-lg`}>
                                            <workflow.output.icon size={24} />
                                        </div>
                                        <span className="text-sm font-medium text-white">{workflow.output.label}</span>
                                        <span className="text-xs text-slate-500 mt-1">Output</span>
                                    </div>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WorkflowsSection;
