"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { AlertCircle, ArrowLeft, ArrowRight, Check, Loader2, Mail } from "lucide-react";
import { useTranslation } from "../LanguageProvider";
import Button from "../ui/Button";
import Label from "../ui/Label";
import { container } from "../ui/Section";
import { Emphasis } from "../ui/SectionTitle";
import { CopyEmail } from "../sections/ContactCta";
import { CONTACT_MODE, CONTACT_RECIPIENT, LIMITS, PROJECT_OPTIONS, validateContact } from "@/lib/contact";
import { EMPTY_ANSWERS, ONBOARDING_STEPS, TOTAL_STEPS } from "@/lib/onboarding";
import { SERVICE_SLUGS } from "@/lib/services";
import { track } from "@/lib/analytics";

const OUT = [0.16, 1, 0.3, 1];
// Tant que l'envoi serveur n'est pas configuré, la demande part depuis la messagerie du visiteur.
const MAIL_MODE = CONTACT_MODE === "mailto";

const inputClasses =
    "mt-2 block w-full rounded-xl border border-input bg-muted px-4 py-3.5 text-base text-foreground transition-[border-color,box-shadow] duration-200 placeholder:text-muted-foreground/70 hover:border-foreground/30 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15 focus-visible:outline-none";

function Question({ id, children }) {
    return (
        <h1
            id={id}
            tabIndex={-1}
            className="max-w-3xl text-[clamp(2rem,4.6vw,4rem)] font-normal leading-[1.02] tracking-[-0.03em] outline-none"
        >
            {children}
        </h1>
    );
}

