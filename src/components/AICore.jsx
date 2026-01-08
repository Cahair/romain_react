"use client";
import { motion } from "framer-motion";

/**
 * AICore - Animation holographique avec un noyau central et des anneaux orbitaux
 * Utilise les couleurs cyan néon pour s'harmoniser avec le design du site
 */
export default function AICore({ size = "default" }) {
    // Tailles adaptatives - AGRANDIES pour meilleure visibilité
    const sizeClasses = {
        small: {
            container: "w-48 h-48 md:w-64 md:h-64",
            core: "w-24 h-24 md:w-32 md:h-32",
            particle: "w-16 h-16 md:w-20 md:h-20"
        },
        default: {
            container: "w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96",
            core: "w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48",
            particle: "w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28"
        },
        large: {
            container: "w-80 h-80 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem]",
            core: "w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56",
            particle: "w-28 h-28 md:w-32 md:h-32 lg:w-36 lg:h-36"
        }
    };

    const currentSize = sizeClasses[size] || sizeClasses.default;

    return (
        <div className={`relative ${currentSize.container} flex items-center justify-center`}>
            {/* Core - Noyau central avec effet de glow cyan RENFORCÉ */}
            <motion.div
                className={`${currentSize.core} bg-cyan-400/40 rounded-full blur-2xl absolute shadow-[0_0_60px_rgba(6,182,212,0.8)]`}
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.6, 1, 0.6]
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* Orbital Rings - Anneaux orbitaux en cyan RENFORCÉS */}
            {[1, 2, 3].map((i) => (
                <motion.div
                    key={i}
                    className="absolute border-2 border-cyan-400/60 rounded-full shadow-[0_0_20px_rgba(34,211,238,0.5)]"
                    style={{
                        width: i * 50 + 60,
                        height: i * 50 + 60
                    }}
                    animate={{
                        rotate: 360,
                        scale: [1, 1.05, 1]
                    }}
                    transition={{
                        duration: 10 - i * 2,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                >
                    {/* Particule orbitale AGRANDIE */}
                    <div className="absolute top-0 left-1/2 w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_15px_#22d3ee,0_0_30px_#06b6d4]" />
                </motion.div>
            ))}

            {/* Particule centrale avec mix-blend pour effet holographique */}
            <div className={`${currentSize.particle} bg-cyan-200 rounded-full mix-blend-screen opacity-30 blur-md shadow-[0_0_40px_rgba(6,182,212,0.6)]`} />
        </div>
    );
}
