"use client";
import { motion } from "framer-motion";
import { MessageSquare, Zap, Brain, ArrowRight } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const services = [
    {
        icon: <MessageSquare className="w-8 h-8" />,
        title: "AI Chatbots & Agents",
        subtitle: "Support Client 24/7",
        description: "Assistants intelligents qui comprennent vos clients et génèrent des leads qualifiés.",
        features: [
            "Support multilingue intelligent",
            "Qualification automatique des leads",
            "Intégration CRM & outils existants"
        ],
        color: "from-cyan-500 to-blue-500"
    },
    {
        icon: <Zap className="w-8 h-8" />,
        title: "Business Automation",
        subtitle: "Make, Zapier & Beyond",
        description: "Automatisation complète de vos workflows. Éliminez les tâches répétitives.",
        features: [
            "Automatisation de processus complexes",
            "Intégrations multi-outils",
            "Reporting automatisé"
        ],
        color: "from-violet-500 to-purple-500"
    },
    {
        icon: <Brain className="w-8 h-8" />,
        title: "Custom AI Solutions",
        subtitle: "Sur-Mesure pour Votre Business",
        description: "Solutions IA personnalisées pour vos besoins uniques.",
        features: [
            "Analyse de données & insights",
            "Outils internes sur-mesure",
            "Intégration API (OpenAI, Anthropic)"
        ],
        color: "from-emerald-500 to-teal-500"
    }
];

export default function ServicesPage() {
    return (
        <main className="bg-background min-h-screen flex flex-col">
            <Navbar />

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="flex-1 pt-28 pb-8 flex flex-col justify-center"
            >
                {/* Hero Section - Compact */}
                <div className="container mx-auto px-6 mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
                            NOS <span className="text-gradient">SERVICES IA</span>
                        </h1>
                        <p className="text-lg text-gray-400">
                            Des solutions d'intelligence artificielle qui automatisent et transforment votre business.
                        </p>
                    </motion.div>
                </div>

                {/* Services Grid - Compact */}
                <div className="container mx-auto px-6 mb-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + index * 0.1 }}
                                className="glass p-5 rounded-2xl hover:bg-white/[0.08] transition-all group"
                            >
                                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                    {service.icon}
                                </div>

                                <h2 className="text-xl font-black mb-1">{service.title}</h2>
                                <p className="text-primary font-bold mb-2 tracking-widest uppercase text-xs">{service.subtitle}</p>
                                <p className="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-2">{service.description}</p>

                                <ul className="space-y-1.5 mb-4">
                                    {service.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                                            <span className="text-primary text-xs mt-0.5">✦</span>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Link href="/contact" className="inline-flex items-center gap-2 font-bold text-primary text-sm hover:gap-3 transition-all">
                                    En savoir plus <ArrowRight className="w-4 h-4" />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* CTA Section - Compact */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="container mx-auto px-6"
                >
                    <div className="glass p-6 md:p-8 rounded-2xl text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/10 blur-3xl" />

                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="text-left">
                                <h2 className="text-2xl md:text-3xl font-black mb-1">
                                    Prêt à <span className="text-gradient">automatiser</span> ?
                                </h2>
                                <p className="text-gray-400 text-sm">
                                    Réservez un audit IA gratuit pour découvrir vos opportunités.
                                </p>
                            </div>
                            <Link href="/contact" className="shrink-0 px-8 py-4 bg-gradient-to-r from-primary to-secondary rounded-xl font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-neon-cyan">
                                Réserver mon Audit
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </motion.div>

            <Footer />
        </main>
    );
}
