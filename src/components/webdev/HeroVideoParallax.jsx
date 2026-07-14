"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Code2, Sparkles, Globe, CheckCircle2 } from "lucide-react";
import Button from "../ui/Button";

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
    const videoRef = useRef(null);
    const [videoLoaded, setVideoLoaded] = useState(false);

    // onLoadedData can fire before hydration attaches the listener —
    // check readyState on mount so the video never stays stuck at opacity 0
    useEffect(() => {
        if (videoRef.current && videoRef.current.readyState >= 2) {
            setVideoLoaded(true);
        }
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    // Video moves slower than scroll = parallax
    const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.4, 1]);
    const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

    const words = hero.title.split(" ");
    const proofs = Array.isArray(hero.proofs) ? hero.proofs : [];

    return (
        <section ref={containerRef} className="relative h-screen min-h-[100dvh] overflow-hidden">
            {/* Video / Image Background with Parallax */}
            <motion.div className="absolute inset-0 z-0" style={{ y: videoY }}>
                {/* Fallback gradient while video loads */}
                <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/10 to-background" />

                {/* Video */}
                <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    onLoadedData={() => setVideoLoaded(true)}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded ? "opacity-100" : "opacity-0"}`}
                >
                    <source src="/videos/video_dev_web.mp4" type="video/mp4" />
                </video>
            </motion.div>

            {/* Dark Overlay — lighter at rest so the video stays visible, denser on scroll */}
            <motion.div
                className="absolute inset-0 z-[1] bg-gradient-to-b from-black/40 via-black/30 to-background"
                style={{ opacity: overlayOpacity }}
            />

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 z-[2] opacity-[0.06]">
                <div
                    className="absolute inset-0 bg-[linear-gradient(to_right,var(--primary)_1px,transparent_1px),linear-gradient(to_bottom,var(--primary)_1px,transparent_1px)] bg-[size:4rem_4rem]"
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
                    className="font-mono text-primary-neon text-xs md:text-sm tracking-[0.3em] uppercase mb-6 md:mb-8 drop-shadow-[0_0_10px_rgba(0,0,0,1)]"
                >
                    {hero.overline}
                </motion.span>

                {/* Giant Title — word by word */}
                <h1 className="font-display text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-center leading-[1.05] max-w-6xl drop-shadow-[0_0_20px_rgba(0,0,0,0.8)]">
                    {words.map((word, i) => (
                        <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
                            <Word delay={0.5 + i * 0.07}>
                                {word}
                            </Word>
                        </span>
                    ))}
                </h1>

                {/* Subtitle — value proposition */}
                {hero.subtitle && (
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.6 }}
                        className="mt-6 max-w-2xl text-center text-sm md:text-lg text-white/85 leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]"
                    >
                        {hero.subtitle}
                    </motion.p>
                )}

                {/* Floating Icons */}
                <motion.div
                    className="absolute top-[20%] left-[15%] text-primary-neon/30 hidden md:block"
                    animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                    <Code2 size={64} />
                </motion.div>
                <motion.div
                    className="absolute top-[30%] right-[10%] text-secondary-neon/30 hidden lg:block"
                    animate={{ y: [0, 20, 0], rotate: [0, -15, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                    <Globe size={80} />
                </motion.div>
                <motion.div
                    className="absolute bottom-[25%] left-[20%] text-white/20 hidden md:block"
                    animate={{ y: [0, 15, 0], scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                    <Sparkles size={48} />
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                    className="mt-8 md:mt-10"
                >
                    <Button href="/contact" size="lg" className="group">
                        {hero.cta}
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                </motion.div>

                {/* Micro-proofs */}
                {proofs.length > 0 && (
                    <motion.ul
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5, duration: 0.6 }}
                        className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
                    >
                        {proofs.map((proof, i) => (
                            <li
                                key={i}
                                className="flex items-center gap-2 font-mono text-[11px] md:text-xs uppercase tracking-wider text-white/70 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
                            >
                                <CheckCircle2 size={14} className="text-primary-neon shrink-0" />
                                {proof}
                            </li>
                        ))}
                    </motion.ul>
                )}

                {/* Scroll cue */}
                <motion.div
                    className="absolute bottom-8 flex flex-col items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                >
                    <motion.div
                        className="w-[1px] h-10 bg-gradient-to-b from-primary-neon/60 to-transparent"
                        animate={{ scaleY: [1, 0.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                </motion.div>
            </motion.div>
        </section>
    );
}
