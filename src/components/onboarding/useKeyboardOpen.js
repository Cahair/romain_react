import { useSyncExternalStore } from "react";

// Clavier virtuel ouvert (mobile) ? Sur iOS comme sur Android, la page garde sa hauteur
// quand le clavier s'ouvre : seul le visualViewport rétrécit.
function subscribe(callback) {
    const viewport = window.visualViewport;
    if (!viewport) return () => {};
    viewport.addEventListener("resize", callback);
    viewport.addEventListener("scroll", callback);
    return () => {
        viewport.removeEventListener("resize", callback);
        viewport.removeEventListener("scroll", callback);
    };
}

function getSnapshot() {
    const viewport = window.visualViewport;
    if (!viewport) return false;
    // En dessous de ce seuil, ce sont les barres du navigateur qui bougent, pas un clavier.
    return window.innerHeight - viewport.height - viewport.offsetTop > 120;
}

export default function useKeyboardOpen() {
    return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
