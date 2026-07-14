"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import AgentCard from "../../../components/AgentCard";
import ServiceDeepDive from "../../../components/services/ServiceDeepDive";
import { ChatbotVisual, WorkflowVisual, LeadGenVisual, DataVisual } from "../../../components/services/ServiceVisuals";
import { useTranslation } from "../../../components/LanguageProvider";

const getAgents = (t) => [
    {
        id: "axiom",
        name: "Emma",
        role: t("agentsPage.agentsList.emma.role"),
        tasks: t("agentsPage.agentsList.emma.tasks"),
        cta: t("agentsPage.agentsList.emma.cta"),
    },
    {
        id: "lumina",
        name: "Luna",
        role: t("agentsPage.agentsList.luna.role"),
        tasks: t("agentsPage.agentsList.luna.tasks"),
        cta: t("agentsPage.agentsList.luna.cta"),
    },
    {
        id: "kairo",
        name: "Maya",
        role: t("agentsPage.agentsList.maya.role"),
        tasks: t("agentsPage.agentsList.maya.tasks"),
        cta: t("agentsPage.agentsList.maya.cta"),
    },
];

export default function AgentsPage() {
    const { t } = useTranslation();
    const agents = getAgents(t);

    return (
        <main className="h-[100dvh] w-full overflow-y-scroll snap-y snap-mandatory bg-background text-foreground selection:bg-purple-900/30 selection:text-foreground scroll-smooth">
            <Navbar />

            {/* Title Section */}
            <section className="h-[100dvh] w-full snap-start flex flex-col items-center justify-center relative overflow-hidden pt-20">
                {/* Background Elements */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px] animate-pulse" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px]" />
                </div>

                <div className="text-center space-y-4 z-10 px-6">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="font-display text-4xl md:text-6xl text-foreground"
                    >
                        {t("agentsPage.showcase.titleLine1")}<br />{t("agentsPage.showcase.titleLine2")}
                    </motion.h1>
                    <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto font-light">
                        {t("agentsPage.showcase.subtitle")}
                    </p>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute bottom-[5vh] left-1/2 -translate-x-1/2 z-20 cursor-pointer"
                >
                    <div className="flex flex-col items-center gap-2 group">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground group-hover:text-primary-neon transition-colors">{t("agentsPage.showcase.discover")}</span>
                        <motion.div
                            animate={{ y: [0, 5, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <ArrowRight className="rotate-90 text-primary-neon w-5 h-5 group-hover:scale-110 transition-transform" />
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* Agent Sections */}
            {agents.map((agent) => (
                <section key={agent.id} className="h-[100dvh] w-full snap-start flex items-center justify-center overflow-hidden px-6 py-4 md:py-20 relative bg-background">
                    {/* Dynamic Background based on agent */}
                    <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px] ${agent.id === 'axiom' ? 'bg-cyan-900/40' :
                            agent.id === 'lumina' ? 'bg-orange-900/40' :
                                'bg-emerald-900/40'
                            }`} />
                    </div>

                    <div className="w-full max-w-4xl z-10 h-full md:max-h-[80vh] flex items-center justify-center">
                        <AgentCard
                            agent={agent}
                            isActive={true}
                            onClick={() => { }} // No interaction needed as it's static full screen
                        />
                    </div>
                </section>
            ))}

            {/* Deep dives partagés avec /services */}
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

            <ServiceDeepDive
                title={t("servicesPage.leadGen.titlePrefix")}
                highlight={t("servicesPage.leadGen.titleHighlight")}
                highlightClass="text-pink-500"
                desc={t("servicesPage.leadGen.desc")}
                buttonLabel={t("servicesPage.leadGen.button")}
                href="/services/lead-gen"
                visual={<LeadGenVisual />}
            />

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

            <div className="snap-start w-full">
                <Footer />
            </div>
        </main>
    );
}
