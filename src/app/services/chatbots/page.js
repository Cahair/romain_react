"use client";
import React from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

export default function ChatbotsPage() {
    return (
        <main className="bg-background min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-1 flex flex-col items-center justify-center pt-32 pb-20 px-6 text-center">
                <h1 className="text-4xl md:text-6xl font-black mb-6 uppercase">Agents <span className="text-primary-neon">IA</span></h1>
                <p className="text-gray-400 max-w-2xl mb-8">
                    Des agents conversationnels entraînés sur vos données pour un support client 24/7 et une qualification de leads automatisée.
                </p>
                <div className="p-4 bg-primary/10 border border-primary/20 rounded-xl text-primary-neon font-mono text-sm">
                    Page en construction - Détails à venir
                </div>
            </div>
            <Footer />
        </main>
    );
}
