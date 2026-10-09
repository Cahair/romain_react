import "server-only";
import nodemailer from "nodemailer";
import { Resend } from "resend";
import { CONTACT_RECIPIENT } from "./contact";

// Envoi des e-mails du site vers contact@romain-kantzer.com : demandes de /demarrer et alertes
// de l'espace admin. SMTP (ou l'ancien Gmail), puis Resend en secours (voir .env.local.example).

// Modes d'envoi configurés, dans l'ordre d'essai.
export function getTransports() {
    const env = process.env;
    const transports = [];

    if (env.SMTP_HOST && env.SMTP_USER && env.SMTP_PASS) {
        const port = Number(env.SMTP_PORT) || 465;
        transports.push({
            name: "smtp",
            from: env.SMTP_FROM || env.SMTP_USER,
            options: {
                host: env.SMTP_HOST,
                port,
                secure: env.SMTP_SECURE ? env.SMTP_SECURE === "true" : port === 465,
                auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
            },
        });
    } else if (env.EMAIL_USER && env.EMAIL_PASS) {
        // Ancien réglage Gmail : adresse Gmail + mot de passe d'application.
        transports.push({
            name: "gmail",
            from: env.EMAIL_USER,
            options: { service: "gmail", auth: { user: env.EMAIL_USER, pass: env.EMAIL_PASS } },
        });
    }

    if (env.RESEND_API_KEY) {
        // L'expéditeur doit appartenir à un domaine vérifié dans Resend.
        transports.push({ name: "resend", from: env.RESEND_FROM || "onboarding@resend.dev" });
    }

    return transports;
}

// mail : { subject, text, html?, replyTo?: { name, address } }
export async function sendWith(transport, mail) {
    if (transport.name === "resend") {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const from = transport.from.includes("<") ? transport.from : `Site romain-kantzer.com <${transport.from}>`;
        const { data, error } = await resend.emails.send({
            from,
            to: [CONTACT_RECIPIENT],
            replyTo: mail.replyTo?.address,
            subject: mail.subject,
            text: mail.text,
            html: mail.html,
        });
        if (error) throw new Error(`${error.name}: ${error.message}`);
        return data?.id;
    }

    const transporter = nodemailer.createTransport(transport.options);
    const info = await transporter.sendMail({
        from: { name: "Site romain-kantzer.com", address: transport.from },
        to: CONTACT_RECIPIENT,
        replyTo: mail.replyTo,
        subject: mail.subject,
        text: mail.text,
        html: mail.html,
    });
    // Renseigné uniquement avec un compte de test Ethereal (vérification en local).
    const preview = nodemailer.getTestMessageUrl(info);
    if (preview) console.info("[mailer] aperçu du mail de test :", preview);
    return info.messageId;
}

// Essaie chaque mode d'envoi jusqu'au premier qui réussit. Renvoie false si aucun n'a marché.
export async function sendMail(mail, label = "mailer") {
    const transports = getTransports();
    if (transports.length === 0) console.error(`[${label}] aucun mode d'envoi configuré (SMTP_*, EMAIL_* ou RESEND_API_KEY)`);
    for (const transport of transports) {
        try {
            const id = await sendWith(transport, mail);
            console.info(`[${label}] message envoyé via ${transport.name} à ${CONTACT_RECIPIENT} (${id})`);
            return true;
        } catch (error) {
            console.error(`[${label}] échec de l'envoi via ${transport.name} :`, error?.message || error);
        }
    }
    return false;
}
