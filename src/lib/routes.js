import { SERVICE_SLUGS } from "./services";

// Nom lisible d'une route, affiché sur le rideau de transition entre les pages.
export function routeLabel(pathname, t) {
    if (pathname === "/") return t("nav.home");
    if (pathname === "/services") return t("nav.services");
    if (pathname.startsWith("/services/")) {
        const slug = pathname.slice("/services/".length);
        if (SERVICE_SLUGS.includes(slug)) return t(`services.items.${slug}.name`);
    }
    if (pathname === "/about") return t("nav.about");
    if (pathname === "/contact") return t("nav.contact");
    if (pathname === "/legal") return t("footer.legal");
    return "Romain Kantzer";
}
