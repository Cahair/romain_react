"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
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

const OUT = [0.16, 1, 0.3, 1];
const PROJECTS = ["site-vitrine", "site-e-commerce", "application-web", "application-mobile", "refonte", "autre"];
const BUDGETS = ["less1k", "1k2k", "2k5k", "more5k", "unknown"];
const EMPTY_FORM = { name: "", email: "", project: "", budget: "", message: "", website: "" };
const pad = (value) => String(value).padStart(2, "0");

// Choix unique présenté en pastilles (boutons radio accessibles).
function ChoiceGroup({ legend, name, options, value, onChange, getLabel }) {
    return (
        <fieldset>
            <legend className="text-sm text-muted-foreground">{legend}</legend>
            <div className="mt-4 flex flex-wrap gap-2">
                {options.map((option) => {
                    const checked = value === option;
                    return (
                        <label
                            key={option}
                            className={`cursor-pointer rounded-full border px-4 py-2.5 text-sm transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ring ${checked ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-foreground"}`}
                        >
                            <input type="radio" name={name} value={option} checked={checked} onChange={onChange} className="sr-only" />
                            {getLabel(option)}
                        </label>
                    );
                })}
            </div>
        </fieldset>
    );
}

function Field({ id, label, textarea = false, ...props }) {
    const Tag = textarea ? "textarea" : "input";
    return (
        <div>
            <label htmlFor={id} className="text-sm text-muted-foreground">
                {label}
            </label>
            <Tag
                id={id}
                {...props}
                className="mt-2 w-full resize-none border-0 border-b border-border bg-transparent px-0 py-3 text-xl tracking-tight text-foreground transition-colors placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus-visible:outline-none md:text-2xl"
            />
        </div>
    );
}

export default function ContactPage() {
    const { t, tl } = useTranslation();
    const ready = usePageReady();
    const [form, setForm] = useState(EMPTY_FORM);
    const [status, setStatus] = useState("idle"); // idle | loading | success | error

    const onChange = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

    const onSubmit = async (event) => {
        event.preventDefault();
        setStatus("loading");
        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            if (!response.ok) throw new Error("request failed");
            setStatus("success");
            setForm(EMPTY_FORM);
        } catch {
            setStatus("error");
        }
    };

    const reveal = (delay) => ({
        initial: { opacity: 0, y: 24 },
        animate: ready ? { opacity: 1, y: 0 } : undefined,
        transition: { duration: 1, ease: OUT, delay },
    });

    return (
        <>
            <Navbar />
            <main className="pb-24 pt-32 md:pb-36 md:pt-44">
                <div className={container}>
                    <motion.div {...reveal(0)}>
                        <Label>{t("contact.label")}</Label>
                    </motion.div>
                    <AnimatedTitle as="h1" size="hero" text={t("contact.title")} play={ready} delay={0.1} className="mt-8 max-w-[12ch]" />
                    <motion.p {...reveal(0.45)} className="mt-10 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                        {t("contact.lead")}
                    </motion.p>

                    <div className="mt-16 grid gap-16 md:mt-24 lg:grid-cols-12">
                        <motion.div {...reveal(0.6)} className="lg:col-span-7">
                            <AnimatePresence mode="wait">
                                {status === "success" ? (
                                    <motion.div
                                        key="success"
                                        role="status"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.6, ease: OUT }}
                                        className="rounded-3xl border border-border bg-card p-8 md:p-12"
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
                                        <h2 className="mt-8 text-3xl tracking-[-0.025em] md:text-4xl">{t("contact.form.successTitle")}</h2>
                                        <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">{t("contact.form.successText")}</p>
                                        <Button variant="ghost" className="mt-8" onClick={() => setStatus("idle")}>
                                            {t("contact.form.again")}
                                        </Button>
                                    </motion.div>
                                ) : (
                                    <motion.form
                                        key="form"
                                        onSubmit={onSubmit}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.4 }}
                                        className="relative space-y-12"
                                    >
                                        <ChoiceGroup
                                            legend={t("contact.form.project")}
                                            name="project"
                                            options={PROJECTS}
                                            value={form.project}
                                            onChange={onChange}
                                            getLabel={(option) => t(`contact.form.projectOptions.${option}`)}
                                        />
                                        <div className="grid gap-10 md:grid-cols-2">
                                            <Field
                                                id="name"
                                                name="name"
                                                label={t("contact.form.name")}
                                                placeholder={t("contact.form.namePlaceholder")}
                                                value={form.name}
                                                onChange={onChange}
                                                autoComplete="name"
                                                required
                                            />
                                            <Field
                                                id="email"
                                                name="email"
                                                type="email"
                                                label={t("contact.form.email")}
                                                placeholder={t("contact.form.emailPlaceholder")}
                                                value={form.email}
                                                onChange={onChange}
                                                autoComplete="email"
                                                required
                                            />
                                        </div>
                                        <Field
                                            id="message"
                                            name="message"
                                            textarea
                                            rows={4}
                                            label={t("contact.form.message")}
                                            placeholder={t("contact.form.messagePlaceholder")}
                                            value={form.message}
                                            onChange={onChange}
                                            required
                                        />
                                        <ChoiceGroup
                                            legend={t("contact.form.budget")}
                                            name="budget"
                                            options={BUDGETS}
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

                                        <div className="flex flex-wrap items-center gap-6">
                                            <Button type="submit" size="lg" disabled={status === "loading"}>
                                                {status === "loading" ? t("contact.form.sending") : t("contact.form.submit")}
                                                <ArrowRight className="size-4" aria-hidden="true" />
                                            </Button>
                                            <p className="text-sm text-muted-foreground">{t("contact.form.privacy")}</p>
                                        </div>
                                        <p aria-live="polite" className="text-sm text-destructive">
                                            {status === "error" ? t("contact.form.error") : ""}
                                        </p>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        <motion.aside {...reveal(0.75)} className="space-y-12 lg:col-span-4 lg:col-start-9">
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
                </div>
            </main>
            <Footer />
        </>
    );
}
