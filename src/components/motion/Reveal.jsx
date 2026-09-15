"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1];
const TAGS = {
    div: motion.div,
    li: motion.li,
    p: motion.p,
    span: motion.span,
    article: motion.article,
    ul: motion.ul,
};

// Apparition en fondu + montée à l'entrée dans l'écran.
export default function Reveal({ as = "div", children, className = "", delay = 0, y = 36, amount = 0.25, ...props }) {
    const reduceMotion = useReducedMotion();
    const Tag = TAGS[as] || motion.div;

    return (
        <Tag
            className={className}
            initial={reduceMotion ? false : { opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount }}
            transition={{ duration: 0.9, ease: EASE, delay }}
            {...props}
        >
            {children}
        </Tag>
    );
}
