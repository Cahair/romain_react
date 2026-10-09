import Link from "next/link";
import { notFound } from "next/navigation";
import { requireSession } from "@/lib/admin/session";
import { getPost } from "@/lib/admin/posts";
import { instagramImageIssue, isAutomationConfigured } from "@/lib/admin/automation";
import Card from "@/components/ui/Card";
import Label from "@/components/ui/Label";
import PostForm from "@/components/admin/PostForm";
import CaptionPanel from "@/components/admin/CaptionPanel";
import DeletePostButton from "@/components/admin/DeletePostButton";
import { Notice } from "@/components/admin/Field";

export const metadata = { title: "Actualité" };

export default async function EditPostPage({ params, searchParams }) {
    await requireSession();
    const { id } = await params;
    const { enregistre } = await searchParams;
    const post = await getPost(id);
    if (!post) notFound();
    // Contrôle de la photo seulement quand le bouton de publication est affiché.
    const imageIssue = post.social?.instagram?.status === "validee" ? await instagramImageIssue(post) : null;

    return (
        <>
            <Link href="/admin" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                ← Toutes les actualités
            </Link>
            <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
                <div className="min-w-0">
                    <Label>Actualité</Label>
                    <h1 className="mt-4 text-3xl font-semibold tracking-[-0.03em] md:text-4xl">{post.title}</h1>
                </div>
                <DeletePostButton postId={post.id} />
            </div>

            {enregistre && (
                <div className="mt-6 max-w-xl">
                    <Notice tone="success">Actualité enregistrée.</Notice>
                </div>
            )}

            <div className="mt-10 grid items-start gap-8 lg:grid-cols-2">
                <section aria-labelledby="contenu">
                    <h2 id="contenu" className="mb-4 text-lg font-medium">
                        (01) Contenu
                    </h2>
                    <Card>
                        <PostForm key={post.updatedAt} post={post} />
                    </Card>
                </section>
                <section aria-labelledby="instagram">
                    <h2 id="instagram" className="mb-4 text-lg font-medium">
                        (02) Publication Instagram
                    </h2>
                    <Card>
                        <CaptionPanel
                            postId={post.id}
                            draft={post.social?.instagram ?? null}
                            automationReady={isAutomationConfigured()}
                            imageIssue={imageIssue}
                        />
                    </Card>
                </section>
            </div>
        </>
    );
}
