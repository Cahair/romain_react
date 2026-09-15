// Ordre d'affichage des services. Le contenu visible est dans translations/*.json
// (clé services.items.<slug>) ; la metadata SEO (en français) est ci-dessous,
// lue par les layouts serveur et le JSON-LD.
export const SERVICE_SLUGS = ["site-vitrine", "site-e-commerce", "application-web", "application-mobile"];

export const SERVICE_META = {
    "site-vitrine": {
        name: "Création de site vitrine",
        title: "Création de site vitrine en Alsace",
        description:
            "Un site clair pour présenter votre activité, être trouvé sur Google et recevoir des demandes. Conception, design, développement et mise en ligne, depuis Rountzenheim (Bas-Rhin).",
    },
    "site-e-commerce": {
        name: "Création de site e-commerce",
        title: "Création de site e-commerce en Alsace",
        description:
            "Une boutique en ligne pour vendre vos produits : catalogue, paiement sécurisé, livraison ou retrait, gestion des commandes. Développeur web à Rountzenheim, en Alsace.",
    },
    "application-web": {
        name: "Développement d'application web",
        title: "Développement d'application web en Alsace",
        description:
            "Réservations, espace client, gestion d'adhérents : une application web pensée pour votre façon de travailler, accessible depuis un navigateur. Développée avec Next.js et React.",
    },
    "application-mobile": {
        name: "Création d'application mobile",
        title: "Création d'application mobile iOS et Android en Alsace",
        description:
            "Une application pour iPhone et Android, développée avec React Native : notifications, back-office relié et publication sur l'App Store et Google Play.",
    },
};

export const serviceNumber = (slug) => String(SERVICE_SLUGS.indexOf(slug) + 1).padStart(2, "0");
