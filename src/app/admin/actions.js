"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { clearSession, createSession, requireSession } from "@/lib/admin/session";
import { findUser, hashPassword, verifyPassword } from "@/lib/admin/users.mjs";
import { deleteMedia, deletePost, getPost, newPostId, savePost, saveMedia, validatePost } from "@/lib/admin/posts";
import { isAutomationConfigured, requestCaption } from "@/lib/admin/automation";
import { DRAFT_STATUS } from "@/lib/admin/categories";

// ─── Connexion ───────────────────────────────────────────────────────────────

// Tentatives par adresse IP, en mémoire de l'instance : 10 essais par quart d'heure.
const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const LOGIN_MAX_ATTEMPTS = 10;
const loginAttempts = new Map();

function tooManyAttempts(ip) {
    const now = Date.now();
    if (loginAttempts.size > 5000) loginAttempts.clear();
    const recent = (loginAttempts.get(ip) || []).filter((time) => now - time < LOGIN_WINDOW_MS);
    recent.push(now);
    loginAttempts.set(ip, recent);
    return recent.length > LOGIN_MAX_ATTEMPTS;
}

// Hachage factice : un e-mail inconnu prend le même temps qu'un mauvais mot de passe.
let dummyHash = null;

export async function loginAction(_previous, formData) {
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");
    const ip = (await headers()).get("x-forwarded-for")?.split(",")[0].trim() || "local";

    if (tooManyAttempts(ip)) return { error: "Trop de tentatives. Réessayer dans un quart d'heure.", email };

    const user = await findUser(email);
    dummyHash ??= await hashPassword("mot-de-passe-factice");
    const valid = await verifyPassword(password, user?.passwordHash ?? dummyHash);
    if (!user || !valid) return { error: "E-mail ou mot de passe incorrect.", email };

    loginAttempts.delete(ip);
    await createSession(user);
    redirect("/admin");
}

export async function logoutAction() {
    await clearSession();
    redirect("/admin/login");
}

// ─── Actualités ──────────────────────────────────────────────────────────────

export async function savePostAction(_previous, formData) {
    await requireSession();
    const id = String(formData.get("id") ?? "");
    const existing = id ? await getPost(id) : null;
    if (id && !existing) return { errors: { form: "Cette actualité n'existe plus." } };

    const { values, errors } = validatePost(formData);
    if (Object.keys(errors).length) return { errors, values };

    let image = existing?.image ?? null;
    const file = formData.get("image");
    const removeImage = formData.get("removeImage") === "on";

    if (file && typeof file === "object" && file.size > 0) {
        const saved = await saveMedia(file);
        if (saved.error) return { errors: { image: saved.error }, values };
        if (image) await deleteMedia(image);
        image = saved.name;
    } else if (removeImage && image) {
        await deleteMedia(image);
        image = null;
    }

    const now = new Date().toISOString();
    const post = await savePost({
        ...existing,
        ...values,
        id: existing?.id ?? newPostId(),
        image,
        createdAt: existing?.createdAt ?? now,
        updatedAt: now,
    });

    redirect(`/admin/actualites/${post.id}?enregistre=1`);
}

export async function deletePostAction(formData) {
    await requireSession();
    await deletePost(String(formData.get("id") ?? ""));
    redirect("/admin");
}

// ─── Publication Instagram (brouillon) ───────────────────────────────────────

export async function generateCaptionAction(_previous, formData) {
    await requireSession();
    const post = await getPost(String(formData.get("id") ?? ""));
    if (!post) return { error: "Cette actualité n'existe plus." };
    if (!isAutomationConfigured()) {
        return { error: "Aucun workflow branché : renseigner AUTOMATION_WEBHOOK_URL (voir .env.local.example)." };
    }

    let caption;
    try {
        caption = await requestCaption(post);
    } catch (error) {
        const reason = error?.name === "TimeoutError" ? "le workflow n'a pas répondu en 60 s." : error.message;
        return { error: `Génération impossible : ${reason}` };
    }

    const now = new Date().toISOString();
    await savePost({
        ...post,
        social: { ...post.social, instagram: { caption, status: "brouillon", generatedAt: now, updatedAt: now } },
    });
    revalidatePath(`/admin/actualites/${post.id}`);
    return { message: "Nouvelle proposition reçue." };
}

export async function saveCaptionAction(_previous, formData) {
    await requireSession();
    const post = await getPost(String(formData.get("id") ?? ""));
    if (!post) return { error: "Cette actualité n'existe plus." };

    const caption = String(formData.get("caption") ?? "").trim();
    const status = String(formData.get("status") ?? "brouillon");
    if (!caption) return { error: "La légende est vide." };
    if (caption.length > 2200) return { error: "Instagram limite une légende à 2 200 caractères." };
    if (!(status in DRAFT_STATUS)) return { error: "Statut inconnu." };

    const previous = post.social?.instagram;
    await savePost({
        ...post,
        social: {
            ...post.social,
            instagram: { caption, status, generatedAt: previous?.generatedAt ?? null, updatedAt: new Date().toISOString() },
        },
    });
    revalidatePath(`/admin/actualites/${post.id}`);
    return { message: status === "validee" ? "Légende validée." : "Brouillon enregistré." };
}
