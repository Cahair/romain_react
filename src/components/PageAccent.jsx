"use client";
import { createContext, useContext } from "react";
import { usePathname } from "next/navigation";

// Page accent colors configuration
const pageAccents = {
    "/": {
        primary: "#3b82f6", // Blue - Home, foundation
        gradient: "from-cyan-500 to-cyan-600",
        glow: "shadow-[0_0_30px_rgba(59,130,246,0.3)]",
        name: "home"
    },
    "/about": {
        primary: "#4f46e5", // Deep indigo - About, creativity
        gradient: "from-purple-500 to-purple-600",
        glow: "shadow-[0_0_30px_rgba(79,70,229,0.3)]",
        name: "about"
    },
    "/contact": {
        primary: "#60a5fa", // Light blue - Contact, action
        gradient: "from-cyan-400 to-cyan-500",
        glow: "shadow-[0_0_30px_rgba(96,165,250,0.3)]",
        name: "contact"
    },
    "/services/web-dev": {
        primary: "#3b82f6", // Blue - Web development
        gradient: "from-cyan-500 to-violet-500",
        glow: "shadow-[0_0_30px_rgba(59,130,246,0.3)]",
        name: "web-dev"
    }
};

const PageAccentContext = createContext(pageAccents["/"]);

export function PageAccentProvider({ children }) {
    const pathname = usePathname();
    const accent = pageAccents[pathname] || pageAccents["/"];

    return (
        <PageAccentContext.Provider value={accent}>
            {children}
        </PageAccentContext.Provider>
    );
}

export function usePageAccent() {
    return useContext(PageAccentContext);
}

export function PageAccentIndicator() {
    const accent = usePageAccent();

    return (
        <div
            className="fixed top-0 left-0 right-0 h-1 z-[100] transition-all duration-500"
            style={{
                background: `linear-gradient(to right, transparent, ${accent.primary}, transparent)`,
                opacity: 0.8
            }}
        />
    );
}