export default function Onboarding() {
    const { t, locale } = useTranslation();
    const searchParams = useSearchParams();
    const reduceMotion = useReducedMotion();

    // Depuis une page service, le type de projet arrive pré-sélectionné (/demarrer?projet=…).
    const presetProject = searchParams.get("projet");
    const [answers, setAnswers] = useState(() => ({
        ...EMPTY_ANSWERS,
        project: PROJECT_OPTIONS.includes(presetProject) ? presetProject : "",
    }));
    const [index, setIndex] = useState(0); // 0…TOTAL_STEPS-1 = questions, TOTAL_STEPS = récapitulatif
    const [error, setError] = useState("");
    const [status, setStatus] = useState("idle"); // idle | loading | mailOpened | success | error
    const [copied, setCopied] = useState(false);
    const [fromRecap, setFromRecap] = useState(false);
    const questionRef = useRef(null);

    const step = ONBOARDING_STEPS[index];
    const onRecap = index >= TOTAL_STEPS;
    const done = status === "mailOpened" || status === "success";
    const progress = Math.min(index / TOTAL_STEPS, 1);

    // À chaque écran, le focus revient sur la question (clavier et lecteurs d'écran).
    useEffect(() => {
        questionRef.current?.focus({ preventScroll: true });
    }, [index, status]);

    // Mesure d'audience : chaque écran atteint pour la première fois (entonnoir du parcours).
    const furthestRef = useRef(-1);
    useEffect(() => {
        if (index <= furthestRef.current) return;
        furthestRef.current = index;
        track("demarrer-etape", { etape: onRecap ? "recapitulatif" : step.id });
    }, [index, onRecap, step]);

    // Seules les réponses à choix partent dans la mesure, jamais le nom, l'e-mail ni le message.
    const trackSent = (mode) =>
        track("demarrer-envoi", { mode, projet: answers.project || "-", budget: answers.budget || "-" });

    const setAnswer = (id, value) => {
        setAnswers((current) => ({ ...current, [id]: value }));
        setError("");
    };

    const stepError = () => {
        if (!step) return "";
        if (step.type === "choice" && step.required && !answers[step.id]) return t("onboarding.errors.choice");
        if (step.type === "text") {
            const value = answers.message.trim();
            if (!value) return t("onboarding.errors.message");
            if (value.length < LIMITS.messageMin) return t("onboarding.errors.messageShort");
        }
        if (step.type === "identity") {
            const fieldErrors = validateContact(
                { name: answers.name, email: answers.email, message: answers.message },
                { requireIdentity: !MAIL_MODE }
            );
            if (fieldErrors.name) return t("onboarding.errors.name");
            if (fieldErrors.email) return t("onboarding.errors.email");
        }
        return "";
    };

    const goTo = (next) => {
        setError("");
        setIndex(next);
    };

    const goNext = () => {
        const problem = stepError();
        if (problem) {
            setError(problem);
            return;
        }
        if (fromRecap) {
            setFromRecap(false);
            goTo(TOTAL_STEPS);
            return;
        }
        goTo(Math.min(index + 1, TOTAL_STEPS));
    };

    const goBack = () => goTo(Math.max(index - 1, 0));

    const choose = (value) => {
        setAnswer(step.id, value);
        if (fromRecap) {
            setFromRecap(false);
            goTo(TOTAL_STEPS);
            return;
        }
        // Petite pause pour qu'on voie la réponse cochée avant de passer à la suite.
        setTimeout(() => goTo(Math.min(index + 1, TOTAL_STEPS)), reduceMotion ? 0 : 260);
    };

    const editStep = (target) => {
        setFromRecap(true);
        goTo(target);
    };

    const answerLabel = (stepDef) => {
        if (stepDef.type === "choice") {
            return answers[stepDef.id]
                ? t(`onboarding.steps.${stepDef.id}.options.${answers[stepDef.id]}`)
                : t("onboarding.notAnswered");
        }
        if (stepDef.type === "text") return answers.message.trim() || t("onboarding.notAnswered");
        const identity = [answers.name, answers.email, answers.phone].filter(Boolean).join(" · ");
        return identity || t("onboarding.notAnswered");
    };

    const mailSubject = () => `${t("onboarding.mailSubject")}${answers.name ? ` — ${answers.name}` : ""}`;

    const mailBody = () => {
        const lines = [];
        for (const stepDef of ONBOARDING_STEPS) {
            if (stepDef.type !== "choice" || !answers[stepDef.id]) continue;
            lines.push(`${t(`onboarding.steps.${stepDef.id}.summary`)} : ${t(`onboarding.steps.${stepDef.id}.options.${answers[stepDef.id]}`)}`);
        }
        const identity = [
            answers.name && `${t("onboarding.fields.name")} : ${answers.name}`,
            answers.email && `${t("onboarding.fields.email")} : ${answers.email}`,
            answers.phone && `${t("onboarding.fields.phone")} : ${answers.phone}`,
        ].filter(Boolean);
        if (identity.length > 0) lines.push("", ...identity);
        lines.push("", `${t("onboarding.steps.message.summary")} :`, answers.message.trim().slice(0, 1500));
        return lines.join("\n");
    };

    const mailtoHref = () =>
        `mailto:${CONTACT_RECIPIENT}?subject=${encodeURIComponent(mailSubject())}&body=${encodeURIComponent(mailBody())}`;

    const copyMessage = async () => {
        try {
            await navigator.clipboard.writeText(`${mailSubject()}\n\n${mailBody()}`);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // presse-papiers indisponible : l'adresse reste affichée juste en dessous
        }
    };

    const onMailtoClick = () => {
        trackSent("mailto");
        setStatus("mailOpened");
    };

    const submit = async () => {
        setStatus("loading");
        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: answers.name,
                    email: answers.email,
                    project: answers.project,
                    budget: answers.budget,
                    message: mailBody(),
                    website: answers.website,
                    locale,
                }),
            });
            const result = await response.json().catch(() => ({}));
            const ok = response.ok && result.ok;
            if (ok) trackSent("formulaire");
            setStatus(ok ? "success" : "error");
        } catch {
            setStatus("error");
        }
    };

    const screenKey = done ? "done" : onRecap ? "recap" : step.id;
    const slide = reduceMotion ? 0 : 40;

    return (
        <main className="relative flex min-h-[100svh] flex-col overflow-hidden pt-24 md:pt-28">
            <div
                aria-hidden="true"
                className="dot-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]"
            />

            <div className={`${container} relative flex flex-1 flex-col`}>
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <Label>{t("onboarding.label")}</Label>
                    {!done && (
                        <p aria-live="polite" className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-muted-foreground md:text-xs">
                            {onRecap
                                ? t("onboarding.recap.counter")
                                : t("onboarding.stepCounter").replace("{current}", index + 1).replace("{total}", TOTAL_STEPS)}
                        </p>
                    )}
                </div>
                <div className="mt-4 h-px w-full bg-border">
                    <motion.div
                        className="h-full origin-left bg-primary"
                        initial={false}
                        animate={{ scaleX: done ? 1 : onRecap ? 1 : progress }}
                        transition={{ duration: 0.6, ease: OUT }}
                    />
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={screenKey}
                        initial={{ opacity: 0, x: slide }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -slide }}
                        transition={{ duration: 0.45, ease: OUT }}
                        className="flex flex-1 flex-col justify-center py-12 md:py-16"
                    >
                        {done ? (
                            <div role="status" className="max-w-2xl">
                                <span className="flex size-14 items-center justify-center rounded-full border-2 border-primary text-primary">
                                    {status === "mailOpened" ? <Mail className="size-7" aria-hidden="true" /> : <Check className="size-7" aria-hidden="true" />}
                                </span>
                                <Question id="onboarding-question">
                                    <span ref={questionRef} tabIndex={-1} data-focus-silent className="outline-none">
                                        <Emphasis
                                            text={status === "mailOpened" ? t("onboarding.done.mailTitle") : t("onboarding.done.successTitle")}
                                        />
                                    </span>
                                </Question>
                                <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                                    {status === "mailOpened" ? t("onboarding.done.mailText") : t("onboarding.done.successText")}
                                </p>
                                {status === "mailOpened" && (
                                    <>
                                        <div className="mt-8 flex flex-wrap gap-3">
                                            <Button variant="ghost" onClick={copyMessage}>
                                                {copied ? t("common.copied") : t("onboarding.done.copy")}
                                            </Button>
                                            <Button variant="ghost" onClick={() => setStatus("idle")}>
                                                {t("onboarding.done.back")}
                                            </Button>
                                        </div>
                                        <div className="mt-6 text-lg">
                                            <CopyEmail />
                                        </div>
                                    </>
                                )}
                            </div>
                        ) : onRecap ? (
                            <div className="max-w-3xl">
                                <Question>
                                    <span ref={questionRef} tabIndex={-1} data-focus-silent className="outline-none">
                                        <Emphasis text={t("onboarding.recap.title")} />
                                    </span>
                                </Question>
                                <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">{t("onboarding.recap.help")}</p>

                                <dl className="mt-10 border-t border-border">
                                    {ONBOARDING_STEPS.map((stepDef, stepIndex) => (
                                        <div key={stepDef.id} className="flex items-start justify-between gap-6 border-b border-border py-4">
                                            <div className="min-w-0">
                                                <dt className="text-sm text-muted-foreground">{t(`onboarding.steps.${stepDef.id}.summary`)}</dt>
                                                <dd className="mt-1 whitespace-pre-line text-lg leading-snug">{answerLabel(stepDef)}</dd>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => editStep(stepIndex)}
                                                className="shrink-0 text-sm font-medium text-primary transition-colors hover:text-primary-dark"
                                            >
                                                {t("onboarding.edit")}
                                            </button>
                                        </div>
                                    ))}
                                </dl>

                                {MAIL_MODE && (
                                    <p className="mt-6 flex items-start gap-2.5 rounded-xl border border-border bg-muted px-4 py-3 text-sm leading-relaxed text-muted-foreground">
                                        <Mail className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                                        {t("onboarding.recap.notice")}
                                    </p>
                                )}

                                {status === "error" && (
                                    <div role="alert" className="mt-6 rounded-2xl border border-destructive/30 bg-destructive/10 p-5">
                                        <p className="flex items-center gap-2 font-medium">
                                            <AlertCircle className="size-5 shrink-0 text-destructive" aria-hidden="true" />
                                            {t("onboarding.done.errorTitle")}
                                        </p>
                                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t("onboarding.done.errorText")}</p>
                                        <a
                                            href={mailtoHref()}
                                            className="mt-4 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
                                        >
                                            <Mail className="size-4" aria-hidden="true" />
                                            {t("onboarding.done.errorMailto")}
                                        </a>
                                    </div>
                                )}

                                {/* Pot de miel anti-spam : invisible pour les humains, rempli par les robots. */}
                                <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                                    <label htmlFor="website">Website</label>
                                    <input
                                        id="website"
                                        name="website"
                                        type="text"
                                        tabIndex={-1}
                                        autoComplete="off"
                                        value={answers.website}
                                        onChange={(event) => setAnswer("website", event.target.value)}
                                    />
                                </div>

                                <div className="mt-10 flex flex-wrap items-center gap-3">
                                    <Button variant="ghost" onClick={goBack}>
                                        <ArrowLeft className="size-4" aria-hidden="true" />
                                        {t("onboarding.back")}
                                    </Button>
                                    {MAIL_MODE ? (
                                        <Button href={mailtoHref()} onClick={onMailtoClick} size="lg">
                                            <Mail className="size-4" aria-hidden="true" />
                                            {t("onboarding.recap.sendMailto")}
                                        </Button>
                                    ) : (
                                        <Button size="lg" onClick={submit} disabled={status === "loading"}>
                                            {status === "loading" ? (
                                                <>
                                                    <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                                                    {t("onboarding.recap.sending")}
                                                </>
                                            ) : (
                                                <>
                                                    {t("onboarding.recap.send")}
                                                    <ArrowRight className="size-4" aria-hidden="true" />
                                                </>
                                            )}
                                        </Button>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="max-w-4xl">
                                <Question>
                                    <span ref={questionRef} tabIndex={-1} data-focus-silent className="outline-none">
                                        <Emphasis text={t(`onboarding.steps.${step.id}.question`)} />
                                    </span>
                                </Question>
                                <p className="mt-5 max-w-xl leading-relaxed text-muted-foreground md:text-lg">
                                    {t(`onboarding.steps.${step.id}.help`)}
                                </p>

                                <div className="mt-10">
                                    {step.type === "choice" && (
                                        <div className="grid gap-3 sm:grid-cols-2">
                                            {step.options.map((option) => {
                                                const selected = answers[step.id] === option;
                                                return (
                                                    <button
                                                        key={option}
                                                        type="button"
                                                        onClick={() => choose(option)}
                                                        aria-pressed={selected}
                                                        className={`flex items-center justify-between gap-4 rounded-2xl border px-5 py-4 text-left transition-colors duration-200 md:px-6 md:py-5 ${selected ? "border-primary bg-primary/10" : "border-border hover:border-foreground/40 hover:bg-muted/60"}`}
                                                    >
                                                        <span>
                                                            <span className="block text-lg tracking-tight">
                                                                {t(`onboarding.steps.${step.id}.options.${option}`)}
                                                            </span>
                                                            {/* Seuls les quatre services ont une description ; « refonte » et « autre » n'en ont pas. */}
                                                            {step.describe && SERVICE_SLUGS.includes(option) && (
                                                                <span className="mt-1 block text-sm leading-snug text-muted-foreground">
                                                                    {t(`services.items.${option}.short`)}
                                                                </span>
                                                            )}
                                                        </span>
                                                        <span
                                                            className={`flex size-6 shrink-0 items-center justify-center rounded-full border ${selected ? "border-primary bg-primary text-primary-foreground" : "border-border"}`}
                                                        >
                                                            {selected && <Check className="size-3.5" aria-hidden="true" />}
                                                        </span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    )}

                                    {step.type === "text" && (
                                        <>
                                            <label htmlFor="message" className="sr-only">
                                                {t("onboarding.steps.message.summary")}
                                            </label>
                                            <textarea
                                                id="message"
                                                rows={6}
                                                maxLength={LIMITS.messageMax}
                                                placeholder={t("onboarding.steps.message.placeholder")}
                                                value={answers.message}
                                                onChange={(event) => setAnswer("message", event.target.value)}
                                                className={`${inputClasses} min-h-[10rem] resize-y`}
                                            />
                                            <p className="mt-2 text-right text-xs tabular-nums text-muted-foreground">
                                                {answers.message.length} / {LIMITS.messageMax}
                                            </p>
                                        </>
                                    )}

                                    {step.type === "identity" && (
                                        <div className="grid max-w-2xl gap-5 sm:grid-cols-2">
                                            <div>
                                                <label htmlFor="name" className="text-sm font-medium">
                                                    {t("onboarding.fields.name")}
                                                </label>
                                                <input
                                                    id="name"
                                                    type="text"
                                                    autoComplete="name"
                                                    maxLength={LIMITS.name}
                                                    placeholder={t("onboarding.fields.namePlaceholder")}
                                                    value={answers.name}
                                                    onChange={(event) => setAnswer("name", event.target.value)}
                                                    className={inputClasses}
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="email" className="text-sm font-medium">
                                                    {t("onboarding.fields.email")}
                                                </label>
                                                <input
                                                    id="email"
                                                    type="email"
                                                    inputMode="email"
                                                    autoComplete="email"
                                                    maxLength={LIMITS.email}
                                                    placeholder={t("onboarding.fields.emailPlaceholder")}
                                                    value={answers.email}
                                                    onChange={(event) => setAnswer("email", event.target.value)}
                                                    className={inputClasses}
                                                />
                                            </div>
                                            <div className="sm:col-span-2 sm:max-w-[calc(50%-0.625rem)]">
                                                <label htmlFor="phone" className="text-sm font-medium">
                                                    {t("onboarding.fields.phone")}{" "}
                                                    <span className="font-normal text-muted-foreground">— {t("onboarding.fields.optional")}</span>
                                                </label>
                                                <input
                                                    id="phone"
                                                    type="tel"
                                                    inputMode="tel"
                                                    autoComplete="tel"
                                                    maxLength={30}
                                                    placeholder={t("onboarding.fields.phonePlaceholder")}
                                                    value={answers.phone}
                                                    onChange={(event) => setAnswer("phone", event.target.value)}
                                                    className={inputClasses}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {error && (
                                    <p role="alert" className="mt-6 flex items-center gap-2 text-sm text-destructive">
                                        <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
                                        {error}
                                    </p>
                                )}

                                <div className="mt-10 flex flex-wrap items-center gap-3">
                                    {index > 0 && (
                                        <Button variant="ghost" onClick={goBack}>
                                            <ArrowLeft className="size-4" aria-hidden="true" />
                                            {t("onboarding.back")}
                                        </Button>
                                    )}
                                    <Button size="lg" onClick={goNext}>
                                        {t("onboarding.next")}
                                        <ArrowRight className="size-4" aria-hidden="true" />
                                    </Button>
                                    {step.optional && !answers[step.id] && (
                                        <button
                                            type="button"
                                            onClick={() => goTo(fromRecap ? TOTAL_STEPS : index + 1)}
                                            className="text-sm text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
                                        >
                                            {t("onboarding.skip")}
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>

                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border py-6 text-sm text-muted-foreground">
                    <p>
                        {t("onboarding.footerNote")}{" "}
                        <a href={`mailto:${CONTACT_RECIPIENT}`} className="text-foreground underline underline-offset-4">
                            {CONTACT_RECIPIENT}
                        </a>
                    </p>
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                        <Link href="/contact" className="transition-colors hover:text-foreground">
                            {t("onboarding.contactLink")}
                        </Link>
                        <Link href="/legal" className="transition-colors hover:text-foreground">
                            {t("footer.legal")}
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
