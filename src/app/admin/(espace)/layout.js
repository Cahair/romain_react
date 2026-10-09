import Link from "next/link";
import { requireSession } from "@/lib/admin/session";
import { logoutAction } from "../actions";
import { container } from "@/components/ui/Section";
import Label from "@/components/ui/Label";
import SubmitButton from "@/components/admin/SubmitButton";

export default async function AdminSpaceLayout({ children }) {
    const session = await requireSession();

    return (
        <>
            <header className="border-b border-border">
                <div className={`${container} flex flex-wrap items-center justify-between gap-4 py-5`}>
                    <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
                        <Link href="/admin" className="font-semibold tracking-[-0.02em]">
                            Romain Kantzer <Label as="span" className="ml-2">Admin</Label>
                        </Link>
                        <nav className="flex gap-6 text-sm text-muted-foreground">
                            <Link href="/admin" className="transition-colors hover:text-foreground">
                                Actualités
                            </Link>
                            <Link href="/admin/actualites/nouvelle" className="transition-colors hover:text-foreground">
                                Nouvelle actualité
                            </Link>
                            <Link href="/admin/reglages" className="transition-colors hover:text-foreground">
                                Réglages
                            </Link>
                            <Link href="/" className="transition-colors hover:text-foreground">
                                Voir le site
                            </Link>
                        </nav>
                    </div>
                    <form action={logoutAction} className="flex items-center gap-4">
                        <span className="hidden text-sm text-muted-foreground md:inline">{session.email}</span>
                        <SubmitButton variant="ghost" size="sm">
                            Déconnexion
                        </SubmitButton>
                    </form>
                </div>
            </header>
            <main className={`${container} py-10 md:py-14`}>{children}</main>
        </>
    );
}
