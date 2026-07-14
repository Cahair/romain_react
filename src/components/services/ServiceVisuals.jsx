"use client";
import { motion } from "framer-motion";
import { Zap, Cpu, Bot, Mail, Database, Bell } from "lucide-react";

// Visuels des sections services, partagés entre /services et /services/agents.
// Versions theme-safe (var(--card), bg-background) — pas de couleurs codées en dur pour les surfaces.

export const ChatbotVisual = () => {
    return (
        <div className="relative w-full max-h-[35vh] aspect-square flex flex-col justify-center items-center">
            {/* Floating Messages */}
            <motion.div
                initial={{ opacity: 0, x: -30, y: 10 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white/10 backdrop-blur-md border border-white/10 p-3 rounded-2xl rounded-tl-none self-start mb-2 max-w-[70%]"
            >
                <div className="h-1.5 w-16 bg-white/20 rounded-full mb-1.5"></div>
                <div className="h-1.5 w-24 bg-white/10 rounded-full"></div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 30, y: 10 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="bg-primary/20 backdrop-blur-md border border-primary/30 p-3 rounded-2xl rounded-tr-none self-end mb-2 max-w-[70%]"
            >
                <div className="h-1.5 w-28 bg-primary-neon/40 rounded-full mb-1.5"></div>
                <div className="h-1.5 w-14 bg-primary-neon/20 rounded-full"></div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: -30, y: 10 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.5, delay: 1.4 }}
                className="bg-white/10 backdrop-blur-md border border-white/10 p-3 rounded-2xl rounded-tl-none self-start max-w-[70%]"
            >
                <div className="h-1.5 w-20 bg-white/20 rounded-full"></div>
            </motion.div>

            {/* Central Bot Icon Pulsing */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-primary-neon/10 rounded-full blur-2xl animate-pulse-slow pointer-events-none"></div>
        </div>
    );
};

export const WorkflowVisual = () => {
    return (
        <div className="w-full max-h-[35vh] flex items-center justify-center relative">
            <svg className="w-full max-w-xl overflow-visible" viewBox="0 0 500 300" preserveAspectRatio="xMidYMid meet">
                {/* Connecting Lines */}
                <motion.path
                    d="M 60 150 L 140 150"
                    fill="none"
                    stroke="#6366f1"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                />
                <motion.path
                    d="M 140 150 L 170 150 L 170 80 L 220 80"
                    fill="none"
                    stroke="#6366f1"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 0.8, ease: "easeInOut", delay: 0.5 }}
                />
                <motion.path
                    d="M 140 150 L 170 150 L 170 220 L 220 220"
                    fill="none"
                    stroke="#6366f1"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 0.8, ease: "easeInOut", delay: 0.5 }}
                />
                <motion.path
                    d="M 280 80 L 360 80"
                    fill="none"
                    stroke="#6366f1"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 0.5, ease: "easeInOut", delay: 1.5 }}
                />
                <motion.path
                    d="M 280 220 L 360 220"
                    fill="none"
                    stroke="#6366f1"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 0.5, ease: "easeInOut", delay: 1.8 }}
                />

                {/* Nodes */}
                <g transform="translate(60, 150)">
                    <circle r="20" fill="var(--card)" stroke="#6366f1" strokeWidth="2" />
                    <Zap size={16} x="-8" y="-8" className="text-secondary-neon" />
                </g>
                <motion.g
                    transform="translate(140, 150)"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <rect x="-20" y="-20" width="40" height="40" rx="6" fill="var(--card)" stroke="#6366f1" strokeWidth="2" />
                    <Cpu size={16} x="-8" y="-8" className="text-secondary-neon" />
                </motion.g>
                <motion.g
                    transform="translate(250, 80)"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    <rect x="-24" y="-24" width="48" height="48" rx="8" fill="var(--card)" stroke="#6366f1" strokeWidth="2" />
                    <Bot size={20} x="-10" y="-10" className="text-secondary-neon" />
                </motion.g>
                <motion.g
                    transform="translate(250, 220)"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    <rect x="-24" y="-24" width="48" height="48" rx="8" fill="var(--card)" stroke="#6366f1" strokeWidth="2" />
                    <Mail size={20} x="-10" y="-10" className="text-secondary-neon" />
                </motion.g>
                <motion.g
                    transform="translate(390, 80)"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                >
                    <rect x="-24" y="-24" width="48" height="48" rx="8" fill="var(--card)" stroke="#6366f1" strokeWidth="2" />
                    <Database size={20} x="-10" y="-10" className="text-secondary-neon" />
                </motion.g>
                <motion.g
                    transform="translate(390, 220)"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 1.4 }}
                >
                    <rect x="-24" y="-24" width="48" height="48" rx="8" fill="var(--card)" stroke="#6366f1" strokeWidth="2" />
                    <Bell size={20} x="-10" y="-10" className="text-secondary-neon" />
                </motion.g>
            </svg>
        </div>
    );
};

export const LeadGenVisual = () => {
    return (
        <div className="w-full max-h-[35vh] max-w-sm mx-auto aspect-square relative flex items-center justify-center">
            {/* Radar Circles */}
            <div className="absolute inset-0 border border-pink-500/20 rounded-full"></div>
            <div className="absolute inset-8 border border-pink-500/20 rounded-full"></div>
            <div className="absolute inset-16 border border-pink-500/20 rounded-full"></div>
            <div className="absolute inset-1/2 w-1.5 h-1.5 bg-pink-500 rounded-full -translate-x-1/2 -translate-y-1/2"></div>

            {/* Scanning Line */}
            <motion.div
                className="absolute inset-0 rounded-full border-r border-transparent"
                style={{
                    background: "conic-gradient(from 0deg, transparent 0deg, rgba(236, 72, 153, 0.3) 60deg, transparent 60deg)",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />

            {/* Detected Avatars */}
            <motion.div
                className="absolute top-1/4 left-1/4 w-6 h-6 rounded-full bg-pink-500/20 border border-pink-500 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: [0, 1, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
            >
                <div className="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
            </motion.div>
            <motion.div
                className="absolute bottom-1/3 right-1/4 w-6 h-6 rounded-full bg-pink-500/20 border border-pink-500 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: [0, 1, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 2.5 }}
            >
                <div className="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
            </motion.div>
        </div>
    );
};

export const DataVisual = () => {
    return (
        <div className="w-full max-h-[35vh] max-w-lg mx-auto aspect-video perspective-1000 relative">
            <motion.div
                className="w-full h-full bg-background/80 backdrop-blur-xl border border-emerald-500/30 rounded-xl p-4 shadow-2xl"
                initial={{ rotateX: 20, rotateY: -20, opacity: 0, y: 50 }}
                whileInView={{ rotateX: 10, rotateY: -10, opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                style={{ transformStyle: "preserve-3d" }}
            >
                <div className="flex justify-between items-center mb-4">
                    <div className="h-3 w-24 bg-emerald-500/20 rounded"></div>
                    <div className="h-6 w-6 bg-emerald-500/10 rounded-full"></div>
                </div>

                <div className="flex gap-3 h-24 items-end mb-4">
                    {[40, 70, 50, 90, 60, 80].map((h, i) => (
                        <motion.div
                            key={i}
                            className="flex-1 bg-gradient-to-t from-emerald-500/10 to-emerald-500/60 rounded-t-md"
                            initial={{ height: 0 }}
                            whileInView={{ height: `${h}%` }}
                            transition={{ duration: 1, delay: i * 0.1 }}
                        />
                    ))}
                </div>
            </motion.div>
        </div>
    );
};
