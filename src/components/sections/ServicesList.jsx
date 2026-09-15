"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useTranslation } from "../LanguageProvider";
import Label from "../ui/Label";
import RollText from "../ui/RollText";
import Section from "../ui/Section";
import { Emphasis } from "../ui/SectionTitle";
import { ServiceVisual } from "../visuals/Mockups";
import { SERVICE_SLUGS, serviceNumber } from "@/lib/services";

// Décalages horizontaux (desktop) qui donnent son rythme à la liste.
const OFFSETS = ["md:pl-[6%]", "md:pl-[24%]", "md:pl-[2%]", "md:pl-[16%]"];

function ServiceRow({ slug, index, hovered, onHover }) {
    const { t } = useTranslation();
    const ref = useRef(null);
    // Au scroll, la ligne qui traverse le milieu de l'écran s'allume ; au survol, celle survolée.
    const inView = useInView(ref, { margin: "-42% 0px -42% 0px" });
    const active = hovered ? hovered === slug : inView;

    return (
        <li ref={ref} className="border-t border-border">
            <Link
                href={`/services/${slug}`}
                onPointerEnter={(event) => event.pointerType === "mouse" && onHover(slug, event)}
                className="group block py-9 md:py-14"
            >
                <div className={`flex items-baseline gap-5 md:gap-8 ${OFFSETS[index]}`}>
                    <span
                        className={`shrink-0 text-sm tabular-nums transition-colors duration-500 md:text-lg ${active ? "text-secondary-neon" : "text-muted-foreground"}`}
                    >
                        ({serviceNumber(slug)})
                    </span>
                    <div className="min-w-0">
                        <span
                            className={`block text-[clamp(2.3rem,6.2vw,6.75rem)] leading-[0.95] tracking-[-0.04em] transition-colors duration-500 ${active ? "text-foreground" : "text-foreground/25"}`}
                        >
                            <Emphasis
                                text={t(`services.items.${slug}.title`)}
                                emClassName={`transition-colors duration-500 ${active ? "text-primary underline decoration-[0.05em] underline-offset-[0.14em]" : "text-inherit"}`}
                            />
                        </span>
                        <span
                            className={`mt-4 flex items-center gap-3 text-base text-muted-foreground transition-all duration-500 md:mt-5 md:text-lg ${active ? "translate-y-0 opacity-100" : "max-md:translate-y-0 max-md:opacity-100 md:translate-y-2 md:opacity-0"}`}
                        >
                            <span className="max-w-md">{t(`services.items.${slug}.short`)}</span>
                            <ArrowUpRight
                                className="size-5 shrink-0 text-primary transition-transform duration-500 group-hover:rotate-45"
                                aria-hidden="true"
                            />
                        </span>
                    </div>
                </div>
            </Link>
        </li>
    );
}

// Liste numérotée des services (inspirée des grandes listes éditoriales) : la maquette du
// service survolé suit la souris sur desktop.
export default function ServicesList() {
    const { t } = useTranslation();
    const [hovered, setHovered] = useState(null);
    const hoveredRef = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 160, damping: 22, mass: 0.6 });
    const springY = useSpring(y, { stiffness: 160, damping: 22, mass: 0.6 });

    // L'aperçu est positionné en `fixed` sur le curseur : il reste juste même quand la
    // liste défile sous une souris immobile.
    const onPointerMove = (event) => {
        x.set(event.clientX);
        y.set(event.clientY);
    };

    const onHover = (slug, event) => {
        if (!hoveredRef.current) {
            springX.jump(event.clientX);
            springY.jump(event.clientY);
        }
        x.set(event.clientX);
        y.set(event.clientY);
        hoveredRef.current = slug;
        setHovered(slug);
    };

    const onLeave = () => {
        hoveredRef.current = null;
        setHovered(null);
    };

    return (
        <Section id="services" spacing="none" className="py-24 md:py-32">
            <div className="flex flex-wrap items-end justify-between gap-6 pb-10 md:pb-14">
                <Label>{t("home.services.label")}</Label>
                <Link href="/services" className="group/roll inline-flex items-center gap-2 text-sm font-medium">
                    <RollText>{t("home.services.all")}</RollText>
                    <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
            </div>

            <div onPointerMove={onPointerMove} onPointerLeave={onLeave} className="relative">
                <ul className="border-b border-border">
                    {SERVICE_SLUGS.map((slug, index) => (
                        <ServiceRow key={slug} slug={slug} index={index} hovered={hovered} onHover={onHover} />
                    ))}
                </ul>

                <motion.div
                    aria-hidden="true"
                    className="pointer-events-none fixed left-0 top-0 z-30 hidden w-[21rem] lg:block"
                    style={{ x: springX, y: springY }}
                >
                    <motion.div
                        className="translate-x-12 -translate-y-1/2"
                        initial={false}
                        animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.5, rotate: hovered ? -5 : 6 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="grid">
                            {SERVICE_SLUGS.map((slug) => (
                                <div
                                    key={slug}
                                    className={`col-start-1 row-start-1 self-center transition-opacity duration-300 ${hovered === slug ? "opacity-100" : "opacity-0"}`}
                                >
                                    <ServiceVisual slug={slug} />
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </Section>
    );
}
