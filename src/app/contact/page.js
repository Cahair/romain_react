"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTranslation } from "@/components/LanguageProvider";

export default function ContactPage() {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        project: "",
        budget: "",
        message: ""
    });
    const [status, setStatus] = useState("idle"); // idle, loading, success, error

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("loading");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setStatus("success");
                setFormData({ name: "", email: "", project: "", budget: "", message: "" });
            } else {
                setStatus("error");
            }
        } catch (error) {
            setStatus("error");
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <main className="bg-background min-h-screen flex flex-col">
            <Navbar />

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="flex-1 pt-32 pb-24 flex flex-col justify-center min-h-[calc(100vh-80px)]"
            >
                {/* Hero */}
                <div className="container mx-auto px-6 mb-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
                            {t("contact.title")} <span className="text-gradient">{t("contact.titleHighlight")}</span>
                        </h1>
                        <p className="text-lg text-gray-400">
                            {t("contact.subtitle")}
                        </p>
                    </motion.div>
                </div>

                {/* Split Screen Layout */}
                <div className="container mx-auto px-6 flex-1 flex items-center">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto w-full">

                        {/* Left: Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="space-y-6 flex flex-col"
                        >
                            <div className="glass p-8 rounded-3xl flex-1">
                                <h2 className="text-2xl font-black mb-6">{t("contact.why.title")}</h2>
                                <ul className="space-y-4 text-base text-gray-300">
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary mt-1">✦</span>
                                        <span>{t("contact.why.items.0")}</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary mt-1">✦</span>
                                        <span>{t("contact.why.items.1")}</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary mt-1">✦</span>
                                        <span>{t("contact.why.items.2")}</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary mt-1">✦</span>
                                        <span>{t("contact.why.items.3")}</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="glass p-8 rounded-3xl">
                                <h3 className="text-lg font-black mb-5 uppercase tracking-widest">{t("contact.contact.title")}</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                            <Mail className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-500 uppercase tracking-wide">{t("contact.contact.email")}</div>
                                            <div className="text-base font-bold">romain@kantzer.ai</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                                            <Phone className="w-6 h-6 text-secondary" />
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-500 uppercase tracking-wide">{t("contact.contact.phone")}</div>
                                            <div className="text-base font-bold">+33 6 XX XX XX XX</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                                            <MapPin className="w-6 h-6 text-accent" />
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-500 uppercase tracking-wide">{t("contact.contact.location")}</div>
                                            <div className="text-base font-bold">{t("contact.contact.locationValue")}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right: Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="flex"
                        >
                            <div className="glass p-8 rounded-3xl flex-1 flex flex-col">
                                <h2 className="text-2xl font-black mb-6 uppercase tracking-widest">{t("contact.form.title")}</h2>

                                {status === "success" ? (
                                    <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
                                        <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/50">
                                            <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <h3 className="text-xl font-bold text-white">{t("contact.form.success")}</h3>
                                        <button
                                            onClick={() => setStatus("idle")}
                                            className="text-primary hover:underline"
                                        >
                                            Nouvelle demande
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-5 flex-1 flex flex-col">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-bold uppercase tracking-wide text-gray-500 mb-2">
                                                    {t("contact.form.name")}
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder={t("contact.form.namePlaceholder")}
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold uppercase tracking-wide text-gray-500 mb-2">
                                                    {t("contact.form.email")}
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder={t("contact.form.emailPlaceholder")}
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-bold uppercase tracking-wide text-gray-500 mb-2">
                                                    {t("contact.form.project")}
                                                </label>
                                                <select
                                                    name="project"
                                                    value={formData.project}
                                                    onChange={handleChange}
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                                                >
                                                    <option value="">{t("contact.form.projectOptions.select")}</option>
                                                    <option value="chatbot">{t("contact.form.projectOptions.chatbot")}</option>
                                                    <option value="automation">{t("contact.form.projectOptions.automation")}</option>
                                                    <option value="leadgen">{t("contact.form.projectOptions.leadgen")}</option>
                                                    <option value="custom">{t("contact.form.projectOptions.custom")}</option>
                                                    <option value="audit">{t("contact.form.projectOptions.audit")}</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold uppercase tracking-wide text-gray-500 mb-2">
                                                    {t("contact.form.budget")}
                                                </label>
                                                <select
                                                    name="budget"
                                                    value={formData.budget}
                                                    onChange={handleChange}
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                                                >
                                                    <option value="">{t("contact.form.budgetOptions.select")}</option>
                                                    <option value="less5k">{t("contact.form.budgetOptions.less5k")}</option>
                                                    <option value="5k10k">{t("contact.form.budgetOptions.5k10k")}</option>
                                                    <option value="10k25k">{t("contact.form.budgetOptions.10k25k")}</option>
                                                    <option value="more25k">{t("contact.form.budgetOptions.more25k")}</option>
                                                    <option value="tbd">{t("contact.form.budgetOptions.tbd")}</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <label className="block text-sm font-bold uppercase tracking-wide text-gray-500 mb-2">
                                                {t("contact.form.message")}
                                            </label>
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                                rows="4"
                                                placeholder={t("contact.form.messagePlaceholder")}
                                                className="w-full h-full min-h-[100px] bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors resize-none"
                                            />
                                        </div>

                                        {status === "error" && (
                                            <p className="text-red-500 text-sm">{t("contact.form.error")}</p>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={status === "loading"}
                                            className="w-full py-4 bg-gradient-to-r from-primary to-secondary rounded-xl font-black uppercase tracking-widest hover:scale-[1.02] transition-transform shadow-neon-cyan disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {status === "loading" ? t("contact.form.sending") : t("contact.form.submit")}
                                        </button>
                                    </form>
                                )}

                                {/* Calendly section */}
                                <div className="mt-6 pt-6 border-t border-white/10">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Calendar className="w-5 h-5 text-primary" />
                                            <span className="text-sm font-bold uppercase tracking-wide">{t("contact.calendly.title")}</span>
                                        </div>
                                        <button className="text-sm text-primary font-bold hover:underline">
                                            {t("contact.calendly.button")}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            <Footer />
        </main>
    );
}
