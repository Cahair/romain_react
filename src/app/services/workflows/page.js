"use client";
import React from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import WorkflowsSection from "../../../components/WorkflowsSection";

export default function WorkflowsPage() {
    return (
        <main className="bg-background min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-1">
                <WorkflowsSection />
            </div>
            <Footer />
        </main>
    );
}
