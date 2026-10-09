"use client";

import { deletePostAction } from "@/app/admin/actions";
import SubmitButton from "./SubmitButton";

export default function DeletePostButton({ postId }) {
    return (
        <form
            action={deletePostAction}
            onSubmit={(event) => {
                if (!window.confirm("Supprimer définitivement cette actualité et sa photo ?")) event.preventDefault();
            }}
        >
            <input type="hidden" name="postId" value={postId} />
            <SubmitButton variant="ghost" size="sm" pendingLabel="Suppression…">
                Supprimer
            </SubmitButton>
        </form>
    );
}
