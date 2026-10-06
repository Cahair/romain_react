import { BUDGET_OPTIONS, PROJECT_OPTIONS } from "./contact";

// Parcours « Démarrer un projet » : une question par écran, puis un récapitulatif.
// Les libellés vivent dans translations/*.json (clé onboarding.steps.<id>).
export const ONBOARDING_STEPS = [
    { id: "project", type: "choice", options: PROJECT_OPTIONS, required: true, describe: true },
    { id: "stage", type: "choice", options: ["idee", "defini", "existant", "presse"], required: true },
    { id: "timing", type: "choice", options: ["asap", "trimestre", "annee", "inconnu"], required: true },
    { id: "budget", type: "choice", options: BUDGET_OPTIONS, optional: true },
    { id: "message", type: "text", required: true },
    { id: "identity", type: "identity" },
];

export const TOTAL_STEPS = ONBOARDING_STEPS.length;

export const EMPTY_ANSWERS = {
    project: "",
    stage: "",
    timing: "",
    budget: "",
    message: "",
    name: "",
    email: "",
    phone: "",
    website: "",
};
