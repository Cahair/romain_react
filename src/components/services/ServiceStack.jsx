"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "../LanguageProvider";
import Button from "../ui/Button";
import { container } from "../ui/Section";
import { Emphasis } from "../ui/SectionTitle";
import { ServiceVisual } from "../visuals/Mockups";
import { SERVICE_SLUGS, serviceNumber } from "@/lib/services";

function useIsDesktop() {
    const [desktop, setDesktop] = useState(false);
    useEffect(() => {
        const query = window.matchMedia("(min-width: 1024px)");
        const update = () => setDesktop(query.matches);
        update();
        query.addEventListener("change", update);
        return () => query.removeEventListener("change", update);
    }, []);
    return desktop;
}

function StackCard({ slug, index, total, progress, desktop }) {
    const { t, tl } = useTranslation();
    // Chaque carte rétrécit un peu à mesure que les suivantes viennent se poser dessus.
    const targetScale = 1 - (total - 1 - index) * 0.05;
    const scale = useTransform(progress, [index / total, 1], [1, desktop ? targetScale : 1]);
    const highlights = tl(`services.items.${slug}.included`).slice(0, 3);
    const tone = index % 2 === 1 ? "tone-invert bg-background" : "bg-card";

    return (
        <div className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:items-center">
            <motion.article
                style={{ scale, top: desktop ? `calc(${index * 26}px - 3vh)` : undefined }}
                className={`relative w-full origin-top overflow-hidden rounded-[2rem] border border-border text-foreground ${tone} lg:h-[80vh]`}
            >
                <div className="grid h-full lg:grid-cols-2">
                    <div className="flex flex-col justify-between gap-10 p-8 md:p-12">
                        <div>
                            <p className="text-sm tabular-nums text-secondary-neon">({serviceNumber(slug)})</p>
                            <h2 className="mt-6 text-[clamp(2.5rem,5vw,5.25rem)] leading-[0.95] tracking-[-0.04em]">
                                <Emphasis text={t(`services.items.${slug}.title`)} />
                            </h2>
                            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
                                {t(`services.items.${slug}.short`)}
                            </p>
                        </div>
                        <div>
                            <ul className="space-y-2">
                                {highlights.map((item) => (
                                    <li key={item.title} className="flex items-center gap-3 border-t border-border pt-2">
                                        <span className="size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                                        {item.title}
                                    </li>
                                ))}
                            </ul>
                            <Button href={`/services/${slug}`} className="mt-8">
                                {t("services.discover")}
                                <ArrowRight className="size-4" aria-hidden="true" />
                            </Button>
                        </div>
                    </div>
                    <div className="flex items-center justify-center bg-muted/70 p-8 md:p-12">
                        <ServiceVisual slug={slug} className="w-full max-w-lg" />
                    </div>
                </div>
            </motion.article>
        </div>
    );
}

// Les quatre services en cartes qui s'empilent au scroll (desktop), en pile simple sur mobile.
export default function ServiceStack() {
    const ref = useRef(null);
    const desktop = useIsDesktop();
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

    return (
        <section ref={ref} className={`${container} relative space-y-6 pb-24 lg:space-y-0 lg:pb-32`}>
            {SERVICE_SLUGS.map((slug, index) => (
                <StackCard
                    key={slug}
                    slug={slug}
                    index={index}
                    total={SERVICE_SLUGS.length}
                    progress={scrollYProgress}
                    desktop={desktop}
                />
            ))}
        </section>
    );
}
