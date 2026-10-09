"use client";

import { useEffect, useRef, useState } from "react";
import {
    AnimatePresence,
    animate,
    motion,
    useAnimationFrame,
    useInView,
    useMotionTemplate,
    useMotionValue,
    useReducedMotion,
    useScroll,
    useSpring,
    useTransform,
} from "framer-motion";
import {
    ArrowRight,
    Bell,
    CalendarDays,
    Check,
    Clock3,
    LayoutGrid,
    MapPin,
    MessageSquare,
    Phone,
    Plus,
    Search,
    Settings,
    ShoppingBag,
    Users,
} from "lucide-react";
import { useTranslation } from "../LanguageProvider";
import { Emphasis } from "../ui/SectionTitle";

// Vue éclatée d'un projet, en CSS 3D : trois couches empilées — (01) maquette, (02) code,
// (03) version en ligne. La mise en page se réorganise pour chacun des quatre services
// (synchronisée avec le mot du titre), un faux curseur clique, et les couches se
// remboîtent au défilement. Toutes les tailles sont en cqw de la scène.

const EASE = [0.76, 0, 0.24, 1];
const OUT = [0.16, 1, 0.3, 1];

// Durée d'affichage de chaque exemple (secondes).
const DURATION = 5.2;
// Inclinaison de la vue éclatée (degrés) et écart entre les couches (cqw).
const TILT_X = 52;
const TILT_Z = -30;
const GAP = 13;

export const STAGE_SERVICES = ["vitrine", "shop", "app", "mobile"];

// Format du support, en % de la scène (ratio 1/0.86) : écran 16/10 ou téléphone.
const FRAMES = {
    desktop: { width: 72, height: 52.33, radius: "rounded-[1.4cqw]", corner: 0.4 },
    phone: { width: 31, height: 78.1, radius: "rounded-[4.2cqw]", corner: 1.2 },
};

const BLOCKS = ["media", "nav", "title", "text", "cta", "a", "b", "c"];
const box = (x, y, w, h) => ({ x, y, w, h });

// Les mêmes huit blocs dans les quatre mises en page (x, y, largeur, hauteur en % du
// support) : d'un service à l'autre, ils glissent vers leur nouvelle place.
const LAYOUTS = {
    vitrine: {
        frame: "desktop",
        blocks: {
            nav: box(4, 5, 92, 8),
            title: box(4, 21, 50, 21),
            text: box(4, 44, 40, 10),
            cta: box(4, 58.5, 24, 9),
            media: box(58, 19, 38, 50),
            a: box(4, 76, 29, 19),
            b: box(35.5, 76, 29, 19),
            c: box(67, 76, 29, 19),
        },
        click: { x: 24, y: 63 },
        toast: { left: "30.5%", top: "64%" },
    },
    shop: {
        frame: "desktop",
        blocks: {
            nav: box(4, 5, 92, 8),
            title: box(8, 22.5, 40, 13),
            text: box(8, 37, 34, 6),
            cta: box(8, 45, 15, 6.5),
            media: box(4, 17, 92, 38),
            a: box(4, 60, 29, 35),
            b: box(35.5, 60, 29, 35),
            c: box(67, 60, 29, 35),
        },
        click: { x: 29.4, y: 84.5 },
        toast: { right: "3%", top: "21%" },
    },
    app: {
        frame: "desktop",
        blocks: {
            nav: box(2.5, 4, 15, 92),
            title: box(21, 6, 36, 8),
            text: box(21, 14.5, 30, 5),
            cta: box(80.5, 6.5, 16, 8),
            media: box(21, 50, 75.5, 45),
            a: box(21, 25, 24.2, 21),
            b: box(46.6, 25, 24.2, 21),
            c: box(72.2, 25, 24.3, 21),
        },
        click: { x: 88.5, y: 10.5 },
        toast: { right: "3.5%", top: "23%" },
    },
    mobile: {
        frame: "phone",
        blocks: {
            nav: box(7, 2.2, 86, 4.5),
            title: box(8, 10, 80, 6.5),
            text: box(8, 16.5, 80, 3.5),
            media: box(6, 22.5, 88, 21),
            a: box(6, 47, 88, 9.5),
            b: box(6, 58, 88, 9.5),
            c: box(6, 69, 88, 9.5),
            cta: box(6, 84, 88, 7.5),
        },
        click: { x: 70, y: 87.7 },
        toast: { left: "4%", right: "4%", top: "13%" },
    },
};

// Composants affichés sur la couche « code » (les blocs b et c répètent a).
const TAGS = {
    vitrine: { nav: "<header>", title: "<h1>", text: "<p>", cta: "<a>", media: "<figure>", a: "<article> ×3" },
    shop: { nav: "<header>", title: "<h1>", text: "<p>", cta: "<Button>", media: "<Banner>", a: "<ProductCard> ×3" },
    app: { nav: "<Sidebar>", title: "<h1>", text: "<p>", cta: "<Button>", media: "<Chart>", a: "<StatCard> ×3" },
    mobile: { nav: "<StatusBar>", title: "<Text>", text: "<Text>", cta: "<Pressable>", media: "<Card>", a: "<ListItem> ×3" },
};

