"use client";

import { ArrowRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useTranslation } from "../components/LanguageProvider";
import PageHero from "../components/sections/PageHero";
import Button from "../components/ui/Button";

export default function NotFound() {
    const { t } = useTranslation();

    return (
        <>
            <Navbar />
            <main className="min-h-[70vh]">
                <PageHero label={t("notFound.label")} title={t("notFound.title")} lead={t("notFound.text")}>
                    <Button href="/" size="lg" className="mt-10">
                        {t("notFound.button")}
                        <ArrowRight className="size-4" aria-hidden="true" />
                    </Button>
                </PageHero>
            </main>
            <Footer />
        </>
    );
}
