"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useTranslation } from "../LanguageProvider";
import { usePageReady } from "../motion/TransitionProvider";
import AnimatedTitle from "../motion/AnimatedTitle";
import Button from "../ui/Button";
import { container } from "../ui/Section";
import { ServiceVisual } from "../visuals/Mockups";
import { serviceNumber } from "@/lib/services";

const OUT = [0.16, 1, 0.3, 1];

// Hero d'une page service : titre révélé, chapeau, et maquette qui s'incline sous la souris.
export default function ServiceHero({ slug }) {
    const { t } = useTranslation();
    const ready = usePageReady();
    const sectionRef = useRef(null);
    const visualRef = useRef(null);

    const tiltX = useMotionValue(0);
    const tiltY = useMotionValue(0);
    const rotateX = useSpring(tiltX, { stiffness: 120, damping: 16 });
    const rotateY = useSpring(tiltY, { stiffness: 120, damping: 16 });

    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
    const visualY = useTransform(scrollYProgress, [0, 1], [0, 160]);

    const onPointerMove = (event) => {
        if (event.pointerType !== "mouse" || !visualRef.current) return;
        const rect = visualRef.current.getBoundingClientRect();
        tiltY.set(((event.clientX - rect.left) / rect.width - 0.5) * 14);
        tiltX.set(-((event.clientY - rect.top) / rect.height - 0.5) * 14);
    };

    const onPointerLeave = () => {
        tiltX.set(0);
        tiltY.set(0);
    };

    const base = `services.items.${slug}`;

    return (
        <section ref={sectionRef} className="relative overflow-hidden pb-16 pt-28 md:pb-24 md:pt-36">
            <div
                aria-hidden="true"
                className="dot-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_50%_55%_at_75%_50%,black,transparent)]"
            />
            <div className={`${container} relative`}>
                <motion.nav
                    aria-label={t("services.breadcrumbAria")}
                    initial={{ opacity: 0 }}
                    animate={ready ? { opacity: 1 } : undefined}
                    transition={{ duration: 0.8 }}
                    className="flex items-center gap-2 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-muted-foreground md:text-xs"
                >
                    <Link href="/services" className="transition-colors hover:text-foreground">
                        {t("nav.services")}
                    </Link>
                    <span aria-hidden="true">/</span>
                    <span className="text-secondary-neon">({serviceNumber(slug)})</span>
                </motion.nav>

                <div className="mt-10 grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
                    <div className="lg:col-span-7">
                        <AnimatedTitle as="h1" size="hero" text={t(`${base}.title`)} play={ready} delay={0.1} />
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={ready ? { opacity: 1, y: 0 } : undefined}
                            transition={{ duration: 1, ease: OUT, delay: 0.45 }}
                            className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl"
                        >
                            {t(`${base}.lead`)}
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={ready ? { opacity: 1, y: 0 } : undefined}
                            transition={{ duration: 1, ease: OUT, delay: 0.6 }}
                            className="mt-10 flex flex-wrap gap-3"
                        >
                            <Button href={`/demarrer?projet=${slug}`} size="lg">
                                {t("services.heroCta")}
                                <ArrowRight className="size-4" aria-hidden="true" />
                            </Button>
                            <Button href="#livrables" variant="ghost" size="lg">
                                {t("services.heroSecondary")}
                                <ArrowDown className="size-4" aria-hidden="true" />
                            </Button>
                        </motion.div>
                    </div>

                    <motion.div
                        ref={visualRef}
                        onPointerMove={onPointerMove}
                        onPointerLeave={onPointerLeave}
                        style={{ y: visualY }}
                        className="[perspective:1200px] lg:col-span-5"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 120, rotate: 8, scale: 0.9 }}
                            animate={ready ? { opacity: 1, y: 0, rotate: 0, scale: 1 } : undefined}
                            transition={{ duration: 1.4, ease: OUT, delay: 0.3 }}
                        >
                            <motion.div style={{ rotateX, rotateY }}>
                                <ServiceVisual slug={slug} />
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
