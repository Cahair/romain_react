"use client";
import { motion } from "framer-motion";

const steps = [
    {
        number: "01",
        title: "Audit & Workflow",
        description: "Analyse de vos processus actuels pour identifier où l'IA apporte le plus de valeur.",
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
        ),
    },
    {
        number: "02",
        title: "Configuration sur-mesure",
        description: "Personnalisation du modèle (Tone of Voice, Base de connaissances) pour qu'il parle comme vous.",
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
        ),
    },
    {
        number: "03",
        title: "Intégration Technique",
        description: "Connexion de l'agent à vos outils existants (CRM, Site Web, WhatsApp, API).",
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        ),
    },
    {
        number: "04",
        title: "Amélioration Continue",
        description: "L'agent apprend de ses interactions. Nous surveillons et optimisons ses performances.",
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
        ),
    },
];

const benefits = [
    {
        title: "Disponibilité Totale",
        description: "Vos agents ne dorment jamais. Réponse instantanée 24/7/365, sans temps d'attente.",
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        gradient: "from-blue-500 to-cyan-500",
    },
    {
        title: "Scalabilité Infinie",
        description: "Gérez 10 ou 10 000 conversations simultanées sans perte de qualité ni recrutement supplémentaire.",
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
            </svg>
        ),
        gradient: "from-purple-500 to-pink-500",
    },
    {
        title: "Réduction des Coûts",
        description: "Automatisez jusqu'à 80% des tâches répétitives pour concentrer votre équipe humaine sur les dossiers complexes.",
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        gradient: "from-emerald-500 to-teal-500",
    },
];

export default function ImplementationImpact() {
    return (
        <section className="w-full max-w-7xl mx-auto px-4 py-16 md:py-24">

            {/* PARTIE A: Timeline des 4 Étapes */}
            <div className="mb-32">


                {/* Desktop Timeline */}
                <div className="hidden md:block relative">
                    {/* Ligne de connexion */}
                    <div className="absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500/20 via-cyan-500/50 to-purple-500/20" />

                    <div className="grid grid-cols-4 gap-8">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15 }}
                                className="relative"
                            >
                                {/* Indicateur numéro sur la ligne */}
                                <div className="absolute top-16 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center border-4 border-black shadow-lg shadow-cyan-500/50 z-10">
                                    <span className="text-white font-bold text-xl">{step.number}</span>
                                </div>

                                {/* Carte de l'étape */}
                                <div className="mt-32 bg-gradient-to-br from-slate-900 to-slate-800 border border-cyan-500/30 rounded-2xl p-6 hover:border-cyan-400/60 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20">
                                    <div className="text-cyan-400 mb-4 flex justify-center">
                                        {step.icon}
                                    </div>
                                    <h4 className="text-lg font-bold text-white mb-3 text-center">
                                        {step.title}
                                    </h4>
                                    <p className="text-sm text-gray-400 text-center leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Mobile Timeline */}
                <div className="md:hidden space-y-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="relative pl-16"
                        >
                            {/* Ligne verticale */}
                            {index < steps.length - 1 && (
                                <div className="absolute left-8 top-16 w-0.5 h-full bg-gradient-to-b from-cyan-500/50 to-transparent" />
                            )}

                            {/* Numéro */}
                            <div className="absolute left-0 top-0 w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center border-4 border-black shadow-lg shadow-cyan-500/50">
                                <span className="text-white font-bold text-xl">{step.number}</span>
                            </div>

                            {/* Carte */}
                            <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-cyan-500/30 rounded-2xl p-6">
                                <div className="text-cyan-400 mb-3">
                                    {step.icon}
                                </div>
                                <h4 className="text-lg font-bold text-white mb-2">
                                    {step.title}
                                </h4>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* PARTIE B: Grille des 3 Bénéfices */}
            <div>


                <div className="grid md:grid-cols-3 gap-8">
                    {benefits.map((benefit, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 }}
                            whileHover={{ scale: 1.05, y: -5 }}
                            className="group relative bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/50 rounded-2xl p-8 hover:border-cyan-400/60 transition-all duration-300 overflow-hidden"
                        >
                            {/* Glow effect on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/10 group-hover:to-blue-500/10 transition-all duration-300 rounded-2xl" />

                            {/* Icon with gradient background */}
                            <div className={`relative w-16 h-16 rounded-xl bg-gradient-to-br ${benefit.gradient} p-0.5 mb-6`}>
                                <div className="w-full h-full bg-slate-900 rounded-xl flex items-center justify-center">
                                    <div className={`text-transparent bg-clip-text bg-gradient-to-br ${benefit.gradient}`}>
                                        {benefit.icon}
                                    </div>
                                </div>
                            </div>

                            <h4 className={`text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r ${benefit.gradient}`}>
                                {benefit.title}
                            </h4>
                            <p className="text-gray-400 leading-relaxed relative z-10">
                                {benefit.description}
                            </p>

                            {/* Decorative corner accent */}
                            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${benefit.gradient} opacity-5 blur-3xl`} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
