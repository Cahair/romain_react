"use client";

import { useActionState } from "react";
import { loginAction } from "@/app/admin/actions";
import Field, { inputClasses, Notice } from "./Field";
import SubmitButton from "./SubmitButton";

export default function LoginForm() {
    const [state, action] = useActionState(loginAction, null);

    return (
        <form action={action} className="flex flex-col gap-5">
            {state?.error && <Notice tone="error">{state.error}</Notice>}
            <Field label="E-mail" htmlFor="email">
                <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="username"
                    required
                    defaultValue={state?.email ?? ""}
                    className={inputClasses}
                />
            </Field>
            <Field label="Mot de passe" htmlFor="password">
                <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className={inputClasses}
                />
            </Field>
            <SubmitButton className="mt-2 w-full" pendingLabel="Connexion…">
                Se connecter
            </SubmitButton>
        </form>
    );
}
