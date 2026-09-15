"use client";

import { motion, useReducedMotion } from "framer-motion";
import { tokenizeWords } from "@/lib/emphasis";
import { titleScales } from "../ui/SectionTitle";

const EASE = [0.16, 1, 0.3, 1];
const TAGS = { h1: motion.h1, h2: motion.h2, h3: motion.h3, p: motion.p, div: motion.div, span: motion.span };

// Départ assez bas pour que même les jambages hauts (l, b, accents) restent sous le masque.
const wordVariants = {
    hidden: { y: "135%" },
    show: { y: "0%", transition: { duration: 1.05, ease: EASE } },
};

function Runs({ runs, emClassName }) {
    return runs.map((run, index) =>
        run.em ? (
            <em key={index} className={`font-serif font-normal italic ${emClassName}`}>
                {run.text}
            </em>
        ) : (
            <span key={index}>{run.text}</span>
        )
    );
}

// Titre révélé mot à mot (chaque mot monte depuis un masque). Le texte accepte le
// balisage *mis en valeur*. Sans `play`, l'animation part à l'entrée dans l'écran ;
// avec `play`, elle attend ce signal (ex. fin du splash ou du rideau).
export default function AnimatedTitle({
    text,
    as = "h2",
    size,
    className = "",
    emClassName = "text-primary",
    play,
    delay = 0,
    stagger = 0.055,
    amount = 0.35,
}) {
    const reduceMotion = useReducedMotion();
    const scale = size === "none" ? "" : titleScales[size || as] || titleScales.h2;
    const classes = `${scale} ${className}`;
    const tokens = tokenizeWords(text);

    const render = (animated) =>
        tokens.map((token, index) => {
            if (token.type === "space") return " ";
            if (token.type === "br") return <br key={index} />;
            const endsItalic = token.runs[token.runs.length - 1]?.em;
            if (!animated) return <Runs key={index} runs={token.runs} emClassName={emClassName} />;
            return (
                <span key={index} className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-top">
                    <motion.span
                        className={`inline-block ${endsItalic ? "pr-[0.08em]" : ""}`}
                        variants={wordVariants}
                    >
                        <Runs runs={token.runs} emClassName={emClassName} />
                    </motion.span>
                </span>
            );
        });

    if (reduceMotion) {
        const StaticTag = as;
        return <StaticTag className={classes}>{render(false)}</StaticTag>;
    }

    const Tag = TAGS[as] || motion.h2;
    const trigger =
        typeof play === "boolean"
            ? { animate: play ? "show" : "hidden" }
            : { whileInView: "show", viewport: { once: true, amount } };

    return (
        <Tag
            className={classes}
            initial="hidden"
            variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
            {...trigger}
        >
            {render(true)}
        </Tag>
    );
}
