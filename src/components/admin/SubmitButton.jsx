"use client";

import { useFormStatus } from "react-dom";
import Button from "../ui/Button";

// Bouton d'envoi désactivé pendant l'action serveur du formulaire parent.
export default function SubmitButton({ children, pendingLabel, disabled = false, ...props }) {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending || disabled} aria-busy={pending} {...props}>
            {pending ? (pendingLabel ?? children) : children}
        </Button>
    );
}
