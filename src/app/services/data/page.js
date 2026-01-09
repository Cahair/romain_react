"use client";
import React from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

export default function DataPage() {
    return (
        <main className="bg-background min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-1 flex flex-col items-center justify-center pt-32 pb-20 px-6 text-center">
                <h1 className="text-4xl md:text-6xl font-black mb-6 uppercase">Analyse <span className="text-emerald-500">Data</span></h1>
                <p className="text-gray-400 max-w-2xl mb-8">
                    Transformez vos données brutes en tableaux de bord actionnables pour piloter votre croissance.
                </p>
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-500 font-mono text-sm">
                    Page en construction - Détails à venir
                </div>
            </div>
            <Footer />
        </main>
    );
}
