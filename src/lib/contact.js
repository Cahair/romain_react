// Règles du formulaire de contact, partagées entre la page (validation immédiate)
// et la route API (validation serveur). Les messages arrivent toujours à la même adresse.
export const CONTACT_RECIPIENT = "contact@romain-kantzer.com";

export const PROJECT_OPTIONS = ["site-vitrine", "site-e-commerce", "application-web", "application-mobile", "refonte", "autre"];
export const BUDGET_OPTIONS = ["less1k", "1k2k", "2k5k", "more5k", "unknown"];

export const LIMITS = { name: 100, email: 200, messageMin: 10, messageMax: 5000 };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Renvoie les champs en erreur : { champ: code }, codes « required », « invalid », « tooShort », « tooLong ».
export function validateContact({ name, email, message }) {
    const errors = {};
    const cleanName = typeof name === "string" ? name.trim() : "";
    const cleanEmail = typeof email === "string" ? email.trim() : "";
    const cleanMessage = typeof message === "string" ? message.trim() : "";

    if (!cleanName) errors.name = "required";
    else if (cleanName.length > LIMITS.name) errors.name = "tooLong";

    if (!cleanEmail) errors.email = "required";
    else if (cleanEmail.length > LIMITS.email || !EMAIL_PATTERN.test(cleanEmail)) errors.email = "invalid";

    if (!cleanMessage) errors.message = "required";
    else if (cleanMessage.length < LIMITS.messageMin) errors.message = "tooShort";
    else if (cleanMessage.length > LIMITS.messageMax) errors.message = "tooLong";

    return errors;
}
