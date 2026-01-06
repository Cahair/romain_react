"use client";
import { motion } from "framer-motion";
import { MessageSquare, Zap, Target, TrendingUp } from "lucide-react";
import Link from "next/link";

const services = [
    {
        title: "Chatbots Intelligents",
        desc: "Support client 24/7 et qualification de leads automatisée via LLMs personnalisés.",
        icon: <MessageSquare className="w-8 h-8 text-primary" />,
        size: "md:col-span-2",
    },
    {
        title: "Workflows IA",
        desc: "Automatisation complète de vos processus métiers avec Zapier, Make et scripts IA.",
        icon: <Zap className="w-8 h-8 text-secondary" />,
        size: "md:col-span-1",
    },
    {
        title: "Lead Gen IA",
        desc: "Prospection ultra-ciblée et personnalisée grâce à l'analyse prédictive.",
        icon: <Target className="w-8 h-8 text-accent" />,
        size: "md:col-span-1",
    },
    {
        title: "Analyse Data",
        desc: "Transformez vos données brutes en insights actionnables pour piloter votre croissance.",
        icon: <TrendingUp className="w-8 h-8 text-white" />,
        size: "md:col-span-2",
    },
];

export default function Services() {
    return (
        <section id="services" className="py-16 bg-background min-h-screen flex flex-col justify-center">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-3">
                            NOS SERVICES <span className="text-gradient">INTELLIGENTS</span>
                        </h2>
                        <p className="text-gray-400 max-w-md text-sm">
                            Des solutions sur-mesure pour propulser votre business dans l'ère de l'automatisation.
                        </p>
                    </div>
                    <div className="hidden md:block h-px bg-white/10 flex-grow mx-8 mb-3" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {services.map((s, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -3, scale: 1.01 }}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08 }}
                            className={`glass p-5 rounded-2xl flex flex-col justify-between min-h-[160px] group transition-all hover:bg-white/[0.08] ${s.size}`}
                        >
                            <div>
                                <div className="mb-4 p-3 rounded-xl bg-white/5 w-fit group-hover:shadow-neon-cyan transition-all">
                                    {s.icon}
                                </div>
                                <h3 className="text-lg font-bold mb-2">{s.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">{s.desc}</p>
                            </div>

                            <Link href="/services" className="mt-4 flex items-center text-xs font-bold tracking-widest uppercase text-white/50 group-hover:text-primary transition-colors cursor-pointer">
                                DÉCOUVRIR <ArrowUpRight className="ml-1 w-3 h-3" />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function ArrowUpRight({ className }) {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M7 7h10v10" />
            <path d="M7 17 17 7" />
        </svg>
    );
}
