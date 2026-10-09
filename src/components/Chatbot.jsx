"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, Loader2, MessageCircle, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import { useTranslation } from "./LanguageProvider";

function Bubble({ role, children }) {
    const fromUser = role === "user";
    return (
        <div className={`flex ${fromUser ? "justify-end" : "justify-start"}`}>
            <p
                className={`max-w-[85%] whitespace-pre-line rounded-2xl px-4 py-3 text-sm leading-relaxed ${fromUser ? "rounded-br-md bg-primary text-primary-foreground" : "rounded-bl-md bg-muted text-foreground"}`}
            >
                {children}
            </p>
        </div>
    );
}

// Assistant (Gemini, via /api/chat) qui répond aux questions sur Romain et ses services.
export default function Chatbot() {
    const { t } = useTranslation();
    const pathname = usePathname();
    const lenis = useLenis();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const panelRef = useRef(null);
    const listRef = useRef(null);
    const inputRef = useRef(null);

    // Sur l'accueil, le bouton n'apparaît qu'après le hero.
    useEffect(() => {
        const onScroll = () => setShowButton(pathname !== "/" || window.scrollY > 600);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [pathname]);

    // On défile la liste elle-même : scrollIntoView ferait aussi bouger la page sur iOS.
    useEffect(() => {
        const list = listRef.current;
        list?.scrollTo({ top: list.scrollHeight, behavior: "smooth" });
    }, [messages, isLoading, isOpen]);

    // Sur mobile, le panneau occupe la zone réellement visible. Quand le clavier s'ouvre, seul
    // le visualViewport rétrécit (iOS comme Android) : calé sur le bas de l'écran, le panneau
    // passerait sous le clavier ou se ferait rogner par le haut.
    useEffect(() => {
        const viewport = window.visualViewport;
        const panel = panelRef.current;
        if (!isOpen || !viewport || !panel) return;
        const place = () => {
            panel.style.setProperty("--chat-top", `${viewport.offsetTop}px`);
            panel.style.setProperty("--chat-height", `${viewport.height}px`);
        };
        const onResize = () => {
            place();
            const list = listRef.current;
            if (list) list.scrollTop = list.scrollHeight;
        };
        place();
        viewport.addEventListener("resize", onResize);
        viewport.addEventListener("scroll", place);
        return () => {
            viewport.removeEventListener("resize", onResize);
            viewport.removeEventListener("scroll", place);
        };
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return;
        // Pas de focus automatique sur écran tactile : le clavier masquerait le message
        // d'accueil avant même qu'on ait pu le lire.
        if (window.matchMedia("(pointer: fine)").matches) inputRef.current?.focus();
        lenis?.stop();
        const onKeyDown = (event) => {
            if (event.key === "Escape") setIsOpen(false);
        };
        window.addEventListener("keydown", onKeyDown);
        return () => {
            lenis?.start();
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [isOpen, lenis]);

    const sendMessage = async (text) => {
        if (!text.trim() || isLoading) return;

        const userMessage = text.trim();
        setInput("");
        setMessages((previous) => [...previous, { role: "user", content: userMessage }]);
        setIsLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMessage }),
            });
            const data = await response.json();
            if (!data.answer) throw new Error("No response");
            setMessages((previous) => [
                ...previous,
                { role: "assistant", content: data.answer, suggestions: data.suggestions || [] },
            ]);
        } catch (error) {
            console.error("Chat error:", error);
            setMessages((previous) => [...previous, { role: "assistant", content: t("chatbot.error") }]);
        } finally {
            setIsLoading(false);
        }
    };

    // Pas d'assistant dans l'espace admin, ni dans le parcours /demarrer (rien ne doit distraire
    // ni chevaucher la barre d'action fixée en bas sur mobile).
    if (pathname?.startsWith("/admin") || pathname === "/demarrer") return null;

    return (
        <>
            <AnimatePresence>
                {showButton && !isOpen && (
                    <motion.button
                        key="chat-toggle"
                        type="button"
                        onClick={() => setIsOpen(true)}
                        aria-label={t("chatbot.open")}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 22 }}
                        className="fixed bottom-5 right-5 z-[35] flex size-14 items-center justify-center rounded-full bg-foreground text-background shadow-lg transition-transform duration-300 hover:scale-105 md:bottom-8 md:right-8"
                    >
                        <MessageCircle className="size-6" aria-hidden="true" />
                    </motion.button>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        key="chat-panel"
                        ref={panelRef}
                        role="dialog"
                        aria-label={t("chatbot.title")}
                        initial={{ opacity: 0, y: 40, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 40, scale: 0.96 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed inset-x-0 top-[var(--chat-top,0px)] z-[60] flex h-[var(--chat-height,100dvh)] flex-col overflow-hidden bg-background md:inset-x-auto md:bottom-8 md:right-8 md:top-auto md:h-[min(38rem,80svh)] md:w-[26rem] md:origin-bottom-right md:rounded-3xl md:border md:border-border md:shadow-2xl"
                    >
                        <div className="flex items-center justify-between border-b border-border px-5 py-4">
                            <div>
                                <p className="font-medium">{t("chatbot.title")}</p>
                                <p className="text-xs text-muted-foreground">{t("chatbot.subtitle")}</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                aria-label={t("chatbot.close")}
                                className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
                            >
                                <X className="size-4" aria-hidden="true" />
                            </button>
                        </div>

                        <div ref={listRef} data-lenis-prevent className="flex-1 space-y-4 overflow-y-auto overscroll-contain px-5 py-5">
                            <Bubble role="assistant">{t("chatbot.welcome")}</Bubble>
                            {messages.map((message, index) => (
                                <div key={index} className="space-y-2">
                                    <Bubble role={message.role}>{message.content}</Bubble>
                                    {message.suggestions?.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {message.suggestions.map((suggestion) => (
                                                <button
                                                    key={suggestion}
                                                    type="button"
                                                    onClick={() => sendMessage(suggestion)}
                                                    className="rounded-full border border-border px-3 py-1.5 text-left text-xs transition-colors hover:border-primary hover:text-primary"
                                                >
                                                    {suggestion}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                            {isLoading && (
                                <p className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <Loader2 className="size-3.5 animate-spin" aria-hidden="true" />
                                    {t("chatbot.loading")}
                                </p>
                            )}
                        </div>

                        <form
                            onSubmit={(event) => {
                                event.preventDefault();
                                sendMessage(input);
                            }}
                            className="border-t border-border p-3"
                        >
                            <div className="flex items-center gap-2 rounded-full border border-border bg-muted py-1.5 pl-4 pr-1.5 transition-colors focus-within:border-primary">
                                <input
                                    ref={inputRef}
                                    value={input}
                                    onChange={(event) => setInput(event.target.value)}
                                    placeholder={t("chatbot.placeholder")}
                                    aria-label={t("chatbot.placeholder")}
                                    autoComplete="off"
                                    enterKeyHint="send"
                                    // 16 px minimum sur mobile, sinon iOS zoome sur le champ au focus.
                                    className="min-w-0 flex-1 bg-transparent text-base text-foreground md:text-sm placeholder:text-muted-foreground focus:outline-none focus-visible:outline-none"
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim() || isLoading}
                                    aria-label={t("chatbot.send")}
                                    className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity disabled:opacity-40"
                                >
                                    <ArrowUp className="size-4" aria-hidden="true" />
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
