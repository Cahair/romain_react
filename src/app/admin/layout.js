// Espace admin : privé, jamais indexé, hors direction artistique et hors i18n (outil interne).
export const metadata = {
    title: { default: "Espace admin", template: "%s · Admin" },
    robots: { index: false, follow: false },
};

export default function AdminLayout({ children }) {
    return <div className="min-h-svh bg-background text-foreground">{children}</div>;
}
