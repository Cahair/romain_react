"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, ArrowRight, ArrowUpRight, Check, Loader2, Mail } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useTranslation } from "../../components/LanguageProvider";
import { usePageReady } from "../../components/motion/TransitionProvider";
import AnimatedTitle from "../../components/motion/AnimatedTitle";
import Button from "../../components/ui/Button";
import Label from "../../components/ui/Label";
import RollText from "../../components/ui/RollText";
import { container } from "../../components/ui/Section";
import { CopyEmail, PHONE_DISPLAY, PHONE_HREF } from "../../components/sections/ContactCta";
import { BUDGET_OPTIONS, CONTACT_RECIPIENT, LIMITS, PROJECT_OPTIONS, validateContact } from "@/lib/contact";

const OUT = [0.16, 1, 0.3, 1];
const EMPTY_FORM = { name: "", email: "", project: "", budget: "", message: "", website: "" };
const FIELD_ORDER = ["name", "email", "message"];
const pad = (value) => String(value).padStart(2, "0");
const capitalize = (value) => value.charAt(0).toUpperCase() + value.slice(1);

const inputClasses = (invalid) =>
    `block w-full rounded-xl border bg-muted px-4 py-3.5 text-base text-foreground transition-[border-color,box-shadow] duration-200 placeholder:text-muted-foreground/70 focus:outline-none focus:ring-4 focus-visible:outline-none ${
        invalid
            ? "border-destructive focus:border-destructive focus:ring-destructive/15"
            : "border-input hover:border-foreground/30 focus:border-primary focus:ring-primary/15"
    }`;

// Titre d'étape numéroté, dans le style des listes du site : (01) Votre projet
function StepTitle({ index, optional, as: Tag = "span", children, ...props }) {
    const { t } = useTranslation();
    return (
        <Tag className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-base font-medium tracking-tight" {...props}>
            <span className="text-xs tabular-nums text-secondary-neon">({pad(index)})</span>
            <span>{children}</span>
            {optional && <span className="text-sm font-normal text-muted-foreground">— {t("contact.form.optional")}</span>}
        </Tag>
    );
}

