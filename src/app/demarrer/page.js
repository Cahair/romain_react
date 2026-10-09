"use client";

import { Suspense } from "react";
import Onboarding from "@/components/onboarding/Onboarding";

// Tunnel fermé : pas de navigation principale ni de pied de page, seulement le logo
// pour sortir. Le parcours a son propre en-tête (barre d'avancement).
export default function StartProjectPage() {
    return (
        // Suspense : le parcours lit le paramètre ?projet= de l'URL.
        <Suspense fallback={<div className="min-h-[100svh]" />}>
            <Onboarding />
        </Suspense>
    );
}