const CURSOR_REST = { x: 72, y: 58 };

function Blocks({ layout, children }) {
    return BLOCKS.map((id) => {
        const { x, y, w, h } = layout.blocks[id];
        return (
            <div
                key={id}
                className="absolute transition-[left,top,width,height] duration-[1100ms] ease-expo"
                style={{ left: `${x}%`, top: `${y}%`, width: `${w}%`, height: `${h}%` }}
            >
                {children(id)}
            </div>
        );
    });
}

function Bar({ className = "", style }) {
    return <span className={`block rounded-full ${className}`} style={style} />;
}

/* ---------- Couche 03 : la version en ligne, un bloc à la fois ---------- */

function Brand({ name }) {
    return (
        <span className="flex items-center gap-[0.7cqw] whitespace-nowrap text-[1.1cqw] font-semibold tracking-tight">
            <span className="size-[1.6cqw] shrink-0 rounded-[0.45cqw] bg-primary" />
            {name}
        </span>
    );
}

// Silhouettes des articles de la boutique (vase, bol, tasse).
function Ceramic({ kind }) {
    if (kind === 0) {
        return (
            <svg viewBox="0 0 40 60" className="relative h-[62%] text-primary" aria-hidden="true">
                <path
                    fill="currentColor"
                    d="M15 3h10v4c0 2-2 3-2 6 0 5 11 11 11 25 0 11-6 18-8 20H14c-2-2-8-9-8-20 0-14 11-20 11-25 0-3-2-4-2-6z"
                />
            </svg>
        );
    }
    if (kind === 1) {
        return (
            <svg viewBox="0 0 60 34" className="relative w-[58%] text-foreground/85" aria-hidden="true">
                <path fill="currentColor" d="M2 4h56c0 14-12 25-28 25S2 18 2 4zM22 29h16v4H22z" />
            </svg>
        );
    }
    return (
        <svg viewBox="0 0 50 40" className="relative w-[46%] text-primary/60" aria-hidden="true">
            <path fill="currentColor" d="M3 5h32v16c0 10-7 17-16 17S3 31 3 21z" />
            <path fill="none" stroke="currentColor" strokeWidth="4" d="M35 11c10 0 10 15 0 15" />
        </svg>
    );
}

const VITRINE_ICONS = [Clock3, MapPin, Phone];
// Bandes horizontales qui découpent le bas du soleil (en % de sa hauteur, depuis le bas).
const SUNSET_MASK =
    "linear-gradient(to top, transparent 0 34%, black 34% 38%, transparent 38% 41%, black 41% 46%, transparent 46% 48%, black 48% 54%, transparent 54% 55.5%, black 55.5%)";
const APP_ICONS = [LayoutGrid, CalendarDays, Users, MessageSquare, Settings];
const MOBILE_ICONS = [Check, MessageSquare, Bell];
const CHART = [38, 52, 44, 66, 58, 74, 62, 88, 70, 80, 64, 92];

