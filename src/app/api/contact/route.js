import { NextResponse } from 'next/server';
import { Resend } from 'resend';


export async function POST(request) {
    try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const body = await request.json();
        const { name, email, project, budget, message } = body;

        console.log('=== CONTACT FORM SUBMISSION ===');
        console.log('Data:', body);

        if (!process.env.RESEND_API_KEY) {
            throw new Error("RESEND_API_KEY manquante");
        }

        const data = await resend.emails.send({
            from: 'Contact Form <onboarding@resend.dev>',
            to: [process.env.CONTACT_EMAIL || 'romainkantzer10@gmail.com'],
            reply_to: email,
            subject: `Nouveau contact de ${name} - Projet ${project || 'Non spécifié'}`,
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <title>Nouveau Message</title>
                </head>
                <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f4f5; margin: 0; padding: 40px 0;">
                    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); border: 1px solid #e2e8f0;">
                        
                        <!-- Header -->
                        <div style="background-color: #0f172a; padding: 32px; text-align: center;">
                            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">Nouvelle Demande</h1>
                            <p style="color: #94a3b8; margin: 8px 0 0 0; font-size: 14px;">Reçue depuis votre site web</p>
                        </div>

                        <!-- Content -->
                        <div style="padding: 32px 40px;">
                            
                            <!-- User Info -->
                            <div style="margin-bottom: 24px; padding-bottom: 24px; border-bottom: 1px solid #f1f5f9;">
                                <div style="font-size: 12px; color: #64748b; text-transform: uppercase; font-weight: 700; letter-spacing: 0.05em; margin-bottom: 8px;">De la part de</div>
                                <div style="font-size: 18px; color: #1e293b; font-weight: 600;">${name}</div>
                                <a href="mailto:${email}" style="color: #3b82f6; text-decoration: none; font-size: 15px;">${email}</a>
                            </div>

                            <!-- Project Details Grid -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 32px;">
                                <tr>
                                    <td width="50%" style="vertical-align: top; padding-right: 16px;">
                                        <div style="font-size: 12px; color: #64748b; text-transform: uppercase; font-weight: 700; letter-spacing: 0.05em; margin-bottom: 8px;">Type de Projet</div>
                                        <div style="display: inline-block; background-color: #f0f9ff; color: #0369a1; padding: 6px 12px; border-radius: 6px; font-size: 14px; font-weight: 600; border: 1px solid #e0f2fe;">
                                            ${project || 'Non spécifié'}
                                        </div>
                                    </td>
                                    <td width="50%" style="vertical-align: top; padding-left: 16px;">
                                        <div style="font-size: 12px; color: #64748b; text-transform: uppercase; font-weight: 700; letter-spacing: 0.05em; margin-bottom: 8px;">Budget</div>
                                        <div style="font-size: 16px; color: #334155; font-weight: 500;">
                                            ${budget || 'Non spécifié'}
                                        </div>
                                    </td>
                                </tr>
                            </table>

                            <!-- Message -->
                            <div>
                                <div style="font-size: 12px; color: #64748b; text-transform: uppercase; font-weight: 700; letter-spacing: 0.05em; margin-bottom: 12px;">Message</div>
                                <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; color: #334155; line-height: 1.6; font-size: 15px; white-space: pre-wrap;">${message}</div>
                            </div>

                        </div>

                        <!-- Footer -->
                        <div style="background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
                            <p style="margin: 0; font-size: 12px; color: #94a3b8;">
                                Cet email a été envoyé automatiquement via le formulaire de contact.
                            </p>
                        </div>
                    </div>
                </body>
                </html>
            `,
        });

        console.log('Resend Response:', data);

        if (data.error) {
            console.error('Resend Error:', data.error);
            return NextResponse.json(
                { error: 'Erreur lors de l\'envoi de l\'email.' },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { success: true, message: 'Email envoyé avec succès', data },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error in contact route:', error);
        return NextResponse.json(
            { error: 'Erreur interne du serveur.' },
            { status: 500 }
        );
    }
}

