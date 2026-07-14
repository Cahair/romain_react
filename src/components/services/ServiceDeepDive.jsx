"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Button from "../ui/Button";
import { Highlight } from "../ui/SectionTitle";

// Section plein écran d'un service (texte + visuel), partagée entre /services et /services/agents.
// `reversed` place le visuel à gauche sur desktop ; `tint` ajoute la bande de fond alternée.
export default function ServiceDeepDive({
    id,
    title,
    highlight,
    highlightClass = "text-primary",
    desc,
    buttonLabel,
    href,
    visual,
    reversed = false,
    tint = false,
}) {
    const text = (
        <div className={`order-2 flex flex-col justify-center gap-4 md:gap-6 ${reversed ? "md:order-2" : "md:order-1"}`}>
            <motion.h2
                initial={{ opacity: 0, x: reversed ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="font-display text-[clamp(2rem,5vw,4rem)] leading-tight text-foreground"
            >
                {title} <Highlight className={`${highlightClass} block`}>{highlight}</Highlight>
            </motion.h2>
            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-[clamp(0.875rem,1.2vw,1.125rem)] text-muted-foreground leading-relaxed max-w-lg"
            >
                {desc}
            </motion.p>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
            >
                <Button href={href} variant="ghost" className="group">
                    {buttonLabel}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
            </motion.div>
        </div>
    );

    const media = (
        <div className={`order-1 flex justify-center items-center h-[35vh] md:h-auto ${reversed ? "md:order-1" : "md:order-2"}`}>
            {visual}
        </div>
    );

    return (
        <section
            id={id}
            className={`h-[100dvh] w-full snap-start flex items-center justify-center relative overflow-hidden px-6 md:px-8 pt-20 ${tint ? "bg-foreground/5" : "bg-background"}`}
        >
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full max-h-[90dvh]">
                {text}
                {media}
            </div>
        </section>
    );
}
