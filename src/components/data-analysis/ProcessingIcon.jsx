import { motion } from "framer-motion";

export default function ProcessingIcon() {
    return (
        <div className="relative flex items-center justify-center w-20 h-20">
            {/* Ripple Effect */}
            <motion.div
                className="absolute inset-0 rounded-full bg-cyan-500/20"
                animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            />

            <div className="relative z-10 bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-[0_0_50px_rgba(59,130,246,0.4)] border border-cyan-500/30">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.path
                        d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
                        fill="#3b82f6"
                        stroke="#3b82f6"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        animate={{
                            fill: ["#3b82f6", "rgba(59,130,246,0.2)", "#3b82f6"],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                </svg>
            </div>

            {/* Connection Lines (Desktop only usually, visual flourish) */}
            <div className="absolute left-0 top-1/2 -translate-x-[200%] w-20 h-[2px] bg-gradient-to-r from-transparent to-slate-800 hidden md:block" />
            <div className="absolute right-0 top-1/2 translate-x-[200%] w-20 h-[2px] bg-gradient-to-r from-cyan-500 to-transparent hidden md:block" />
        </div>
    );
}