function SiteBlock({ service, id, copy, count }) {
    const cardIndex = { a: 0, b: 1, c: 2 }[id];

    if (service === "vitrine") {
        if (id === "nav") {
            return (
                <div className="flex h-full items-center justify-between border-b border-border pb-[0.3cqw]">
                    <Brand name={copy.brand} />
                    <span className="flex items-center gap-[1.8cqw] text-[0.95cqw] text-muted-foreground">
                        {copy.nav?.map((link) => (
                            <span key={link}>{link}</span>
                        ))}
                    </span>
                </div>
            );
        }
        if (id === "title") {
            return (
                <p className="text-[3.3cqw] font-medium leading-[1.02] tracking-[-0.035em]">
                    <Emphasis text={copy.title} />
                </p>
            );
        }
        if (id === "text") return <p className="text-[1cqw] leading-[1.5] text-muted-foreground">{copy.text}</p>;
        if (id === "cta") {
            return (
                <span className="flex h-full items-center justify-center gap-[0.6cqw] whitespace-nowrap rounded-full bg-primary text-[1cqw] font-medium text-primary-foreground">
                    {copy.cta}
                    <ArrowRight className="size-[1.1cqw]" />
                </span>
            );
        }
        if (id === "media") {
            return (
                <div className="relative h-full overflow-hidden rounded-[1cqw] bg-primary/15">
                    <span className="absolute inset-0 [background-image:radial-gradient(circle,var(--primary)_0.15cqw,transparent_0.2cqw)] [background-size:1.05cqw_1.05cqw] [mask-image:linear-gradient(to_bottom,black,transparent_75%)] opacity-50" />
                    <span
                        className="absolute -bottom-[34%] left-1/2 aspect-square w-[74%] -translate-x-1/2 rounded-full bg-primary"
                        style={{ maskImage: SUNSET_MASK, WebkitMaskImage: SUNSET_MASK }}
                    />
                </div>
            );
        }
        const Icon = VITRINE_ICONS[cardIndex];
        return (
            <div className="flex h-full flex-col justify-between rounded-[0.9cqw] border border-border p-[1.1cqw]">
                <Icon className="size-[1.6cqw] text-primary" strokeWidth={1.75} />
                <div className="space-y-[0.5cqw]">
                    <p className="text-[1cqw] font-medium leading-none">{copy.cards?.[cardIndex]}</p>
                    <Bar className="h-[0.45cqw] w-[70%] bg-foreground/15" />
                </div>
            </div>
        );
    }

    if (service === "shop") {
        if (id === "nav") {
            return (
                <div className="flex h-full items-center justify-between gap-[2cqw]">
                    <Brand name={copy.brand} />
                    <span className="flex h-[2.4cqw] max-w-[18cqw] flex-1 items-center gap-[0.6cqw] rounded-full bg-foreground/[0.06] px-[1cqw] text-[0.9cqw] text-muted-foreground">
                        <Search className="size-[1cqw]" />
                        {copy.search}
                    </span>
                    <span className="relative flex size-[2.6cqw] items-center justify-center rounded-full bg-foreground/[0.06]">
                        <ShoppingBag className="size-[1.3cqw]" strokeWidth={1.8} />
                        <span className="absolute -right-[0.5cqw] -top-[0.5cqw] flex size-[1.5cqw] items-center justify-center overflow-hidden rounded-full bg-primary text-[0.8cqw] font-semibold text-primary-foreground">
                            <AnimatePresence mode="popLayout" initial={false}>
                                <motion.span
                                    key={count}
                                    initial={{ y: "100%" }}
                                    animate={{ y: "0%" }}
                                    exit={{ y: "-100%" }}
                                    transition={{ duration: 0.4, ease: OUT }}
                                >
                                    {count}
                                </motion.span>
                            </AnimatePresence>
                        </span>
                    </span>
                </div>
            );
        }
        if (id === "title") {
            return (
                <p className="text-[2.5cqw] font-medium leading-[1.02] tracking-[-0.035em]">
                    <Emphasis text={copy.title} />
                </p>
            );
        }
        if (id === "text") return <p className="text-[0.95cqw] leading-[1.4] text-muted-foreground">{copy.text}</p>;
        if (id === "cta") {
            return (
                <span className="flex h-full items-center justify-center whitespace-nowrap rounded-full bg-foreground text-[0.95cqw] font-medium text-background">
                    {copy.cta}
                </span>
            );
        }
        if (id === "media") {
            return (
                <div className="relative h-full overflow-hidden rounded-[1cqw] bg-foreground/[0.06]">
                    <span className="absolute -top-[35%] right-[4%] aspect-square w-[40%] rounded-full bg-primary/15" />
                    <span className="absolute bottom-0 right-[12%] h-[30%] w-[22%] rounded-t-[0.6cqw] bg-foreground/10" />
                    <span className="absolute bottom-[30%] right-[15.5%] aspect-square w-[15%] rounded-full bg-primary">
                        <span className="absolute left-[22%] top-[18%] h-[22%] w-[30%] -rotate-[30deg] rounded-full bg-primary-foreground/25" />
                    </span>
                </div>
            );
        }
        return (
            <div className="flex h-full flex-col gap-[0.7cqw]">
                <div className="relative flex flex-1 items-end justify-center overflow-hidden rounded-[0.9cqw] bg-foreground/[0.06] pb-[14%]">
                    <span className="absolute bottom-[11%] h-[7%] w-[46%] rounded-[50%] bg-foreground/10" />
                    <Ceramic kind={cardIndex} />
                    {cardIndex === 0 && (
                        <span className="absolute bottom-[8%] right-[6%] flex size-[2.3cqw] items-center justify-center rounded-full bg-foreground text-background">
                            <Plus className="size-[1.2cqw]" strokeWidth={2.4} />
                        </span>
                    )}
                </div>
                <div className="flex items-center justify-between text-[0.95cqw] leading-none">
                    <span className="font-medium">{copy.cards?.[cardIndex]}</span>
                    <Bar className="h-[0.5cqw] w-[2.8cqw] bg-primary/60" />
                </div>
            </div>
        );
    }

    if (service === "app") {
        if (id === "nav") {
            return (
                <div className="flex h-full flex-col gap-[0.45cqw] rounded-[1cqw] bg-foreground/[0.06] p-[0.9cqw]">
                    <span className="mb-[1cqw] size-[1.8cqw] rounded-[0.5cqw] bg-primary" />
                    {copy.nav?.map((label, item) => {
                        const Icon = APP_ICONS[item] ?? LayoutGrid;
                        return (
                            <span
                                key={label}
                                className={`flex items-center gap-[0.6cqw] rounded-[0.5cqw] px-[0.6cqw] py-[0.55cqw] text-[0.85cqw] ${item === 0 ? "bg-primary/15 text-primary" : "text-muted-foreground"}`}
                            >
                                <Icon className="size-[1.1cqw] shrink-0" strokeWidth={1.9} />
                                <span className="truncate">{label}</span>
                            </span>
                        );
                    })}
                    <span className="mt-auto flex items-center gap-[0.6cqw] px-[0.4cqw]">
                        <span className="size-[1.8cqw] shrink-0 rounded-full bg-primary/40" />
                        <Bar className="h-[0.5cqw] flex-1 bg-foreground/20" />
                    </span>
                </div>
            );
        }
        if (id === "title") return <p className="text-[1.9cqw] font-medium leading-none tracking-[-0.03em]">{copy.title}</p>;
        if (id === "text") return <p className="text-[0.95cqw] leading-none text-muted-foreground">{copy.text}</p>;
        if (id === "cta") {
            return (
                <span className="flex h-full items-center justify-center gap-[0.4cqw] whitespace-nowrap rounded-full bg-primary text-[0.95cqw] font-medium text-primary-foreground">
                    <Plus className="size-[1.1cqw]" strokeWidth={2.4} />
                    {copy.cta}
                </span>
            );
        }
        if (id === "media") {
            return (
                <div className="flex h-full flex-col rounded-[0.9cqw] border border-border p-[1.2cqw]">
                    <div className="flex items-center justify-between">
                        <span className="text-[1cqw] font-medium">{copy.chart}</span>
                        <span className="flex items-center gap-[0.5cqw]">
                            <span className="size-[0.7cqw] rounded-full bg-primary" />
                            <span className="size-[0.7cqw] rounded-full bg-foreground/30" />
                        </span>
                    </div>
                    <div className="relative mt-[1.2cqw] flex flex-1 items-end gap-[0.7cqw]">
                        {[0, 1, 2].map((line) => (
                            <span
                                key={line}
                                className="absolute inset-x-0 border-t border-dashed border-border"
                                style={{ top: `${line * 33}%` }}
                            />
                        ))}
                        {CHART.map((height, bar) => (
                            <motion.span
                                key={bar}
                                className={`relative flex-1 origin-bottom rounded-t-[0.4cqw] ${bar === 7 ? "bg-primary" : "bg-primary/30"}`}
                                style={{ height: `${height}%` }}
                                initial={{ scaleY: 0 }}
                                animate={{ scaleY: 1 }}
                                transition={{ duration: 0.9, ease: OUT, delay: 0.7 + bar * 0.04 }}
                            />
                        ))}
                        <svg
                            viewBox="0 0 100 40"
                            preserveAspectRatio="none"
                            className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
                            aria-hidden="true"
                        >
                            <motion.path
                                d="M0 30 C 12 26, 18 14, 30 18 S 50 28, 62 13 S 84 8, 100 6"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                vectorEffect="non-scaling-stroke"
                                className="text-foreground"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 1.4, ease: EASE, delay: 1 }}
                            />
                        </svg>
                    </div>
                </div>
            );
        }
        return (
            <div className="flex h-full flex-col justify-between rounded-[0.9cqw] border border-border p-[1cqw]">
                <span className="text-[0.85cqw] leading-none text-muted-foreground">{copy.cards?.[cardIndex]}</span>
                {cardIndex === 0 && (
                    <span className="flex">
                        {["bg-primary", "bg-foreground/70", "bg-primary/50", "bg-foreground/[0.06]"].map((tone, avatar) => (
                            <span
                                key={avatar}
                                className={`-ml-[0.5cqw] size-[2.4cqw] rounded-full border-[0.2cqw] border-card first:ml-0 ${tone}`}
                            />
                        ))}
                    </span>
                )}
                {cardIndex === 1 && (
                    <span className="grid grid-cols-7 gap-[0.3cqw]">
                        {Array.from({ length: 14 }, (_, day) => (
                            <span
                                key={day}
                                className={`aspect-square rounded-[0.2cqw] ${[2, 5, 9].includes(day) ? "bg-primary" : day === 11 ? "bg-primary/40" : "bg-foreground/10"}`}
                            />
                        ))}
                    </span>
                )}
                {cardIndex === 2 && (
                    <span className="space-y-[0.6cqw]">
                        {[78, 52].map((width, row) => (
                            <span key={row} className="flex items-center gap-[0.6cqw]">
                                <span className={`size-[1.3cqw] shrink-0 rounded-full ${row === 0 ? "bg-primary" : "bg-foreground/25"}`} />
                                <Bar className="h-[0.5cqw] bg-foreground/20" style={{ width: `${width}%` }} />
                            </span>
                        ))}
                    </span>
                )}
            </div>
        );
    }

    // Application mobile
    if (id === "nav") {
        return (
            <div className="flex h-full items-center justify-between px-[0.6cqw] text-[0.9cqw] font-semibold">
                <span>{copy.clock}</span>
                <span className="h-[1.7cqw] w-[6.5cqw] rounded-full bg-foreground/90" />
                <span className="flex items-center gap-[0.5cqw]">
                    <span className="flex items-end gap-[0.15cqw]">
                        {[0.4, 0.6, 0.85].map((height) => (
                            <span key={height} className="w-[0.25cqw] rounded-full bg-foreground" style={{ height: `${height}cqw` }} />
                        ))}
                    </span>
                    <span className="flex h-[0.9cqw] w-[1.8cqw] rounded-[0.25cqw] border border-foreground/60 p-[0.12cqw]">
                        <span className="w-[70%] rounded-[0.1cqw] bg-foreground" />
                    </span>
                </span>
            </div>
        );
    }
    if (id === "title") return <p className="text-[2.3cqw] font-medium leading-none tracking-[-0.03em]">{copy.title}</p>;
    if (id === "text") return <p className="text-[0.85cqw] leading-none text-muted-foreground">{copy.text}</p>;
    if (id === "cta") {
        return (
            <span className="flex h-full items-center justify-center whitespace-nowrap rounded-full bg-foreground text-[0.95cqw] font-medium text-background">
                {copy.cta}
            </span>
        );
    }
    if (id === "media") {
        return (
            <div className="flex h-full flex-col justify-between rounded-[1.8cqw] bg-primary p-[1.5cqw] text-primary-foreground">
                <span className="flex items-center justify-between text-[0.8cqw] text-primary-foreground/80">
                    {copy.card}
                    <CalendarDays className="size-[1.1cqw]" />
                </span>
                <span className="text-[3cqw] font-semibold leading-none tracking-[-0.03em]">{copy.time}</span>
                <span className="flex items-center justify-between text-[0.8cqw]">
                    {copy.day}
                    <span className="flex">
                        {[0, 1].map((avatar) => (
                            <span
                                key={avatar}
                                className="-ml-[0.4cqw] size-[1.7cqw] rounded-full border-[0.15cqw] border-primary bg-primary-foreground/70 first:ml-0"
                            />
                        ))}
                    </span>
                </span>
            </div>
        );
    }
    const Icon = MOBILE_ICONS[cardIndex];
    return (
        <div className="flex h-full items-center gap-[1.1cqw] rounded-[1.4cqw] bg-foreground/[0.06] px-[1.1cqw]">
            <span className="flex size-[3cqw] shrink-0 items-center justify-center rounded-[0.9cqw] bg-primary/15 text-primary">
                <Icon className="size-[1.4cqw]" strokeWidth={2} />
            </span>
            <span className="min-w-0 flex-1">
                <span className="block truncate text-[0.85cqw] font-medium leading-none">{copy.items?.[cardIndex]}</span>
                <Bar className="mt-[0.5cqw] h-[0.4cqw] w-[60%] bg-foreground/15" />
            </span>
            <span className="text-[0.75cqw] text-muted-foreground">{copy.times?.[cardIndex]}</span>
        </div>
    );
}

