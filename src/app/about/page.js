"use client";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const techStack = [
    { name: "OpenAI", category: "LLM" },
    { name: "Anthropic", category: "Claude AI" },
    { name: "Make", category: "Automation" },
    { name: "Next.js", category: "Framework" },
    { name: "Vercel", category: "Deploy" },
    { name: "Zapier", category: "Integration" }
];

export default function AboutPage() {
    return (
        <main className="bg-background min-h-screen flex flex-col">
            <Navbar />

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="flex-1 pt-32 pb-24 flex flex-col justify-center min-h-[calc(100vh-80px)]"
            >
                {/* Hero */}
                <div className="container mx-auto px-6 mb-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="max-w-5xl mx-auto text-center"
                    >
                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
                            L'EXPERT <span className="text-gradient">WEB</span> DEVENU <span className="text-gradient">ARCHITECTE IA</span>
                        </h1>
                    </motion.div>
                </div>

                {/* Main Content - 3 Columns */}
                <div className="container mx-auto px-6 flex-1 flex items-center">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto w-full">

                        {/* Story Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="glass p-8 rounded-3xl flex flex-col"
                        >
                            <h2 className="text-2xl font-black mb-4 flex items-center gap-3">
                                <span className="text-3xl">👋</span> Romain Kantzer
                            </h2>
                            <div className="space-y-4 text-base text-gray-300 leading-relaxed flex-1">
                                <p>
                                    Expert web devenu architecte IA. Je conçois des systèmes intelligents qui automatisent et accroissent la valeur de votre entreprise.
                                </p>
                                <p className="text-white font-bold text-lg">
                                    <span className="text-gradient">Le web est la fondation, l'IA est le moteur.</span>
                                </p>
                            </div>
                        </motion.div>

                        {/* Vision Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="glass p-8 rounded-3xl flex flex-col"
                        >
                            <h2 className="text-2xl font-black mb-4">
                                MA <span className="text-gradient">VISION</span>
                            </h2>
                            <p className="text-base text-white font-bold leading-relaxed mb-6">
                                "L'IA n'est plus une option. C'est une nécessité pour rester compétitif."
                            </p>
                            <div className="grid grid-cols-3 gap-4 mt-auto">
                                <div className="text-center">
                                    <div className="text-4xl font-black text-primary">10x</div>
                                    <div className="text-xs uppercase tracking-wide text-gray-500">Productivité</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-4xl font-black text-secondary">24/7</div>
                                    <div className="text-xs uppercase tracking-wide text-gray-500">Disponible</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-4xl font-black text-accent">∞</div>
                                    <div className="text-xs uppercase tracking-wide text-gray-500">Scalable</div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Tech Stack Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="glass p-8 rounded-3xl flex flex-col"
                        >
                            <h2 className="text-2xl font-black mb-4">
                                STACK <span className="text-gradient">TECH</span>
                            </h2>
                            <div className="grid grid-cols-2 gap-3 flex-1">
                                {techStack.map((tech, index) => (
                                    <div
                                        key={index}
                                        className="bg-white/5 p-4 rounded-xl text-center hover:bg-white/10 transition-all group cursor-pointer flex flex-col justify-center"
                                    >
                                        <div className="text-lg font-bold text-white/50 group-hover:text-gradient transition-all">
                                            {tech.name}
                                        </div>
                                        <div className="text-xs uppercase tracking-wide text-gray-500 group-hover:text-primary transition-colors">
                                            {tech.category}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            <Footer />
        </main>
    );
}
