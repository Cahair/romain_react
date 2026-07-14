"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Button from "../../components/ui/Button";
import ServiceDeepDive from "../../components/services/ServiceDeepDive";
import { ChatbotVisual, WorkflowVisual, LeadGenVisual, DataVisual } from "../../components/services/ServiceVisuals";
import { useTranslation } from "../../components/LanguageProvider";

export default function ServicesPage() {
    const { t } = useTranslation();

    return (
        <main className="h-[100dvh] w-full overflow-y-scroll snap-y snap-mandatory bg-background text-foreground scroll-smooth overflow-x-hidden">
            <Navbar />

            {/* Intro Hero Section */}
            <section className="h-[100dvh] w-full snap-start flex flex-col items-center justify-center relative overflow-hidden bg-background px-6 pt-20">
                {/* Background Effects */}
                <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vh] h-[60vh] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

                <div className="container mx-auto px-6 text-center relative z-10 flex flex-col justify-center h-full max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col gap-4"
                    >
                        <h1 className="font-display text-[clamp(2.5rem,8vw,6rem)] leading-[1.05] text-foreground">
                            {t("servicesPage.intro.titlePrefix")}{" "}
                            <span className="text-primary block md:inline">{t("servicesPage.intro.titleHighlight")}</span>
                        </h1>
                        <p
                            className="text-[clamp(1rem,2vw,1.5rem)] text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: t("servicesPage.intro.subtitle") }}
                        />
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute bottom-[5vh] left-1/2 -translate-x-1/2 z-20 cursor-pointer"
                >
                    <a href="#chatbots" className="flex flex-col items-center gap-2 group">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground group-hover:text-primary-neon transition-colors">{t("servicesPage.intro.scroll")}</span>
                        <motion.div
                            animate={{ y: [0, 5, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <ArrowRight className="rotate-90 text-primary-neon w-5 h-5 group-hover:scale-110 transition-transform" />
                        </motion.div>
                    </a>
                </motion.div>
            </section>

            {/* Section 1: Chatbots */}
            <ServiceDeepDive
                id="chatbots"
                title={t("servicesPage.chatbots.titlePrefix")}
                highlight={t("servicesPage.chatbots.titleHighlight")}
                highlightClass="text-primary-neon"
                desc={t("servicesPage.chatbots.desc")}
                buttonLabel={t("servicesPage.chatbots.button")}
                href="/services/agents"
                visual={<ChatbotVisual />}
            />

            {/* Section 2: Workflows */}
            <ServiceDeepDive
                title={t("servicesPage.workflows.titlePrefix")}
                highlight={t("servicesPage.workflows.titleHighlight")}
                highlightClass="text-secondary-neon"
                desc={t("servicesPage.workflows.desc")}
                buttonLabel={t("servicesPage.workflows.button")}
                href="/services/workflows"
                visual={<WorkflowVisual />}
                reversed
                tint
            />

            {/* Section 3: Lead Gen */}
            <ServiceDeepDive
                title={t("servicesPage.leadGen.titlePrefix")}
                highlight={t("servicesPage.leadGen.titleHighlight")}
                highlightClass="text-pink-500"
                desc={t("servicesPage.leadGen.desc")}
                buttonLabel={t("servicesPage.leadGen.button")}
                href="/services/lead-gen"
                visual={<LeadGenVisual />}
            />

            {/* Section 4: Data */}
            <ServiceDeepDive
                title={t("servicesPage.data.titlePrefix")}
                highlight={t("servicesPage.data.titleHighlight")}
                highlightClass="text-emerald-500"
                desc={t("servicesPage.data.desc")}
                buttonLabel={t("servicesPage.data.button")}
                href="/services/data"
                visual={<DataVisual />}
                reversed
                tint
            />

            {/* Section 5: Web Development */}
            <section className="h-[100dvh] w-full snap-start flex items-center justify-center relative overflow-hidden px-6 md:px-8 pt-20">
                <div className="container mx-auto h-full max-h-[90dvh] grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">

                    {/* Left Column: Content */}
                    <div className="flex flex-col justify-center gap-6 order-2 md:order-1">
                        <motion.h2
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1.05]"
                        >
                            <span className="text-blue-400">{t("servicesPage.webDev.titleLine1")}</span>
                            <br />
                            <span className="text-foreground">{t("servicesPage.webDev.titleLine2")}</span>
                        </motion.h2>

                        {/* Dynamic Subtitle with Text Animation */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="flex items-center gap-2 text-[clamp(1.125rem,2vw,1.5rem)] text-muted-foreground"
                        >
                            <span>{t("servicesPage.webDev.subtitle")}</span>
                            <span className="relative inline-block min-w-[280px] h-[1.5em]">
                                <motion.span
                                    className="text-blue-400 font-bold absolute left-0 top-0"
                                    animate={{
                                        opacity: [1, 1, 0],
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        repeatDelay: 6,
                                    }}
                                >
                                    {t("servicesPage.webDev.type1")}
                                </motion.span>
                                <motion.span
                                    className="text-blue-400 font-bold absolute left-0 top-0"
                                    animate={{
                                        opacity: [0, 0, 1, 1, 0],
                                    }}
                                    transition={{
                                        duration: 9,
                                        repeat: Infinity,
                                        times: [0, 0.3, 0.33, 0.63, 0.66],
                                        delay: 3,
                                    }}
                                >
                                    {t("servicesPage.webDev.type2")}
                                </motion.span>
                                <motion.span
                                    className="text-blue-400 font-bold absolute left-0 top-0"
                                    animate={{
                                        opacity: [0, 0, 1, 1, 0],
                                    }}
                                    transition={{
                                        duration: 9,
                                        repeat: Infinity,
                                        times: [0, 0.63, 0.66, 0.96, 1],
                                        delay: 6,
                                    }}
                                >
                                    {t("servicesPage.webDev.type3")}
                                </motion.span>
                            </span>
                        </motion.div>

                        {/* Static Description */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-lg"
                        >
                            {t("servicesPage.webDev.desc")}
                        </motion.p>

                        {/* CTA Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <Button href="/contact" variant="ghost" className="group">
                                {t("servicesPage.webDev.button")}
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </motion.div>
                    </div>

                    {/* Right Column: Visual Placeholder */}
                    <div className="flex justify-center items-center order-1 md:order-2 h-[40vh] md:h-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="relative w-full max-w-md aspect-square flex items-center justify-center"
                        >
                            {/* Animated Gradient Background */}
                            <motion.div
                                className="absolute inset-0 rounded-3xl opacity-20"
                                style={{
                                    background: "linear-gradient(135deg, #3b82f6 0%, #1e40af 50%, #2563eb 100%)",
                                }}
                                animate={{
                                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                                }}
                                transition={{
                                    duration: 8,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                            />

                            {/* Floating Code Symbol */}
                            <motion.div
                                className="relative z-10 flex flex-col items-center gap-8"
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            >
                                {/* Opening Tag */}
                                <motion.div
                                    className="text-6xl md:text-8xl font-mono text-blue-400/80"
                                    animate={{ opacity: [0.6, 1, 0.6] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                >
                                    &lt;/&gt;
                                </motion.div>

                                {/* Decorative Lines */}
                                <div className="flex gap-2">
                                    {[...Array(3)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            className="h-1 bg-blue-400/40 rounded-full"
                                            initial={{ width: 0 }}
                                            whileInView={{ width: [0, 60, 40][i] }}
                                            transition={{ delay: 0.8 + i * 0.1, duration: 0.6 }}
                                        />
                                    ))}
                                </div>
                            </motion.div>

                            {/* Orbiting Elements */}
                            <motion.div
                                className="absolute top-1/4 right-1/4 w-3 h-3 rounded-full bg-blue-400/50"
                                animate={{
                                    x: [0, 20, 0],
                                    y: [0, -20, 0],
                                }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            />
                            <motion.div
                                className="absolute bottom-1/4 left-1/4 w-2 h-2 rounded-full bg-blue-500/50"
                                animate={{
                                    x: [0, -15, 0],
                                    y: [0, 15, 0],
                                }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            />

                            {/* Pulsing Ring */}
                            <motion.div
                                className="absolute inset-0 border-2 border-blue-400/20 rounded-full"
                                animate={{
                                    scale: [1, 1.1, 1],
                                    opacity: [0.2, 0.5, 0.2],
                                }}
                                transition={{ duration: 4, repeat: Infinity }}
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Footer styled as simple copyright at the end of scroll */}
            <div className="snap-start w-full">
                <Footer />
            </div>
        </main>
    );
}
