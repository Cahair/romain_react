import { motion } from "framer-motion";

export default function ProblemSection() {
    const rawData = [
        `{ "id": "err_402", "timestamp": "2024-03-12T14:22:10Z", "payload": "x86_overflow" }`,
        `[WARN] Heap fragmentation at 89% - GC latency increasing...`,
        `SELECT * FROM unstructured_logs WHERE parsing_failed = true LIMIT 1000`,
        `ERROR: undefined is not a function at Object.process (index.js:402)`,
        `"customer_id";"churn_risk";"last_login";"LTV";"segment"`,
        `"99281a";"HIGH";"2023-11-01";"12.50";"UNKNOWN"`,
        `Stack trace: Error: Connection timed out at TCPConnectWrap.afterConnect`,
        `Binary stream: 00101101 11010010 10101011 11100010 00101010`,
        `{ "status": 500, "message": "Internal Server Error", "trace": "..." }`,
        `ImportError: No module named 'clean_data'`,
    ];

    return (
        <div className="w-full h-full bg-slate-950 relative overflow-hidden flex items-center justify-center p-8 pt-24 md:p-8">
            {/* Matrix Background Effect */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-cyan-900/50 font-mono text-xs whitespace-nowrap"
                        initial={{ y: -100, x: Math.random() * 100 + "%" }}
                        animate={{ y: "100vh" }}
                        transition={{
                            duration: Math.random() * 10 + 5,
                            repeat: Infinity,
                            ease: "linear",
                            delay: Math.random() * 5
                        }}
                    >
                        {rawData[i % rawData.length]}
                    </motion.div>
                ))}
            </div>

            {/* Content Content - Chaotic Overlay */}
            <div className="relative z-10 max-w-md w-full">
                <div className="space-y-4 font-mono text-sm">
                    {rawData.slice(0, 6).map((line, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className={`p-3 rounded border border-slate-800 bg-slate-900/50 backdrop-blur-sm
                                ${idx === 3 ? 'text-red-400 border-red-900/30' : 'text-slate-500'}
                                ${idx % 2 === 0 ? 'ml-0' : 'ml-8'}
                            `}
                        >
                            <div className="truncate opacity-80">{line}</div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-8 text-center"
                >
                    <span className="inline-block px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs border border-red-500/20">
                        ⚠️ Data Overload
                    </span>
                </motion.div>
            </div>

            {/* Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950 pointer-events-none" />
        </div>
    );
}
