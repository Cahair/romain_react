"use client";
import { createContext, useContext } from "react";
import { usePathname } from "next/navigation";

// Page accent colors configuration
const pageAccents = {
    "/": {
        primary: "#06b6d4", // Cyan - Home, foundation
        gradient: "from-cyan-500 to-blue-500",
        glow: "shadow-[0_0_30px_rgba(6,182,212,0.3)]",
        name: "home"
    },
    "/services": {
        primary: "#8b5cf6", // Violet - Services, technology
        gradient: "from-violet-500 to-purple-600",
        glow: "shadow-[0_0_30px_rgba(139,92,246,0.3)]",
        name: "services"
    },
    "/about": {
        primary: "#a855f7", // Purple - About, creativity
        gradient: "from-purple-500 to-pink-500",
        glow: "shadow-[0_0_30px_rgba(168,85,247,0.3)]",
        name: "about"
    },
    "/contact": {
        primary: "#22d3ee", // Bright cyan - Contact, action
        gradient: "from-cyan-400 to-teal-500",
        glow: "shadow-[0_0_30px_rgba(34,211,238,0.3)]",
        name: "contact"
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
