"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "../LanguageProvider";
import { container } from "../ui/Section";
import { Emphasis } from "../ui/SectionTitle";
import { SERVICE_SLUGS, serviceNumber } from "@/lib/services";

// Grand lien vers le service suivant (le dernier renvoie au premier).
export default function NextService({ slug }) {
    const { t } = useTranslation();
    const next = SERVICE_SLUGS[(SERVICE_SLUGS.indexOf(slug) + 1) % SERVICE_SLUGS.length];

    return (
        <Link href={`/services/${next}`} className="group block border-y border-border transition-colors duration-500 hover:bg-muted">
            <div className={`${container} py-16 md:py-24`}>
                <p className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-muted-foreground md:text-xs">
                    {t("services.next")} <span className="text-secondary-neon">({serviceNumber(next)})</span>
                </p>
                <div className="mt-5 flex items-center justify-between gap-6">
                    <span className="text-[clamp(2.5rem,8vw,8rem)] leading-[0.95] tracking-[-0.045em] transition-transform duration-700 ease-out-expo group-hover:translate-x-4">
                        <Emphasis text={t(`services.items.${next}.title`)} />
                    </span>
                    <span className="flex size-14 shrink-0 items-center justify-center rounded-full border border-border transition-all duration-700 ease-out-expo group-hover:-rotate-45 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground md:size-24">
                        <ArrowRight className="size-6 md:size-9" aria-hidden="true" />
                    </span>
                </div>
            </div>
        </Link>
    );
}
