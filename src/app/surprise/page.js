'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function SurprisePage() {
    return (
        <div className="min-h-screen bg-pink-100 flex flex-col items-center justify-center relative overflow-hidden font-sans">

            {/* Floating Hello Kitty */}
            <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="absolute top-10 right-10 z-20 w-32 md:w-48"
            >
                <Image
                    src="/images/surprise/hello_kitty1.gif"
                    alt="Hello Kitty"
                    width={200}
                    height={200}
                    unoptimized
                />
            </motion.div>

            {/* Main Content */}
            <div className="z-30 flex flex-col items-center gap-8 p-4 max-w-4xl w-full">

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-6"
                >
                    <h1 className="text-4xl md:text-6xl font-bold text-pink-600 text-center drop-shadow-md">
                        Une surprise pour toi... 🌹
                    </h1>

                    {/* Video Container - Phone Format */}
                    <div className="relative w-full max-w-xs aspect-[9/16] bg-black rounded-3xl overflow-hidden shadow-2xl border-4 border-pink-300">
                        <video
                            controls
                            className="w-full h-full object-cover"
                            poster="/images/surprise/hello_kitty1.gif"
                        >
                            <source src="/videos/cadeau.mp4" type="video/mp4" />
                            Tes navigateur ne supporte pas la lecture de vidéos.
                        </video>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
