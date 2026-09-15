"use client";

import { createContext, useCallback, useContext, useEffect, useState, useSyncExternalStore } from "react";
import { AnimatePresence, animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useLenis } from "lenis/react";
import { useTranslation } from "../LanguageProvider";

const EASE = [0.76, 0, 0.24, 1];

const SplashContext = createContext({ ready: true });

// ready passe à true quand le rideau du splash se lève (ou tout de suite s'il est ignoré).
export const useSplash = () => useContext(SplashContext);

const subscribeNothing = () => () => {};
const splashAlreadySeen = () => document.documentElement.classList.contains("splash-seen");

// Écran d'introduction joué une fois par session. Il est rendu côté serveur pour éviter
// tout flash de contenu ; le script inline du layout pose `html.splash-seen` quand il
// doit être ignoré (déjà vu, ou mouvement réduit).
export function SplashProvider({ children }) {
    // false au rendu serveur et à l'hydratation (le splash est dans le HTML), puis lu dans le DOM.
    const skipped = useSyncExternalStore(subscribeNothing, splashAlreadySeen, () => false);
    const [finished, setFinished] = useState(false);
    const active = !skipped && !finished;
    const ready = skipped || finished;

    const finish = useCallback(() => {
        try {
            sessionStorage.setItem("rk-splash", "1");
        } catch {
            // stockage indisponible (navigation privée) : le splash rejouera, sans gravité
        }
        setFinished(true);
    }, []);

    return (
        <SplashContext.Provider value={{ ready }}>
            {children}
            <AnimatePresence onExitComplete={() => document.documentElement.classList.add("splash-seen")}>
                {active && <Splash key="splash" onDone={finish} />}
            </AnimatePresence>
        </SplashContext.Provider>
    );
}

function Splash({ onDone }) {
    const { t } = useTranslation();
    const lenis = useLenis();
    const progress = useMotionValue(0);
    const counter = useTransform(progress, (value) => String(Math.round(value)).padStart(3, "0"));
    const bar = useTransform(progress, [0, 100], [0, 1]);

    useEffect(() => {
        lenis?.stop();
        return () => lenis?.start();
    }, [lenis]);

    useEffect(() => {
        let cancelled = false;
        const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        const pageLoaded = new Promise((resolve) => {
            if (document.readyState === "complete") resolve();
            else window.addEventListener("load", resolve, { once: true });
        });
        const fontsLoaded = document.fonts?.ready ?? Promise.resolve();

        const run = async () => {
            window.scrollTo(0, 0);
            await animate(progress, 72, { duration: 1.3, ease: [0.33, 1, 0.68, 1] });
            // On attend le chargement réel, sans jamais bloquer plus de 2,5 s.
            await Promise.race([Promise.all([pageLoaded, fontsLoaded]), wait(2500)]);
            if (cancelled) return;
            await animate(progress, 100, { duration: 0.6, ease: [0.65, 0, 0.35, 1] });
            await wait(250);
            if (!cancelled) onDone();
        };
        run();

        return () => {
            cancelled = true;
        };
    }, [progress, onDone]);

    return (
        <motion.div
            data-splash
            role="presentation"
            className="fixed inset-0 z-[100] flex flex-col justify-between overflow-hidden bg-background px-5 py-6 text-foreground md:px-10 md:py-8"
            exit={{ y: "-100%", transition: { duration: 1, ease: EASE, delay: 0.3 } }}
        >
            <motion.div
                className="flex items-center gap-4 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-muted-foreground md:text-xs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.3 } }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <span className="hidden sm:inline">Romain Kantzer</span>
                <span className="hidden h-px flex-1 bg-border sm:block" />
                <span>[ {t("splash.location")} ]</span>
            </motion.div>

            <div className="flex flex-col items-center">
                <div className="flex overflow-hidden pb-[0.06em] font-semibold leading-[0.82] tracking-[-0.05em] text-[34vw] md:text-[17vw]">
                    {["R", "K"].map((letter, index) => (
                        <motion.span
                            key={letter}
                            className="inline-block"
                            initial={{ y: "105%" }}
                            animate={{ y: "0%" }}
                            exit={{ y: "-105%", transition: { duration: 0.6, ease: EASE, delay: index * 0.05 } }}
                            transition={{ duration: 1.1, ease: EASE, delay: 0.1 + index * 0.08 }}
                        >
                            {letter}
                        </motion.span>
                    ))}
                </div>
                <div className="mt-[5vw] h-1.5 w-[26vw] overflow-hidden bg-foreground/10 md:mt-[2.5vw] md:w-[13vw]">
                    <motion.div className="h-full w-full origin-left bg-primary" style={{ scaleX: bar }} />
                </div>
            </div>

            <motion.div
                className="flex items-end justify-between gap-6"
                exit={{ opacity: 0, transition: { duration: 0.3 } }}
            >
                <p className="text-sm leading-snug text-muted-foreground md:text-base">
                    {t("splash.role")}
                    <br />
                    {t("splash.loading")}
                </p>
                <motion.span className="font-light leading-[0.8] tracking-[-0.04em] tabular-nums text-[20vw] md:text-[9vw]">
                    {counter}
                </motion.span>
            </motion.div>
        </motion.div>
    );
}
