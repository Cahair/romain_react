"use client";
import { motion } from "framer-motion";

export default function AgentCard({ agent, isActive, onClick }) {
    const isSelected = isActive;

    // Visual styles based on agent type
    const styles = {
        axiom: {
            gradient: "from-blue-900 via-cyan-900 to-black",
            border: "border-cyan-500/30 hover:border-cyan-400/60",
            text: "text-cyan-100",
            accent: "text-cyan-400",
            glow: "shadow-[0_0_30px_rgba(34,211,238,0.15)]",
        },
        lumina: {
            gradient: "from-orange-900 via-fuchsia-900 to-black",
            border: "border-fuchsia-500/30 hover:border-orange-400/60",
            text: "text-orange-100",
            accent: "text-orange-400",
            glow: "shadow-[0_0_30px_rgba(249,115,22,0.15)]",
        },
        kairo: {
            gradient: "from-emerald-900 via-slate-900 to-black",
            border: "border-emerald-500/30 hover:border-emerald-400/60",
            text: "text-emerald-100",
            accent: "text-emerald-400",
            glow: "shadow-[0_0_30px_rgba(16,185,129,0.15)]",
        },
    };

    const style = styles[agent.id] || styles.axiom;

    return (
        <motion.div
            layout
            onClick={onClick}
            className={`relative group cursor-pointer overflow-hidden rounded-2xl border ${style.border} bg-gradient-to-br ${style.gradient} backdrop-blur-xl transition-[opacity,border-color,box-shadow] duration-500 ${isSelected ? `flex-[2] ${style.glow}` : "flex-1 opacity-80 hover:opacity-100"}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={!isSelected ? { scale: 1.02 } : {}}
        >
            <div className="absolute inset-0 bg-black/40" />

            <div className="relative h-full flex flex-col p-6 md:p-8 z-10">
                <div className="flex items-start justify-between mb-4">
                    <h3 className={`text-3xl font-bold tracking-tighter ${style.text}`}>
                        {agent.name}
                    </h3>
                    <span className={`text-xs font-mono uppercase tracking-widest border px-2 py-1 rounded-full ${style.border} ${style.accent}`}>
                        {agent.role}
                    </span>
                </div>

                {/* Visual Representation Placeholder */}
                {/* Visual Representation */}
                {/* Visual Representation */}
                <div className={`w-full h-auto mb-6 rounded-xl overflow-hidden relative border ${style.border} group-hover:scale-[1.02] transition-transform duration-500 bg-black/20`}>
                    <img
                        src={`/images/agents/${agent.id}.png`}
                        alt={`${agent.name} Avatar`}
                        className="w-full h-auto block"
                    />
                </div>

                <div className="mt-auto space-y-4">
                    <motion.div
                        initial={false}
                        animate={{ height: isSelected ? "auto" : 0, opacity: isSelected ? 1 : 0 }}
                        className="overflow-hidden"
                    >
                        <ul className="space-y-2 mb-2">
                            {agent.tasks.map((task, i) => (
                                <li key={i} className={`flex items-center gap-3 ${style.text} opacity-90`}>
                                    <div className={`w-1.5 h-1.5 rounded-full ${style.accent.replace('text-', 'bg-')}`} />
                                    <span className="text-sm font-medium tracking-wide">{task}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div
                        className="relative"
                    >
                        {isSelected ? (
                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`w-full py-3 px-4 rounded-lg font-medium text-sm uppercase tracking-wide transition-colors bg-white/10 hover:bg-white/20 text-white border border-white/20`}
                            >
                                {agent.cta}
                            </motion.button>
                        ) : (
                            <div className="md:hidden w-full py-2 px-4 rounded-lg font-medium text-xs uppercase tracking-wide text-center border border-white/10 text-white/50 bg-black/20 backdrop-blur-sm">
                                Voir
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}
