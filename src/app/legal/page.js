"use client";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTranslation } from "@/components/LanguageProvider";

export default function LegalPage() {
    const { t } = useTranslation();

    return (
        <main className="bg-background min-h-screen flex flex-col">
            <Navbar />

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="flex-1 pt-32 pb-24"
            >
                <div className="container mx-auto px-6 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-12"
                    >
                        <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">
                            Mentions <span className="text-gradient">Légales</span>
                        </h1>
                    </motion.div>

                    <div className="space-y-12 text-gray-300">
                        {/* 1. Éditeur */}
                        <section className="glass p-8 rounded-2xl">
                            <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-wide">1. Éditeur du site</h2>
                            <div className="space-y-2">
                                <p><strong>Nom :</strong> Romain Kantzer</p>
                                <p><strong>Statut :</strong> Entrepreneur Individuel (ou Société selon statut)</p>
                                <p><strong>Siège social :</strong> [Adresse à compléter]</p>
                                <p><strong>Email :</strong> romain@kantzer.ai</p>
                                <p><strong>SIRET :</strong> [Numéro SIRET à compléter]</p>
                            </div>
                        </section>

                        {/* 2. Hébergement */}
                        <section className="glass p-8 rounded-2xl">
                            <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-wide">2. Hébergement</h2>
                            <div className="space-y-2">
                                <p><strong>Hébergeur :</strong> Vercel Inc.</p>
                                <p><strong>Adresse :</strong> 340 S Lemon Ave #4133 Walnut, CA 91789, USA</p>
                                <p><strong>Site web :</strong> https://vercel.com</p>
                            </div>
                        </section>

                        {/* 3. Propriété Intellectuelle */}
                        <section className="glass p-8 rounded-2xl">
                            <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-wide">3. Propriété Intellectuelle</h2>
                            <p className="leading-relaxed">
                                L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle.
                                Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
                            </p>
                        </section>

                        {/* 4. Données Personnelles */}
                        <section className="glass p-8 rounded-2xl">
                            <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-wide">4. Données Personnelles</h2>
                            <p className="leading-relaxed mb-4">
                                Les informations recueillies via le formulaire de contact sont enregistrées dans un fichier informatisé par Romain Kantzer pour la gestion de la clientèle.
                            </p>
                            <p className="leading-relaxed">
                                Conformément à la loi « informatique et libertés », vous pouvez exercer votre droit d'accès aux données vous concernant et les faire rectifier en contactant : romain@kantzer.ai
                            </p>
                        </section>
                    </div>
                </div>
            </motion.div>

            <Footer />
        </main>
    );
}
