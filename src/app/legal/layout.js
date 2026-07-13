export const metadata = {
    title: "Mentions légales",
    description: "Mentions légales du site romain-kantzer.com.",
    alternates: { canonical: "/legal" },
    robots: { index: false, follow: true },
};

export default function LegalLayout({ children }) {
    return children;
}
