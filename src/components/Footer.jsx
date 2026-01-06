"use client";
import { motion } from "framer-motion";
import { Send, Linkedin, Twitter, Github } from "lucide-react";

export default function Footer() {
    return (
        <footer id="contact" className="py-24 bg-[#010413] border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 mb-24">
                    <div>
                        <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-8 leading-tight">
                            PRÊT POUR <br />
                            <span className="text-gradient">L'AUTOMATION ?</span>
                        </h2>
                        <p className="text-gray-400 text-lg mb-12 max-w-md">
                            Ne laissez pas vos concurrents prendre l'avantage. Contactez-nous pour un audit IA gratuit de vos processus business.
                        </p>

                        <div className="flex gap-6">
                            <a href="https://fr.linkedin.com/in/romain-kantzer-9323b920a" target="_blank" rel="noopener noreferrer" className="p-4 glass rounded-2xl hover:bg-primary/20 transition-all hover:shadow-neon-cyan">
                                <Linkedin className="w-6 h-6" />
                            </a>
                            <a href="#" className="p-4 glass rounded-2xl hover:bg-primary/20 transition-all hover:shadow-neon-cyan">
                                <Twitter className="w-6 h-6" />
                            </a>
                            <a href="#" className="p-4 glass rounded-2xl hover:bg-primary/20 transition-all hover:shadow-neon-cyan">
                                <Github className="w-6 h-6" />
                            </a>
                        </div>
                    </div>

                    <div className="glass p-10 rounded-[3rem] relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl" />

                        <form className="space-y-6 relative z-10">
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-white/50">Votre Nom</label>
                                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-primary transition-colors" placeholder="Romain..." />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-white/50">Email Business</label>
                                <input type="email" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-primary transition-colors" placeholder="romain@agency.ai" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-white/50">Message</label>
                                <textarea rows="4" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-primary transition-colors" placeholder="Quels processus voulez-vous automatiser ?" />
                            </div>

                            <button className="w-full py-6 bg-gradient-to-r from-primary to-secondary rounded-2xl font-black uppercase tracking-[0.2em] shadow-lg hover:shadow-neon-cyan transition-all active:scale-[0.98]">
                                Envoyer <Send className="inline-block ml-2 w-5 h-5" />
                            </button>
                        </form>
                    </div>
                </div>

                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-white/30 text-sm font-bold tracking-widest uppercase">
                    <div suppressHydrationWarning>© {new Date().getFullYear()} KANTZER.AI — TOUS DROITS RÉSERVÉS</div>
                    <div className="flex gap-12">
                        <a href="#" className="hover:text-primary transition-colors">Politique Privée</a>
                        <a href="#" className="hover:text-primary transition-colors">Termes</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
