"use client";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { usePageAccent } from "./PageAccent";

export default function LoadingBar() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const accent = usePageAccent();
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Start loading animation
        setLoading(true);
        setProgress(0);

        // Simulate progress
        const timer1 = setTimeout(() => setProgress(30), 50);
        const timer2 = setTimeout(() => setProgress(60), 150);
        const timer3 = setTimeout(() => setProgress(80), 300);
        const timer4 = setTimeout(() => {
            setProgress(100);
            setTimeout(() => setLoading(false), 200);
        }, 400);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
            clearTimeout(timer4);
        };
    }, [pathname, searchParams]);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    className="fixed top-0 left-0 right-0 h-1 z-[200]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="h-full"
                        style={{
                            background: `linear-gradient(90deg, ${accent.primary}, #fff, ${accent.primary})`,
                            backgroundSize: "200% 100%",
                            boxShadow: `0 0 20px ${accent.primary}, 0 0 40px ${accent.primary}`,
                        }}
                        initial={{ width: "0%" }}
                        animate={{
                            width: `${progress}%`,
                            backgroundPosition: ["0% 0%", "100% 0%"],
                        }}
                        transition={{
                            width: { duration: 0.3, ease: "easeOut" },
                            backgroundPosition: { duration: 1, repeat: Infinity, ease: "linear" }
                        }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
