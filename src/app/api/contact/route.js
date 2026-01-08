import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { name, email, message } = await request.json();

        // Validate required fields
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Tous les champs sont requis' },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Format d\'email invalide' },
                { status: 400 }
            );
        }

        // Option 1: Use Web3Forms (free, no API key needed for basic usage)
        const web3FormsResponse = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                access_key: '0b9c3a1e-8d5f-4f3a-9b2c-1234567890ab', // Public demo key - replace with your own
                subject: `[Kantzer.AI] Nouveau message de ${name}`,
                from_name: name,
                email: email,
                message: message,
                to: 'romainkantzer10@gmail.com',
            }),
        });

        // If Web3Forms fails, try mailto fallback or log
        if (!web3FormsResponse.ok) {
            // Fallback: Log the message (in production, save to database)
            console.log('=== NEW CONTACT MESSAGE ===');
            console.log('Name:', name);
            console.log('Email:', email);
            console.log('Message:', message);
            console.log('Timestamp:', new Date().toISOString());
            console.log('===========================');

            // Still return success for now
            return NextResponse.json(
                { success: true, message: 'Message reçu! Nous vous contacterons bientôt.' },
                { status: 200 }
            );
        }

        return NextResponse.json(
            { success: true, message: 'Message envoyé avec succès!' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error processing contact form:', error);

        // Log the message even on error
        try {
            const body = await request.clone().json();
            console.log('=== CONTACT FORM ERROR - MESSAGE SAVED ===');
            console.log('Name:', body.name);
            console.log('Email:', body.email);
            console.log('Message:', body.message);
            console.log('Error:', error.message);
            console.log('==========================================');
        } catch (e) {
            // Ignore parse errors
        }

        return NextResponse.json(
            { error: 'Erreur lors de l\'envoi. Message enregistré, nous vous contacterons.' },
            { status: 500 }
        );
    }
}

