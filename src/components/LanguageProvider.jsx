"use client";
import { createContext, useContext, useEffect, useState } from "react";

// Import translations
import fr from "@/translations/fr.json";
import en from "@/translations/en.json";
import de from "@/translations/de.json";

const translations = { fr, en, de };

const LanguageContext = createContext({
    locale: "fr",
    t: (key) => key,
    setLocale: () => { },
});

export function LanguageProvider({ children }) {
    const [locale, setLocaleState] = useState("fr");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        // Check localStorage first
        const savedLocale = localStorage.getItem("locale");
        if (savedLocale && translations[savedLocale]) {
            setLocaleState(savedLocale);
            return;
        }

        // Detect browser language on first visit
        const browserLang = navigator.language?.split("-")[0];
        if (browserLang && translations[browserLang]) {
            setLocaleState(browserLang);
            localStorage.setItem("locale", browserLang);
        } else {
            localStorage.setItem("locale", "fr");
        }
    }, []);

    const setLocale = (newLocale) => {
        if (translations[newLocale]) {
            setLocaleState(newLocale);
            localStorage.setItem("locale", newLocale);
        }
    };

    // Translation function with nested key support (e.g., "hero.title")
    // Returns string, array, or key if not found
    const t = (key) => {
        const keys = key.split(".");
        let value = translations[locale];

        for (const k of keys) {
            if (value && typeof value === "object" && k in value) {
                value = value[k];
            } else {
                // Fallback to French if key not found
                value = translations.fr;
                for (const fallbackKey of keys) {
                    if (value && typeof value === "object" && fallbackKey in value) {
                        value = value[fallbackKey];
                    } else {
                        return key; // Return key if not found
                    }
                }
                break;
            }
        }

        // Return value if it's a string or array, otherwise return key
        if (typeof value === "string" || Array.isArray(value)) {
            return value;
        }
        return key;
    };

    // Prevent hydration mismatch
    if (!mounted) {
        return <div style={{ visibility: "hidden" }}>{children}</div>;
    }

    return (
        <LanguageContext.Provider value={{ locale, t, setLocale }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useTranslation() {
    return useContext(LanguageContext);
}

export const availableLocales = [
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
];
