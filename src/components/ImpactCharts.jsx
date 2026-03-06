"use client";
import { motion } from "framer-motion";

export default function ImpactCharts() {
    return (
        <section className="w-full py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full"
            >
                {/* 1. ROI Line Chart */}
                <div className="glass p-6 rounded-2xl flex flex-col justify-between min-h-[300px] relative overflow-hidden group">
                    <div className="relative z-10">
                        <h3 className="text-gray-400 text-sm font-mono uppercase tracking-widest mb-1">Retour sur Investissement</h3>
                        <div className="text-3xl font-bold text-foreground flex items-baseline gap-2">
                            +300% <span className="text-sm text-primary-neon font-normal">/ an</span>
                        </div>
                    </div>

                    {/* Chart Viz */}
                    <div className="relative h-48 w-full mt-4">
                        {/* Grid Lines */}
                        <div className="absolute inset-0 flex flex-col justify-between opacity-20">
                            <div className="border-t border-dashed border-white/50 w-full h-0"></div>
                            <div className="border-t border-dashed border-white/50 w-full h-0"></div>
                            <div className="border-t border-dashed border-white/50 w-full h-0"></div>
                        </div>

                        <svg className="absolute inset-0 w-full h-full overflow-visible">
                            <defs>
                                <linearGradient id="line-gradient" x1="0" y1="0" x2="1" y2="0">
                                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.2" />
                                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="1" />
                                </linearGradient>
                                <linearGradient id="area-gradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.2" />
                                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                            {/* Area */}
                            <motion.path
                                d="M0,150 C50,140 100,100 150,110 S250,50 350,20 L350,200 L0,200 Z"
                                fill="url(#area-gradient)"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 1, delay: 0.5 }}
                            />
                            {/* Line */}
                            <motion.path
                                d="M0,150 C50,140 100,100 150,110 S250,50 350,20"
                                fill="none"
                                stroke="url(#line-gradient)"
                                strokeWidth="3"
                                strokeLinecap="round"
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: 1 }}
                                transition={{ duration: 2, ease: "easeInOut" }}
                            />
                            {/* Points */}
                            <motion.circle
                                cx="350" cy="20" r="4"
                                fill="#fff"
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                transition={{ delay: 2, type: "spring" }}
                            />
                        </svg>
                    </div>
                </div>

                {/* 2. Automation Rate Radial */}
                <div className="glass p-6 rounded-2xl flex flex-col items-center justify-center min-h-[300px] relative group">
                    <div className="relative w-48 h-48 flex items-center justify-center">
                        {/* Background Circle */}
                        <svg className="w-full h-full rotate-[-90deg]">
                            <circle
                                cx="96" cy="96" r="80"
                                fill="none"
                                stroke="rgba(255,255,255,0.05)"
                                strokeWidth="12"
                                strokeLinecap="round"
                            />
                            {/* Progress Circle */}
                            <motion.circle
                                cx="96" cy="96" r="80"
                                fill="none"
                                stroke="url(#radial-gradient)"
                                strokeWidth="12"
                                strokeLinecap="round"
                                strokeDasharray="502" // 2 * pi * 80
                                strokeDashoffset="502"
                                initial={{ strokeDashoffset: 502 }}
                                whileInView={{ strokeDashoffset: 502 - (502 * 0.85) }} // 85%
                                transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                            />
                            <defs>
                                <linearGradient id="radial-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#8b5cf6" />
                                    <stop offset="100%" stopColor="#ec4899" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <div className="absolute flex flex-col items-center">
                            <span className="text-4xl font-black text-foreground">85%</span>
                            <span className="text-xs text-gray-400 uppercase tracking-widest mt-1">Automatisation</span>
                        </div>
                    </div>
                    <div className="text-center mt-6 max-w-[80%]">
                        <p className="text-sm text-gray-400">des tâches répétitives traitées sans intervention humaine.</p>
                    </div>
                </div>

                {/* 3. Speed Comparison Bar Chart */}
                <div className="glass p-6 rounded-2xl flex flex-col justify-between min-h-[300px] relative">
                    <div className="mb-4">
                        <h3 className="text-gray-400 text-sm font-mono uppercase tracking-widest mb-1">Vitesse de Traitement</h3>
                        <div className="text-3xl font-bold text-foreground">x120</div>
                    </div>

                    <div className="flex-1 flex items-end justify-center gap-8 pb-4">
                        {/* Manual Bar */}
                        <div className="flex flex-col items-center gap-2 group">
                            <motion.div
                                initial={{ height: 0 }}
                                whileInView={{ height: 40 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="w-16 bg-white/10 rounded-t-lg border border-white/5 relative"
                            >
                                <div className="absolute -top-6 w-full text-center text-xs text-gray-500 font-mono">2h</div>
                            </motion.div>
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Humain</span>
                        </div>

                        {/* AI Bar */}
                        <div className="flex flex-col items-center gap-2">
                            <motion.div
                                initial={{ height: 0 }}
                                whileInView={{ height: 180 }}
                                transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
                                className="w-16 bg-gradient-to-t from-primary/20 to-primary-neon rounded-t-lg border-t border-x border-primary-neon/50 relative shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                            >
                                <div className="absolute -top-6 w-full text-center text-xs text-primary-neon font-bold font-mono">1min</div>
                                <div className="absolute inset-0 bg-white/20 animate-pulse-slow"></div>
                            </motion.div>
                            <span className="text-xs font-bold text-foreground uppercase tracking-wide">IA</span>
                        </div>
                    </div>
                    <p className="text-xs text-center text-gray-500 mt-2">Comparatif sur un dataset de 10k lignes</p>
                </div>
            </motion.div>
        </section>
    );
}
