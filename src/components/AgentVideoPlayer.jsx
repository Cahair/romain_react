"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AgentVideoPlayer({ videoSrc, agentName, style }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const videoRef = useRef(null);

    const handlePlayPause = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
                setIsPlaying(false);
            } else {
                videoRef.current.play();
                setIsPlaying(true);
            }
        }
    };

    const handleVideoEnd = () => {
        setIsPlaying(false);
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
        }
    };

    return (
        <div
            className="relative w-full h-auto rounded-xl overflow-hidden group/video cursor-pointer"
            onClick={handlePlayPause}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative w-full overflow-hidden" style={{ paddingTop: '56.25%' }}>
                <video
                    ref={videoRef}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    style={{
                        transform: 'scale(1.15)',
                        objectPosition: 'center 45%'
                    }}
                    onEnded={handleVideoEnd}
                    preload="metadata"
                >
                    <source src={videoSrc} type="video/mp4" />
                    Votre navigateur ne supporte pas la vidéo.
                </video>
            </div>

            {/* Overlay with Play Button */}
            <AnimatePresence>
                {!isPlaying && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{
                                scale: isHovered ? 1.1 : 1,
                            }}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className={`relative w-24 h-24 rounded-full ${style.accent.replace('text-', 'bg-')}/20 backdrop-blur-md border-2 ${style.border} flex items-center justify-center ${style.glow}`}
                        >
                            {/* Play Icon */}
                            <svg
                                className={`w-12 h-12 ${style.accent} ml-1`}
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M8 5v14l11-7z" />
                            </svg>

                            {/* Pulse Animation */}
                            <motion.div
                                className={`absolute inset-0 rounded-full ${style.accent.replace('text-', 'bg-')}/30`}
                                animate={{
                                    scale: [1, 1.3, 1],
                                    opacity: [0.5, 0, 0.5],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Pause Overlay (appears briefly when clicking on playing video) */}
            <AnimatePresence>
                {isPlaying && isHovered && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex items-center justify-center bg-black/20"
                    >
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            className={`w-16 h-16 rounded-full ${style.accent.replace('text-', 'bg-')}/30 backdrop-blur-md border ${style.border} flex items-center justify-center`}
                        >
                            {/* Pause Icon */}
                            <svg
                                className={`w-8 h-8 ${style.accent}`}
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                            </svg>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
