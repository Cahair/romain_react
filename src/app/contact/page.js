"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Calendar } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useTranslation } from "../../components/LanguageProvider";

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
                className="flex-1 pt-24 pb-10 flex flex-col justify-center min-h-[calc(100vh-80px)]"
            >
                {/* Hero - Compact */}
                <div className="container mx-auto px-4 mb-6 md:mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-2 leading-tight">
                            {t("contact.title")} <span className="text-gradient">{t("contact.titleHighlight")}</span>
                        </h1>
                        <p className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto">
                            {t("contact.subtitle")}
                        </p>
                    </motion.div>
                </div>

                {/* Optimized Split Screen Layout */}
                <div className="container mx-auto px-4 flex-1 flex items-center">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 max-w-6xl mx-auto w-full h-full">

                        {/* Left Column: Why Audit + Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-col gap-4 h-full order-2 lg:order-1"
                        >
                            {/* Value Proposition Card */}
                            <div className="glass p-6 md:p-8 rounded-2xl flex-1 flex flex-col justify-center">
                                <h2 className="text-xl md:text-2xl font-black mb-4 md:mb-6">{t("contact.why.title")}</h2>
                                <ul className="space-y-3 text-sm md:text-base text-gray-300">
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary mt-0.5">✦</span>
                                        <span>{t("contact.why.items.0")}</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary mt-0.5">✦</span>
                                        <span>{t("contact.why.items.1")}</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary mt-0.5">✦</span>
                                        <span>{t("contact.why.items.2")}</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary mt-0.5">✦</span>
                                        <span>{t("contact.why.items.3")}</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Contact Details Card */}
                            <div className="glass p-5 md:p-6 rounded-2xl">
                                <h3 className="text-sm font-black mb-4 uppercase tracking-widest text-gray-400">{t("contact.contact.title")}</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                            <Mail className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <div className="text-[10px] text-gray-500 uppercase tracking-wide">{t("contact.contact.email")}</div>
                                            <div className="text-sm font-bold">romain@kantzer.ai</div>
                                        </div>
                                    </div>
                                    {/* Phone hidden or kept based on preference, keeping compact */}
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0">
                                            <Phone className="w-5 h-5 text-secondary" />
                                        </div>
                                        <div>
                                            <div className="text-[10px] text-gray-500 uppercase tracking-wide">{t("contact.contact.phone")}</div>
                                            <div className="text-sm font-bold">+33 6 XX XX XX XX</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Column: High Conversion Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="flex h-full order-1 lg:order-2"
                        >
                            <div className="glass p-5 md:p-8 rounded-2xl flex-1 flex flex-col w-full">
                                <h2 className="text-xl md:text-2xl font-black mb-4 md:mb-6 uppercase tracking-widest">{t("contact.form.title")}</h2>

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
                                    <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4 flex-1 flex flex-col">
                                        <div className="grid grid-cols-2 gap-3 md:gap-4">
                                            <div>
                                                <label className="block text-xs font-bold uppercase tracking-wide text-gray-500 mb-1">
                                                    {t("contact.form.name")}
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
                                                    placeholder="Votre Nom"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold uppercase tracking-wide text-gray-500 mb-1">
                                                    {t("contact.form.email")}
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
                                                    placeholder="votre@email.com"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3 md:gap-4">
                                            <div>
                                                <label className="block text-xs font-bold uppercase tracking-wide text-gray-500 mb-1">
                                                    {t("contact.form.project")}
                                                </label>
                                                <select
                                                    name="project"
                                                    value={formData.project}
                                                    onChange={handleChange}
                                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
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
                                                <label className="block text-xs font-bold uppercase tracking-wide text-gray-500 mb-1">
                                                    {t("contact.form.budget")}
                                                </label>
                                                <select
                                                    name="budget"
                                                    value={formData.budget}
                                                    onChange={handleChange}
                                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
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
                                        <div className="flex-1 min-h-[100px]">
                                            <label className="block text-xs font-bold uppercase tracking-wide text-gray-500 mb-1">
                                                {t("contact.form.message")}
                                            </label>
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                                rows="3"
                                                className="w-full h-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                                                placeholder={t("contact.form.messagePlaceholder")}
                                            />
                                        </div>

                                        {status === "error" && (
                                            <p className="text-red-500 text-xs">{t("contact.form.error")}</p>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={status === "loading"}
                                            className="w-full py-3 md:py-4 bg-gradient-to-r from-primary to-secondary rounded-xl font-black uppercase tracking-widest hover:scale-[1.02] transition-transform shadow-neon-cyan disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base mt-2"
                                        >
                                            {status === "loading" ? t("contact.form.sending") : t("contact.form.submit")}
                                        </button>
                                    </form>
                                )}

                                {/* Compact Calendly section */}
                                <div className="mt-4 pt-4 border-t border-white/10">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-primary" />
                                            <span className="text-xs font-bold uppercase tracking-wide">{t("contact.calendly.title")}</span>
                                        </div>
                                        <button className="text-xs text-primary font-bold hover:underline">
                                            {t("contact.calendly.button")}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {/* Footer */}
            <Footer />
        </main>
    );
}