/* ---------- Couches 01 et 02 : maquette et code ---------- */

function WireBlock({ id }) {
    const base = "relative h-full border border-foreground/30 bg-foreground/[0.04]";
    if (id === "cta") return <div className={`${base} rounded-full`} />;
    if (id === "media") {
        return (
            <div className={`${base} rounded-[0.6cqw]`}>
                <svg viewBox="0 0 10 10" preserveAspectRatio="none" className="absolute inset-0 h-full w-full text-foreground/30" aria-hidden="true">
                    <path d="M0 0L10 10M10 0L0 10" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                </svg>
            </div>
        );
    }
    if (id === "title" || id === "text") {
        const thick = id === "title";
        return (
            <div className="flex h-full flex-col justify-center gap-[0.6cqw]">
                <Bar className={`${thick ? "h-[1.3cqw]" : "h-[0.45cqw]"} w-full bg-foreground/25`} />
                <Bar className={`${thick ? "h-[1.3cqw]" : "h-[0.45cqw]"} w-[62%] bg-foreground/25`} />
            </div>
        );
    }
    return <div className={`${base} rounded-[0.6cqw]`} />;
}

function CodeBlock({ tag }) {
    return (
        <div className="relative h-full rounded-[0.3cqw] border border-dashed border-primary/80 bg-primary/[0.06]">
            {tag && (
                <span className="absolute -left-px top-0 -translate-y-full whitespace-nowrap rounded-t-[0.3cqw] bg-primary px-[0.5cqw] font-mono text-[0.75cqw] leading-[1.4cqw] text-primary-foreground">
                    {tag}
                </span>
            )}
        </div>
    );
}

