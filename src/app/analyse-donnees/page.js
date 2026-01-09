"use client";

import ProblemSection from '@/components/data-analysis/ProblemSection';
import SolutionSection from '@/components/data-analysis/SolutionSection';
import ProcessingIcon from '@/components/data-analysis/ProcessingIcon';
import { motion } from 'framer-motion';

export default function DataAnalysisPage() {
    return (
        <main className="min-h-screen w-full flex flex-col md:flex-row relative">

            {/* Header/Nav would be above this, assuming this is a standalone page or fits in layout */}

            {/* Left/Top Side - PROBLEM */}
            <section className="basis-1/2 min-h-[50vh] md:min-h-screen relative z-0">
                <ProblemSection />

                {/* Overlay Text for Problem */}
                <div className="absolute bottom-8 left-8 z-20 md:top-12 md:left-12 md:bottom-auto">
                    <h2 className="text-3xl font-bold text-slate-200 tracking-tight font-heading">
                        Des Données <br />
                        <span className="text-slate-500">Illisibles</span>
                    </h2>
                </div>
            </section>

            {/* Center Processing Unit */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none">
                <ProcessingIcon />
            </div>

            {/* Right/Bottom Side - SOLUTION */}
            <section className="basis-1/2 min-h-[50vh] md:min-h-screen relative z-0">
                <SolutionSection />

                {/* Overlay Text for Solution */}
                <div className="absolute top-8 right-8 z-20 md:top-12 md:right-12 text-right">
                    <h2 className="text-3xl font-bold text-slate-800 tracking-tight font-heading">
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
    );
}
