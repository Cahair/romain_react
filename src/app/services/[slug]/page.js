"use client";

import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTranslation } from "@/components/LanguageProvider";
import ServiceHero from "@/components/services/ServiceHero";
import { BuildWith, Deliverables, ForWho } from "@/components/services/ServiceDetails";
import NextService from "@/components/services/NextService";
import ProcessList from "@/components/sections/ProcessList";
import Faq from "@/components/sections/Faq";
import ContactCta from "@/components/sections/ContactCta";
import { SERVICE_SLUGS } from "@/lib/services";

export default function ServicePage() {
    const { slug } = useParams();
    const { t, tl } = useTranslation();

    if (!SERVICE_SLUGS.includes(slug)) return null;

    return (
        <>
            <Navbar />
            <main>
                <ServiceHero slug={slug} />
                <ForWho slug={slug} />
                <Deliverables slug={slug} />
                <BuildWith slug={slug} />
                <ProcessList tone="invert" />
                <Faq label={t("services.faqLabel")} title={t("services.faqTitle")} items={tl(`services.items.${slug}.faq`)} />
                <NextService slug={slug} />
                <ContactCta />
            </main>
            <Footer />
        </>
    );
}
