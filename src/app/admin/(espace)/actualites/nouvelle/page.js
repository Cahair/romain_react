import { requireSession } from "@/lib/admin/session";
import Card from "@/components/ui/Card";
import Label from "@/components/ui/Label";
import PostForm from "@/components/admin/PostForm";

export const metadata = { title: "Nouvelle actualité" };

export default async function NewPostPage() {
    await requireSession();

    return (
        <div className="max-w-3xl">
            <Label>Actualités</Label>
            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.03em]">Nouvelle actualité</h1>
            <Card className="mt-10">
                <PostForm />
            </Card>
        </div>
    );
}
