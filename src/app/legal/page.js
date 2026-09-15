"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useTranslation } from "../../components/LanguageProvider";
import PageHero from "../../components/sections/PageHero";
import Reveal from "../../components/motion/Reveal";
import { container } from "../../components/ui/Section";

// Contenu légal : en français (entreprise individuelle française), quelle que soit la langue.
const SECTIONS = [
    {
        title: "Éditeur du site",
        body: (
            <>
                <p><strong className="font-medium text-foreground">Nom :</strong> Romain Kantzer</p>
                <p><strong className="font-medium text-foreground">Statut :</strong> Entrepreneur individuel</p>
                <p><strong className="font-medium text-foreground">Siège social :</strong> 6 rue des champs à Rountzenheim</p>
                <p><strong className="font-medium text-foreground">E-mail :</strong> contact@romain-kantzer.com</p>
                <p><strong className="font-medium text-foreground">SIRET :</strong> 991179961 00016</p>
            </>
        ),
    },
    {
        title: "Hébergement",
        body: (
            <>
                <p><strong className="font-medium text-foreground">Hébergeur :</strong> Infomaniak</p>
                <p><strong className="font-medium text-foreground">Adresse :</strong> Rue Eugène-Marziano 25, 1227 Genève, Suisse</p>
                <p><strong className="font-medium text-foreground">Site web :</strong> https://www.infomaniak.com</p>
            </>
        ),
    },
    {
        title: "Propriété intellectuelle",
        body: (
            <p>
                L&apos;ensemble de ce site relève de la législation française et internationale sur le droit d&apos;auteur et la
                propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents
                téléchargeables et les représentations iconographiques et photographiques.
            </p>
        ),
    },
    {
        title: "Données personnelles",
        body: (
            <>
                <p>
                    Les informations recueillies via le formulaire de contact sont enregistrées dans un fichier informatisé
                    par Romain Kantzer pour la gestion de la clientèle.
                </p>
                <p>
                    Conformément à la loi « informatique et libertés », vous pouvez exercer votre droit d&apos;accès aux données
                    vous concernant et les faire rectifier en contactant : contact@romain-kantzer.com
                </p>
            </>
        ),
    },
];

export default function LegalPage() {
    const { t } = useTranslation();

    return (
        <>
            <Navbar />
            <main>
                <PageHero label={t("legal.label")} title={t("legal.title")} />
                <div className={`${container} pb-24 md:pb-36`}>
                    <div className="max-w-4xl">
                        {SECTIONS.map((section, index) => (
                            <Reveal
                                key={section.title}
                                className="grid gap-4 border-t border-border py-10 md:grid-cols-[4rem_1fr] md:py-12"
                            >
                                <span className="pt-1.5 text-sm tabular-nums text-secondary-neon">
                                    ({String(index + 1).padStart(2, "0")})
                                </span>
                                <div>
                                    <h2 className="text-2xl tracking-[-0.02em] md:text-3xl">{section.title}</h2>
                                    <div className="mt-5 space-y-2 leading-relaxed text-muted-foreground">{section.body}</div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
