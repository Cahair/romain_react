// Catégories d'une actualité (bac à sable pensé pour un club de tennis).
export const CATEGORIES = [
    { value: "tournoi", label: "Tournoi" },
    { value: "resultats", label: "Résultats" },
    { value: "vie-du-club", label: "Vie du club" },
    { value: "ecole-de-tennis", label: "École de tennis" },
    { value: "evenement", label: "Événement" },
    { value: "autre", label: "Autre" },
];

export const categoryLabel = (value) => CATEGORIES.find((category) => category.value === value)?.label ?? "Autre";

// Statuts choisis dans le formulaire de légende.
export const DRAFT_STATUS = {
    brouillon: "Brouillon",
    validee: "Validée",
};

// Statuts affichés : « publiée » n'est posé que par la publication elle-même.
export const INSTAGRAM_STATUS = {
    ...DRAFT_STATUS,
    publiee: "Publiée",
};
