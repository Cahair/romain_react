"use client";

import { useActionState } from "react";
import { connectInstagramAction, disconnectInstagramAction, refreshInstagramAction } from "@/app/admin/actions";
import Field, { inputClasses, Notice } from "./Field";
import SubmitButton from "./SubmitButton";

const formatDate = (value) =>
    new Intl.DateTimeFormat("fr-FR", { dateStyle: "long", timeZone: "Europe/Paris" }).format(new Date(value));

const remaining = (days) => (days < 0 ? "expiré" : days === 0 ? "expire aujourd'hui" : `dans ${days} jour${days > 1 ? "s" : ""}`);

// Compte Instagram de l'espace admin. `status` vient de instagramStatus() : jamais le jeton lui-même.
export default function InstagramSettings({ status }) {
    const [connectState, connect] = useActionState(connectInstagramAction, null);
    const [refreshState, refresh] = useActionState(refreshInstagramAction, null);

    return (
        <div className="flex flex-col gap-6">
            {status.connected ? (
                <div className="flex flex-col gap-5">
                    <dl className="grid gap-x-6 gap-y-2 text-sm sm:grid-cols-[auto_1fr]">
                        <dt className="text-muted-foreground">Compte</dt>
                        <dd className="font-medium">@{status.username}</dd>
                        <dt className="text-muted-foreground">Jeton valable jusqu&apos;au</dt>
                        <dd>
                            {formatDate(status.expiresAt)} ({remaining(status.daysLeft)})
                        </dd>
                        <dt className="text-muted-foreground">Dernier renouvellement</dt>
                        <dd>{formatDate(status.refreshedAt)}</dd>
                    </dl>

                    {status.expired ? (
                        <Notice tone="error">
                            Le jeton a expiré : la publication ne fonctionne plus. Coller un nouveau jeton ci-dessous.
                        </Notice>
                    ) : (
                        status.lastError && (
                            <Notice tone="error">
                                Renouvellement automatique impossible le {formatDate(status.lastError.at)} :{" "}
                                {status.lastError.message}
                            </Notice>
                        )
                    )}
                    <p className="text-sm text-muted-foreground">
                        Le site renouvelle le jeton chaque semaine et envoie une alerte par e-mail si le renouvellement
                        échoue.
                    </p>

                    <div className="flex flex-wrap items-center gap-3">
                        <form action={refresh}>
                            <SubmitButton
                                variant="ghost"
                                size="sm"
                                disabled={!status.canRefresh || status.expired}
                                pendingLabel="Renouvellement…"
                            >
                                Renouveler maintenant
                            </SubmitButton>
                        </form>
                        <form
                            action={disconnectInstagramAction}
                            onSubmit={(event) => {
                                if (!window.confirm(`Déconnecter @${status.username} ? La publication sera impossible.`)) {
                                    event.preventDefault();
                                }
                            }}
                        >
                            <SubmitButton variant="ghost" size="sm" pendingLabel="Déconnexion…">
                                Déconnecter
                            </SubmitButton>
                        </form>
                    </div>
                    {!status.canRefresh && (
                        <p className="text-xs text-muted-foreground">
                            Instagram n&apos;accepte un renouvellement que 24 h après le précédent.
                        </p>
                    )}
                    {refreshState?.error && <Notice tone="error">{refreshState.error}</Notice>}
                    {refreshState?.message && <Notice tone="success">{refreshState.message}</Notice>}
                </div>
            ) : (
                <Notice>Aucun compte Instagram connecté : la publication est impossible tant qu&apos;un jeton n&apos;est pas enregistré.</Notice>
            )}

            <form action={connect} className="flex flex-col gap-4 border-t border-border pt-6">
                <Field
                    label={status.connected ? "Remplacer le jeton" : "Connecter un compte"}
                    htmlFor="token"
                    hint="Jeton de l'API Instagram (il commence par « IG »), créé dans l'app Meta : Générer des tokens d'accès. Vérifié auprès d'Instagram avant d'être enregistré."
                >
                    <input
                        id="token"
                        name="token"
                        type="password"
                        required
                        autoComplete="off"
                        spellCheck={false}
                        placeholder="IGAA…"
                        className={inputClasses}
                    />
                </Field>
                <SubmitButton size="sm" className="self-start" pendingLabel="Vérification…">
                    Enregistrer le jeton
                </SubmitButton>
                {connectState?.error && <Notice tone="error">{connectState.error}</Notice>}
                {connectState?.message && <Notice tone="success">{connectState.message}</Notice>}
            </form>
        </div>
    );
}
