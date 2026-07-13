"use client";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useTranslation } from "../../components/LanguageProvider";

const GitHubIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
);

const LinkedInIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
);

export default function AboutPage() {
    const { t } = useTranslation();
    const getList = (key) => {
        const items = t(key);
        return Array.isArray(items) ? items : [];
    };
    const how = getList("about.how.items");
    const path = getList("about.path.items");

    return (
        <main className="bg-background min-h-screen">
            <Navbar />

            <div className="mx-auto max-w-2xl px-6 pt-36 pb-24">
                {/* En-tête */}
                <header>
                    <img
                        src="/romain-profile.jpg"
                        alt="Romain Kantzer"
                        className="w-24 h-24 rounded-full object-cover border border-border"
                    />
                    <h1 className="mt-6 font-display text-4xl md:text-5xl text-foreground">
                        Romain Kantzer
                    </h1>
                    <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                        {t("about.intro")}
                    </p>
                    <div className="mt-5 flex items-center gap-4">
                        <a
                            href="https://github.com/romainkantzer"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <GitHubIcon />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/romain-kantzer"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <LinkedInIcon />
                        </a>
                    </div>
                </header>

                {/* Qui je suis */}
                <section className="mt-16">
                    <h2 className="font-display text-2xl text-foreground">{t("about.story.title")}</h2>
                    <div className="mt-5 space-y-5 text-foreground/85 leading-relaxed">
                        <p>{t("about.story.p1")}</p>
                        <p>{t("about.story.p2")}</p>
                        <p>{t("about.story.p3")}</p>
                    </div>
                    <a
                        href="https://bischwiller-echecs.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-block text-primary-neon hover:underline underline-offset-4"
                    >
                        {t("about.story.clubLink")} — bischwiller-echecs.com
                    </a>
                </section>

                {/* Comment je travaille */}
                <section className="mt-16">
                    <h2 className="font-display text-2xl text-foreground">{t("about.how.title")}</h2>
                    <ul className="mt-2 divide-y divide-border">
                        {how.map((item) => (
                            <li key={item.title} className="py-5">
                                <h3 className="font-medium text-foreground">{item.title}</h3>
                                <p className="mt-1 text-muted-foreground leading-relaxed">{item.text}</p>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Parcours en bref */}
                <section className="mt-16">
                    <h2 className="font-display text-2xl text-foreground">{t("about.path.title")}</h2>
                    <ul className="mt-6 space-y-3">
                        {path.map((item) => (
                            <li key={`${item.year}-${item.text}`} className="flex gap-5">
                                <span className="w-28 shrink-0 text-muted-foreground tabular-nums">
                                    {item.year}
                                </span>
                                <span className="text-foreground/85">{item.text}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Contact */}
                <section className="mt-16 border-t border-border pt-10">
                    <p className="text-lg text-foreground">{t("about.contact.text")}</p>
                    <Link
                        href="/contact"
                        className="mt-5 inline-block rounded-md bg-primary px-5 py-2.5 text-primary-foreground hover:bg-primary-dark transition-colors"
                    >
                        {t("about.contact.button")}
                    </Link>
                </section>
            </div>

            <Footer />
        </main>
    );
}
