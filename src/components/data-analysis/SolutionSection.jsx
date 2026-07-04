import { motion } from "framer-motion";

export default function SolutionSection() {
    return (
        <div className="w-full h-full bg-slate-50 relative overflow-hidden flex items-center justify-center p-8">

            {/* Background Grid */}
            <div className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
                    backgroundSize: '32px 32px'
                }}
            ></div>

            <div className="relative z-10 w-full max-w-md space-y-6">

                {/* Chart 1: Evolution */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="bg-white p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 relative overflow-hidden"
                >
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="text-slate-800 font-bold text-lg">Croissance Mensuelle</h3>
                            <p className="text-slate-400 text-xs">Analyse Prédictive IA</p>
                        </div>
                        <div className="px-2 py-1 bg-green-50 text-green-600 text-xs font-bold rounded">+24%</div>
                    </div>

                    {/* SVG Line Chart */}
                    <div className="h-32 w-full relative">
                        <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
                                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                            <motion.path
                                d="M0,100 C 50,80 100,120 150,60 S 250,40 350,10 L 350,130 L 0,130 Z"
                                fill="url(#chartGradient)"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            />
                            <motion.path
                                d="M0,100 C 50,80 100,120 150,60 S 250,40 350,10"
                                fill="none"
                                stroke="#3b82f6"
                                strokeWidth="3"
                                strokeLinecap="round"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                            />
                            {/* Floating Value Point */}
                            <motion.g
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1.5 }}
                            >
                                <circle cx="350" cy="10" r="5" fill="#fff" stroke="#3b82f6" strokeWidth="3" />
                                <rect x="300" y="-20" width="60" height="24" rx="4" fill="#3b82f6" />
                                <text x="330" y="-4" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Forecast</text>
                            </motion.g>
                        </svg>
                    </div>
                </motion.div>

                {/* Chart 2: Distribution (Donut Cards) */}
                <div className="grid grid-cols-2 gap-4">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center"
                    >
                        <div className="relative w-20 h-20 mb-2">
                            <svg className="w-full h-full rotate-[-90deg]">
                                <circle cx="40" cy="40" r="32" fill="none" stroke="#f1f5f9" strokeWidth="8" />
                                <motion.circle
                                    cx="40" cy="40" r="32" fill="none" stroke="#6366f1" strokeWidth="8" strokeLinecap="round"
                                    initial={{ strokeDasharray: 201, strokeDashoffset: 201 }}
                                    whileInView={{ strokeDashoffset: 201 * 0.25 }} // 75%
                                    transition={{ duration: 1, delay: 0.5 }}
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center font-bold text-slate-800">
                                75%
                            </div>
                        </div>
                        <span className="text-xs text-slate-500 font-medium">Efficacité</span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-center"
                    >
                        <div className="text-2xl font-black text-slate-800 mb-1">-4h</div>
                        <div className="text-xs text-slate-500 leading-tight">Temps moyen économisé par jour</div>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
                                initial={{ width: 0 }}
                                whileInView={{ width: "80%" }}
                                transition={{ duration: 1, delay: 0.4 }}
                            />
                        </div>
                    </motion.div>
                </div>

            </div>
        </div>
    );
}
