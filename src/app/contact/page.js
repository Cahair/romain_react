"use client";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
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
                        className="text-center max-w-4xl mx-auto"
                    >
                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
                            LANÇONS VOTRE <span className="text-gradient">TRANSFORMATION IA</span>
                        </h1>
                        <p className="text-lg text-gray-400">
                            Un audit gratuit pour identifier les opportunités d'automatisation.
                        </p>
                    </motion.div>
                </div>

                {/* Split Screen Layout */}
                <div className="container mx-auto px-6 flex-1 flex items-center">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto w-full">

                        {/* Left: Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="space-y-6 flex flex-col"
                        >
                            <div className="glass p-8 rounded-3xl flex-1">
                                <h2 className="text-2xl font-black mb-6">Pourquoi un Audit IA ?</h2>
                                <ul className="space-y-4 text-base text-gray-300">
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary mt-1">✦</span>
                                        <span>Identification des processus à fort ROI d'automatisation</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary mt-1">✦</span>
                                        <span>Estimation du temps et budget nécessaires</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary mt-1">✦</span>
                                        <span>Roadmap personnalisée de transformation</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary mt-1">✦</span>
                                        <span>Conseils d'expert sans engagement</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="glass p-8 rounded-3xl">
                                <h3 className="text-lg font-black mb-5 uppercase tracking-widest">Contact Direct</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                            <Mail className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-500 uppercase tracking-wide">Email</div>
                                            <div className="text-base font-bold">romain@kantzer.ai</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                                            <Phone className="w-6 h-6 text-secondary" />
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-500 uppercase tracking-wide">Téléphone</div>
                                            <div className="text-base font-bold">+33 6 XX XX XX XX</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                                            <MapPin className="w-6 h-6 text-accent" />
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-500 uppercase tracking-wide">Localisation</div>
                                            <div className="text-base font-bold">France & Remote</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right: Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="flex"
                        >
                            <div className="glass p-8 rounded-3xl flex-1 flex flex-col">
                                <h2 className="text-2xl font-black mb-6 uppercase tracking-widest">Demande de Contact</h2>
                                <form className="space-y-5 flex-1 flex flex-col">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-bold uppercase tracking-wide text-gray-500 mb-2">
                                                Nom
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Jean Dupont"
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold uppercase tracking-wide text-gray-500 mb-2">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                placeholder="jean@entreprise.com"
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-bold uppercase tracking-wide text-gray-500 mb-2">
                                                Type de Projet
                                            </label>
                                            <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors">
                                                <option value="">Sélectionnez...</option>
                                                <option value="chatbot">Chatbot IA</option>
                                                <option value="automation">Automatisation</option>
                                                <option value="lead-gen">Lead Gen IA</option>
                                                <option value="custom-ai">Solution sur-mesure</option>
                                                <option value="audit">Audit uniquement</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold uppercase tracking-wide text-gray-500 mb-2">
                                                Budget
                                            </label>
                                            <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors">
                                                <option value="">Sélectionnez...</option>
                                                <option value="<5k">Moins de 5,000€</option>
                                                <option value="5k-10k">5,000€ - 10,000€</option>
                                                <option value="10k-25k">10,000€ - 25,000€</option>
                                                <option value="25k+">Plus de 25,000€</option>
                                                <option value="tbd">À définir</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <label className="block text-sm font-bold uppercase tracking-wide text-gray-500 mb-2">
                                            Message
                                        </label>
                                        <textarea
                                            rows="4"
                                            placeholder="Décrivez brièvement votre besoin..."
                                            className="w-full h-full min-h-[100px] bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors resize-none"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full py-4 bg-gradient-to-r from-primary to-secondary rounded-xl font-black uppercase tracking-widest hover:scale-[1.02] transition-transform shadow-neon-cyan"
                                    >
                                        Envoyer ma Demande
                                    </button>
                                </form>

                                {/* Calendly section */}
                                <div className="mt-6 pt-6 border-t border-white/10">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Calendar className="w-5 h-5 text-primary" />
                                            <span className="text-sm font-bold uppercase tracking-wide">Ou réservez directement</span>
                                        </div>
                                        <button className="text-sm text-primary font-bold hover:underline">
                                            Ouvrir Calendly →
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            <Footer />
        </main>
    );
}
