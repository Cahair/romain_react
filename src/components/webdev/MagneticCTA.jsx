"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import Button from "../ui/Button";

// ─── Magnetic Button ───
// L'effet magnétique est conservé ; le bouton lui-même suit le standard du site.
export default function MagneticCTA({ children, href }) {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 300, damping: 20 });
    const springY = useSpring(y, { stiffness: 300, damping: 20 });

    const handleMouseMove = (e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.25;
        const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.25;
        x.set(Math.max(-25, Math.min(25, dx)));
        y.set(Math.max(-15, Math.min(15, dy)));
    };

    const handleMouseLeave = () => { x.set(0); y.set(0); };

    return (
        <motion.div
            ref={ref}
            style={{ x: springX, y: springY }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="inline-block"
        >
            <Button href={href} size="lg" className="group">
                {children}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
        </motion.div>
    );
}
