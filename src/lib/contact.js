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

export const LIMITS = { name: 100, email: 200, phone: 40, messageMin: 10, messageMax: 5000 };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Renvoie les champs en erreur : { champ: code }, codes « required », « invalid », « tooShort », « tooLong ».
// `requireIdentity` est désactivé en mode mailto : le mail part de l'adresse du visiteur,
// son nom et son e-mail ne sont donc plus obligatoires.
export function validateContact({ name, email, message }, { requireIdentity = true } = {}) {
    const errors = {};
    const cleanName = typeof name === "string" ? name.trim() : "";
    const cleanEmail = typeof email === "string" ? email.trim() : "";
    const cleanMessage = typeof message === "string" ? message.trim() : "";

    if (cleanName.length > LIMITS.name) errors.name = "tooLong";
    else if (requireIdentity && !cleanName) errors.name = "required";

    if (requireIdentity && !cleanEmail) errors.email = "required";
    else if (cleanEmail && (cleanEmail.length > LIMITS.email || !EMAIL_PATTERN.test(cleanEmail))) errors.email = "invalid";

    if (!cleanMessage) errors.message = "required";
    else if (cleanMessage.length < LIMITS.messageMin) errors.message = "tooShort";
    else if (cleanMessage.length > LIMITS.messageMax) errors.message = "tooLong";

    return errors;
}
