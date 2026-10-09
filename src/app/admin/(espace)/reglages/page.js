import { requireSession } from "@/lib/admin/session";
import { getInstagramAccount, instagramStatus } from "@/lib/admin/instagram";
import Card from "@/components/ui/Card";
import Label from "@/components/ui/Label";
import InstagramSettings from "@/components/admin/InstagramSettings";

export const metadata = { title: "Réglages" };

export default async function SettingsPage() {
    await requireSession();
    const instagram = instagramStatus(await getInstagramAccount());

    return (
        <>
            <Label>Comptes et réglages</Label>
            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.03em] md:text-5xl">Réglages</h1>

            <section aria-labelledby="instagram" className="mt-12 max-w-2xl">
                <h2 id="instagram" className="mb-4 text-lg font-medium">
                    (01) Compte Instagram
                </h2>
                <Card>
                    <InstagramSettings status={instagram} />
                </Card>
            </section>
        </>
    );
}
