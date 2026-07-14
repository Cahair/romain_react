"use client";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useTranslation } from "../../components/LanguageProvider";

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
                        <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4">
                            Mentions <span className="text-primary">Légales</span>
                        </h1>
                    </motion.div>

                    <div className="space-y-12 text-muted-foreground">
                        {/* 1. Éditeur */}
                        <section className="rounded-2xl border border-border bg-card p-6 md:p-8">
                            <h2 className="font-display text-2xl text-foreground mb-4">1. Éditeur du site</h2>
                            <div className="space-y-2">
                                <p><strong>Nom :</strong> Romain Kantzer</p>
                                <p><strong>Statut :</strong> Entrepreneur Individuel </p>
                                <p><strong>Siège social :</strong> 6 rue des champs à Rountzenheim</p>
                                <p><strong>Email :</strong> contact@romain-kantzer.com</p>
                                <p><strong>SIRET :</strong> [991179961 00016]</p>
                            </div>
                        </section>

                        {/* 2. Hébergement */}
                        <section className="rounded-2xl border border-border bg-card p-6 md:p-8">
                            <h2 className="font-display text-2xl text-foreground mb-4">2. Hébergement</h2>
                            <div className="space-y-2">
                                <p><strong>Hébergeur :</strong> Infomaniak</p>
                                <p><strong>Adresse :</strong> Rue Eugène-Marziano 25, 1227 Genève, Suisse</p>
                                <p><strong>Site web :</strong> https://www.infomaniak.com</p>
                            </div>
                        </section>

                        {/* 3. Propriété Intellectuelle */}
                        <section className="rounded-2xl border border-border bg-card p-6 md:p-8">
                            <h2 className="font-display text-2xl text-foreground mb-4">3. Propriété Intellectuelle</h2>
                            <p className="leading-relaxed">
                                L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle.
                                Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
                            </p>
                        </section>

                        {/* 4. Données Personnelles */}
                        <section className="rounded-2xl border border-border bg-card p-6 md:p-8">
                            <h2 className="font-display text-2xl text-foreground mb-4">4. Données Personnelles</h2>
                            <p className="leading-relaxed mb-4">
                                Les informations recueillies via le formulaire de contact sont enregistrées dans un fichier informatisé par Romain Kantzer pour la gestion de la clientèle.
                            </p>
                            <p className="leading-relaxed">
                                Conformément à la loi « informatique et libertés », vous pouvez exercer votre droit d'accès aux données vous concernant et les faire rectifier en contactant : contact@romain-kantzer.com
                            </p>
                        </section>
                    </div>
                </div>
            </motion.div>

            <Footer />
        </main>
    );
}