// Choix unique présenté en pastilles (boutons radio accessibles).
function ChoiceGroup({ index, legend, optional, name, options, value, onChange, getLabel }) {
    return (
        <fieldset>
            <legend className="mb-4">
                <StepTitle index={index} optional={optional}>
                    {legend}
                </StepTitle>
            </legend>
            <div className="flex flex-wrap gap-2">
                {options.map((option) => {
                    const checked = value === option;
                    return (
                        <label
                            key={option}
                            className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2.5 text-sm transition-colors duration-200 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ring ${checked ? "border-primary bg-primary text-primary-foreground" : "border-input bg-muted text-foreground hover:border-foreground/40"}`}
                        >
                            <input type="radio" name={name} value={option} checked={checked} onChange={onChange} className="sr-only" />
                            {checked && <Check className="size-3.5" aria-hidden="true" />}
                            {getLabel(option)}
                        </label>
                    );
                })}
            </div>
        </fieldset>
    );
}

function FieldError({ id, children }) {
    if (!children) return null;
    return (
        <p id={id} className="mt-2 flex items-center gap-1.5 text-sm text-destructive">
            <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
            {children}
        </p>
    );
}

function RequiredMark() {
    return (
        <span className="text-primary" aria-hidden="true">
            {" "}*
        </span>
    );
}

export default function ContactPage() {
    const { t, tl, locale } = useTranslation();
    const ready = usePageReady();
    const [form, setForm] = useState(EMPTY_FORM);
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState("idle"); // idle | loading | success | error | rateLimited
    const formRef = useRef(null);

    const errorText = (field) => (errors[field] ? t(`contact.form.errors.${field}${capitalize(errors[field])}`) : "");

    const onChange = (event) => {
        const { name, value } = event.target;
        setForm((current) => ({ ...current, [name]: value }));
        if (errors[name]) {
            setErrors((current) => {
                const next = { ...current };
                delete next[name];
                return next;
            });
        }
    };

    const showErrors = (fieldErrors) => {
        setErrors(fieldErrors);
        const first = FIELD_ORDER.find((field) => fieldErrors[field]);
        if (first) formRef.current?.querySelector(`#${first}`)?.focus();
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        const fieldErrors = validateContact(form);
        if (Object.keys(fieldErrors).length > 0) {
            showErrors(fieldErrors);
            return;
        }

        setStatus("loading");
        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, locale }),
            });
            const result = await response.json().catch(() => ({}));
            if (response.ok && result.ok) {
                setStatus("success");
                setForm(EMPTY_FORM);
                setErrors({});
                return;
            }
            if (result.code === "validation" && result.fields) {
                setStatus("idle");
                showErrors(result.fields);
                return;
            }
            setStatus(result.code === "rate_limited" ? "rateLimited" : "error");
        } catch {
            setStatus("error");
        }
    };

    // Solution de secours : le message déjà rédigé, prêt à partir depuis la messagerie du visiteur.
    const mailtoHref = () => {
        const labels = t("contact.form.mailtoLabels");
        const lines = [`${labels.name} : ${form.name}`, `${labels.email} : ${form.email}`];
        if (form.project) lines.push(`${labels.project} : ${t(`contact.form.projectOptions.${form.project}`)}`);
        if (form.budget) lines.push(`${labels.budget} : ${t(`contact.form.budgetOptions.${form.budget}`)}`);
        lines.push("", `${labels.message} :`, form.message.slice(0, 1500));
        const subject = `${t("contact.form.mailtoSubject")}${form.name ? ` — ${form.name}` : ""}`;
        return `mailto:${CONTACT_RECIPIENT}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
    };

    const reveal = (delay) => ({
        initial: { opacity: 0, y: 24 },
        animate: ready ? { opacity: 1, y: 0 } : undefined,
        transition: { duration: 1, ease: OUT, delay },
    });

    const failed = status === "error" || status === "rateLimited";

    return (
        <>
            <Navbar />
            <main className="pb-24 pt-28 md:pb-32 md:pt-36">
                <div className={`${container} grid gap-12 lg:grid-cols-12 lg:gap-x-16 lg:gap-y-12`}>
                    <div className="lg:col-span-5 lg:row-start-1">
                        <motion.div {...reveal(0)}>
                            <Label>{t("contact.label")}</Label>
                        </motion.div>
                        <AnimatedTitle
                            as="h1"
                            size="none"
                            text={t("contact.title")}
                            play={ready}
                            delay={0.1}
                            className="mt-6 max-w-[12ch] text-[clamp(2.5rem,5vw,5rem)] font-normal leading-[0.96] tracking-[-0.035em]"
                        />
                        <motion.p {...reveal(0.4)} className="mt-8 max-w-md text-lg leading-relaxed text-muted-foreground">
                            {t("contact.lead")}
                        </motion.p>
                    </div>

                    {/* Le formulaire : carte en palette inversée pour qu'on la repère immédiatement. */}
                    <motion.section
                        {...reveal(0.25)}
                        aria-labelledby="contact-form-title"
                        className="lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1"
                    >
                        <div className="tone-invert rounded-[1.75rem] bg-background p-6 text-foreground shadow-[0_40px_100px_-40px_rgb(0_0_0/0.6)] ring-1 ring-border sm:p-8 md:p-10">
                            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border pb-6">
                                <div>
                                    <h2 id="contact-form-title" className="text-2xl font-medium tracking-[-0.02em] md:text-3xl">
                                        {t("contact.form.title")}
                                    </h2>
                                    <p className="mt-2 text-sm text-muted-foreground md:text-base">{t("contact.form.subtitle")}</p>
                                </div>
                                <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary-dark">
                                    <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
                                    {t("contact.form.badge")}
                                </span>
                            </div>

                            <AnimatePresence mode="wait" initial={false}>
                                {status === "success" ? (
                                    <motion.div
                                        key="success"
                                        role="status"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.6, ease: OUT }}
                                        className="py-10"
                                    >
                                        <svg viewBox="0 0 52 52" className="size-14 text-primary" aria-hidden="true">
                                            <motion.circle
                                                cx="26"
                                                cy="26"
                                                r="24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                initial={{ pathLength: 0 }}
                                                animate={{ pathLength: 1 }}
                                                transition={{ duration: 0.8 }}
                                            />
                                            <motion.path
                                                d="M15 27 l7 7 l15 -16"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="3"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                initial={{ pathLength: 0 }}
                                                animate={{ pathLength: 1 }}
                                                transition={{ duration: 0.5, delay: 0.6 }}
                                            />
                                        </svg>
                                        <h3 className="mt-6 text-3xl tracking-[-0.025em] md:text-4xl">{t("contact.form.successTitle")}</h3>
                                        <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">{t("contact.form.successText")}</p>
                                        <Button variant="ghost" className="mt-8" onClick={() => setStatus("idle")}>
                                            {t("contact.form.again")}
                                        </Button>
                                    </motion.div>
                                ) : (
                                    <motion.form
                                        key="form"
                                        ref={formRef}
                                        noValidate
                                        onSubmit={onSubmit}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0, y: -16 }}
                                        transition={{ duration: 0.35 }}
                                        className="relative mt-8 space-y-9"
                                    >
                                        <ChoiceGroup
                                            index={1}
                                            optional
                                            legend={t("contact.form.steps.project")}
                                            name="project"
                                            options={PROJECT_OPTIONS}
                                            value={form.project}
                                            onChange={onChange}
                                            getLabel={(option) => t(`contact.form.projectOptions.${option}`)}
                                        />

                                        <fieldset>
                                            <legend className="mb-4">
                                                <StepTitle index={2}>{t("contact.form.steps.contact")}</StepTitle>
                                            </legend>
                                            <div className="grid gap-5 sm:grid-cols-2">
                                                <div>
                                                    <label htmlFor="name" className="text-sm font-medium">
                                                        {t("contact.form.name")}
                                                        <RequiredMark />
                                                    </label>
                                                    <input
                                                        id="name"
                                                        name="name"
                                                        type="text"
                                                        autoComplete="name"
                                                        maxLength={LIMITS.name}
                                                        placeholder={t("contact.form.namePlaceholder")}
                                                        value={form.name}
                                                        onChange={onChange}
                                                        aria-required="true"
                                                        aria-invalid={errors.name ? "true" : undefined}
                                                        aria-describedby={errors.name ? "name-error" : undefined}
                                                        className={`mt-2 ${inputClasses(Boolean(errors.name))}`}
                                                    />
                                                    <FieldError id="name-error">{errorText("name")}</FieldError>
                                                </div>
                                                <div>
                                                    <label htmlFor="email" className="text-sm font-medium">
                                                        {t("contact.form.email")}
                                                        <RequiredMark />
                                                    </label>
                                                    <input
                                                        id="email"
                                                        name="email"
                                                        type="email"
                                                        inputMode="email"
                                                        autoComplete="email"
                                                        maxLength={LIMITS.email}
                                                        placeholder={t("contact.form.emailPlaceholder")}
                                                        value={form.email}
                                                        onChange={onChange}
                                                        aria-required="true"
                                                        aria-invalid={errors.email ? "true" : undefined}
                                                        aria-describedby={errors.email ? "email-error" : undefined}
                                                        className={`mt-2 ${inputClasses(Boolean(errors.email))}`}
                                                    />
                                                    <FieldError id="email-error">{errorText("email")}</FieldError>
                                                </div>
                                            </div>
                                        </fieldset>

                                        <div>
                                            <StepTitle as="label" htmlFor="message" index={3}>
                                                {t("contact.form.steps.message")}
                                                <RequiredMark />
                                            </StepTitle>
                                            <textarea
                                                id="message"
                                                name="message"
                                                rows={5}
                                                maxLength={LIMITS.messageMax}
                                                placeholder={t("contact.form.messagePlaceholder")}
                                                value={form.message}
                                                onChange={onChange}
                                                aria-required="true"
                                                aria-invalid={errors.message ? "true" : undefined}
                                                aria-describedby={errors.message ? "message-error" : undefined}
                                                className={`mt-4 min-h-[8.5rem] resize-y ${inputClasses(Boolean(errors.message))}`}
                                            />
                                            <div className="flex items-start gap-4">
                                                <FieldError id="message-error">{errorText("message")}</FieldError>
                                                <span className="ml-auto mt-2 text-xs tabular-nums text-muted-foreground">
                                                    {form.message.length} / {LIMITS.messageMax}
                                                </span>
                                            </div>
                                        </div>

                                        <ChoiceGroup
                                            index={4}
                                            optional
                                            legend={t("contact.form.steps.budget")}
                                            name="budget"
                                            options={BUDGET_OPTIONS}
                                            value={form.budget}
                                            onChange={onChange}
                                            getLabel={(option) => t(`contact.form.budgetOptions.${option}`)}
                                        />

                                        {/* Pot de miel anti-spam : invisible pour les humains, rempli par les robots. */}
                                        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                                            <label htmlFor="website">Website</label>
                                            <input
                                                id="website"
                                                name="website"
                                                type="text"
                                                tabIndex={-1}
                                                autoComplete="off"
                                                value={form.website}
                                                onChange={onChange}
                                            />
                                        </div>

                                        <AnimatePresence>
                                            {failed && (
                                                <motion.div
                                                    role="alert"
                                                    initial={{ opacity: 0, y: 8 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0 }}
                                                    className="rounded-2xl border border-destructive/30 bg-destructive/10 p-5"
                                                >
                                                    <p className="flex items-center gap-2 font-medium">
                                                        <AlertCircle className="size-5 shrink-0 text-destructive" aria-hidden="true" />
                                                        {t("contact.form.errorTitle")}
                                                    </p>
                                                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                                        {status === "rateLimited" ? t("contact.form.rateLimited") : t("contact.form.errorText")}
                                                    </p>
                                                    <a
                                                        href={mailtoHref()}
                                                        className="mt-4 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
                                                    >
                                                        <Mail className="size-4" aria-hidden="true" />
                                                        {t("contact.form.errorMailto")}
                                                    </a>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        <div className="flex flex-col gap-5 border-t border-border pt-7 sm:flex-row sm:items-center sm:justify-between">
                                            <p className="text-sm leading-relaxed text-muted-foreground">
                                                {t("contact.form.requiredNote")}
                                                <br />
                                                {t("contact.form.privacy")}
                                            </p>
                                            <Button type="submit" size="lg" disabled={status === "loading"} className="w-full sm:w-auto">
                                                {status === "loading" ? (
                                                    <>
                                                        <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                                                        {t("contact.form.sending")}
                                                    </>
                                                ) : (
                                                    <>
                                                        {t("contact.form.submit")}
                                                        <ArrowRight className="size-4" aria-hidden="true" />
                                                    </>
                                                )}
                                            </Button>
                                        </div>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.section>

                    <motion.aside {...reveal(0.5)} className="space-y-10 lg:col-span-5 lg:row-start-2">
                        <div>
                            <p className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-muted-foreground md:text-xs">
                                {t("contact.direct.title")}
                            </p>
                            <ul className="mt-5 space-y-4 text-lg">
                                <li>
                                    <CopyEmail />
                                </li>
                                <li>
                                    <a href={PHONE_HREF} className="tabular-nums transition-colors hover:text-primary">
                                        {PHONE_DISPLAY}
                                    </a>
                                </li>
                                <li className="text-muted-foreground">{t("contact.direct.location")}</li>
                                <li>
                                    <a
                                        href="https://www.linkedin.com/in/romain-kantzer-9323b920a/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group/roll inline-flex items-center gap-1.5"
                                    >
                                        <RollText>LinkedIn</RollText>
                                        <ArrowUpRight className="size-4" aria-hidden="true" />
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="rounded-3xl border border-border p-7 md:p-8">
                            <p className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-muted-foreground md:text-xs">
                                {t("contact.next.title")}
                            </p>
                            <ol className="mt-6 space-y-5">
                                {tl("contact.next.steps").map((step, index) => (
                                    <li key={step} className="flex gap-4">
                                        <span className="pt-0.5 text-sm tabular-nums text-secondary-neon">({pad(index + 1)})</span>
                                        <span className="leading-relaxed">{step}</span>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </motion.aside>
                </div>
            </main>
            <Footer />
        </>
    );
}
