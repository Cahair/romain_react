"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { useTranslation } from "../LanguageProvider";
import Button from "../ui/Button";
import Label from "../ui/Label";
import { CopyEmail } from "../sections/ContactCta";
import { OUT, Question, itemVariants } from "./StepFields";

// Coche qui se dessine : la demande est bien partie.
function DrawnCheck() {
    return (
        <svg viewBox="0 0 56 56" aria-hidden="true" className="size-14 text-primary md:size-16">
            <motion.circle
                cx="28"
                cy="28"
                r="26"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.7, ease: OUT }}
            />
            <motion.path
                d="M17 29l7.5 7.5L40 21"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.45, delay: 0.45, ease: OUT }}
            />
        </svg>
    );
}

export function SuccessScreen({ name }) {
    const { t, tl } = useTranslation();
    const first = name.trim().split(/\s+/)[0]?.replace(/\*/g, "") || "";
    const firstName = first ? first.charAt(0).toLocaleUpperCase() + first.slice(1) : "";
    const title = firstName
        ? t("onboarding.done.successTitleNamed").replace("{name}", firstName)
        : t("onboarding.done.successTitle");

    return (
        <div role="status" className="max-w-3xl">
            <motion.div variants={itemVariants}>
                <DrawnCheck />
            </motion.div>
            <div className="mt-8">
                <Question text={title} />
            </div>
            <motion.p variants={itemVariants} className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
                {t("onboarding.done.successText")}
            </motion.p>
            <motion.div variants={itemVariants} className="mt-10">
                <Label>{t("contact.next.title")}</Label>
                <ol className="mt-5 border-t border-border">
                    {tl("contact.next.steps").map((item, position) => (
                        <li key={item} className="flex gap-5 border-b border-border py-5">
                            <span className="pt-1 text-xs tabular-nums text-secondary-neon">
                                ({String(position + 1).padStart(2, "0")})
                            </span>
                            <span className="text-lg leading-snug tracking-tight md:text-xl">{item}</span>
                        </li>
                    ))}
                </ol>
            </motion.div>
            <motion.div variants={itemVariants} className="mt-10">
                <Button href="/" variant="ghost" size="lg">
                    {t("onboarding.done.home")}
                    <ArrowRight className="size-4" aria-hidden="true" />
                </Button>
            </motion.div>
        </div>
    );
}

// Mode mailto : la messagerie du visiteur s'ouvre avec la demande déjà écrite.
export function MailOpenedScreen({ copied, onCopy, onBack }) {
    const { t } = useTranslation();
    return (
        <div role="status" className="max-w-2xl">
            <motion.span
                variants={itemVariants}
                className="flex size-14 items-center justify-center rounded-full border-2 border-primary text-primary"
            >
                <Mail className="size-7" aria-hidden="true" />
            </motion.span>
            <div className="mt-8">
                <Question text={t("onboarding.done.mailTitle")} />
            </div>
            <motion.p variants={itemVariants} className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                {t("onboarding.done.mailText")}
            </motion.p>
            <motion.div variants={itemVariants} className="mt-8 flex flex-wrap gap-3">
                <Button variant="ghost" onClick={onCopy}>
                    {copied ? t("common.copied") : t("onboarding.done.copy")}
                </Button>
                <Button variant="ghost" onClick={onBack}>
                    {t("onboarding.done.back")}
                </Button>
            </motion.div>
            <motion.div variants={itemVariants} className="mt-6 text-lg">
                <CopyEmail />
            </motion.div>
        </div>
    );
}
