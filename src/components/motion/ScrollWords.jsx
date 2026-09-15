"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { tokenizeWords } from "@/lib/emphasis";

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

function Word({ progress, range, runs, emClassName }) {
    const opacity = useTransform(progress, range, [0.14, 1]);
    return (
        <motion.span style={{ opacity }}>
            <Runs runs={runs} emClassName={emClassName} />
        </motion.span>
    );
}

// Paragraphe dont les mots s'allument un à un au fil du défilement.
export default function ScrollWords({ text, as: Tag = "p", className = "", emClassName = "text-primary" }) {
    const ref = useRef(null);
    const reduceMotion = useReducedMotion();
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });

    const tokens = tokenizeWords(text);
    const wordCount = tokens.filter((token) => token.type === "word").length || 1;
    const wordIndex = [];
    tokens.reduce((count, token) => {
        wordIndex.push(count);
        return token.type === "word" ? count + 1 : count;
    }, 0);

    return (
        <Tag ref={ref} className={className}>
            {tokens.map((token, index) => {
                if (token.type === "space") return " ";
                if (token.type === "br") return <br key={index} />;
                if (reduceMotion) return <Runs key={index} runs={token.runs} emClassName={emClassName} />;
                const start = wordIndex[index] / wordCount;
                return (
                    <Word
                        key={index}
                        progress={scrollYProgress}
                        range={[start, start + 1 / wordCount]}
                        runs={token.runs}
                        emClassName={emClassName}
                    />
                );
            })}
        </Tag>
    );
}
