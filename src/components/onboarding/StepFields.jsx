"use client";

import { useEffect, useEffectEvent, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, AppWindow, Check, CircleHelp, PanelsTopLeft, Plus, RefreshCw, ShoppingBag, Smartphone } from "lucide-react";
import { useTranslation } from "../LanguageProvider";
import { Highlight } from "../ui/SectionTitle";
import { LIMITS, PROJECT_OPTIONS } from "@/lib/contact";
import { parseEmphasis } from "@/lib/emphasis";
import { needsFor, suggestEmail } from "@/lib/onboarding";
import { SERVICE_SLUGS } from "@/lib/services";

export const OUT = [0.16, 1, 0.3, 1];

// Blocs d'un écran : ils entrent en cascade (l'écran parent orchestre le décalage).
export const itemVariants = {
    enter: { opacity: 0, y: 14 },
    center: { opacity: 1, y: 0, transition: { duration: 0.45, ease: OUT } },
};

const listVariants = {
    enter: {},
    center: { transition: { staggerChildren: 0.035 } },
};

const optionVariants = {
    enter: { opacity: 0, y: 10 },
    center: { opacity: 1, y: 0, transition: { duration: 0.4, ease: OUT } },
};

export const inputClasses =
    "block w-full rounded-xl border bg-muted px-4 py-3.5 text-base text-foreground transition-[border-color,box-shadow] duration-200 placeholder:text-muted-foreground/70 focus:outline-none focus:ring-4 focus-visible:outline-none";
const inputStates = {
    idle: "border-input hover:border-foreground/30 focus:border-primary focus:ring-primary/15",
    error: "border-destructive focus:border-destructive focus:ring-destructive/15",
};

// Les mots à trait d'union (« avez-vous », « Qu'est-ce ») ne se coupent pas en fin de ligne.
function keepHyphenated(text) {
    return text
        .split(/(\S+-\S+)/)
        .map((part, index) => (/\S-\S/.test(part) ? <span key={index} className="whitespace-nowrap">{part}</span> : part));
}

// Titre de l'écran (balisage *mis en valeur* des traductions) : il reçoit le focus
// à l'arrivée, pour le clavier et les lecteurs d'écran.
export function Question({ text }) {
    const ref = useRef(null);
    useEffect(() => {
        ref.current?.focus({ preventScroll: true });
    }, []);
    return (
        <motion.h1
            ref={ref}
            id="onboarding-question"
            variants={itemVariants}
            tabIndex={-1}
            data-focus-silent
            className="max-w-3xl text-balance text-[clamp(2rem,1.1rem+3.6vw,4rem)] font-normal leading-[1.02] tracking-[-0.03em] outline-none"
        >
            {parseEmphasis(text).map((segment, index) =>
                segment.em ? (
                    <Highlight key={index}>{keepHyphenated(segment.text)}</Highlight>
                ) : (
                    <span key={index}>{keepHyphenated(segment.text)}</span>
                )
            )}
        </motion.h1>
    );
}

function CheckDot({ selected, className = "" }) {
    return (
        <span
            aria-hidden="true"
            className={`flex size-6 shrink-0 items-center justify-center rounded-full border transition-colors duration-200 ${selected ? "border-primary bg-primary text-primary-foreground" : "border-border"} ${className}`}
        >
            <AnimatePresence initial={false}>
                {selected && (
                    <motion.span
                        key="check"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ type: "spring", stiffness: 520, damping: 26 }}
                    >
                        <Check className="size-3.5" strokeWidth={3} />
                    </motion.span>
                )}
            </AnimatePresence>
        </span>
    );
}

const optionBase =
    "group text-left transition-[border-color,background-color,scale] duration-200 active:scale-[0.98] focus-visible:outline-offset-2";
const optionState = (selected) =>
    selected ? "border-primary bg-primary/10" : "border-border bg-background/60 hover:border-foreground/40 hover:bg-muted/60";

const PROJECT_ICONS = {
    "site-vitrine": PanelsTopLeft,
    "site-e-commerce": ShoppingBag,
    "application-web": AppWindow,
    "application-mobile": Smartphone,
    refonte: RefreshCw,
    autre: CircleHelp,
};

