"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";

// Animated word component
const Word = ({ children, delay }) => (
    <motion.span
        className="inline-block"
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
        {children}
    </motion.span>
);

export default function HeroVideoParallax({ hero }) {
    const containerRef = useRef(null);
    const [videoLoaded, setVideoLoaded] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    // Video moves slower than scroll = parallax
    const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.5, 0.9]);
    const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

    const words = hero.title.split(" ");

    return (
        <section ref={containerRef} className="relative h-screen min-h-[100dvh] overflow-hidden">
            {/* Video / Image Background with Parallax */}
            <motion.div className="absolute inset-0 z-0" style={{ y: videoY }}>
                {/* Fallback gradient while video loads */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/50 to-slate-950" />

                {/* Video */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    onLoadedData={() => setVideoLoaded(true)}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded ? "opacity-30" : "opacity-0"}`}
                >
                    <source src="/videos/video_landing-page_web_dev.mp4" type="video/mp4" />
                </video>
            </motion.div>

            {/* Dark Overlay */}
            <motion.div
                className="absolute inset-0 z-[1] bg-gradient-to-b from-black/80 via-black/50 to-background"
                style={{ opacity: overlayOpacity }}
            />

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 z-[2] opacity-[0.06]">
                <div
                    className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f620_1px,transparent_1px),linear-gradient(to_bottom,#3b82f620_1px,transparent_1px)] bg-[size:4rem_4rem]"
                    style={{
                        maskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black, transparent)",
                        WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black, transparent)",
                    }}
                />
            </div>

            {/* Content */}
            <motion.div
                className="relative z-10 h-full flex flex-col items-center justify-center px-6"
                style={{ opacity: contentOpacity }}
            >
                {/* Overline */}
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="font-mono text-blue-400 text-xs md:text-sm tracking-[0.3em] uppercase mb-6 md:mb-10 drop-shadow-[0_0_10px_rgba(0,0,0,1)]"
                >
                    {hero.overline}
                </motion.span>

                {/* Giant Title — word by word */}
                <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-center leading-[1.05] tracking-tight uppercase max-w-6xl drop-shadow-[0_0_20px_rgba(0,0,0,0.8)]">
                    {words.map((word, i) => (
                        <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
                            <Word delay={0.5 + i * 0.07}>
                                {word}
                            </Word>
                        </span>
                    ))}
                </h1>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                    className="mt-10 md:mt-14"
                >
                    <Link
                        href="/contact"
                        className="group inline-flex items-center gap-3 px-8 py-4 md:px-10 md:py-5 bg-blue-500 hover:bg-blue-600 text-white font-bold uppercase tracking-widest text-xs md:text-sm transition-all duration-300 shadow-[0_0_40px_rgba(59,130,246,0.4)] hover:shadow-[0_0_60px_rgba(59,130,246,0.7)] hover:scale-105"
                    >
                        {hero.cta}
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </motion.div>

                {/* Scroll cue */}
                <motion.div
                    className="absolute bottom-8 flex flex-col items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                >
                    <motion.div
                        className="w-[1px] h-10 bg-gradient-to-b from-blue-400/60 to-transparent"
                        animate={{ scaleY: [1, 0.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                </motion.div>
            </motion.div>
        </section>
    );
}
