"use client";

import { useEffect, useEffectEvent, useRef, useState, useSyncExternalStore } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { AlertCircle, ArrowLeft, ArrowRight, CornerDownLeft, Loader2, Lock, Mail, RotateCcw } from "lucide-react";
import { useTranslation } from "../LanguageProvider";
import { LanguageSwitch, Logo } from "../Navbar";
import Button from "../ui/Button";
import Label from "../ui/Label";
import { container } from "../ui/Section";
import { CONTACT_MODE, CONTACT_RECIPIENT, LIMITS, PROJECT_OPTIONS, validateContact } from "@/lib/contact";
import {
    EMPTY_ANSWERS,
    IDENTITY_STEP,
    ONBOARDING_STEPS,
    TOTAL_STEPS,
    clearDraft,
    firstIncomplete,
    hasDraftContent,
    isStepComplete,
    needsFor,
    progressAt,
    readDraft,
    saveDraft,
} from "@/lib/onboarding";
import { track } from "@/lib/analytics";
import { ChoiceOptions, IdentityFields, NeedsPicker, OUT, Question, itemVariants } from "./StepFields";
import { MobileRecap, Portrait, ProjectSummary, answerText } from "./ProjectSummary";
import { MailOpenedScreen, SuccessScreen } from "./DoneScreen";
import useKeyboardOpen from "./useKeyboardOpen";

// En mode mailto (NEXT_PUBLIC_CONTACT_MODE=mailto), la demande part depuis la messagerie du visiteur.
const MAIL_MODE = CONTACT_MODE === "mailto";
// Petite pause après un choix, pour qu'on voie la réponse cochée avant l'écran suivant.
const AUTO_ADVANCE_MS = 280;

// L'écran entre dans le sens de la navigation (vers la gauche en avançant, vers la droite en reculant).
const screenVariants = {
    enter: (direction) => ({ opacity: 0, x: direction * 28 }),
    center: { opacity: 1, x: 0, transition: { duration: 0.45, ease: OUT, staggerChildren: 0.05 } },
    exit: (direction) => ({ opacity: 0, x: direction * -28, transition: { duration: 0.2, ease: [0.4, 0, 1, 1] } }),
};

const subscribeNothing = () => () => {};

// Le parcours ne s'affiche que dans le navigateur : il reprend un brouillon et l'historique,
// qui n'existent pas au rendu serveur (même coquille vide que le fallback de Suspense).
export default function Onboarding() {
    const searchParams = useSearchParams();
    const isClient = useSyncExternalStore(subscribeNothing, () => true, () => false);
    const preset = searchParams.get("projet");

    if (!isClient) return <div className="min-h-[100svh]" />;
    return (
        <MotionConfig reducedMotion="user">
            <Flow preset={PROJECT_OPTIONS.includes(preset) ? preset : ""} />
        </MotionConfig>
    );
}

// Point de départ : brouillon éventuel, type de projet pré-sélectionné (/demarrer?projet=…),
// ou écran mémorisé dans l'historique (retour arrière vers le parcours, rechargement).
function initialState(preset) {
    const draft = readDraft();
    const answers = { ...EMPTY_ANSWERS, ...draft?.answers };
    if (preset) {
        answers.project = preset;
        answers.needs = answers.needs.filter((need) => needsFor(preset).includes(need));
    }

    const fresh = preset ? 1 : 0;
    const missing = firstIncomplete(answers);
    const historyState = window.history.state;
    let index = fresh;
    let resumed = false;
    if (Number.isInteger(historyState?.rkStep)) {
        index = Math.min(historyState.rkStep, missing);
    } else if (draft && hasDraftContent(draft.answers)) {
        index = Math.min(Math.max(draft.furthest, fresh), missing);
        resumed = index > fresh;
    }

    return {
        answers,
        index,
        resumed,
        furthest: Math.max(index, draft?.furthest ?? 0),
        depth: Number.isInteger(historyState?.rkDepth) ? historyState.rkDepth : 0,
    };
}

