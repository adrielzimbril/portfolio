import React from "react";

export function WelcomeEmail({ name }: { name?: string }) {
  return (
    <div style={{ fontFamily: 'Inter, Arial, sans-serif', color: '#111' }}>
      <h1 style={{ fontSize: 24, margin: '0 0 12px' }}>
        {name ? `Bienvenue, ${name} !` : 'Bienvenue !'}
      </h1>
      <p style={{ lineHeight: 1.6 }}>
        Merci de vous être inscrit. Vous recevrez bientôt vos ressources 🎁 et des conseils exclusifs.
      </p>
      <p style={{ fontSize: 12, color: '#666' }}>
        Si vous n'êtes pas à l'origine de cette inscription, ignorez ce message.
      </p>
    </div>
  );
}
