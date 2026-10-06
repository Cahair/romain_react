import Link from "next/link";
import { requireSession } from "@/lib/admin/session";
import { listPosts } from "@/lib/admin/posts";
import { categoryLabel, DRAFT_STATUS } from "@/lib/admin/categories";
import Button from "@/components/ui/Button";
import Label from "@/components/ui/Label";

export const metadata = { title: "Actualités" };

const formatDate = (value) =>
    value ? new Intl.DateTimeFormat("fr-FR", { dateStyle: "long", timeZone: "UTC" }).format(new Date(value)) : "Sans date";

export default async function AdminHomePage() {
    await requireSession();
    const posts = await listPosts();

    return (
        <>
            <div className="flex flex-wrap items-end justify-between gap-6">
                <div>
                    <Label>Bac à sable · réseaux sociaux</Label>
                    <h1 className="mt-4 text-4xl font-semibold tracking-[-0.03em] md:text-5xl">Actualités</h1>
                </div>
                <Button href="/admin/actualites/nouvelle">Nouvelle actualité</Button>
            </div>

            {posts.length === 0 ? (
                <p className="mt-12 max-w-xl text-muted-foreground">
                    Aucune actualité pour l&apos;instant. Commencer par en saisir une : c&apos;est le point de départ de
                    la chaîne actualité → IA → validation → Instagram.
                </p>
            ) : (
                <ul className="mt-12 border-t border-border">
                    {posts.map((post, index) => {
                        const draft = post.social?.instagram;
                        return (
                            <li key={post.id} className="border-b border-border">
                                <Link
                                    href={`/admin/actualites/${post.id}`}
                                    className="flex flex-wrap items-baseline gap-x-6 gap-y-2 py-5 transition-colors hover:bg-muted/50 md:px-2"
                                >
                                    <span className="w-10 text-sm tabular-nums text-muted-foreground">
                                        ({String(index + 1).padStart(2, "0")})
                                    </span>
                                    <span className="min-w-0 flex-1 text-lg font-medium">{post.title}</span>
                                    <span className="text-sm text-muted-foreground">{categoryLabel(post.category)}</span>
                                    <span className="text-sm text-muted-foreground">{formatDate(post.date)}</span>
                                    <span
                                        className={`rounded-full border px-3 py-1 text-xs ${draft?.status === "validee" ? "border-primary/40 text-primary" : "border-border text-muted-foreground"}`}
                                    >
                                        Instagram : {draft ? DRAFT_STATUS[draft.status] : "à générer"}
                                    </span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            )}
        </>
    );
}