// Type de projet : cartes sur deux colonnes dès le mobile, pour tout voir sans faire défiler.
function ProjectOptions({ value, onChoose }) {
    const { t } = useTranslation();
    return (
        <motion.div
            variants={listVariants}
            role="group"
            aria-labelledby="onboarding-question"
            className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-3"
        >
            {PROJECT_OPTIONS.map((option, position) => {
                const Icon = PROJECT_ICONS[option];
                const selected = value === option;
                return (
                    <motion.button
                        key={option}
                        type="button"
                        variants={optionVariants}
                        onClick={() => onChoose(option)}
                        aria-pressed={selected}
                        aria-keyshortcuts={String(position + 1)}
                        className={`${optionBase} relative flex min-h-[7.25rem] flex-col justify-between gap-4 rounded-2xl border p-4 md:min-h-[9.5rem] md:p-5 ${optionState(selected)}`}
                    >
                        <Icon
                            aria-hidden="true"
                            strokeWidth={1.5}
                            className={`size-6 transition-colors duration-200 md:size-7 ${selected ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`}
                        />
                        <span className="pr-2">
                            <span className="block text-[1.02rem] leading-tight tracking-tight md:text-lg">
                                {t(`onboarding.steps.project.options.${option}`)}
                            </span>
                            {/* Seuls les quatre services ont une description ; « refonte » et « autre » n'en ont pas. */}
                            {SERVICE_SLUGS.includes(option) && (
                                <span className="mt-1.5 hidden text-sm leading-snug text-muted-foreground md:block">
                                    {t(`services.items.${option}.short`)}
                                </span>
                            )}
                        </span>
                        <CheckDot selected={selected} className="absolute right-3 top-3 md:right-4 md:top-4" />
                    </motion.button>
                );
            })}
        </motion.div>
    );
}

// Question à choix unique : un toucher suffit, l'écran suivant arrive tout seul.
export function ChoiceOptions({ step, value, onChoose }) {
    const { t } = useTranslation();
    if (step.id === "project") return <ProjectOptions value={value} onChoose={onChoose} />;

    return (
        <motion.div
            variants={listVariants}
            role="group"
            aria-labelledby="onboarding-question"
            className="grid gap-2.5 sm:grid-cols-2 sm:gap-3"
        >
            {step.options.map((option, position) => {
                const selected = value === option;
                return (
                    <motion.button
                        key={option}
                        type="button"
                        variants={optionVariants}
                        onClick={() => onChoose(option)}
                        aria-pressed={selected}
                        aria-keyshortcuts={String(position + 1)}
                        className={`${optionBase} flex min-h-[3.75rem] items-center gap-4 rounded-2xl border px-4 py-3 sm:[&:last-child:nth-child(odd)]:col-span-2 md:min-h-[4.5rem] md:px-5 ${optionState(selected)}`}
                    >
                        <span aria-hidden="true" className="w-7 shrink-0 text-xs tabular-nums text-muted-foreground">
                            ({String(position + 1).padStart(2, "0")})
                        </span>
                        <span className="flex-1 text-[1.05rem] leading-snug tracking-tight md:text-lg">
                            {t(`onboarding.steps.${step.id}.options.${option}`)}
                        </span>
                        <CheckDot selected={selected} />
                    </motion.button>
                );
            })}
        </motion.div>
    );
}

// Besoins : choix multiple adapté au type de projet, plus un message facultatif.
// On répond en touchant, sans avoir à rédiger.
export function NeedsPicker({ project, needs, message, onToggle, onMessage, onSubmit }) {
    const { t } = useTranslation();
    const [open, setOpen] = useState(() => Boolean(message.trim()) || project === "autre");
    const textareaRef = useRef(null);

    // Rendu synchrone puis focus dans le même geste : sur iOS, c'est ce qui ouvre le clavier.
    const openMessage = () => {
        flushSync(() => setOpen(true));
        textareaRef.current?.focus();
    };

    return (
        <motion.div variants={itemVariants}>
            <div role="group" aria-labelledby="onboarding-question" className="flex flex-wrap gap-2 md:gap-2.5">
                {needsFor(project).map((need) => {
                    const selected = needs.includes(need);
                    return (
                        <button
                            key={need}
                            type="button"
                            onClick={() => onToggle(need)}
                            aria-pressed={selected}
                            className={`inline-flex min-h-11 items-center gap-2 rounded-full border py-2 pl-3.5 pr-4 text-left text-[0.95rem] leading-snug transition-[border-color,background-color,color,scale] duration-200 active:scale-[0.97] md:min-h-12 md:text-base ${selected ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background/60 hover:border-foreground/40 hover:bg-muted/60"}`}
                        >
                            {selected ? (
                                <Check className="size-4 shrink-0" strokeWidth={2.5} aria-hidden="true" />
                            ) : (
                                <Plus className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                            )}
                            {t(`onboarding.needs.${need}`)}
                        </button>
                    );
                })}
            </div>

            <div className="mt-6 md:mt-8">
                {open ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                        <label htmlFor="message" className="text-sm font-medium">
                            {t("onboarding.steps.needs.messageLabel")}
                            {needs.length > 0 && (
                                <span className="font-normal text-muted-foreground"> — {t("onboarding.fields.optional")}</span>
                            )}
                        </label>
                        <textarea
                            id="message"
                            ref={textareaRef}
                            rows={4}
                            maxLength={LIMITS.messageMax}
                            placeholder={t("onboarding.steps.needs.placeholder")}
                            value={message}
                            onChange={(event) => onMessage(event.target.value)}
                            onKeyDown={(event) => {
                                if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
                                    event.preventDefault();
                                    onSubmit();
                                }
                            }}
                            className={`${inputClasses} ${inputStates.idle} mt-2 min-h-[7.5rem] resize-y`}
                        />
                    </motion.div>
                ) : (
                    <button
                        type="button"
                        onClick={openMessage}
                        className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
                    >
                        <Plus className="size-4" aria-hidden="true" />
                        {t("onboarding.addMessage")}
                    </button>
                )}
            </div>
        </motion.div>
    );
}

