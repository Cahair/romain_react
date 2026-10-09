"use client";

import { useActionState } from "react";
import { generateCaptionAction, publishInstagramAction, saveCaptionAction } from "@/app/admin/actions";
import { INSTAGRAM_STATUS } from "@/lib/admin/categories";
import Button from "../ui/Button";
import Field, { inputClasses, Notice } from "./Field";
import SubmitButton from "./SubmitButton";

const formatDateTime = (value) =>
    new Intl.DateTimeFormat("fr-FR", { dateStyle: "long", timeStyle: "short", timeZone: "Europe/Paris" }).format(
        new Date(value),
    );

// Publication Instagram : légende générée par le workflow, relue, modifiée et validée ici,
// puis publiée avec la photo de l'actualité.
export default function CaptionPanel({ postId, draft, automationReady, imageIssue }) {
    if (draft?.status === "publiee") return <PublishedCaption draft={draft} />;
    return <CaptionEditor postId={postId} draft={draft} automationReady={automationReady} imageIssue={imageIssue} />;
}

function PublishedCaption({ draft }) {
    return (
        <div className="flex flex-col gap-6">
            <Notice tone="success">
                Publiée sur Instagram le {formatDateTime(draft.publishedAt)}
                {draft.publishedBy && ` par ${draft.publishedBy}`}.
            </Notice>
            <p className="whitespace-pre-wrap text-[0.95rem] leading-relaxed">{draft.caption}</p>
            {draft.permalink && (
                <div>
                    <Button href={draft.permalink} external variant="ghost" size="sm">
                        Voir sur Instagram
                    </Button>
                </div>
            )}
        </div>
    );
}

function CaptionEditor({ postId, draft, automationReady, imageIssue }) {
    const [generateState, generate] = useActionState(generateCaptionAction, null);
    const [saveState, save] = useActionState(saveCaptionAction, null);
    const [publishState, publish] = useActionState(publishInstagramAction, null);
    const feedback = [generateState, saveState].find((state) => state?.error) ?? saveState ?? generateState;

    return (
        <div className="flex flex-col gap-6">
            {!automationReady && (
                <Notice>
                    Aucun workflow branché (AUTOMATION_WEBHOOK_URL). La légende peut quand même être écrite à la
                    main pour tester la suite.
                </Notice>
            )}

            <form action={generate}>
                <input type="hidden" name="postId" value={postId} />
                <SubmitButton variant="ghost" size="sm" disabled={!automationReady} pendingLabel="Génération en cours…">
                    {draft ? "Générer une nouvelle proposition" : "Générer une proposition"}
                </SubmitButton>
            </form>

            {feedback?.error && <Notice tone="error">{feedback.error}</Notice>}
            {!feedback?.error && feedback?.message && <Notice tone="success">{feedback.message}</Notice>}

            <form action={save} className="flex flex-col gap-5">
                <input type="hidden" name="postId" value={postId} />
                <Field label="Légende Instagram" htmlFor="caption" hint="2 200 caractères maximum.">
                    <textarea
                        // Nouvelle proposition reçue : le champ repart de la version enregistrée.
                        key={draft?.generatedAt ?? "vide"}
                        id="caption"
                        name="caption"
                        rows={10}
                        maxLength={2200}
                        defaultValue={draft?.caption ?? ""}
                        className={`${inputClasses} resize-y`}
                        data-lenis-prevent
                    />
                </Field>
                <div className="flex flex-wrap items-center gap-3">
                    <SubmitButton name="status" value="brouillon" variant="ghost" size="sm" pendingLabel="Enregistrement…">
                        Enregistrer le brouillon
                    </SubmitButton>
                    <SubmitButton name="status" value="validee" size="sm" pendingLabel="Enregistrement…">
                        Valider
                    </SubmitButton>
                    {draft && (
                        <span className="text-sm text-muted-foreground">
                            Statut : <span className="text-foreground">{INSTAGRAM_STATUS[draft.status] ?? draft.status}</span>
                        </span>
                    )}
                </div>
            </form>

            {draft?.status === "validee" && (
                <div className="flex flex-col gap-4 border-t border-border pt-6">
                    <p className="text-sm text-muted-foreground">
                        Publie la dernière légende validée avec la photo de l&apos;actualité. Le post est visible tout
                        de suite sur le compte.
                    </p>
                    {imageIssue && <Notice>{imageIssue}</Notice>}
                    <form
                        action={publish}
                        className="flex flex-col gap-4"
                        onSubmit={(event) => {
                            if (!window.confirm("Publier maintenant cette actualité sur Instagram ?")) event.preventDefault();
                        }}
                    >
                        <input type="hidden" name="postId" value={postId} />
                        <label className="flex items-start gap-3 text-sm">
                            <input type="checkbox" name="consent" required className="mt-0.5 size-4 shrink-0 accent-primary" />
                            <span>
                                Les personnes reconnaissables sur la photo sont d&apos;accord pour être publiées
                                (autorisation des parents pour les mineurs).
                            </span>
                        </label>
                        <SubmitButton
                            className="self-start"
                            size="sm"
                            disabled={!automationReady || Boolean(imageIssue)}
                            pendingLabel="Publication en cours…"
                        >
                            Publier sur Instagram
                        </SubmitButton>
                    </form>
                    {publishState?.error && <Notice tone="error">{publishState.error}</Notice>}
                </div>
            )}
        </div>
    );
}
