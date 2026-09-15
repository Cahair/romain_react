"use client";

import { useTranslation } from "../LanguageProvider";
import Marquee from "../motion/Marquee";
import { Emphasis } from "../ui/SectionTitle";
import Spark from "../ui/Spark";
import { SERVICE_SLUGS } from "@/lib/services";

const SIZES = {
    lg: { text: "px-6 text-[clamp(2.4rem,6vw,6rem)] md:px-10", spark: "size-7 md:size-12" },
    sm: { text: "px-5 text-[clamp(1.5rem,3.2vw,3.25rem)] md:px-8", spark: "size-5 md:size-8" },
};

function Items({ t, emClassName, size }) {
    const { text, spark } = SIZES[size];
    return SERVICE_SLUGS.map((slug) => (
        <span key={slug} className="flex items-center">
            <span className={`whitespace-nowrap leading-[1.05] tracking-[-0.035em] ${text}`}>
                <Emphasis text={t(`services.items.${slug}.title`)} emClassName={emClassName} />
            </span>
            <Spark className={`shrink-0 animate-spin-slow ${spark}`} />
        </span>
    ));
}

// Deux bandeaux inclinés ensemble (bleu puis inversé) qui défilent en sens contraires.
export default function ServicesMarquee() {
    const { t } = useTranslation();

    return (
        <section aria-label={t("home.marquee.label")} className="relative overflow-hidden py-20 md:py-32">
            <div className="-mx-[5vw] -rotate-[3deg]">
                <div className="bg-primary py-4 text-primary-foreground md:py-6">
                    <Marquee baseVelocity={-2.2}>
                        <Items t={t} emClassName="text-inherit" size="lg" />
                    </Marquee>
                </div>
                <div aria-hidden="true" className="bg-foreground py-3 text-background md:py-4">
                    <Marquee baseVelocity={1.6}>
                        <Items t={t} emClassName="text-primary" size="sm" />
                    </Marquee>
                </div>
            </div>
        </section>
    );
}
