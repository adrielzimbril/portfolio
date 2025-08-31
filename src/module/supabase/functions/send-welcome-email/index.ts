import logger from "@/utils/logger";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

interface EmailRequest {
  nom: string;
  numero: string;
  email?: string;
}

serve(async (req: Request) => {
  // Gérer les requêtes OPTIONS pour CORS
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { nom, numero, email }: EmailRequest = await req.json();

    // Simuler l'envoi d'email (remplacez par votre service d'email préféré)
    logger.info("Envoi d'email de bienvenue à:", { nom, numero, email });

    // Ici vous pouvez intégrer avec:
    // - SendGrid
    // - Mailgun
    // - Resend
    // - Ou tout autre service d'email

    // Exemple avec un service d'email fictif:
    const emailData = {
      to: email || `${nom} <${numero}>`,
      subject: "🎁 Bienvenue ! Voici votre méthode Tsunami",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333; text-align: center;">🌊 Bienvenue ${nom} !</h1>
          
          <p>Merci de vous être inscrit à notre newsletter !</p>
          
          <p>Vous allez recevoir :</p>
          <ul>
            <li>🎯 La méthode Tsunami complète</li>
            <li>🤖 Nos templates d'automatisation IA</li>
            <li>📈 Des stratégies exclusives pour trouver des clients</li>
            <li>💰 Des bonus surprises</li>
          </ul>
          
          <p>Gardez un œil sur votre boîte mail et votre téléphone (${numero}) !</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="#" style="background: #000; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px;">
              Accéder à mes cadeaux 🎁
            </a>
          </div>
          
          <p style="color: #666; font-size: 14px;">
            À très bientôt,<br>
            L'équipe Adriel ZIMBRIL
          </p>
        </div>
      `,
    };

    // Log pour le développement
    logger.info("Email préparé:", emailData);

    // Retourner une réponse de succès
    return new Response(
      JSON.stringify({
        success: true,
        message: "Email envoyé avec succès",
        recipient: nom,
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    logger.error("Erreur lors de l'envoi de l'email:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error: "Erreur lors de l'envoi de l'email",
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
