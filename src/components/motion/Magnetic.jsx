"use client";

import { useRef } from "react";
import { motion, useSpring } from "framer-motion";

// Attire légèrement son contenu vers la souris (sans effet au doigt).
export default function Magnetic({ children, strength = 0.35, className = "" }) {
    const ref = useRef(null);
    const x = useSpring(0, { stiffness: 180, damping: 14, mass: 0.3 });
    const y = useSpring(0, { stiffness: 180, damping: 14, mass: 0.3 });

    const onPointerMove = (event) => {
        if (event.pointerType !== "mouse" || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
        y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
    };

    const reset = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            className={`inline-block ${className}`}
            style={{ x, y }}
            onPointerMove={onPointerMove}
            onPointerLeave={reset}
        >
            {children}
        </motion.div>
    );
}
