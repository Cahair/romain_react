"use client";
import React from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

export default function LeadGenPage() {
    return (
        <main className="bg-background min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-1 flex flex-col items-center justify-center pt-32 pb-20 px-6 text-center">
                <h1 className="text-4xl md:text-6xl font-black mb-6 uppercase">Lead Gen <span className="text-pink-500">IA</span></h1>
                <p className="text-gray-400 max-w-2xl mb-8">
                    Prospection ultra-ciblée, enrichissement de données et outreach personnalisé à grande échelle.
                </p>
                <div className="p-4 bg-pink-500/10 border border-pink-500/20 rounded-xl text-pink-500 font-mono text-sm">
                    Page en construction - Détails à venir
                </div>
            </div>
            <Footer />
        </main>
    );
}
