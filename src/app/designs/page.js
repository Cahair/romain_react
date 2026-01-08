"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// --- Animation 1: Particle Wave ---
const ParticleWave = () => {
    const particles = Array.from({ length: 60 }).map((_, i) => ({
        id: i,
        x: (i % 12) * 8.33,
        delay: (i % 12) * 0.1
    }));

    return (
        <div className="relative w-full h-64 bg-gradient-to-br from-violet-950 to-black rounded-xl overflow-hidden border border-violet-500/20">
            <div className="absolute top-4 left-4 text-xs font-mono text-violet-400 uppercase tracking-widest">01. Particle Wave</div>

            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute w-1 h-1 bg-violet-400 rounded-full"
                    style={{ left: `${particle.x}%` }}
                    animate={{
                        y: ["0%", "100%"],
                        opacity: [0, 1, 1, 0],
                        scale: [0.5, 1.5, 1, 0.5],
                        boxShadow: [
                            "0 0 5px rgba(167, 139, 250, 0.3)",
                            "0 0 20px rgba(167, 139, 250, 0.8)",
                            "0 0 10px rgba(167, 139, 250, 0.5)",
                            "0 0 0px rgba(167, 139, 250, 0)"
                        ]
                    }}
                    transition={{
                        duration: 3,
                        delay: particle.delay,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            ))}

            {/* Wave overlay */}
            <motion.div
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: "linear-gradient(transparent 30%, rgba(167, 139, 250, 0.1) 50%, transparent 70%)"
                }}
                animate={{
                    y: ["-100%", "100%"]
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />
        </div>
    );
};

