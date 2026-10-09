import { BUDGET_OPTIONS, LIMITS, NEED_OPTIONS, PROJECT_OPTIONS, STAGE_OPTIONS, TIMING_OPTIONS, cleanNeeds } from "./contact";

// Parcours « Démarrer un projet » : une question par écran, la dernière envoie la demande.
// Les libellés vivent dans translations/*.json (clé onboarding.steps.<id>).
// Ordre pensé pour la conversion : d'abord des réponses en un clic, le budget et les coordonnées à la fin.
export const ONBOARDING_STEPS = [
    { id: "project", type: "choice", options: PROJECT_OPTIONS },
    { id: "needs", type: "needs" },
    { id: "stage", type: "choice", options: STAGE_OPTIONS },
    { id: "timing", type: "choice", options: TIMING_OPTIONS },
    { id: "budget", type: "choice", options: BUDGET_OPTIONS },
    { id: "identity", type: "identity" },
];

export const TOTAL_STEPS = ONBOARDING_STEPS.length;
export const IDENTITY_STEP = TOTAL_STEPS - 1;

export const EMPTY_ANSWERS = {
    project: "",
    needs: [],
    stage: "",
    timing: "",
    budget: "",
    message: "",
    name: "",
    email: "",
    phone: "",
    website: "",
};

// Besoins proposés pour un type de projet (les besoins génériques tant qu'il n'est pas choisi).
export const needsFor = (project) => NEED_OPTIONS[project] || NEED_OPTIONS.autre;

// Une étape est complète quand on peut passer à la suivante (les coordonnées sont vérifiées à l'envoi).
export function isStepComplete(step, answers) {
    if (step.type === "choice") return Boolean(answers[step.id]);
    if (step.type === "needs") {
        const length = answers.message.trim().length;
        if (length > LIMITS.messageMax) return false;
        return answers.needs.length > 0 || length >= LIMITS.messageMin;
    }
    return false;
}

// Premier écran encore à remplir (les coordonnées si tout le reste est fait).
export function firstIncomplete(answers) {
    const index = ONBOARDING_STEPS.findIndex((step) => step.type !== "identity" && !isStepComplete(step, answers));
    return index === -1 ? IDENTITY_STEP : index;
}

// Progression affichée, de 0 à 1. Elle est déjà entamée avant la première réponse,
// avance vite au début puis ralentit : la fin paraît toujours proche.
export function progressAt(position) {
    const ratio = Math.min(Math.max(position / TOTAL_STEPS, 0), 1);
    return 0.12 + 0.88 * (1 - (1 - ratio) ** 1.3);
}

// Brouillon gardé dans le navigateur du visiteur, pour reprendre plus tard : ses réponses,
// jamais son nom, son e-mail ni son téléphone. Rien n'est envoyé avant qu'il valide.
const DRAFT_KEY = "rk-demarrer";
const DRAFT_TTL = 30 * 24 * 60 * 60 * 1000;

const pickOption = (options, value) => (options.includes(value) ? value : "");

function sanitizeDraft(answers = {}) {
    return {
        project: pickOption(PROJECT_OPTIONS, answers.project),
        needs: cleanNeeds(answers.needs),
        stage: pickOption(STAGE_OPTIONS, answers.stage),
        timing: pickOption(TIMING_OPTIONS, answers.timing),
        budget: pickOption(BUDGET_OPTIONS, answers.budget),
        message: typeof answers.message === "string" ? answers.message.slice(0, LIMITS.messageMax) : "",
    };
}

export const hasDraftContent = (answers) =>
    Boolean(answers.project || answers.needs.length || answers.stage || answers.timing || answers.budget || answers.message.trim());

export function readDraft() {
    try {
        const draft = JSON.parse(localStorage.getItem(DRAFT_KEY) || "null");
        if (!draft || typeof draft.savedAt !== "number" || Date.now() - draft.savedAt > DRAFT_TTL) return null;
        const furthest = Number.isInteger(draft.furthest) ? Math.min(Math.max(draft.furthest, 0), IDENTITY_STEP) : 0;
        return { answers: sanitizeDraft(draft.answers), furthest };
    } catch {
        return null;
    }
}

export function saveDraft(answers, furthest) {
    try {
        localStorage.setItem(DRAFT_KEY, JSON.stringify({ answers: sanitizeDraft(answers), furthest, savedAt: Date.now() }));
    } catch {
        // stockage indisponible (navigation privée) : le parcours fonctionne sans brouillon
    }
}

export function clearDraft() {
    try {
        localStorage.removeItem(DRAFT_KEY);
    } catch {
        // rien à effacer
    }
}

// Fautes de frappe courantes dans le domaine de l'e-mail (gmial.com, hotmail.fe…) :
// on propose la correction, sans jamais l'imposer.
const EMAIL_DOMAINS = [
    "gmail.com",
    "googlemail.com",
    "hotmail.com",
    "hotmail.fr",
    "hotmail.de",
    "outlook.com",
    "outlook.fr",
    "outlook.de",
    "live.com",
    "live.fr",
    "msn.com",
    "yahoo.com",
    "yahoo.fr",
    "yahoo.de",
    "icloud.com",
    "me.com",
    "aol.com",
    "mail.com",
    "orange.fr",
    "wanadoo.fr",
    "free.fr",
    "sfr.fr",
    "neuf.fr",
    "bbox.fr",
    "laposte.net",
    "numericable.fr",
    "gmx.fr",
    "gmx.de",
    "gmx.net",
    "web.de",
    "t-online.de",
    "protonmail.com",
    "proton.me",
];

function editDistance(a, b) {
    const row = Array.from({ length: b.length + 1 }, (_, index) => index);
    for (let i = 1; i <= a.length; i++) {
        let diagonal = row[0];
        row[0] = i;
        for (let j = 1; j <= b.length; j++) {
            const above = row[j];
            row[j] = Math.min(row[j] + 1, row[j - 1] + 1, diagonal + (a[i - 1] === b[j - 1] ? 0 : 1));
            diagonal = above;
        }
    }
    return row[b.length];
}

export function suggestEmail(email) {
    const value = email.trim();
    const at = value.lastIndexOf("@");
    if (at < 1) return "";
    const domain = value.slice(at + 1).toLowerCase();
    if (domain.length < 4 || EMAIL_DOMAINS.includes(domain)) return "";

    let best = "";
    let bestDistance = 3;
    for (const candidate of EMAIL_DOMAINS) {
        const distance = editDistance(domain, candidate);
        if (distance < bestDistance) {
            best = candidate;
            bestDistance = distance;
        }
    }
    if (!best || (bestDistance === 2 && domain.length < 6)) return "";
    return `${value.slice(0, at)}@${best}`;
}