function Field({ id, label, optionalLabel, error, valid, hint, onEnter, onBlur, inputRef, className = "", ...props }) {
    const describedBy = [error && `${id}-error`, hint && `${id}-hint`].filter(Boolean).join(" ") || undefined;
    return (
        <div className={className}>
            <label htmlFor={id} className="text-sm font-medium">
                {label}
                {optionalLabel && <span className="font-normal text-muted-foreground"> — {optionalLabel}</span>}
            </label>
            <div className="relative mt-2">
                <input
                    id={id}
                    ref={inputRef}
                    aria-invalid={error ? true : undefined}
                    aria-describedby={describedBy}
                    onBlur={onBlur}
                    onKeyDown={(event) => {
                        if (event.key === "Enter" && !event.nativeEvent.isComposing) {
                            event.preventDefault();
                            onEnter?.();
                        }
                    }}
                    className={`${inputClasses} ${error ? inputStates.error : inputStates.idle} pr-12`}
                    {...props}
                />
                <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                    <AnimatePresence initial={false}>
                        {valid && (
                            <motion.span
                                key="valid"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 520, damping: 26 }}
                                className="flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground"
                            >
                                <Check className="size-3" strokeWidth={3} />
                            </motion.span>
                        )}
                    </AnimatePresence>
                </span>
            </div>
            {error && (
                <p id={`${id}-error`} className="mt-2 flex items-start gap-1.5 text-sm text-destructive">
                    <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                    {error}
                </p>
            )}
            {hint && <div id={`${id}-hint`}>{hint}</div>}
        </div>
    );
}

// Coordonnées : erreurs affichées tard (après la saisie ou à l'envoi), validation positive tout de suite.
export function IdentityFields({ values, errors, touched, submitted, onChange, onBlur, onSubmit }) {
    const { t } = useTranslation();
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const phoneRef = useRef(null);

    // À la souris, on place directement le curseur dans le premier champ vide. Au doigt,
    // on laisse le visiteur toucher le champ : le clavier ne surgit pas sans prévenir.
    const focusFirstEmpty = useEffectEvent(() => {
        if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
        const target = !values.name.trim() ? nameRef : !values.email.trim() ? emailRef : null;
        target?.current?.focus({ preventScroll: true });
    });
    useEffect(() => {
        focusFirstEmpty();
    }, []);

    const visibleError = (field) =>
        errors[field] && (submitted || (touched[field] && values[field].trim())) ? t(`onboarding.errors.${field}`) : "";
    const isValid = (field) => Boolean(values[field].trim()) && !errors[field];

    const suggestion = touched.email || submitted ? suggestEmail(values.email) : "";
    const [before, after] = t("onboarding.fields.suggestion").split("{email}");

    return (
        <motion.div variants={itemVariants} className="grid max-w-2xl gap-5 sm:grid-cols-2">
            <Field
                id="name"
                inputRef={nameRef}
                label={t("onboarding.fields.name")}
                type="text"
                autoComplete="name"
                autoCapitalize="words"
                enterKeyHint="next"
                maxLength={LIMITS.name}
                placeholder={t("onboarding.fields.namePlaceholder")}
                value={values.name}
                onChange={(event) => onChange("name", event.target.value)}
                onBlur={() => onBlur("name")}
                onEnter={() => emailRef.current?.focus()}
                error={visibleError("name")}
                valid={isValid("name")}
            />
            <Field
                id="email"
                inputRef={emailRef}
                label={t("onboarding.fields.email")}
                type="email"
                inputMode="email"
                autoComplete="email"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                enterKeyHint="next"
                maxLength={LIMITS.email}
                placeholder={t("onboarding.fields.emailPlaceholder")}
                value={values.email}
                onChange={(event) => onChange("email", event.target.value)}
                onBlur={() => onBlur("email")}
                onEnter={() => phoneRef.current?.focus()}
                error={visibleError("email")}
                valid={isValid("email")}
                hint={
                    suggestion && (
                        <button
                            type="button"
                            onClick={() => onChange("email", suggestion)}
                            className="mt-2 text-left text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                            {before}
                            <span className="font-medium text-primary underline underline-offset-4">{suggestion}</span>
                            {after}
                        </button>
                    )
                }
            />
            <Field
                id="phone"
                inputRef={phoneRef}
                className="sm:col-span-2 sm:max-w-[calc(50%-0.625rem)]"
                label={t("onboarding.fields.phone")}
                optionalLabel={t("onboarding.fields.optional")}
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                enterKeyHint="send"
                maxLength={LIMITS.phone}
                placeholder={t("onboarding.fields.phonePlaceholder")}
                value={values.phone}
                onChange={(event) => onChange("phone", event.target.value)}
                onEnter={onSubmit}
            />
        </motion.div>
    );
}
