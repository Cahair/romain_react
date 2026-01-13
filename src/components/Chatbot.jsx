
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Cpu, User, Loader2, Sparkles, Terminal } from "lucide-react";
import { useTranslation } from "./LanguageProvider";

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: "assistant", content: "Bonjour ! Je suis l'assistant virtuel de Romain. Posez-moi une question sur son parcours, ses compétences ou ses services." }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }

        // Lock scroll on body when chatbot is open
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const sendMessage = async (text) => {
        if (!text.trim() || isLoading) return;

        const userMessage = text.trim();
        setInput("");
        setMessages(prev => [...prev, { role: "user", content: userMessage }]);
        setIsLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMessage }),
            });

            const data = await response.json();

            if (data.answer) {
                setMessages(prev => [...prev, {
                    role: "assistant",
                    content: data.answer,
                    suggestions: data.suggestions || []
                }]);
            } else if (data.text) {
                setMessages(prev => [...prev, { role: "assistant", content: data.text }]);
            } else {
                throw new Error("No response");
            }
        } catch (error) {
            console.error("Chat error:", error);
            setMessages(prev => [...prev, { role: "assistant", content: "Désolé, j'ai rencontré une erreur. Veuillez réessayer plus tard." }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        sendMessage(input);
    };

    const handleSuggestionClick = (question) => {
        if (isLoading) return;
        sendMessage(question);
    };

    return (
        <>
            {/* Floating Toggle Button */}
            <motion.button
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-6 right-6 z-50 p-4 rounded-full bg-black/80 backdrop-blur-md border border-primary-neon/50 shadow-[0_0_20px_rgba(0,240,255,0.3)] group hover:scale-110 transition-all duration-300 ${isOpen ? 'hidden' : 'flex'}`}
                whileHover={{ rotate: 5 }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
            >
                <div className="absolute inset-0 rounded-full border border-white/10" />
                <div className="absolute inset-0 rounded-full bg-primary-neon/10 animate-pulse-slow" />
                <MessageSquare className="w-6 h-6 text-primary-neon relative z-10" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-bounce" />
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed bottom-6 right-6 z-50 w-[90vw] md:w-[400px] max-h-[600px] h-[70vh] flex flex-col rounded-2xl overflow-hidden backdrop-blur-xl bg-black/90 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-primary-neon/10 to-transparent opacity-50" />
                            <div className="flex items-center gap-3 relative z-10">
                                <div className="w-10 h-10 rounded-full bg-primary-neon/20 flex items-center justify-center border border-primary-neon/50">
                                    <Sparkles className="w-5 h-5 text-primary-neon" />
                                </div>
                                <div>
                                    <h3 className="text-white font-display font-bold tracking-wide">Assistant IA</h3>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                        <span className="text-xs text-muted-foreground font-mono">En ligne</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors relative z-10 text-gray-400 hover:text-white"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-primary-neon/20 scrollbar-track-transparent">
                            {messages.map((msg, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex flex-col gap-2 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                                >
                                    <div className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border ${msg.role === 'user' ? 'bg-white/10 border-white/20' : 'bg-primary-neon/10 border-primary-neon/30'}`}>
                                            {msg.role === 'user' ? (
                                                <User className="w-4 h-4 text-white" />
                                            ) : (
                                                <Terminal className="w-4 h-4 text-primary-neon" />
                                            )}
                                        </div>
                                        <div
                                            className={`p-3 rounded-2xl max-w-[85%] text-sm leading-relaxed ${msg.role === 'user'
                                                ? 'bg-white/10 text-white rounded-tr-sm'
                                                : 'bg-primary-neon/5 border border-primary-neon/10 text-gray-200 rounded-tl-sm shadow-[0_0_15px_rgba(0,240,255,0.05)]'
                                                }`}
                                        >
                                            {msg.content}
                                        </div>
                                    </div>

                                    {/* Render Suggestions if any */}
                                    {msg.suggestions && msg.suggestions.length > 0 && (
                                        <div className="flex flex-wrap gap-2 ml-11 max-w-[85%]">
                                            {msg.suggestions.map((suggestion, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => sendMessage(suggestion)}
                                                    className="text-xs px-3 py-1.5 rounded-full border border-primary-neon/30 bg-primary-neon/5 text-primary-neon hover:bg-primary-neon/20 transition-colors text-left"
                                                >
                                                    {suggestion}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                            {isLoading && (
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-full bg-primary-neon/10 border border-primary-neon/30 flex items-center justify-center flex-shrink-0">
                                        <Loader2 className="w-4 h-4 text-primary-neon animate-spin" />
                                    </div>
                                    <div className="text-xs text-primary-neon/70 font-mono py-2 animate-pulse">
                                        Analyse de la demande...
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSubmit} className="p-4 border-t border-white/10 bg-white/5 backdrop-blur-md">
                            <div className="relative flex items-center gap-2">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Posez votre question..."
                                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 pr-12 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary-neon/50 focus:ring-1 focus:ring-primary-neon/50 transition-all font-light"
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim() || isLoading}
                                    className="absolute right-2 p-2 bg-primary-neon/10 rounded-lg text-primary-neon hover:bg-primary-neon/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
