"use client";
import { useState } from "react";
import { Send, Linkedin, Github, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { useTranslation } from "./LanguageProvider";

export default function Footer() {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [status, setStatus] = useState({ type: null, message: "" }); // 'success', 'error', 'loading'

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: "loading", message: "" });

        try {
            // Using Formspree - free form backend that sends real emails
            const response = await fetch("https://formspree.io/f/xpwpgvvv", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                    _subject: `[Kantzer.AI] Nouveau message de ${formData.name}`,
                }),
            });

            if (response.ok) {
                setStatus({ type: "success", message: t("footer.form.success") });
                setFormData({ name: "", email: "", message: "" });
                setTimeout(() => setStatus({ type: null, message: "" }), 5000);
            } else {
                const data = await response.json();
                setStatus({ type: "error", message: data.error || t("footer.form.error") });
            }
        } catch (error) {
            setStatus({ type: "error", message: t("footer.form.connectionError") });
        }
    };

    return (
        <footer id="contact" className="py-24 bg-background border-t border-border">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 mb-24">
                    <div>
                        <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-8 leading-tight text-foreground">
                            {t("footer.title")} <br />
                            <span className="text-gradient">{t("footer.titleHighlight")}</span>
                        </h2>
                        <p className="text-muted-foreground text-lg mb-12 max-w-md">
                            {t("footer.subtitle")}
                        </p>

                        <div className="flex gap-6">
                            <a href="https://www.linkedin.com/in/romain-kantzer-9323b920a/" target="_blank" rel="noopener noreferrer" className="p-4 bg-card border border-border rounded-2xl hover:bg-primary/20 transition-all hover:shadow-neon-cyan text-foreground">
                                <Linkedin className="w-6 h-6" />
                            </a>
                            <a href="https://github.com/Cahair" target="_blank" rel="noopener noreferrer" className="p-4 bg-card border border-border rounded-2xl hover:bg-primary/20 transition-all hover:shadow-neon-cyan text-foreground">
                                <Github className="w-6 h-6" />
                            </a>
                        </div>
                    </div>

                    <div className="bg-card border border-border p-10 rounded-[3rem] relative overflow-hidden shadow-lg">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl" />

                        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">{t("footer.form.name")}</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-input border border-border rounded-2xl px-6 py-4 focus:outline-none focus:border-primary focus:ring-2 focus:ring-ring/20 transition-colors text-foreground placeholder:text-muted-foreground"
                                    placeholder={t("footer.form.namePlaceholder")}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">{t("footer.form.email")}</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-input border border-border rounded-2xl px-6 py-4 focus:outline-none focus:border-primary focus:ring-2 focus:ring-ring/20 transition-colors text-foreground placeholder:text-muted-foreground"
                                    placeholder={t("footer.form.emailPlaceholder")}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">{t("footer.form.message")}</label>
                                <textarea
                                    rows="4"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-input border border-border rounded-2xl px-6 py-4 focus:outline-none focus:border-primary focus:ring-2 focus:ring-ring/20 transition-colors text-foreground placeholder:text-muted-foreground resize-none"
                                    placeholder={t("footer.form.messagePlaceholder")}
                                />
                            </div>

                            {/* Status Message */}
                            {status.type && (
                                <div className={`flex items-center gap-3 p-4 rounded-xl ${status.type === "success"
                                    ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                                    : status.type === "error"
                                        ? "bg-red-500/10 text-red-500 border border-red-500/20"
                                        : "bg-primary/10 text-primary border border-primary/20"
                                    }`}>
                                    {status.type === "success" && <CheckCircle className="w-5 h-5" />}
                                    {status.type === "error" && <AlertCircle className="w-5 h-5" />}
                                    {status.type === "loading" && <Loader2 className="w-5 h-5 animate-spin" />}
                                    <span className="text-sm font-medium">
                                        {status.type === "loading" ? t("footer.form.loading") : status.message}
                                    </span>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={status.type === "loading"}
                                className="w-full py-6 bg-gradient-to-r from-primary to-secondary rounded-2xl font-black uppercase tracking-[0.2em] shadow-lg hover:shadow-neon-cyan transition-all active:scale-[0.98] text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {status.type === "loading" ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        {t("footer.form.sending")}
                                    </>
                                ) : (
                                    <>
                                        {t("footer.form.submit")} <Send className="w-5 h-5" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                <div className="pt-12 border-t border-border flex flex-col md:flex-row justify-between items-center gap-8 text-muted-foreground text-sm font-bold tracking-widest uppercase">
                    <div suppressHydrationWarning>© {new Date().getFullYear()} KANTZER.AI — {t("footer.legal.rights")}</div>
                    <div className="flex gap-12">
                        <a href="#" className="hover:text-primary transition-colors">{t("footer.legal.privacy")}</a>
                        <a href="#" className="hover:text-primary transition-colors">{t("footer.legal.terms")}</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
