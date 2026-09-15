"use client";

import { useRef } from "react";
import {
    motion,
    useAnimationFrame,
    useMotionValue,
    useReducedMotion,
    useScroll,
    useSpring,
    useTransform,
    useVelocity,
} from "framer-motion";

const wrap = (min, max, value) => {
    const range = max - min;
    return ((((value - min) % range) + range) % range) + min;
};

// Bandeau défilant qui accélère, s'incline et change de sens avec la vitesse du scroll.
// Le contenu est répété 4 fois : décaler de 25 % revient à décaler d'une copie.
export default function Marquee({ children, baseVelocity = -3, className = "" }) {
    const reduceMotion = useReducedMotion();
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], { clamp: false });
    const skewX = useTransform(smoothVelocity, [-2500, 0, 2500], [7, 0, -7]);
    const x = useTransform(baseX, (value) => `${wrap(-25, 0, value)}%`);
    const direction = useRef(1);

    useAnimationFrame((_, delta) => {
        if (reduceMotion) return;
        let moveBy = direction.current * baseVelocity * (delta / 1000);
        const factor = velocityFactor.get();
        if (factor < 0) direction.current = -1;
        else if (factor > 0) direction.current = 1;
        moveBy += direction.current * moveBy * factor;
        baseX.set(baseX.get() + moveBy);
    });

    return (
        <div className={`overflow-hidden ${className}`}>
            <motion.div className="flex w-max flex-nowrap" style={{ x, skewX }}>
                {[0, 1, 2, 3].map((copy) => (
                    <div key={copy} aria-hidden={copy > 0 ? "true" : undefined} className="flex shrink-0 items-center">
                        {children}
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
