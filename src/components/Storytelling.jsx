"use client";
import { motion } from "framer-motion";
import { useTranslation } from "./LanguageProvider";

export default function Storytelling() {
    const { t } = useTranslation();

    return (
        <section className="py-12 md:py-24 relative overflow-hidden">
            <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

            <div className="container mx-auto px-4 md:px-6 relative">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="mb-8 md:mb-12"
                    >
                        <span className="px-3 md:px-4 py-1.5 md:py-2 rounded-full glass text-[10px] md:text-xs font-black tracking-[0.2em] md:tracking-[0.3em] uppercase mb-6 md:mb-8 inline-block">
                            {t("storytelling.badge")}
                        </span>
                        <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-black tracking-tight mb-4 md:mb-8 italic leading-normal md:leading-relaxed">
                            {/* First line */}
                            <span className="block">
                                {t("storytelling.title")} <span className="text-muted-foreground">{t("storytelling.titleHighlight")}</span> {t("storytelling.titleEnd")}
                            </span>
                            {/* Second line */}
                            <span className="block mt-1 md:mt-2">
                                {t("storytelling.subtitle1")} <span className="text-gradient border-b-2 md:border-b-[3px] border-primary/30 pb-1 md:pb-2">{t("storytelling.subtitleHighlight")}</span> {t("storytelling.subtitle2")}
                            </span>
                        </h2>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="text-muted-foreground text-sm md:text-lg lg:text-xl leading-relaxed px-2"
                    >
                        {t("storytelling.description")}
                    </motion.p>
                </div>
            </div>
        </section>
    );
}
