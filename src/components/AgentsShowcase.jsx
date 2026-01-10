"use client";
import { useState } from "react";
import AgentCard from "./AgentCard";
import { motion } from "framer-motion";

const agents = [
    {
        id: "axiom",
        name: "Emma",
        role: "SUPPORT & SERVICE CLIENT",
        tasks: ["Gestion autonome de vos emails entrants 24/7", "Qualification et résolution immédiate des tickets", "Parcours de fidélisation qualitatif et personnalisé"],
        cta: "Déléguer mon support",
    },
    {
        id: "lumina",
        name: "Luna",
        role: "SOCIAL MEDIA MANAGER",
        tasks: ["Conception de contenus visuels et textuels engageants", "Orchestration complète de votre calendrier éditorial", "Animation active et croissance de votre audience"],
        cta: "Automatiser mes posts",
    },
    {
        id: "kairo",
        name: "Maya",
        role: "RESPONSABLE OPÉRATIONS",
        tasks: ["Pilotage centralisé de vos projets stratégiques", "Synchronisation fluide de vos différentes équipes", "Contrôle proactif des échéances et livrables"],
        cta: "Optimiser mes opérations",
    },
];

export default function AgentsShowcase() {
    const [activeAgent, setActiveAgent] = useState("lumina"); // Default open

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-8 md:py-20">
            <div className="text-center mb-16 space-y-4">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400"
                >
                    Assemblez Votre Équipe
                </motion.h2>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                    Trois entités uniques. Une synergie parfaite pour propulser votre business.
                </p>
            </div>

            <div className="flex flex-col md:flex-row gap-6 h-auto md:h-[600px] transition-all">
                {agents.map((agent) => (
                    <AgentCard
                        key={agent.id}
                        agent={agent}
                        isActive={activeAgent === agent.id}
                        onClick={() => setActiveAgent(agent.id)}
                    />
                ))}
            </div>
        </div>
    );
}
