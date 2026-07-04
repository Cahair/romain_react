"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LogoTicker from "@/components/LogoTicker";
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

                {/* 3. Tech credibility band */}
                <LogoTicker />

                {/* 4. Case Studies */}
                <CaseStudies caseStudies={data.caseStudies} />

                {/* 5. Process Timeline */}
                <ProcessTimeline process={data.process} />

                {/* 6. Tech Stack Bento */}
                <TechBento tech={data.tech} />

                {/* 7. FAQ */}
                <FaqSection faq={data.faq} />

                {/* 8. Final CTA */}
                <FinalCta cta={data.cta} />
            </main>

            <Footer />
        </div>
    );
}
