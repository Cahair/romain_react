"use client";
import { motion } from "framer-motion";
import { useTranslation } from "./LanguageProvider";

export default function Storytelling() {
    const { t } = useTranslation();

    return (
        <section className="py-24 relative overflow-hidden">
            <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

            <div className="container mx-auto px-6 relative">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="mb-12"
                    >
                        <span className="px-4 py-2 rounded-full glass text-xs font-black tracking-[0.3em] uppercase mb-8 inline-block">
                            {t("storytelling.badge")}
                        </span>
                        <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-8 italic leading-relaxed">
                            {t("storytelling.title")} <span className="text-white/60">{t("storytelling.titleHighlight")}</span>{t("storytelling.titleEnd")} <br />
                            {t("storytelling.subtitle1")} <span className="text-gradient inline-block border-b-[3px] border-primary/30 pb-4 pr-3">{t("storytelling.subtitleHighlight")}</span> {t("storytelling.subtitle2")}
                        </h2>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="text-gray-400 text-lg md:text-xl leading-relaxed"
                    >
                        {t("storytelling.description")}
                    </motion.p>
                </div>
            </div>
        </section>
    );
}
