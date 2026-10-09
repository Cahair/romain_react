// Règles du formulaire de contact, partagées entre la page (validation immédiate)
// et la route API (validation serveur). Les messages arrivent toujours à la même adresse.
export const CONTACT_RECIPIENT = "contact@romain-kantzer.com";

// Mode du formulaire :
// - "api" (défaut) : envoi direct depuis le site par /api/contact (SMTP ou Resend, voir .env.local.example) ;
// - "mailto" : le formulaire prépare le message et ouvre la messagerie du visiteur.
// Pour revenir au mailto : NEXT_PUBLIC_CONTACT_MODE=mailto dans .env.local et chez l'hébergeur, puis rebuild.
export const CONTACT_MODE = process.env.NEXT_PUBLIC_CONTACT_MODE === "mailto" ? "mailto" : "api";

export const PROJECT_OPTIONS = ["site-vitrine", "site-e-commerce", "application-web", "application-mobile", "refonte", "autre"];
export const BUDGET_OPTIONS = ["less1k", "1k2k", "2k5k", "more5k", "unknown"];
export const STAGE_OPTIONS = ["idee", "defini", "existant", "presse"];
export const TIMING_OPTIONS = ["asap", "trimestre", "annee", "inconnu"];

// Besoins proposés selon le type de projet (choix multiple, libellés sous onboarding.needs.<clé>).
export const NEED_OPTIONS = {
    "site-vitrine": ["presenter", "realisations", "demandes", "google", "rdv", "autonomie"],
    "site-e-commerce": ["catalogue", "paiement", "livraison", "commandes", "google", "autonomie"],
    "application-web": ["reservations", "espace-client", "adherents", "suivi", "papier", "paiement"],
    "application-mobile": ["stores", "notifications", "comptes", "reservations", "paiement", "back-office"],
    refonte: ["design", "mobile", "google", "autonomie", "demandes", "vitesse"],
    autre: ["presenter", "demandes", "paiement", "reservations", "espace-client", "google"],
};
export const ALL_NEEDS = [...new Set(Object.values(NEED_OPTIONS).flat())];

export const LIMITS = { name: 100, email: 200, phone: 40, messageMin: 10, messageMax: 5000 };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Besoins reconnus, sans doublon (les valeurs inconnues sont ignorées).
export function cleanNeeds(needs) {
    return Array.isArray(needs) ? [...new Set(needs.filter((need) => ALL_NEEDS.includes(need)))] : [];
}

// Renvoie les champs en erreur : { champ: code }, codes « required », « invalid », « tooShort », « tooLong ».
// `requireIdentity` est désactivé en mode mailto : le mail part de l'adresse du visiteur,
// son nom et son e-mail ne sont donc plus obligatoires.
// Le message devient facultatif dès qu'au moins un besoin est coché.
export function validateContact({ name, email, message, needs }, { requireIdentity = true } = {}) {
    const errors = {};
    const cleanName = typeof name === "string" ? name.trim() : "";
    const cleanEmail = typeof email === "string" ? email.trim() : "";
    const cleanMessage = typeof message === "string" ? message.trim() : "";
    const hasNeeds = cleanNeeds(needs).length > 0;

    if (cleanName.length > LIMITS.name) errors.name = "tooLong";
    else if (requireIdentity && !cleanName) errors.name = "required";

    if (requireIdentity && !cleanEmail) errors.email = "required";
    else if (cleanEmail && (cleanEmail.length > LIMITS.email || !EMAIL_PATTERN.test(cleanEmail))) errors.email = "invalid";

    if (cleanMessage.length > LIMITS.messageMax) errors.message = "tooLong";
    else if (!hasNeeds && !cleanMessage) errors.message = "required";
    else if (!hasNeeds && cleanMessage.length < LIMITS.messageMin) errors.message = "tooShort";

    return errors;
}
