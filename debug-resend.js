const { Resend } = require('resend');

// Clé API récupérée de notre conversation
const resend = new Resend('re_YD6mJxLc_2BEqchxZrYQuYevyou7mSbq1');

(async function () {
    console.log("🟦 Tentative d'envoi d'email de test avec Resend...");
    console.log(" -> De: onboarding@resend.dev");
    console.log(" -> À:  romainkantzer08@gmail.com");

    try {
        const response = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'romainkantzer08@gmail.com',
            subject: 'Test Debug Resend - Tentative 2',
            html: '<p>Si vous recevez ceci, la configuration est maintenant correcte !</p>'
        });

        console.log("-----------------------------------------");
        console.log("Résultat brut de Resend :", response);
        console.log("-----------------------------------------");

        if (response.error) {
            console.error("❌ ERREUR DÉTECTÉE :");
            console.error(JSON.stringify(response.error, null, 2));
        } else {
            console.log("✅ SUCCÈS ! L'email est parti vers romainkantzer08@gmail.com.");
            console.log("IMPORTANT : N'oubliez pas de redémarrer votre serveur (npm run dev) !");
        }

    } catch (e) {
        console.error("❌ Erreur fatale du script :", e);
    }
})();
