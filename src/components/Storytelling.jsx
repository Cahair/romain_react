"use client";
import { motion } from "framer-motion";

export default function Storytelling() {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

            <div className="container mx-auto px-6 relative">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="mb-12"
                    >
                        <span className="px-4 py-2 rounded-full glass text-xs font-black tracking-[0.3em] uppercase mb-8 inline-block">
                            Notre Evolution
                        </span>
                        <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-8 italic leading-relaxed">
                            "Le web est la <span className="text-white/60">fondatio</span>. <br />
                            L'IA est le <span className="text-gradient inline-block border-b-[3px] border-primary/30 pb-4 pr-3">moteur</span>."
                        </h2>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="text-gray-400 text-lg md:text-xl leading-relaxed"
                    >
                        Après des années à bâtir l'architecture du web moderne, nous franchissons une nouvelle frontière.
                        Nous ne nous contentons plus de créer des sites ; nous construisons des systèmes cognitifs capables
                        d'apprendre, d'automatiser et d'accroître exponentiellement la valeur de votre entreprise.
                        Bienvenue dans l'ère de l'intelligence intégrée.
                    </motion.p>
                </div>
            </div>
        </section>
    );
}