function Flow({ preset }) {
    const { t, locale } = useTranslation();
    const lenis = useLenis();
    const keyboardOpen = useKeyboardOpen();

    const [initial] = useState(() => initialState(preset));
    const [answers, setAnswers] = useState(initial.answers);
    const [index, setIndex] = useState(initial.index);
    const [direction, setDirection] = useState(1);
    const [furthest, setFurthest] = useState(initial.furthest);
    const [returnTo, setReturnTo] = useState(null); // écran où revenir après une modification
    const [resumed, setResumed] = useState(initial.resumed);
    const [pending, setPending] = useState(false); // un choix vient d'être fait, l'écran suivant arrive
    const [error, setError] = useState("");
    const [touched, setTouched] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [status, setStatus] = useState("idle"); // idle | loading | mailOpened | success | error
    const [copied, setCopied] = useState(false);
    // Profondeur de l'entrée d'historique courante dans le parcours (0 = arrivée sur la page).
    const depthRef = useRef(initial.depth);
    const timerRef = useRef(null);
    const trackedRef = useRef(-1);

    const step = ONBOARDING_STEPS[index];
    const isIdentity = step.type === "identity";
    const done = status === "mailOpened" || status === "success";
    const identityErrors = validateContact(
        { name: answers.name, email: answers.email, message: answers.message, needs: answers.needs },
        { requireIdentity: !MAIL_MODE }
    );
    const identityValid = !identityErrors.name && !identityErrors.email;
    const stepAnswered = isIdentity ? identityValid && Boolean(answers.email.trim()) : isStepComplete(step, answers);
    // La barre avance dès qu'on répond, avant même de passer à l'écran suivant.
    const progress = done ? 1 : progressAt(index + (stepAnswered ? 0.6 : 0));
    const screenKey = done ? status : step.id;

    // L'entrée d'historique courante porte l'écran affiché : le bouton retour du navigateur
    // (ou du téléphone) ramène à la question précédente au lieu de quitter le parcours.
    useEffect(() => {
        window.history.replaceState({ ...window.history.state, rkStep: initial.index, rkDepth: initial.depth }, "");
    }, [initial]);

    // Brouillon : on peut fermer l'onglet et reprendre plus tard (sans nom, e-mail ni téléphone).
    useEffect(() => {
        if (!done) saveDraft(answers, furthest);
    }, [answers, furthest, done]);

    useEffect(() => {
        const timer = timerRef;
        return () => clearTimeout(timer.current);
    }, []);

    // Mesure d'audience : chaque écran atteint pour la première fois (entonnoir du parcours).
    useEffect(() => {
        if (index <= trackedRef.current) return;
        trackedRef.current = index;
        track("demarrer-etape", { etape: ONBOARDING_STEPS[index].id });
    }, [index]);

    // Chaque nouvel écran repart du haut.
    useEffect(() => {
        if (window.scrollY === 0) return;
        lenis?.scrollTo(0, { immediate: true, force: true });
        window.scrollTo(0, 0);
    }, [screenKey, lenis]);

    const show = (target) => {
        clearTimeout(timerRef.current);
        setPending(false);
        setDirection(target >= index ? 1 : -1);
        setIndex(target);
        setFurthest((current) => Math.max(current, target));
        setError("");
        setResumed(false);
    };

    const pushStep = (target) => {
        depthRef.current += 1;
        window.history.pushState({ rkStep: target, rkPrev: index, rkDepth: depthRef.current }, "");
        show(target);
    };

    // Écran suivant, ou retour là où l'on était après une modification, sans jamais
    // dépasser une étape encore incomplète. `stepByStep` impose l'écran suivant (nouveau type
    // de projet : la liste des besoins a changé, il faut la montrer).
    const advance = (nextAnswers, stepByStep = false) => {
        const target = Math.min(stepByStep ? index + 1 : (returnTo ?? index + 1), firstIncomplete(nextAnswers), IDENTITY_STEP);
        if (returnTo !== null && target >= returnTo) setReturnTo(null);
        pushStep(target);
    };

    const goBack = () => {
        if (index === 0) return;
        clearTimeout(timerRef.current);
        setReturnTo(null);
        const state = window.history.state;
        // L'entrée précédente est la question d'avant : on recule dans l'historique (suite dans onPopState).
        if (depthRef.current > 0 && state?.rkPrev === index - 1) {
            window.history.back();
            return;
        }
        window.history.replaceState({ ...state, rkStep: index - 1 }, "");
        show(index - 1);
    };

    const onPopState = useEffectEvent((event) => {
        const target = event.state?.rkStep;
        if (!Number.isInteger(target) || done) return;
        depthRef.current = Number.isInteger(event.state.rkDepth) ? event.state.rkDepth : 0;
        setReturnTo(null);
        show(Math.min(target, firstIncomplete(answers)));
    });

    useEffect(() => {
        const listener = (event) => onPopState(event);
        window.addEventListener("popstate", listener);
        return () => window.removeEventListener("popstate", listener);
    }, []);

    const setAnswer = (field, value) => {
        setAnswers((current) => ({ ...current, [field]: value }));
        setError("");
    };

    const choose = (value) => {
        if (step.type !== "choice") return;
        const nextAnswers = { ...answers, [step.id]: value };
        // Autre type de projet : on ne garde que les besoins qui lui correspondent.
        const projectChanged = step.id === "project" && value !== answers.project;
        if (projectChanged) nextAnswers.needs = answers.needs.filter((need) => needsFor(value).includes(need));
        setAnswers(nextAnswers);
        setError("");
        setPending(true);
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => advance(nextAnswers, projectChanged), AUTO_ADVANCE_MS);
    };

    const toggleNeed = (need) => {
        setAnswers((current) => ({
            ...current,
            needs: current.needs.includes(need) ? current.needs.filter((item) => item !== need) : [...current.needs, need],
        }));
        setError("");
    };

    const goNext = () => {
        if (isStepComplete(step, answers)) {
            advance(answers);
            return;
        }
        if (step.type === "needs") {
            const length = answers.message.trim().length;
            setError(length > 0 && length < LIMITS.messageMin ? t("onboarding.errors.messageShort") : t("onboarding.errors.needs"));
        } else {
            setError(t("onboarding.errors.choice"));
        }
    };

    // Modifier une réponse déjà donnée, puis revenir là où l'on était.
    const editStep = (target) => {
        if (target === index) return;
        if (target < index) setReturnTo((current) => Math.max(current ?? 0, index));
        pushStep(Math.min(target, firstIncomplete(answers)));
    };

    const restart = () => {
        clearDraft();
        const start = preset ? 1 : 0;
        setAnswers({ ...EMPTY_ANSWERS, project: preset });
        setFurthest(start);
        setReturnTo(null);
        setTouched({});
        setSubmitted(false);
        window.history.replaceState({ ...window.history.state, rkStep: start }, "");
        show(start);
    };

    const mailSubject = () => `${t("onboarding.mailSubject")}${answers.name.trim() ? ` — ${answers.name.trim()}` : ""}`;

    const mailBody = () => {
        const lines = ONBOARDING_STEPS.filter((stepDef) => stepDef.type !== "identity" && answerText(stepDef, answers, t)).map(
            (stepDef) =>
                stepDef.type === "needs"
                    ? `${t("onboarding.steps.needs.summary")} : ${answers.needs.map((need) => t(`onboarding.needs.${need}`)).join(", ") || "—"}`
                    : `${t(`onboarding.steps.${stepDef.id}.summary`)} : ${answerText(stepDef, answers, t)}`
        );
        const identity = [
            answers.name.trim() && `${t("onboarding.fields.name")} : ${answers.name.trim()}`,
            answers.email.trim() && `${t("onboarding.fields.email")} : ${answers.email.trim()}`,
            answers.phone.trim() && `${t("onboarding.fields.phone")} : ${answers.phone.trim()}`,
        ].filter(Boolean);
        if (identity.length > 0) lines.push("", ...identity);
        if (answers.message.trim()) {
            lines.push("", `${t("onboarding.steps.needs.messageSummary")} :`, answers.message.trim().slice(0, 1500));
        }
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

    // Seules les réponses à choix partent dans la mesure, jamais le nom, l'e-mail ni le message.
    const trackSent = (mode) =>
        track("demarrer-envoi", { mode, projet: answers.project || "-", budget: answers.budget || "-" });

    const send = async () => {
        if (status === "loading") return;
        setSubmitted(true);
        if (!identityValid) {
            document.getElementById(identityErrors.name ? "name" : "email")?.focus();
            return;
        }
        // Filet de sécurité : une réponse manquante (brouillon modifié entre-temps) se complète d'abord.
        const missing = firstIncomplete(answers);
        if (missing < IDENTITY_STEP) {
            setReturnTo(IDENTITY_STEP);
            pushStep(missing);
            return;
        }
        if (MAIL_MODE) {
            trackSent("mailto");
            setStatus("mailOpened");
            window.location.href = mailtoHref();
            return;
        }

        setStatus("loading");
        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: answers.name,
                    email: answers.email,
                    phone: answers.phone,
                    project: answers.project,
                    needs: answers.needs,
                    stage: answers.stage,
                    timing: answers.timing,
                    budget: answers.budget,
                    message: answers.message,
                    website: answers.website,
                    locale,
                }),
            });
            const result = await response.json().catch(() => ({}));
            if (response.ok && result.ok) {
                clearDraft();
                trackSent("formulaire");
                setStatus("success");
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    };

    const primary = () => (isIdentity ? send() : goNext());

    // Clavier (ordinateur) : 1 à 9 choisissent une réponse, Entrée valide l'écran.
    const onKeyDown = useEffectEvent((event) => {
        if (done || event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey || event.isComposing) return;
        const target = event.target instanceof HTMLElement ? event.target : null;
        const tag = target?.tagName ?? "";
        if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || target?.isContentEditable) return;

        if (/^[1-9]$/.test(event.key)) {
            const position = Number(event.key) - 1;
            if (step.type === "choice" && step.options[position]) {
                event.preventDefault();
                choose(step.options[position]);
            } else if (step.type === "needs" && needsFor(answers.project)[position]) {
                event.preventDefault();
                toggleNeed(needsFor(answers.project)[position]);
            }
            return;
        }
        if (event.key === "Enter" && !event.shiftKey && !["BUTTON", "A", "SUMMARY"].includes(tag)) {
            event.preventDefault();
            primary();
        }
    });

    useEffect(() => {
        const listener = (event) => onKeyDown(event);
        window.addEventListener("keydown", listener);
        return () => window.removeEventListener("keydown", listener);
    }, []);

    const counter = isIdentity
        ? t("onboarding.lastStep")
        : t("onboarding.questionCounter").replace("{current}", index + 1).replace("{total}", TOTAL_STEPS);
    // Le premier écran affiché annonce l'effort demandé, tant qu'on n'est pas allé plus loin.
    const showIntro = index === (preset ? 1 : 0) && furthest === index;
    const showPrimary = !done && !pending && (step.type !== "choice" || Boolean(answers[step.id]));
    const showBar = !done && (index > 0 || showPrimary);

    let screen;
    if (status === "success") {
        screen = <SuccessScreen name={answers.name} />;
    } else if (status === "mailOpened") {
        screen = <MailOpenedScreen copied={copied} onCopy={copyMessage} onBack={() => setStatus("idle")} />;
    } else {
        screen = (
            <>
                {resumed && (
                    <motion.div
                        variants={itemVariants}
                        className="mb-7 flex flex-wrap items-center gap-x-3 gap-y-1.5 rounded-2xl border border-border bg-card/60 px-4 py-3 text-sm"
                    >
                        <RotateCcw className="size-4 shrink-0 text-primary" aria-hidden="true" />
                        <span className="text-muted-foreground">{t("onboarding.resumed")}</span>
                        <button
                            type="button"
                            onClick={restart}
                            className="font-medium text-foreground underline underline-offset-4 transition-colors hover:text-primary"
                        >
                            {t("onboarding.restart")}
                        </button>
                    </motion.div>
                )}

                <motion.div variants={itemVariants}>
                    <Label>{counter}</Label>
                </motion.div>
                <div className="mt-4 md:mt-6">
                    <Question text={t(`onboarding.steps.${step.id}.question`)} />
                </div>
                <motion.p variants={itemVariants} className="mt-4 max-w-xl leading-relaxed text-muted-foreground md:mt-5 md:text-lg">
                    {t(`onboarding.steps.${step.id}.help`)}
                </motion.p>
                {showIntro && (
                    <motion.p variants={itemVariants} className="mt-3 flex items-start gap-2.5 text-sm text-muted-foreground">
                        <span aria-hidden="true" className="mt-[0.45rem] size-1.5 shrink-0 rounded-full bg-primary" />
                        {t("onboarding.intro").replace("{total}", TOTAL_STEPS)}
                    </motion.p>
                )}

                <div className="mt-7 md:mt-10">
                    {step.type === "choice" && <ChoiceOptions step={step} value={answers[step.id]} onChoose={choose} />}

                    {step.type === "needs" && (
                        <NeedsPicker
                            project={answers.project}
                            needs={answers.needs}
                            message={answers.message}
                            onToggle={toggleNeed}
                            onMessage={(value) => setAnswer("message", value)}
                            onSubmit={goNext}
                        />
                    )}

                    {isIdentity && (
                        <>
                            <IdentityFields
                                values={answers}
                                errors={identityErrors}
                                touched={touched}
                                submitted={submitted}
                                onChange={setAnswer}
                                onBlur={(field) => setTouched((current) => ({ ...current, [field]: true }))}
                                onSubmit={send}
                            />
                            <motion.p variants={itemVariants} className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                                <Lock className="size-3.5 shrink-0" aria-hidden="true" />
                                {t("onboarding.fields.privacy")}
                            </motion.p>

                            {MAIL_MODE && (
                                <motion.p
                                    variants={itemVariants}
                                    className="mt-6 flex max-w-2xl items-start gap-2.5 rounded-xl border border-border bg-muted px-4 py-3 text-sm leading-relaxed text-muted-foreground"
                                >
                                    <Mail className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                                    {t("onboarding.send.notice")}
                                </motion.p>
                            )}

                            {status === "error" && (
                                <div role="alert" className="mt-6 max-w-2xl rounded-2xl border border-destructive/30 bg-destructive/10 p-5">
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

                            <motion.div variants={itemVariants} className="mt-8 flex max-w-2xl items-center gap-4">
                                <Portrait className="size-12 md:size-14" />
                                <p className="text-sm leading-relaxed text-muted-foreground">
                                    <span className="block font-medium text-foreground">Romain Kantzer</span>
                                    {t("onboarding.send.reassurance")}
                                </p>
                            </motion.div>
                            <motion.div variants={itemVariants} className="mt-6 max-w-2xl">
                                <MobileRecap answers={answers} onEdit={editStep} />
                            </motion.div>
                        </>
                    )}
                </div>
            </>
        );
    }

    let primaryContent;
    if (status === "loading") {
        primaryContent = (
            <>
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                {t("onboarding.send.sending")}
            </>
        );
    } else if (isIdentity && MAIL_MODE) {
        primaryContent = (
            <>
                <Mail className="size-4" aria-hidden="true" />
                {t("onboarding.send.mailto")}
            </>
        );
    } else {
        primaryContent = (
            <>
                {isIdentity ? t("onboarding.send.button") : t("onboarding.next")}
                <ArrowRight className="size-4" aria-hidden="true" />
            </>
        );
    }

    const directMail = (
        <>
            {t("onboarding.footerNote")}{" "}
            <a href={`mailto:${CONTACT_RECIPIENT}`} className="text-foreground underline underline-offset-4">
                {CONTACT_RECIPIENT}
            </a>
        </>
    );

    return (
        <div className="relative flex min-h-[100svh] flex-col">
            <div
                aria-hidden="true"
                className="dot-grid pointer-events-none absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_70%_50%_at_30%_25%,black,transparent)]"
            />

            {/* Tunnel fermé : le logo pour sortir, la langue, et l'avancement. */}
            <header className="sticky top-0 z-40 bg-background/85 backdrop-blur-md">
                <div className={`${container} flex h-14 items-center justify-between gap-4 md:h-[4.5rem]`}>
                    <Logo />
                    <LanguageSwitch />
                </div>
                <div
                    role="progressbar"
                    aria-label={t("onboarding.label")}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={Math.round(progress * 100)}
                    className="h-[3px] w-full bg-border/60"
                >
                    {/* Déjà entamée à l'arrivée : la barre part de zéro et file jusqu'à sa valeur. */}
                    <motion.div
                        className="h-full w-full origin-left bg-primary"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: progress }}
                        transition={{ duration: 0.9, ease: OUT }}
                    />
                </div>
            </header>

            <main className={`${container} relative flex flex-1 flex-col lg:grid lg:grid-cols-12 lg:gap-x-12 xl:gap-x-20`}>
                <div className="flex min-w-0 flex-1 flex-col pb-44 pt-7 md:pb-20 md:pt-14 lg:col-span-8 lg:pt-[8vh]">
                    <div className="relative">
                        <AnimatePresence mode="popLayout" custom={direction}>
                            <motion.div
                                key={screenKey}
                                custom={direction}
                                variants={screenVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                            >
                                {screen}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Mobile : barre fixée en bas, à portée de pouce. Masquée pendant la saisie : elle
                        couvrirait le champ que le navigateur place juste au-dessus du clavier, et les
                        touches « Suivant » / « Envoyer » du clavier prennent le relais. */}
                    {showBar && (
                        <div
                            className={`fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/90 pb-[calc(0.75rem_+_env(safe-area-inset-bottom))] pt-3 backdrop-blur-md md:static md:mt-10 md:border-0 md:bg-transparent md:p-0 md:backdrop-blur-none ${keyboardOpen ? "max-md:hidden" : ""}`}
                        >
                            <div className="px-5 md:px-0">
                                {error && (
                                    <p role="alert" className="mb-3 flex items-start gap-2 text-sm text-destructive">
                                        <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                                        {error}
                                    </p>
                                )}
                                <div className="flex items-center gap-3">
                                    {index > 0 && (
                                        <>
                                            <button
                                                type="button"
                                                onClick={goBack}
                                                aria-label={t("onboarding.back")}
                                                className="flex size-14 shrink-0 items-center justify-center rounded-full border border-border text-foreground transition-colors active:bg-muted md:hidden"
                                            >
                                                <ArrowLeft className="size-5" aria-hidden="true" />
                                            </button>
                                            <span className="hidden md:block">
                                                <Button variant="ghost" size="lg" onClick={goBack}>
                                                    <ArrowLeft className="size-4" aria-hidden="true" />
                                                    {t("onboarding.back")}
                                                </Button>
                                            </span>
                                        </>
                                    )}
                                    {showPrimary && (
                                        <span className="min-w-0 flex-1 md:flex-none">
                                            <Button size="lg" onClick={primary} disabled={status === "loading"} className="w-full md:w-auto">
                                                {primaryContent}
                                            </Button>
                                        </span>
                                    )}
                                    {showPrimary && !isIdentity && (
                                        <span className="hidden items-center gap-1.5 text-sm text-muted-foreground lg:flex">
                                            {t("onboarding.enterHint")}
                                            <CornerDownLeft className="size-3.5" aria-hidden="true" />
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {!done && <p className="mt-12 text-sm text-muted-foreground lg:hidden">{directMail}</p>}
                </div>

                {!done && (
                    <aside className="hidden lg:col-span-4 lg:block lg:pb-20 lg:pt-[8vh]">
                        <div className="sticky top-28">
                            <ProjectSummary answers={answers} index={index} furthest={furthest} onEdit={editStep} />
                            <p className="mt-5 px-1 text-sm text-muted-foreground">{directMail}</p>
                        </div>
                    </aside>
                )}
            </main>
        </div>
    );
}