// --- Animation 2: Morphing Blob ---
const MorphingBlob = () => {
    return (
        <div className="relative w-full h-64 bg-gradient-to-br from-emerald-950 to-black rounded-xl overflow-hidden border border-emerald-500/20 flex items-center justify-center">
            <div className="absolute top-4 left-4 text-xs font-mono text-emerald-400 uppercase tracking-widest">02. Morphing Blob</div>

            {/* Main blob */}
            <motion.div
                className="absolute w-32 h-32 rounded-full blur-2xl"
                style={{
                    background: "radial-gradient(circle, rgba(16, 185, 129, 0.6) 0%, rgba(16, 185, 129, 0.2) 50%, transparent 100%)"
                }}
                animate={{
                    scale: [1, 1.4, 1.2, 1.6, 1],
                    borderRadius: ["60% 40% 30% 70%/60% 30% 70% 40%", "30% 60% 70% 40%/50% 60% 30% 60%", "60% 40% 30% 70%/60% 30% 70% 40%"],
                    rotate: [0, 180, 360]
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* Secondary blob */}
            <motion.div
                className="absolute w-24 h-24 rounded-full blur-2xl"
                style={{
                    background: "radial-gradient(circle, rgba(52, 211, 153, 0.4) 0%, rgba(52, 211, 153, 0.1) 50%, transparent 100%)"
                }}
                animate={{
                    scale: [1.2, 1, 1.5, 1.1, 1.2],
                    borderRadius: ["30% 70% 70% 30%/60% 40% 60% 40%", "70% 30% 30% 70%/40% 60% 40% 60%", "30% 70% 70% 30%/60% 40% 60% 40%"],
                    rotate: [360, 180, 0]
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* Glow effect */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_70%)]" />
        </div>
    );
};

// --- Animation 3: Floating Cards ---
const FloatingCards = () => {
    const cards = [
        { color: "from-pink-500/20 to-rose-500/20", border: "border-pink-500/30", delay: 0 },
        { color: "from-blue-500/20 to-cyan-500/20", border: "border-cyan-500/30", delay: 0.5 },
        { color: "from-amber-500/20 to-orange-500/20", border: "border-amber-500/30", delay: 1 }
    ];

    return (
        <div className="relative w-full h-64 bg-gradient-to-br from-slate-950 to-black rounded-xl overflow-hidden border border-slate-700/20">
            <div className="absolute top-4 left-4 text-xs font-mono text-slate-400 uppercase tracking-widest z-10">03. Floating Cards</div>

            <div className="absolute inset-0 flex items-center justify-center gap-4 perspective-1000">
                {cards.map((card, i) => (
                    <motion.div
                        key={i}
                        className={`w-20 h-28 bg-gradient-to-br ${card.color} backdrop-blur-sm border ${card.border} rounded-lg shadow-2xl`}
                        style={{
                            transformStyle: "preserve-3d",
                            perspective: 1000
                        }}
                        animate={{
                            rotateY: [0, 15, -15, 0],
                            rotateX: [0, -10, 10, 0],
                            y: [0, -20, -10, 0],
                            scale: [1, 1.05, 1],
                            boxShadow: [
                                "0 10px 40px rgba(0,0,0,0.3)",
                                "0 20px 60px rgba(0,0,0,0.5)",
                                "0 10px 40px rgba(0,0,0,0.3)"
                            ]
                        }}
                        transition={{
                            duration: 4,
                            delay: card.delay,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        {/* Inner glow */}
                        <div className="absolute inset-0 bg-white/5 rounded-lg backdrop-blur-sm" />

                        {/* Shine effect */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-lg"
                            animate={{
                                opacity: [0.3, 0.6, 0.3]
                            }}
                            transition={{
                                duration: 2,
                                delay: card.delay,
                                repeat: Infinity
                            }}
                        />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

// --- Animation 4: DNA Helix ---
const DNAHelix = () => {
    const pairs = Array.from({ length: 12 });

    return (
        <div className="relative w-full h-64 bg-gradient-to-br from-indigo-950 to-black rounded-xl overflow-hidden border border-indigo-500/20 flex items-center justify-center">
            <div className="absolute top-4 left-4 text-xs font-mono text-indigo-400 uppercase tracking-widest z-10">04. DNA Helix</div>

            <div className="relative w-full h-48">
                {pairs.map((_, i) => {
                    const angle = (i / 12) * Math.PI * 2;
                    const y = (i / 12) * 100;

                    return (
                        <motion.div
                            key={i}
                            className="absolute"
                            style={{
                                left: "50%",
                                top: `${y}%`,
                                transformOrigin: "center"
                            }}
                            animate={{
                                rotateY: [angle * 180 / Math.PI, angle * 180 / Math.PI + 360]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        >
                            {/* Left strand */}
                            <motion.div
                                className="absolute w-2 h-2 bg-indigo-400 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.8)]"
                                style={{ left: -30 }}
                                animate={{
                                    boxShadow: [
                                        "0 0 10px rgba(99,102,241,0.8)",
                                        "0 0 20px rgba(99,102,241,1)",
                                        "0 0 10px rgba(99,102,241,0.8)"
                                    ]
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />

                            {/* Connection */}
                            <div className="absolute w-[60px] h-[1px] bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 opacity-50" style={{ left: -30, top: 4 }} />

                            {/* Right strand */}
                            <motion.div
                                className="absolute w-2 h-2 bg-pink-400 rounded-full shadow-[0_0_10px_rgba(236,72,153,0.8)]"
                                style={{ left: 30 }}
                                animate={{
                                    boxShadow: [
                                        "0 0 10px rgba(236,72,153,0.8)",
                                        "0 0 20px rgba(236,72,153,1)",
                                        "0 0 10px rgba(236,72,153,0.8)"
                                    ]
                                }}
                                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                            />
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

// --- Animation 5: Quantum Field ---
const QuantumField = () => {
    const particles = Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1
    }));

    return (
        <div className="relative w-full h-64 bg-gradient-to-br from-fuchsia-950 to-black rounded-xl overflow-hidden border border-fuchsia-500/20">
            <div className="absolute top-4 left-4 text-xs font-mono text-fuchsia-400 uppercase tracking-widest z-10">05. Quantum Field</div>

            {/* Grid background */}
            <div className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: "linear-gradient(rgba(217, 70, 239, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(217, 70, 239, 0.2) 1px, transparent 1px)",
                    backgroundSize: "20px 20px"
                }}
            />

            {/* Quantum particles */}
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute bg-fuchsia-400 rounded-full"
                    style={{
                        width: particle.size,
                        height: particle.size,
                        left: `${particle.x}%`,
                        top: `${particle.y}%`
                    }}
                    animate={{
                        x: [0, Math.random() * 40 - 20, 0],
                        y: [0, Math.random() * 40 - 20, 0],
                        opacity: [0.3, 1, 0.3],
                        scale: [1, 1.5, 1],
                        boxShadow: [
                            "0 0 5px rgba(217, 70, 239, 0.5)",
                            "0 0 15px rgba(217, 70, 239, 1)",
                            "0 0 5px rgba(217, 70, 239, 0.5)"
                        ]
                    }}
                    transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2
                    }}
                />
            ))}

            {/* Glitch effect */}
            <motion.div
                className="absolute inset-0 bg-fuchsia-500/10"
                animate={{
                    opacity: [0, 0, 0.3, 0, 0],
                    x: [0, 0, -5, 5, 0]
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    times: [0, 0.45, 0.5, 0.55, 1]
                }}
            />

            {/* Energy waves */}
            <motion.div
                className="absolute inset-0 opacity-20"
                style={{
                    background: "radial-gradient(circle at 50% 50%, rgba(217, 70, 239, 0.3) 0%, transparent 70%)"
                }}
                animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.2, 0.4, 0.2]
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
        </div>
    );
};

export default function DesignsPage() {
    return (
        <main className="min-h-screen bg-[#050505] text-white p-8 md:p-24">
            <h1 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                Visual Concepts Playground
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                <div className="space-y-4">
                    <ParticleWave />
                    <p className="text-gray-400 text-sm">Vague de particules fluide et élégante</p>
                </div>

                <div className="space-y-4">
                    <MorphingBlob />
                    <p className="text-gray-400 text-sm">Blob morphing avec effets de dégradé</p>
                </div>

                <div className="space-y-4">
                    <FloatingCards />
                    <p className="text-gray-400 text-sm">Cartes 3D flottantes en glassmorphisme</p>
                </div>

                <div className="space-y-4">
                    <DNAHelix />
                    <p className="text-gray-400 text-sm">Hélice ADN rotative avec effet néon</p>
                </div>

                <div className="space-y-4 md:col-span-2">
                    <QuantumField />
                    <p className="text-gray-400 text-sm text-center">Champ quantique avec particules et effet glitch</p>
                </div>
            </div>
        </main>
    );
}
