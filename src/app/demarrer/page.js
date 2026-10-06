"use client";

import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Onboarding from "@/components/onboarding/Onboarding";

export default function StartProjectPage() {
    return (
        <>
            <Navbar />
            {/* Suspense : le parcours lit le paramètre ?projet= de l'URL. */}
            <Suspense fallback={<div className="min-h-[100svh]" />}>
                <Onboarding />
            </Suspense>
        </>
    );
}
