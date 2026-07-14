"use client";
import { motion } from "framer-motion";
import AgentVideoPlayer from "./AgentVideoPlayer";

export default function AgentCard({ agent, isActive, onClick }) {
    const isSelected = isActive;

    // Visual styles based on agent type
    const styles = {
        axiom: {
            gradient: "from-blue-900 via-cyan-900 to-background",
            border: "border-cyan-500/30 hover:border-cyan-400/60",
            text: "text-cyan-100",
            accent: "text-cyan-400",
            glow: "shadow-[0_0_30px_rgba(96,165,250,0.15)]",
        },
        lumina: {
            gradient: "from-orange-900 via-fuchsia-900 to-background",
            border: "border-fuchsia-500/30 hover:border-orange-400/60",
            text: "text-orange-100",
            accent: "text-orange-400",
            glow: "shadow-[0_0_30px_rgba(249,115,22,0.15)]",
        },
        kairo: {
            gradient: "from-emerald-900 via-slate-900 to-background",
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
            <div className="absolute inset-0 bg-background/40" />

            <div className="relative h-full flex flex-col p-5 md:p-8 z-10">
                <div className="flex items-start justify-between mb-3 md:mb-4">
                    <h3 className={`text-2xl md:text-3xl font-bold tracking-tighter ${style.text}`}>
                        {agent.name}
                    </h3>
                    <span className={`text-[10px] md:text-xs font-mono uppercase tracking-widest border px-2 py-1 rounded-full ${style.border} ${style.accent}`}>
                        {agent.role}
                    </span>
                </div>

                {/* Visual Representation Placeholder */}
                {/* Visual Representation */}
                {/* Visual Representation */}
                <div className={`w-full h-auto mb-4 md:mb-6 rounded-xl overflow-hidden relative border ${style.border} group-hover:scale-[1.02] transition-transform duration-500 bg-background/20`}>
                    <AgentVideoPlayer
                        videoSrc={`/videos/${agent.id === 'axiom' ? 'support_client.mp4' : agent.id === 'lumina' ? 'reseaux_sociaux.mp4' : 'blog.mp4'}`}
                        agentName={agent.name}
                        style={style}
                    />
                </div>

                <div className="mt-auto space-y-3 md:space-y-4">
                    <motion.div
                        initial={false}
                        animate={{ height: isSelected ? "auto" : 0, opacity: isSelected ? 1 : 0 }}
                        className="overflow-hidden"
                    >
                        <ul className="space-y-3 mb-4">
                            {(Array.isArray(agent.tasks) ? agent.tasks : []).map((task, i) => (
                                <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className={`flex items-start gap-3 ${style.text} group/task`}
                                >
                                    <div className={`relative flex-shrink-0 mt-0.5`}>
                                        {/* Icône de check avec bordure et glow */}
                                        <div className={`w-5 h-5 rounded-md border-2 ${style.border} ${style.accent.replace('text-', 'bg-')}/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group-hover/task:scale-110 group-hover/task:${style.accent.replace('text-', 'bg-')}/30`}>
                                            <svg
                                                className={`w-3 h-3 ${style.accent}`}
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth="3"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        {/* Glow effect */}
                                        <div className={`absolute inset-0 rounded-md ${style.accent.replace('text-', 'bg-')}/20 blur-sm -z-10`} />
                                    </div>
                                    <span className="text-sm font-medium tracking-wide leading-relaxed flex-1">{task}</span>
                                </motion.li>
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
                                className={`w-full py-3 px-4 rounded-md font-medium text-sm transition-colors bg-foreground/10 hover:bg-foreground/20 text-foreground border border-foreground/20`}
                            >
                                {agent.cta}
                            </motion.button>
                        ) : (
                            <div className="md:hidden w-full py-2 px-4 rounded-md font-medium text-xs text-center border border-foreground/10 text-foreground/50 bg-background/20 backdrop-blur-sm">
                                Voir
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}
