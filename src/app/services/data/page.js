"use client";

import ProblemSection from '@/components/data-analysis/ProblemSection';
import SolutionSection from '@/components/data-analysis/SolutionSection';
import ProcessingIcon from '@/components/data-analysis/ProcessingIcon';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

export default function DataAnalysisPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <main className="flex-1 w-full flex flex-col md:flex-row relative">

                {/* Left/Top Side - PROBLEM */}
                <section className="basis-1/2 min-h-[50vh] md:min-h-screen relative z-0">
                    <ProblemSection />

                    {/* Overlay Text for Problem */}
                    <div className="absolute bottom-8 left-8 z-20 md:top-32 md:left-12 md:bottom-auto">
                        <h1 className="font-display text-3xl md:text-4xl text-slate-200">
                            Des Données <br />
                            <span className="text-slate-500">Illisibles</span>
                        </h1>
                    </div>
                </section>

                {/* Center Processing Unit */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none hidden md:block">
                    <ProcessingIcon />
                </div>
                {/* Mobile Icon */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none md:hidden">
                    <ProcessingIcon />
                </div>

                {/* Right/Bottom Side - SOLUTION */}
                <section className="basis-1/2 min-h-[50vh] md:min-h-screen relative z-0">
                    <SolutionSection />

                    {/* Overlay Text for Solution */}
                    <div className="absolute top-28 right-8 z-20 md:top-32 md:right-12 text-right">
                        <h2 className="font-display text-3xl md:text-4xl text-slate-800">
                            Une Vision <br />
                            <span className="text-cyan-500">Claire</span>
                        </h2>
                    </div>
                </section>

                {/* Floating Message */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 z-40 w-full text-center pointer-events-none"
                >
                    <div className="inline-block bg-black/80 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 shadow-2xl">
                        <p className="text-white font-medium text-sm md:text-base">
                            Ne lisez plus vos données. <span className="text-cyan-400 font-bold">Comprenez-les.</span>
                        </p>
                    </div>
                </motion.div>

            </main>

            <Footer />
        </div>
    );
}
