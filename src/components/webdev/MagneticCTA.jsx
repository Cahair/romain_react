"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

// ─── Magnetic Button ───
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
            <Link
                href={href}
                className="group relative inline-flex items-center gap-3 px-10 py-5 md:px-14 md:py-6 bg-primary hover:bg-primary-dark text-primary-foreground font-bold uppercase tracking-widest text-sm md:text-base transition-all duration-300 shadow-[0_0_40px] shadow-primary/40 hover:shadow-[0_0_60px] hover:shadow-primary/70 hover:scale-105 overflow-hidden"
            >
                <span className="absolute inset-0 bg-gradient-to-r from-primary-dark to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative z-10 flex items-center gap-3">
                    {children}
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </span>
            </Link>
        </motion.div>
    );
}
