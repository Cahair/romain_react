"use client";
import { motion } from "framer-motion";

export default function ImpactCharts() {
    return (
        <div className="relative w-full h-[400px] md:h-[500px] perspective-1000">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-secondary/10 rounded-3xl blur-2xl" />

            {/* Main Glass Container */}
            <motion.div
                initial={{ opacity: 0, rotateX: 10, y: 50 }}
                whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
                className="relative w-full h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 overflow-hidden shadow-2xl"
            >
                {/* Grid Lines */}
                <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 gap-4 opacity-10 pointer-events-none">
                    {[...Array(36)].map((_, i) => (
                        <div key={i} className="border-[0.5px] border-white/20" />
                    ))}
                </div>

                {/* Content Container */}
                <div className="relative h-full flex flex-col justify-end z-10">

                    {/* Chart 1: Growth Bars */}
                    <div className="flex items-end justify-between gap-4 h-1/2 mb-8 px-4">
                        {[30, 50, 40, 70, 60, 90, 85].map((height, i) => (
                            <motion.div
                                key={i}
                                initial={{ height: "0%" }}
                                whileInView={{ height: `${height}%` }}
                                transition={{ duration: 1, delay: i * 0.1, ease: "backOut" }}
                                viewport={{ once: true }}
                                className="w-full bg-gradient-to-t from-primary/20 to-primary-neon rounded-t-lg relative group"
                            >
                                <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/50 shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                                {/* Hover Effect */}
                                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </motion.div>
                        ))}
                    </div>

                    {/* Chart 2: Floating Metrics */}
                    <div className="absolute top-8 right-8 flex flex-col gap-4">
                        <motion.div
                            initial={{ x: 50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                        >
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
                                className="bg-black/80 backdrop-blur border border-primary-neon/50 px-4 py-2 rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                            >
                                <div className="text-xs text-gray-400 uppercase tracking-widest">Efficiency</div>
                                <div className="text-xl font-mono font-bold text-primary-neon">+300%</div>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            initial={{ x: 50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.7, duration: 0.5 }}
                        >
                            <motion.div
                                animate={{ y: [0, -8, 0] }}
                                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1.5 }}
                                className="bg-black/80 backdrop-blur border border-secondary-neon/50 px-4 py-2 rounded-lg shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                            >
                                <div className="text-xs text-gray-400 uppercase tracking-widest">Errors</div>
                                <div className="text-xl font-mono font-bold text-secondary-neon">0.01%</div>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Decorative Line Path (Cyberpunk Line) */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ opacity: 0.5 }}>
                        <motion.path
                            d="M0,350 C100,340 150,200 250,220 S350,100 500,80"
                            fill="none"
                            stroke="url(#gradient-line)"
                            strokeWidth="4"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                            viewport={{ once: true }}
                        />
                        <defs>
                            <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
                                <stop offset="50%" stopColor="#06b6d4" />
                                <stop offset="100%" stopColor="#8b5cf6" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
            </motion.div>
        </div>
    );
}
