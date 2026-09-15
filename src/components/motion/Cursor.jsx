"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";

const INTERACTIVE = "a, button, [role='button'], input, textarea, select, label, summary";

// Curseur suiveur (souris uniquement) : un anneau en mode différence qui grossit sur les
// éléments cliquables, et une pastille à libellé sur les zones marquées data-cursor="…".
export default function Cursor() {
    const [enabled, setEnabled] = useState(false);
    const [mode, setMode] = useState("default");
    const [label, setLabel] = useState("");
    const [visible, setVisible] = useState(false);
    const visibleRef = useRef(false);
    const x = useMotionValue(-100);
    const y = useMotionValue(-100);
    const springX = useSpring(x, { stiffness: 450, damping: 38, mass: 0.6 });
    const springY = useSpring(y, { stiffness: 450, damping: 38, mass: 0.6 });

    useEffect(() => {
        const query = window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");
        const update = () => setEnabled(query.matches);
        update();
        query.addEventListener("change", update);
        return () => query.removeEventListener("change", update);
    }, []);

    useEffect(() => {
        if (!enabled) return;
        const root = document.documentElement;
        root.classList.add("has-cursor");

        const onMove = (event) => {
            x.set(event.clientX);
            y.set(event.clientY);
            if (!visibleRef.current) {
                visibleRef.current = true;
                setVisible(true);
            }
        };
        const onOver = (event) => {
            const element = event.target instanceof Element ? event.target : null;
            const labelled = element?.closest("[data-cursor]");
            if (labelled) {
                setMode("label");
                setLabel(labelled.getAttribute("data-cursor") || "");
                return;
            }
            setMode(element?.closest(INTERACTIVE) ? "hover" : "default");
        };
        const onLeave = () => {
            visibleRef.current = false;
            setVisible(false);
        };

        window.addEventListener("pointermove", onMove, { passive: true });
        document.addEventListener("pointerover", onOver);
        root.addEventListener("pointerleave", onLeave);
        return () => {
            window.removeEventListener("pointermove", onMove);
            document.removeEventListener("pointerover", onOver);
            root.removeEventListener("pointerleave", onLeave);
            root.classList.remove("has-cursor");
        };
    }, [enabled, x, y]);

    if (!enabled) return null;

    const size = mode === "hover" ? 60 : mode === "label" ? 0 : 30;

    return (
        <>
            <motion.div
                aria-hidden="true"
                className="pointer-events-none fixed left-0 top-0 z-[120] mix-blend-difference"
                style={{ x: springX, y: springY }}
            >
                <motion.div
                    className="-translate-x-1/2 -translate-y-1/2 rounded-full border border-white"
                    initial={false}
                    animate={{
                        width: size,
                        height: size,
                        opacity: visible ? 1 : 0,
                        backgroundColor: mode === "hover" ? "rgba(255,255,255,1)" : "rgba(255,255,255,0)",
                    }}
                    transition={{ type: "spring", stiffness: 320, damping: 28 }}
                />
            </motion.div>
            <motion.div
                aria-hidden="true"
                className="pointer-events-none fixed left-0 top-0 z-[121]"
                style={{ x: springX, y: springY }}
            >
                <AnimatePresence>
                    {mode === "label" && visible && (
                        <motion.div
                            key="cursor-label"
                            className="flex size-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        >
                            {label}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </>
    );
}
