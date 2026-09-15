"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTranslation } from "@/components/LanguageProvider";
import PageHero from "@/components/sections/PageHero";
import ProcessList from "@/components/sections/ProcessList";
import Faq from "@/components/sections/Faq";
import ContactCta from "@/components/sections/ContactCta";
import ServiceStack from "@/components/services/ServiceStack";
import fr from "@/translations/fr.json";

// Données structurées FAQ (en français, langue de référence pour le référencement).
const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: fr.servicesPage.faq.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
    })),
};

export default function ServicesPage() {
    const { t, tl } = useTranslation();

    return (
        <>
            <Navbar />
            <main>
                <PageHero label={t("servicesPage.label")} title={t("servicesPage.title")} lead={t("servicesPage.lead")} />
                <ServiceStack />
                <ProcessList tone="invert" />
                <Faq label={t("services.faqLabel")} title={t("servicesPage.faqTitle")} items={tl("servicesPage.faq")} />
                <ContactCta />
            </main>
            <Footer />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
        </>
    );
}
