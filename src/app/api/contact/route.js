import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, email, message } = body;

        // Log the message for debugging/development
        console.log('=== CONTACT FORM SUBMISSION (DISABLED) ===');
        console.log('Values:', body);
        console.log('==========================================');

        // Return a mock success response so the UI doesn't break
        return NextResponse.json(
            { success: true, message: 'Formulaire désactivé temporairement. Message logué.' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error in contact mock:', error);
        return NextResponse.json(
            { error: 'Erreur interne.' },
            { status: 500 }
        );
    }
}

