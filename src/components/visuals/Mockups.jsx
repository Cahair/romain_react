"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useTranslation } from "../LanguageProvider";

// Illustrations des quatre services, construites en HTML/CSS avec les tokens du thème
// (elles suivent donc le thème et les sections inversées). Toutes les tailles sont en
// unités de conteneur (cqw) : chaque maquette garde ses proportions à toutes les largeurs.

const SHADOW = "shadow-[0_40px_90px_-30px_rgb(0_0_0/0.55)]";

function Line({ className = "" }) {
    return <span className={`block rounded-full ${className}`} />;
}

// Site vitrine : navigateur dont la page défile doucement.
export function BrowserMockup({ className = "" }) {
    const { t } = useTranslation();

    return (
        <div className={`@container ${className}`}>
            <div className={`overflow-hidden rounded-[2.4cqw] border border-border bg-card ${SHADOW}`}>
                <div className="flex items-center gap-[1.2cqw] border-b border-border px-[2.6cqw] py-[2cqw]">
                    <span className="size-[1.7cqw] rounded-full bg-foreground/20" />
                    <span className="size-[1.7cqw] rounded-full bg-foreground/20" />
                    <span className="size-[1.7cqw] rounded-full bg-foreground/20" />
                    <span className="ml-[2cqw] flex h-[4cqw] flex-1 items-center truncate rounded-full bg-muted px-[2.4cqw] text-[1.9cqw] text-muted-foreground">
                        {t("common.mockupUrl")}
                    </span>
                </div>
                <div className="relative aspect-[16/11] overflow-hidden">
                    <div className="animate-mock-scroll space-y-[5cqw] p-[4cqw]">
                        <div className="flex items-center justify-between">
                            <Line className="h-[2.6cqw] w-[11cqw] bg-foreground/80" />
                            <div className="flex items-center gap-[2.4cqw]">
                                <Line className="h-[1.3cqw] w-[6cqw] bg-foreground/25" />
                                <Line className="h-[1.3cqw] w-[6cqw] bg-foreground/25" />
                                <Line className="h-[1.3cqw] w-[6cqw] bg-foreground/25" />
                                <span className="h-[4cqw] w-[12cqw] rounded-full bg-primary" />
                            </div>
                        </div>

                        <div className="grid grid-cols-[1.15fr_1fr] items-center gap-[4cqw]">
                            <div className="space-y-[2cqw]">
                                <Line className="h-[4.4cqw] w-[92%] bg-foreground/85" />
                                <Line className="h-[4.4cqw] w-[70%] bg-foreground/85" />
                                <div className="space-y-[1.3cqw] pt-[1.5cqw]">
                                    <Line className="h-[1.3cqw] w-full bg-foreground/20" />
                                    <Line className="h-[1.3cqw] w-[85%] bg-foreground/20" />
                                    <Line className="h-[1.3cqw] w-[60%] bg-foreground/20" />
                                </div>
                                <div className="flex gap-[1.6cqw] pt-[2cqw]">
                                    <span className="h-[5cqw] w-[16cqw] rounded-full bg-primary" />
                                    <span className="h-[5cqw] w-[13cqw] rounded-full border border-border" />
                                </div>
                            </div>
                            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.4cqw] bg-primary/15">
                                <span className="absolute right-[18%] top-[16%] size-[9cqw] rounded-full bg-primary/70" />
                                <span className="absolute inset-x-0 bottom-0 h-[55%] bg-primary/35 [clip-path:polygon(0_100%,0_45%,30%_10%,55%_55%,75%_30%,100%_60%,100%_100%)]" />
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-[2.4cqw]">
                            {[0, 1, 2].map((item) => (
                                <div key={item} className="space-y-[1.6cqw] rounded-[1.8cqw] bg-muted p-[2.4cqw]">
                                    <span className={`block size-[5cqw] rounded-[1.2cqw] ${item === 1 ? "bg-secondary/40" : "bg-primary/30"}`} />
                                    <Line className="h-[1.6cqw] w-[80%] bg-foreground/60" />
                                    <Line className="h-[1.1cqw] w-full bg-foreground/20" />
                                    <Line className="h-[1.1cqw] w-[70%] bg-foreground/20" />
                                </div>
                            ))}
                        </div>

                        <div className="space-y-[1.6cqw] rounded-[1.8cqw] border border-border p-[3.4cqw]">
                            <Line className="h-[2.4cqw] w-[80%] bg-foreground/60" />
                            <Line className="h-[2.4cqw] w-[55%] bg-foreground/60" />
                            <div className="flex items-center gap-[1.6cqw] pt-[1cqw]">
                                <span className="size-[4cqw] rounded-full bg-primary/40" />
                                <Line className="h-[1.2cqw] w-[18cqw] bg-foreground/25" />
                            </div>
                        </div>

                        <div className="flex items-center justify-between rounded-[1.8cqw] bg-foreground/[0.06] p-[3cqw]">
                            <Line className="h-[2cqw] w-[12cqw] bg-foreground/50" />
                            <div className="flex gap-[1.6cqw]">
                                <Line className="h-[1.2cqw] w-[6cqw] bg-foreground/25" />
                                <Line className="h-[1.2cqw] w-[6cqw] bg-foreground/25" />
                                <Line className="h-[1.2cqw] w-[6cqw] bg-foreground/25" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const PRODUCTS = [
    { tint: "bg-primary/15", shape: "size-[12cqw] rounded-full bg-primary" },
    { tint: "bg-secondary/15", shape: "size-[11cqw] rotate-12 rounded-[2.4cqw] bg-secondary/80" },
    { tint: "bg-foreground/[0.07]", shape: "size-[13cqw] bg-primary/70 [clip-path:polygon(50%_0,100%_100%,0_100%)]" },
];

// E-commerce : boutique dont un produit « vole » vers le panier, qui se remplit.
export function ShopMockup({ className = "" }) {
    const reduceMotion = useReducedMotion();
    const [count, setCount] = useState(2);

    useEffect(() => {
        if (reduceMotion) return;
        const interval = setInterval(() => setCount((value) => (value >= 5 ? 1 : value + 1)), 2400);
        return () => clearInterval(interval);
    }, [reduceMotion]);

    return (
        <div className={`@container ${className}`}>
            <div className={`relative overflow-hidden rounded-[3cqw] border border-border bg-card p-[4cqw] ${SHADOW}`}>
                <div className="flex items-center justify-between">
                    <Line className="h-[3cqw] w-[20cqw] bg-foreground/80" />
                    <div className="relative flex size-[9cqw] items-center justify-center rounded-full bg-muted text-foreground">
                        <ShoppingBag className="size-[4.4cqw]" strokeWidth={1.8} aria-hidden="true" />
                        <span className="absolute -right-[1cqw] -top-[1cqw] flex size-[5cqw] items-center justify-center overflow-hidden rounded-full bg-primary text-[2.6cqw] font-semibold text-primary-foreground">
                            <AnimatePresence mode="popLayout" initial={false}>
                                <motion.span
                                    key={count}
                                    initial={{ y: "100%" }}
                                    animate={{ y: "0%" }}
                                    exit={{ y: "-100%" }}
                                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    {count}
                                </motion.span>
                            </AnimatePresence>
                        </span>
                    </div>
                </div>

                <div className="mt-[4cqw] flex h-[24cqw] items-center justify-between overflow-hidden rounded-[2.4cqw] bg-primary/15 px-[5cqw]">
                    <div className="w-[48%] space-y-[2cqw]">
                        <Line className="h-[3.4cqw] w-full bg-foreground/80" />
                        <Line className="h-[3.4cqw] w-[70%] bg-foreground/80" />
                        <span className="mt-[1cqw] block h-[4.4cqw] w-[20cqw] rounded-full bg-primary" />
                    </div>
                    <span className="size-[17cqw] rounded-full bg-primary/60" />
                </div>

                <div className="mt-[4cqw] grid grid-cols-3 gap-[3cqw]">
                    {PRODUCTS.map((product, index) => (
                        <div key={index} className="space-y-[1.6cqw]">
                            <div className={`relative flex aspect-square items-center justify-center rounded-[2.4cqw] ${product.tint}`}>
                                <span className={product.shape} />
                                {index === 0 && (
                                    <>
                                        <span className="animate-mock-press absolute bottom-[2cqw] right-[2cqw] flex size-[6cqw] items-center justify-center rounded-full bg-foreground text-[3.6cqw] leading-none text-background">
                                            +
                                        </span>
                                        <span className="animate-mock-fly absolute bottom-[3cqw] right-[3cqw] size-[3.6cqw] rounded-full bg-primary [--fly-x:62cqw] [--fly-y:-66cqw]" />
                                    </>
                                )}
                            </div>
                            <Line className="h-[1.6cqw] w-[75%] bg-foreground/60" />
                            <Line className="h-[1.6cqw] w-[35%] bg-primary/70" />
                        </div>
                    ))}
                </div>

                <div className="mt-[4cqw] flex h-[8cqw] items-center justify-center rounded-full bg-foreground">
                    <Line className="h-[1.8cqw] w-[26cqw] bg-background/80" />
                </div>
            </div>
        </div>
    );
}

const BARS = [42, 64, 50, 78, 58, 88, 70, 96, 62, 84, 74, 100];

// Application web : tableau de bord avec graphique animé.
export function DashboardMockup({ className = "" }) {
    return (
        <div className={`@container ${className}`}>
            <div className={`grid grid-cols-[19%_1fr] overflow-hidden rounded-[2.4cqw] border border-border bg-card ${SHADOW}`}>
                <div className="space-y-[2.6cqw] border-r border-border bg-muted/60 p-[3cqw]">
                    <span className="block size-[4.6cqw] rounded-[1.2cqw] bg-primary" />
                    <div className="space-y-[1.6cqw] pt-[2cqw]">
                        {[0, 1, 2, 3, 4].map((item) => (
                            <div
                                key={item}
                                className={`flex items-center gap-[1.4cqw] rounded-[1cqw] p-[1cqw] ${item === 1 ? "bg-primary/15" : ""}`}
                            >
                                <span className={`size-[2cqw] shrink-0 rounded-[0.6cqw] ${item === 1 ? "bg-primary" : "bg-foreground/25"}`} />
                                <Line className={`h-[1.1cqw] flex-1 ${item === 1 ? "bg-primary/70" : "bg-foreground/20"}`} />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-[3cqw] p-[3.4cqw]">
                    <div className="flex items-center justify-between gap-[2cqw]">
                        <Line className="h-[2.6cqw] w-[24cqw] bg-foreground/80" />
                        <div className="flex items-center gap-[1.6cqw]">
                            <span className="h-[4cqw] w-[18cqw] rounded-full bg-muted" />
                            <span className="size-[4cqw] rounded-full bg-secondary/50" />
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-[2cqw]">
                        {[0, 1, 2].map((item) => (
                            <div key={item} className="space-y-[1.4cqw] rounded-[1.6cqw] border border-border p-[2.2cqw]">
                                <Line className="h-[1.1cqw] w-[60%] bg-foreground/25" />
                                <Line className={`h-[3cqw] w-[45%] ${item === 0 ? "bg-primary" : "bg-foreground/70"}`} />
                                <svg viewBox="0 0 60 16" preserveAspectRatio="none" className="h-[3.6cqw] w-full" aria-hidden="true">
                                    <polyline
                                        points="0,12 10,9 20,11 30,6 40,8 50,3 60,5"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        vectorEffect="non-scaling-stroke"
                                        className={item === 0 ? "text-primary" : "text-foreground/30"}
                                    />
                                </svg>
                            </div>
                        ))}
                    </div>

                    <div className="rounded-[1.6cqw] border border-border p-[2.6cqw]">
                        <div className="mb-[2cqw] flex items-center justify-between">
                            <Line className="h-[1.4cqw] w-[20cqw] bg-foreground/60" />
                            <span className="h-[3cqw] w-[12cqw] rounded-full bg-muted" />
                        </div>
                        <div className="relative flex h-[20cqw] items-end gap-[1.2cqw]">
                            {BARS.map((height, index) => (
                                <span
                                    key={index}
                                    className={`animate-mock-bar flex-1 origin-bottom rounded-t-[0.8cqw] ${index === 7 ? "bg-primary" : "bg-primary/35"}`}
                                    style={{ height: `${height}%`, animationDelay: `${index * -0.21}s` }}
                                />
                            ))}
                            <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
                                <path
                                    d="M0 30 C 12 26, 18 12, 30 16 S 50 30, 62 14 S 84 6, 100 10"
                                    pathLength="1"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    vectorEffect="non-scaling-stroke"
                                    className="animate-mock-draw text-secondary [stroke-dasharray:1]"
                                />
                            </svg>
                        </div>
                    </div>

                    <div className="space-y-[1.6cqw]">
                        {[0, 1, 2].map((row) => (
                            <div key={row} className="flex items-center gap-[2cqw] border-b border-border pb-[1.6cqw] last:border-0">
                                <span className="size-[3.4cqw] shrink-0 rounded-full bg-muted" />
                                <Line className="h-[1.2cqw] w-[26%] bg-foreground/50" />
                                <Line className="h-[1.2cqw] flex-1 bg-foreground/15" />
                                <span className={`h-[3cqw] w-[12cqw] shrink-0 rounded-full ${row === 1 ? "bg-secondary/25" : "bg-primary/20"}`} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Application mobile : téléphone avec liste qui s'anime et notification qui tombe.
export function PhoneMockup({ className = "" }) {
    return (
        <div className={`@container ${className}`}>
            <div className={`relative aspect-[9/19] rounded-[15cqw] border-[2.4cqw] border-foreground/85 bg-card ${SHADOW}`}>
                <div className="absolute inset-0 overflow-hidden rounded-[12.5cqw]">
                    <span className="absolute left-1/2 top-[3.4cqw] z-20 h-[8cqw] w-[30cqw] -translate-x-1/2 rounded-full bg-foreground/90" />

                    <div className="animate-mock-toast absolute inset-x-[5cqw] top-[14cqw] z-10 flex items-center gap-[3cqw] rounded-[6cqw] bg-foreground p-[4cqw]">
                        <span className="size-[8cqw] shrink-0 rounded-[2.4cqw] bg-primary" />
                        <div className="flex-1 space-y-[2cqw]">
                            <Line className="h-[2.2cqw] w-[70%] bg-background/80" />
                            <Line className="h-[1.8cqw] w-full bg-background/40" />
                        </div>
                    </div>

                    <div className="flex h-full flex-col px-[7cqw] pb-[6cqw] pt-[17cqw]">
                        <div className="flex items-center justify-between">
                            <div className="space-y-[2cqw]">
                                <Line className="h-[2cqw] w-[22cqw] bg-foreground/30" />
                                <Line className="h-[4.6cqw] w-[40cqw] bg-foreground/85" />
                            </div>
                            <span className="size-[11cqw] rounded-full bg-secondary/50" />
                        </div>

                        <div className="mt-[7cqw] space-y-[3cqw] rounded-[7cqw] bg-primary p-[6cqw]">
                            <Line className="h-[2cqw] w-[36%] bg-primary-foreground/60" />
                            <Line className="h-[4.4cqw] w-[70%] bg-primary-foreground" />
                            <div className="h-[2.4cqw] overflow-hidden rounded-full bg-primary-foreground/25">
                                <span className="block h-full w-[62%] rounded-full bg-primary-foreground" />
                            </div>
                        </div>

                        <div className="mt-[7cqw] flex-1 space-y-[4.5cqw]">
                            {[0, 1, 2].map((item) => (
                                <div
                                    key={item}
                                    className="animate-mock-in flex items-center gap-[4cqw]"
                                    style={{ animationDelay: `${item * 0.18}s` }}
                                >
                                    <span
                                        className={`size-[11cqw] shrink-0 rounded-[3.4cqw] ${item === 0 ? "bg-primary/25" : item === 1 ? "bg-secondary/25" : "bg-muted"}`}
                                    />
                                    <div className="flex-1 space-y-[2cqw]">
                                        <Line className="h-[2.4cqw] w-[75%] bg-foreground/70" />
                                        <Line className="h-[2cqw] w-[50%] bg-foreground/25" />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center justify-around rounded-full bg-muted px-[4cqw] py-[3.4cqw]">
                            {[0, 1, 2, 3].map((item) => (
                                <span key={item} className={`size-[5cqw] rounded-full ${item === 0 ? "bg-primary" : "bg-foreground/25"}`} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Maquette associée à un service (slug de src/lib/services.js).
export function ServiceVisual({ slug, className = "" }) {
    if (slug === "site-e-commerce") return <ShopMockup className={className} />;
    if (slug === "application-web") return <DashboardMockup className={className} />;
    if (slug === "application-mobile") {
        return (
            <div className={`flex justify-center ${className}`}>
                <PhoneMockup className="w-[46%] min-w-[9rem]" />
            </div>
        );
    }
    return <BrowserMockup className={className} />;
}
