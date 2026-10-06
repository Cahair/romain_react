"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { useTranslation } from "../LanguageProvider";
import { useSplash } from "./Splash";
import { routeLabel } from "@/lib/routes";

const EASE = [0.76, 0, 0.24, 1];

const PageReadyContext = createContext(true);

// true quand le contenu de la page est visible (splash terminé, rideau en train de se lever) :
// les animations d'entrée des heros attendent ce signal.
export const usePageReady = () => useContext(PageReadyContext);

const panelVariants = (delayIn, delayOut) => ({
    idle: { y: "100%", transition: { duration: 0 } },
    cover: { y: "0%", transition: { duration: 0.7, ease: EASE, delay: delayIn } },
    covered: { y: "0%", transition: { duration: 0 } },
    reveal: { y: "-100%", transition: { duration: 0.8, ease: EASE, delay: delayOut } },
});

const primaryPanel = panelVariants(0, 0.12);
const labelPanel = panelVariants(0.08, 0);

// Transition entre les pages : un double rideau monte, la navigation se fait dessous,
// puis le rideau se lève. Les clics sur les liens internes sont interceptés en phase
// de capture, avant le gestionnaire de next/link.
export function TransitionProvider({ children }) {
    const router = useRouter();
    const pathname = usePathname();
    const lenis = useLenis();
    const { t } = useTranslation();
    const { ready: splashReady } = useSplash();
    const [phase, setPhase] = useState("idle"); // idle → cover → covered → reveal → idle
    const [target, setTarget] = useState("");
    const [origin, setOrigin] = useState(null); // page quittée au moment où le rideau se ferme
    const phaseRef = useRef("idle");
    const targetRef = useRef("");
    const lenisRef = useRef(lenis);

    useEffect(() => {
        phaseRef.current = phase;
    }, [phase]);

    useEffect(() => {
        lenisRef.current = lenis;
    }, [lenis]);

    useEffect(() => {
        const onClick = (event) => {
            if (event.defaultPrevented || event.button !== 0) return;
            if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
            const anchor = event.target instanceof Element ? event.target.closest("a[href]") : null;
            if (!anchor) return;
            if (anchor.target && anchor.target !== "_self") return;
            if (anchor.hasAttribute("download") || anchor.hasAttribute("data-no-transition")) return;

            const url = new URL(anchor.href, window.location.href);
            if (url.origin !== window.location.origin) return;
            // Espace admin : navigation directe, sans rideau.
            if (url.pathname.startsWith("/admin") || window.location.pathname.startsWith("/admin")) return;

            if (url.pathname === window.location.pathname) {
                // Même page : les ancres sont gérées par Lenis ; sinon, retour en haut.
                if (!url.hash) {
                    event.preventDefault();
                    lenisRef.current?.scrollTo(0);
                }
                return;
            }
            if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

            event.preventDefault();
            if (phaseRef.current !== "idle") return;
            targetRef.current = `${url.pathname}${url.search}${url.hash}`;
            setTarget(url.pathname);
            setOrigin(window.location.pathname);
            setPhase("cover");
        };

        document.addEventListener("click", onClick, true);
        return () => document.removeEventListener("click", onClick, true);
    }, []);

    // La nouvelle page est rendue sous le rideau : on le lève (état dérivé pendant le rendu).
    if ((phase === "cover" || phase === "covered") && origin !== null && pathname !== origin) {
        setOrigin(null);
        setPhase("reveal");
    }

    // Au lever du rideau, on repart du haut de la nouvelle page.
    useEffect(() => {
        if (phase !== "reveal") return;
        lenisRef.current?.scrollTo(0, { immediate: true, force: true });
        window.scrollTo(0, 0);
    }, [phase]);

    // Filet de sécurité : ne jamais laisser le rideau fermé si la navigation n'aboutit pas.
    useEffect(() => {
        if (phase !== "covered") return;
        const timeout = setTimeout(() => setPhase("reveal"), 5000);
        return () => clearTimeout(timeout);
    }, [phase]);

    const onCovered = (definition) => {
        if (definition !== "cover") return;
        setPhase("covered");
        router.push(targetRef.current, { scroll: false });
    };

    const onRevealed = (definition) => {
        if (definition === "reveal") setPhase("idle");
    };

    const ready = splashReady && (phase === "idle" || phase === "reveal");

    return (
        <PageReadyContext.Provider value={ready}>
            {children}
            <div
                aria-hidden="true"
                className={`fixed inset-0 z-[95] ${phase === "idle" ? "pointer-events-none" : "pointer-events-auto"}`}
            >
                <motion.div
                    className="absolute inset-0 bg-primary"
                    initial={false}
                    animate={phase}
                    variants={primaryPanel}
                    onAnimationComplete={onRevealed}
                />
                <motion.div
                    className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-foreground px-6 text-center text-background"
                    initial={false}
                    animate={phase}
                    variants={labelPanel}
                    onAnimationComplete={onCovered}
                >
                    <span className="text-[0.7rem] font-medium uppercase tracking-[0.2em] opacity-60 md:text-xs">
                        Romain Kantzer
                    </span>
                    <span className="font-serif text-5xl italic leading-none md:text-8xl">
                        {target ? routeLabel(target, t) : ""}
                    </span>
                </motion.div>
            </div>
        </PageReadyContext.Provider>
    );
}
