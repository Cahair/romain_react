"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "../LanguageProvider";
import Label from "../ui/Label";
import { IDENTITY_STEP, ONBOARDING_STEPS } from "@/lib/onboarding";
import { OUT } from "./StepFields";

const QUESTION_STEPS = ONBOARDING_STEPS.slice(0, IDENTITY_STEP);
const number = (position) => `(${String(position + 1).padStart(2, "0")})`;

// Réponse lisible d'une étape (chaîne vide si elle n'est pas encore remplie).
export function answerText(stepDef, answers, t) {
    if (stepDef.type === "choice") {
        return answers[stepDef.id] ? t(`onboarding.steps.${stepDef.id}.options.${answers[stepDef.id]}`) : "";
    }
    if (stepDef.type === "needs") {
        return [...answers.needs.map((need) => t(`onboarding.needs.${need}`)), answers.message.trim()].filter(Boolean).join(", ");
    }
    return [answers.name, answers.email, answers.phone].map((value) => value.trim()).filter(Boolean).join(" · ");
}

export function Portrait({ className = "size-12" }) {
    return (
        <Image
            src="/romain-kantzer.jpg"
            alt=""
            width={112}
            height={112}
            sizes="56px"
            className={`shrink-0 rounded-full object-cover ${className}`}
        />
    );
}

// Colonne de droite (grand écran) : le projet se construit sous les yeux du visiteur,
// chaque réponse donnée reste modifiable d'un clic.
export function ProjectSummary({ answers, index, furthest, onEdit }) {
    const { t } = useTranslation();
    return (
        <div className="rounded-3xl border border-border bg-card/40 p-6 backdrop-blur-sm xl:p-8">
            <Label>{t("onboarding.summary.title")}</Label>
            <ol className="mt-6">
                {QUESTION_STEPS.map((stepDef, position) => {
                    const text = answerText(stepDef, answers, t);
                    const current = position === index;
                    const editable = position <= furthest && !current;
                    return (
                        <li key={stepDef.id} className="border-t border-border">
                            <button
                                type="button"
                                disabled={!editable}
                                onClick={() => onEdit(position)}
                                aria-current={current ? "step" : undefined}
                                className="group flex w-full items-start gap-4 py-3.5 text-left disabled:cursor-default"
                            >
                                <span className={`pt-0.5 text-xs tabular-nums ${current ? "text-primary" : "text-muted-foreground"}`}>
                                    {number(position)}
                                </span>
                                <span className="min-w-0 flex-1">
                                    <span className="block text-sm text-muted-foreground">
                                        {t(`onboarding.steps.${stepDef.id}.summary`)}
                                    </span>
                                    <AnimatePresence mode="wait" initial={false}>
                                        <motion.span
                                            key={text || (current ? "current" : "pending")}
                                            initial={{ opacity: 0, y: 6 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.3, ease: OUT }}
                                            className={`mt-0.5 line-clamp-2 leading-snug ${text ? "text-foreground" : "text-muted-foreground/60"}`}
                                        >
                                            {text || (current ? "…" : t("onboarding.pending"))}
                                        </motion.span>
                                    </AnimatePresence>
                                </span>
                                {current && <span aria-hidden="true" className="mt-1.5 size-2 shrink-0 rounded-full bg-primary" />}
                                {editable && (
                                    <span className="pt-0.5 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                                        {t("onboarding.edit")}
                                    </span>
                                )}
                            </button>
                        </li>
                    );
                })}
            </ol>
            {/* À la dernière étape, la photo est déjà à côté du bouton d'envoi. */}
            {index !== IDENTITY_STEP && (
                <div className="flex items-center gap-4 border-t border-border pt-6">
                    <Portrait />
                    <p className="text-sm leading-relaxed text-muted-foreground">{t("onboarding.summary.reassurance")}</p>
                </div>
            )}
        </div>
    );
}

// Dernière étape, hors grand écran : les réponses restent à portée, repliées pour ne pas
// éloigner les champs à remplir.
export function MobileRecap({ answers, onEdit }) {
    const { t } = useTranslation();
    const rows = QUESTION_STEPS.map((stepDef) => ({ stepDef, text: answerText(stepDef, answers, t) }));
    const preview = rows
        .map((row) => row.text)
        .filter(Boolean)
        .join(" · ");

    return (
        <details className="group rounded-2xl border border-border bg-card/40 lg:hidden">
            <summary className="flex min-h-14 cursor-pointer list-none items-center gap-3 px-4 py-3 [&::-webkit-details-marker]:hidden">
                <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium">{t("onboarding.summary.mobile")}</span>
                    <span className="block truncate text-sm text-muted-foreground">{preview}</span>
                </span>
                <ChevronDown
                    aria-hidden="true"
                    className="size-4 shrink-0 text-muted-foreground transition-transform duration-300 group-open:rotate-180"
                />
            </summary>
            <dl className="border-t border-border px-4">
                {rows.map(({ stepDef, text }, position) => (
                    <div key={stepDef.id} className="flex items-start justify-between gap-4 border-b border-border py-3 last:border-0">
                        <div className="min-w-0">
                            <dt className="text-xs text-muted-foreground">{t(`onboarding.steps.${stepDef.id}.summary`)}</dt>
                            <dd className="mt-0.5 text-[0.95rem] leading-snug">{text || t("onboarding.notAnswered")}</dd>
                        </div>
                        <button
                            type="button"
                            onClick={() => onEdit(position)}
                            className="-my-1 shrink-0 py-2 text-sm font-medium text-primary"
                        >
                            {t("onboarding.edit")}
                        </button>
                    </div>
                ))}
            </dl>
        </details>
    );
}
