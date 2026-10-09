// Appelé une fois au démarrage du serveur (next start / next dev) : tâches de fond.
export async function register() {
    if (process.env.NEXT_RUNTIME !== "nodejs" || process.env.NEXT_PHASE === "phase-production-build") return;
    // Renouvellement automatique du jeton Instagram de l'espace admin.
    const { startInstagramTokenTimer } = await import("./lib/admin/instagram");
    startInstagramTokenTimer();
}