// Libellé d'une couche, accroché à son coin droit. Il annule la rotation de la pile
// pour rester face à l'écran.
function LayerLabel({ number, text, billboard, opacity, corner }) {
    return (
        <motion.div
            className="absolute transition-[right,bottom] duration-[1100ms] ease-expo"
            style={{ right: `${corner}cqw`, bottom: `${corner}cqw`, transform: billboard }}
        >
            <motion.div style={{ opacity }} className="absolute left-0 top-0 flex -translate-y-1/2 items-center whitespace-nowrap">
                <span className="size-[0.9cqw] -translate-x-1/2 rounded-full border border-primary bg-background" />
                <span className="h-px w-[3.5cqw] bg-foreground/35" />
                <span className="pl-[1cqw] text-[length:max(9px,1.15cqw)] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    <span className="text-foreground">({number})</span>
                    <span className="hidden @min-[34rem]:inline"> {text}</span>
                </span>
            </motion.div>
        </motion.div>
    );
}

function Plane({ transform, children }) {
    return (
        <motion.div className="absolute inset-0 rounded-[inherit] [transform-style:preserve-3d]" style={{ transform }}>
            {children}
        </motion.div>
    );
}

// Coins du support : côté, et coin du bas ou non.
const PILLARS = [
    ["left", false],
    ["right", false],
    ["left", true],
    ["right", true],
];

