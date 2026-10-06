"use client";

import { useActionState } from "react";
import { generateCaptionAction, saveCaptionAction } from "@/app/admin/actions";
import { DRAFT_STATUS } from "@/lib/admin/categories";
import Field, { inputClasses, Notice } from "./Field";
import SubmitButton from "./SubmitButton";

// Proposition de publication Instagram : générée par le workflow, puis relue, modifiée
// et validée ici. La publication elle-même viendra à l'étape suivante.
export default function CaptionPanel({ postId, draft, automationReady }) {
    const [generateState, generate] = useActionState(generateCaptionAction, null);
    const [saveState, save] = useActionState(saveCaptionAction, null);
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
                <input type="hidden" name="id" value={postId} />
                <SubmitButton variant="ghost" size="sm" disabled={!automationReady} pendingLabel="Génération en cours…">
                    {draft ? "Générer une nouvelle proposition" : "Générer une proposition"}
                </SubmitButton>
            </form>

            {feedback?.error && <Notice tone="error">{feedback.error}</Notice>}
            {!feedback?.error && feedback?.message && <Notice tone="success">{feedback.message}</Notice>}

            <form action={save} className="flex flex-col gap-5">
                <input type="hidden" name="id" value={postId} />
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
                            Statut : <span className="text-foreground">{DRAFT_STATUS[draft.status] ?? draft.status}</span>
                        </span>
                    )}
                </div>
            </form>
        </div>
    );
}
