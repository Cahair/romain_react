// Mesure d'audience Umami : sans cookie, donc sans bandeau de consentement.
// Le script n'est chargé que si NEXT_PUBLIC_UMAMI_WEBSITE_ID est défini (lu au build).
export const UMAMI_WEBSITE_ID = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID || "";
export const UMAMI_SCRIPT_URL = process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL || "https://cloud.umami.is/script.js";
// Seul le site en ligne est mesuré : rien n'est compté depuis localhost.
export const UMAMI_DOMAINS = "romain-kantzer.com,www.romain-kantzer.com";

// Appelé par le script avant chaque envoi : l'espace admin n'est jamais mesuré.
export const umamiBeforeSendScript = `window.umamiBeforeSend=function(t,p){return location.pathname.indexOf('/admin')===0?false:p};`;

// Événement personnalisé (sans effet si le script n'est pas chargé ou bloqué).
// Ne jamais y mettre de donnée personnelle (nom, e-mail, message).
export function track(name, data) {
    try {
        window.umami?.track(name, data);
    } catch {
        // mesure indisponible : sans conséquence pour le visiteur
    }
}
