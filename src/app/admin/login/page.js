import { redirect } from "next/navigation";
import { getSession } from "@/lib/admin/session";
import Label from "@/components/ui/Label";
import Card from "@/components/ui/Card";
import LoginForm from "@/components/admin/LoginForm";

export const metadata = { title: "Connexion" };

export default async function AdminLoginPage() {
    if (await getSession()) redirect("/admin");

    return (
        <main className="flex min-h-svh items-center justify-center px-5 py-16">
            <div className="w-full max-w-md">
                <Label>Espace admin</Label>
                <h1 className="mt-4 text-4xl font-semibold tracking-[-0.03em]">Connexion</h1>
                <Card className="mt-8">
                    <LoginForm />
                </Card>
                <p className="mt-6 text-sm text-muted-foreground">
                    Les comptes se créent sur le serveur : <code className="text-foreground">npm run admin -- create</code>.
                </p>
            </div>
        </main>
    );
}
