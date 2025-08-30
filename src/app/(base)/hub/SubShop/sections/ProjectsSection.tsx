import React from "react";
import { PageDetails } from "@/components/shared/pages/resources/page/page-details";

export function ProjectsSection() {
  return (
    <PageDetails
      useMarkdown
      descriptionTop={`
    Vous pouvez ajouter **des résultats concrets** que ce projet a apportés après votre design ! Vous pouvez ajouter **des résultats concrets** que ce projet a apportés après votre design !

    Par exemple, montrer des *données réelles*.
      - Comment formuler des prompts efficaces
      - Les *techniques avancées* de conversation
      - Comment obtenir des résultats \`précis\` et \`actionnables\`
    
    Voici un [lien utile](https://example.com) pour plus d'informations.
  `}
      previewValueCard={{
        icon: "/emoji-true.png",
        badge: "Pourquoi",
        title: "Pourquoi ce problème est-il important ?",
        description: "Carte des propositions de valeur",
      }}
      descriptionBottom={`
    Tu vas enfin comprendre quoi dire à **ChatGPT** pour obtenir des réponses précises.

    Voici comment faire :
    
    ✅ Clique sur "acheter maintenant"
    ✅ Remplis le formulaire et choisis ton mode de paiement  
    ✅ Valide le paiement
    ✅ Reviens sur la page pour télécharger tes ressources
  `}
    />
  );
}
