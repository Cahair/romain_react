"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTranslation } from "@/components/LanguageProvider";
import HeroVideoParallax from "@/components/webdev/HeroVideoParallax";
import MetricsCounter from "@/components/webdev/MetricsCounter";
import CaseStudies from "@/components/webdev/CaseStudies";
import TechBento from "@/components/webdev/TechBento";
import ProcessTimeline from "@/components/webdev/ProcessTimeline";
import FaqSection from "@/components/webdev/FaqSection";
import FinalCta from "@/components/webdev/FinalCta";

export default function WebDevPage() {
    const { t } = useTranslation();
    const data = t("webDevPage");

    if (!data || typeof data !== "object" || !data.hero) return null;

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />

            <main className="relative overflow-hidden">
                {/* 1. Hero Video Parallax */}
                <HeroVideoParallax hero={data.hero} />

                {/* 2. Metrics / Lighthouse Scores */}
                <MetricsCounter metrics={data.metrics} />

                {/* 3. Case Studies */}
                <CaseStudies caseStudies={data.caseStudies} />

                {/* 4. Process Timeline */}
                <ProcessTimeline process={data.process} />

                {/* 5. Tech Stack Bento */}
                <TechBento tech={data.tech} />

                {/* 6. FAQ */}
                <FaqSection faq={data.faq} />

                {/* 7. Final CTA */}
                <FinalCta cta={data.cta} />
            </main>

            <Footer />
        </div>
    );
}
