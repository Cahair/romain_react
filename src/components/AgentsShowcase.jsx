"use client";
import { useState } from "react";
import AgentCard from "./AgentCard";
import { motion } from "framer-motion";

const agents = [
    {
        id: "axiom",
        name: "AXIOM",
        role: "DATA STRATEGIST",
        bio: "Le chaos n'est qu'une équation non résolue. Je structure vos données pour révéler le chemin critique vers votre succès.",
        cta: "Analyser ma stratégie",
    },
    {
        id: "lumina",
        name: "LUMINA",
        role: "CREATIVE MUSE",
        bio: "Chaque marque a une âme. Je suis le souffle qui transforme votre message en une histoire inoubliable pour votre audience.",
        cta: "Créer une campagne",
    },
    {
        id: "kairo",
        name: "KAIRO",
        role: "FLOW GUARDIAN",
        bio: "Votre temps est votre ressource la plus rare. Je tisse la toile de votre agenda pour que vous ne perdiez jamais le fil de l'essentiel.",
        cta: "Organiser mon flux",
    },
];

export default function AgentsShowcase() {
    const [activeAgent, setActiveAgent] = useState("lumina"); // Default open

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-20">
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
