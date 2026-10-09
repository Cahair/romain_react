"use client";

import { useActionState } from "react";
import { savePostAction } from "@/app/admin/actions";
import { CATEGORIES } from "@/lib/admin/categories";
import Field, { inputClasses, Notice } from "./Field";
import SubmitButton from "./SubmitButton";

// Création et modification d'une actualité. `post` absent = nouvelle actualité.
export default function PostForm({ post }) {
    const [state, action] = useActionState(savePostAction, null);
    const errors = state?.errors ?? {};
    // Après une erreur, on réaffiche ce qui avait été saisi.
    const values = state?.values ?? post ?? {};
    const invalid = (name) => (errors[name] ? { "aria-invalid": true, "aria-describedby": `${name}-error` } : {});

    return (
        <form action={action} className="flex flex-col gap-6">
            {post && <input type="hidden" name="postId" value={post.id} />}
            {errors.form && <Notice tone="error">{errors.form}</Notice>}

            <Field label="Titre" htmlFor="title" error={errors.title}>
                <input
                    id="title"
                    name="title"
                    required
                    maxLength={150}
                    defaultValue={values.title ?? ""}
                    placeholder="Tournoi interne du 18 octobre"
                    className={inputClasses}
                    {...invalid("title")}
                />
            </Field>

            <Field
                label="Texte"
                htmlFor="body"
                hint="Les informations brutes : l'IA s'en sert pour rédiger la publication."
                error={errors.body}
            >
                <textarea
                    id="body"
                    name="body"
                    required
                    rows={7}
                    maxLength={5000}
                    defaultValue={values.body ?? ""}
                    placeholder="Tournoi interne samedi 18 octobre. Inscriptions ouvertes jusqu'au 15 octobre."
                    className={`${inputClasses} resize-y`}
                    data-lenis-prevent
                    {...invalid("body")}
                />
            </Field>

            <div className="grid gap-6 sm:grid-cols-2">
                <Field label="Date" htmlFor="date" hint="Date de l'événement (facultative)." error={errors.date}>
                    <input
                        id="date"
                        name="date"
                        type="date"
                        defaultValue={values.date ?? ""}
                        className={inputClasses}
                        {...invalid("date")}
                    />
                </Field>
                <Field label="Catégorie" htmlFor="category" error={errors.category}>
                    <select
                        id="category"
                        name="category"
                        required
                        defaultValue={values.category ?? ""}
                        className={inputClasses}
                        {...invalid("category")}
                    >
                        <option value="" disabled>
                            Choisir…
                        </option>
                        {CATEGORIES.map((category) => (
                            <option key={category.value} value={category.value}>
                                {category.label}
                            </option>
                        ))}
                    </select>
                </Field>
            </div>

            <Field
                label={post?.image ? "Remplacer la photo" : "Photo"}
                htmlFor="image"
                hint="JPEG, PNG ou WebP, 15 Mo maximum. Recadrée automatiquement si elle est trop haute ou trop large pour Instagram."
                error={errors.image}
            >
                {post?.image && (
                    // Proportions réelles : c'est exactement l'image qui partira sur Instagram.
                    // eslint-disable-next-line @next/next/no-img-element -- photo servie par /medias, hors next/image
                    <img
                        src={`/medias/${post.image}`}
                        alt=""
                        className="mb-2 h-auto w-48 rounded-xl border border-border"
                    />
                )}
                <input
                    id="image"
                    name="image"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="text-sm text-muted-foreground file:mr-4 file:rounded-full file:border file:border-border file:bg-transparent file:px-4 file:py-2 file:text-sm file:font-medium file:text-foreground hover:file:border-foreground"
                    {...invalid("image")}
                />
                {post?.image && (
                    <label className="flex items-center gap-2 text-sm text-muted-foreground">
                        <input type="checkbox" name="removeImage" className="size-4 accent-primary" />
                        Retirer la photo
                    </label>
                )}
            </Field>

            <div className="flex flex-wrap gap-3 pt-2">
                <SubmitButton pendingLabel="Enregistrement…">{post ? "Enregistrer" : "Créer l'actualité"}</SubmitButton>
            </div>
        </form>
    );
}
