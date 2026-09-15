"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "framer-motion";
import "lenis/dist/lenis.css";

// Défilement amorti global (Lenis). Il reste sur le scroll natif, donc useScroll,
// position: sticky et les ancres fonctionnent normalement. Coupé si l'utilisateur
// demande moins d'animations.
export default function SmoothScroll({ children }) {
    const reduceMotion = useReducedMotion();

    return (
        <ReactLenis
            root
            options={{
                lerp: reduceMotion ? 1 : 0.09,
                smoothWheel: !reduceMotion,
                anchors: true,
            }}
        >
            {children}
        </ReactLenis>
    );
}