export default function HeroStage({ index, onIndexChange, play, pointerX, pointerY, words = [] }) {
    const { t, tl } = useTranslation();
    const reduceMotion = useReducedMotion();
    const stageRef = useRef(null);
    const inView = useInView(stageRef);
    const [hovered, setHovered] = useState(false);
    const [cycling, setCycling] = useState(false);
    const [clicked, setClicked] = useState(-1);

    const service = STAGE_SERVICES[index % STAGE_SERVICES.length];
    const layout = LAYOUTS[service];
    const frame = FRAMES[layout.frame];
    const copy = t(`home.hero.stage.${service}`);
    const layers = tl("home.hero.stage.layers");
    const tags = TAGS[service];
    const interactive = play && (cycling || Boolean(reduceMotion));

    // appear : la page apparaît à plat ; intro : elle s'éclate en couches.
    const appear = useMotionValue(0);
    const intro = useMotionValue(0);
    const live = useMotionValue(1);
    const sway = useMotionValue(0);
    const progress = useMotionValue(0);
    const hover = useSpring(0, { stiffness: 140, damping: 22 });

    useEffect(() => {
        live.set(reduceMotion ? 0 : 1);
    }, [reduceMotion, live]);

    useEffect(() => {
        hover.set(hovered ? 1 : 0);
    }, [hovered, hover]);

    useEffect(() => {
        if (!play) return;
        if (reduceMotion) {
            appear.set(1);
            intro.set(1);
            return;
        }
        const fade = animate(appear, 1, { duration: 0.9, ease: OUT, delay: 0.3 });
        const explode = animate(intro, 1, {
            duration: 1.7,
            ease: EASE,
            delay: 0.95,
            onComplete: () => setCycling(true),
        });
        return () => {
            fade.stop();
            explode.stop();
        };
    }, [play, reduceMotion, appear, intro]);

    // Au défilement, les couches se remboîtent jusqu'à la page finie, à plat.
    const { scrollYProgress } = useScroll({ target: stageRef, offset: ["start start", "end start"] });
    const collapse = useTransform(scrollYProgress, [0, 0.75], [0, 1]);
    const spread = useTransform(() => intro.get() * (1 - collapse.get() * live.get()));
    const rotateX = useTransform(() => spread.get() * (TILT_X - pointerY.get() * 12 * live.get()));
    const rotateZ = useTransform(() => spread.get() * (TILT_Z + (pointerX.get() * 14 + sway.get()) * live.get()));
    const gap = useTransform(() => spread.get() * (GAP + hover.get() * 4));

    const zTop = useTransform(gap, (value) => `translateZ(${value}cqw)`);
    const zBottom = useTransform(gap, (value) => `translateZ(${-value}cqw)`);
    const zFloor = useTransform(gap, (value) => `translateZ(${-value - 2.5}cqw)`);
    const pillarHeight = useTransform(gap, (value) => `${value * 2}cqw`);
    const billboard = useTransform(() => `rotateZ(${-rotateZ.get()}deg) rotateX(${-rotateX.get()}deg)`);
    const overlayOpacity = useTransform(spread, [0.2, 0.75], [0, 1]);
    const labelOpacity = useTransform(spread, [0.65, 1], [0, 1]);
    const floorOpacity = useTransform(() => appear.get() * (0.35 + spread.get() * 0.4));

    // Minuterie des exemples (en pause au survol, hors de l'écran ou sans animation).
    const state = useRef({});
    useEffect(() => {
        state.current = { index, running: cycling && inView && !hovered && !reduceMotion, moving: inView && !reduceMotion };
    }, [index, cycling, inView, hovered, reduceMotion]);

    useAnimationFrame((time, delta) => {
        const { running, moving, index: current } = state.current;
        if (moving) sway.set(Math.sin(time / 2400) * 1.8);
        if (!running) return;
        const next = progress.get() + delta / (DURATION * 1000);
        if (next < 1) {
            progress.set(next);
            return;
        }
        progress.set(0);
        onIndexChange((current + 1) % STAGE_SERVICES.length);
    });

    const select = (next) => {
        progress.set(0);
        onIndexChange(next);
    };

    // Le curseur rejoint le bouton du nouvel exemple et clique.
    const cursorX = useMotionValue(CURSOR_REST.x);
    const cursorY = useMotionValue(CURSOR_REST.y);
    const press = useMotionValue(1);
    const cursorLeft = useMotionTemplate`${cursorX}%`;
    const cursorTop = useMotionTemplate`${cursorY}%`;

    useEffect(() => {
        if (!interactive) return;
        const { click } = layout;
        if (reduceMotion) {
            cursorX.set(click.x);
            cursorY.set(click.y);
            const timer = setTimeout(() => setClicked(index), 0);
            return () => clearTimeout(timer);
        }
        const sequence = animate([
            [cursorX, click.x, { duration: 0.9, ease: OUT, at: 1.1 }],
            [cursorY, click.y, { duration: 0.9, ease: OUT, at: 1.1 }],
            [press, [1, 0.78, 1], { duration: 0.4, at: 2.05 }],
        ]);
        const timer = setTimeout(() => setClicked(index), 2150);
        return () => {
            sequence.stop();
            clearTimeout(timer);
        };
    }, [interactive, index, layout, reduceMotion, cursorX, cursorY, press]);

    const done = clicked === index;
    const phone = layout.frame === "phone";

    return (
        <div
            ref={stageRef}
            className="@container relative aspect-[1/0.86] w-full"
            onPointerEnter={(event) => event.pointerType === "mouse" && setHovered(true)}
            onPointerLeave={() => setHovered(false)}
        >
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 select-none [perspective:230cqw]">
                <motion.div
                    className={`absolute left-[40.5%] top-[43%] [transform-style:preserve-3d] transition-[width,height,border-radius] duration-[1100ms] ease-expo ${frame.radius}`}
                    style={{ width: `${frame.width}%`, height: `${frame.height}%`, x: "-50%", y: "-50%", rotateX, rotateZ }}
                >
                    {/* Ombre portée au sol */}
                    <motion.div
                        className="absolute -inset-[12%] rounded-[50%] bg-[radial-gradient(closest-side,rgb(0_0_0/0.55),transparent)]"
                        style={{ transform: zFloor, opacity: floorOpacity }}
                    />

                    {/* (01) Maquette : grille de colonnes et blocs filaires */}
                    <Plane transform={zBottom}>
                        <motion.div
                            style={{ opacity: overlayOpacity }}
                            className="absolute inset-0 rounded-[inherit] border border-foreground/30 bg-background/70"
                        >
                            <div
                                className={`absolute inset-y-0 left-[4%] right-[4%] flex gap-[1.6%] transition-opacity duration-500 ${phone ? "opacity-0" : "opacity-100"}`}
                            >
                                {Array.from({ length: 12 }, (_, column) => (
                                    <span key={column} className="flex-1 bg-primary/[0.1]" />
                                ))}
                            </div>
                            <div
                                className={`absolute inset-y-0 left-[6%] right-[6%] flex gap-[4%] transition-opacity duration-500 ${phone ? "opacity-100 delay-500" : "opacity-0"}`}
                            >
                                {Array.from({ length: 4 }, (_, column) => (
                                    <span key={column} className="flex-1 bg-primary/[0.1]" />
                                ))}
                            </div>
                            <div className="absolute inset-x-0 -bottom-[2.6cqw] flex items-center gap-[0.8cqw] font-mono text-[0.85cqw] text-primary">
                                <span className="h-[0.9cqw] border-l border-primary" />
                                <span className="h-px flex-1 bg-primary/60" />
                                <span>{phone ? "390" : "1440"}</span>
                                <span className="h-px flex-1 bg-primary/60" />
                                <span className="h-[0.9cqw] border-l border-primary" />
                            </div>
                            <Blocks layout={layout}>{(id) => <WireBlock id={id} />}</Blocks>
                        </motion.div>

                        {/* Repères verticaux qui relient les coins des trois couches */}
                        {PILLARS.map(([side, bottom]) => (
                            <motion.span
                                key={`${side}-${bottom}`}
                                className="absolute w-0 origin-top border-l border-dashed border-foreground/40 transition-[left,right,top] duration-[1100ms] ease-expo"
                                style={{
                                    [side]: `${frame.corner}cqw`,
                                    top: bottom ? `calc(100% - ${frame.corner}cqw)` : `${frame.corner}cqw`,
                                    height: pillarHeight,
                                    opacity: overlayOpacity,
                                    transform: "rotateX(90deg)",
                                }}
                            />
                        ))}

                        <LayerLabel number="01" text={layers[0]} billboard={billboard} opacity={labelOpacity} corner={frame.corner} />
                    </Plane>

                    {/* (02) Code : contours des composants */}
                    <Plane transform="translateZ(0)">
                        <motion.div
                            style={{ opacity: overlayOpacity }}
                            className="absolute inset-0 rounded-[inherit] border border-dashed border-primary/50 bg-background/60"
                        >
                            <Blocks layout={layout}>{(id) => <CodeBlock tag={tags[id]} />}</Blocks>
                        </motion.div>
                        <LayerLabel number="02" text={layers[1]} billboard={billboard} opacity={labelOpacity} corner={frame.corner} />
                    </Plane>

                    {/* (03) En ligne : la page finie, avec ses interactions */}
                    <Plane transform={zTop}>
                        <motion.div
                            style={{ opacity: appear }}
                            className={`absolute inset-0 rounded-[inherit] bg-card shadow-[0_2cqw_5cqw_-1.5cqw_rgb(0_0_0/0.5)] transition-[border-width,border-color] duration-[1100ms] ease-expo ${phone ? "border-[0.7cqw] border-foreground/85" : "border border-border"}`}
                        >
                            <Blocks layout={layout}>
                                {(id) => (
                                    <AnimatePresence initial={false}>
                                        <motion.div
                                            key={service}
                                            className="absolute inset-0 overflow-hidden"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1, transition: { duration: 0.45, delay: 0.55 } }}
                                            exit={{ opacity: 0, transition: { duration: 0.2 } }}
                                        >
                                            <SiteBlock service={service} id={id} copy={copy} count={service === "shop" && done ? 3 : 2} />
                                        </motion.div>
                                    </AnimatePresence>
                                )}
                            </Blocks>
                            <span
                                className={`absolute bottom-[1.2%] left-1/2 h-[0.45cqw] w-[32%] -translate-x-1/2 rounded-full bg-foreground/60 transition-opacity duration-500 ${phone ? "opacity-100 delay-700" : "opacity-0"}`}
                            />
                        </motion.div>

                        <LayerLabel number="03" text={layers[2]} billboard={billboard} opacity={labelOpacity} corner={frame.corner} />

                        {/* Clic, notification et curseur, légèrement au-dessus de la page */}
                        {done && (
                            <motion.span
                                key={`ripple-${index}`}
                                className="absolute size-[3cqw] -translate-x-1/2 -translate-y-1/2 rounded-full border-[0.25cqw] border-primary"
                                style={{ left: `${layout.click.x}%`, top: `${layout.click.y}%` }}
                                initial={{ scale: 0.3, opacity: reduceMotion ? 0 : 0.9 }}
                                animate={{ scale: 2.2, opacity: 0 }}
                                transition={{ duration: 0.8, ease: OUT }}
                            />
                        )}

                        <AnimatePresence>
                            {done && (
                                <motion.div
                                    key={service}
                                    className="absolute"
                                    style={{ ...layout.toast, transform: "translateZ(2.5cqw)" }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0, transition: { duration: 0.2 } }}
                                >
                                    <motion.div
                                        initial={{ y: "45%", scale: 0.92 }}
                                        animate={{ y: "0%", scale: 1 }}
                                        transition={{ duration: 0.6, ease: OUT }}
                                        className={`flex items-center gap-[0.8cqw] whitespace-nowrap bg-foreground py-[0.6cqw] pl-[0.6cqw] pr-[1.3cqw] text-[1cqw] font-medium text-background shadow-[0_1.5cqw_3cqw_-1cqw_rgb(0_0_0/0.5)] ${phone ? "rounded-[1.4cqw]" : "rounded-full"}`}
                                    >
                                        <span className="flex size-[1.9cqw] shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                            <Check className="size-[1.1cqw]" strokeWidth={2.6} />
                                        </span>
                                        {copy.toast}
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <motion.div
                            className="absolute"
                            style={{ left: cursorLeft, top: cursorTop, transform: "translateZ(1.2cqw)" }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: interactive ? 1 : 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <motion.div style={{ scale: press }} className="relative">
                                <svg
                                    viewBox="0 0 14 20"
                                    className={`absolute left-0 top-0 w-[1.7cqw] overflow-visible text-foreground drop-shadow-[0_0.3cqw_0.4cqw_rgb(0_0_0/0.35)] transition-opacity duration-300 ${phone ? "opacity-0" : "opacity-100"}`}
                                    aria-hidden="true"
                                >
                                    <path
                                        d="M0 0v16l4.4-4.1 2.9 7 2.6-1.1-2.9-6.8H13z"
                                        fill="currentColor"
                                        stroke="var(--background)"
                                        strokeWidth="1.2"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <span
                                    className={`absolute left-0 top-0 size-[2.6cqw] -translate-x-1/2 -translate-y-1/2 rounded-full border-[0.2cqw] border-background bg-foreground/45 transition-opacity duration-300 ${phone ? "opacity-100" : "opacity-0"}`}
                                />
                            </motion.div>
                        </motion.div>
                    </Plane>
                </motion.div>
            </div>

            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-muted-foreground md:text-xs">
                <p aria-hidden="true" className="truncate">
                    {t("home.hero.stage.fig")} {String(index + 1).padStart(2, "0")} — {t("home.hero.stage.caption")}
                </p>
                <div role="group" aria-label={t("home.hero.stage.pick")} className="flex shrink-0 items-center gap-1.5">
                    {STAGE_SERVICES.map((key, item) => (
                        <button
                            key={key}
                            type="button"
                            onClick={() => select(item)}
                            aria-label={words[item]}
                            aria-pressed={item === index}
                            className="group flex h-8 w-9 items-center md:w-11"
                        >
                            <span className="relative block h-0.5 w-full overflow-hidden rounded-full bg-border transition-colors group-hover:bg-muted-foreground/50">
                                <motion.span
                                    className="absolute inset-0 origin-left bg-foreground"
                                    style={{ scaleX: item === index ? (cycling ? progress : 1) : item < index ? 1 : 0 }}
                                />
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
