import React from "react";
import { PageDetails } from "@/components/shared/pages/shared/page/page-details";

export function ProjectsSection() {
  return (
    <PageDetails
      useMarkdown
      content={`
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
        title:
          "Pourquoi ce problème est-il important pour les utilisateurs, les avantages de la résolution de ce problème ?",
        description: "Carte des propositions de valeur",
      }}
      descriptionBottom={`
         You can add what outcomes has this project brought after your design! For example, can show some real data.You can add what outcomes has this project brought after your design! For example, can show some real data.
         
         You can add what outcomes has this project brought after your design! For example, can show some real data.You can add what outcomes has this project brought after your design! For example, can show some real data.You can add what outcomes has this project brought after your design! For example, can show some real data.
         
         You can add what outcomes has this project brought after your design! For example, can show some real data.You can add what outcomes has this project brought after your design! For example, can show some real data.You can add what outcomes has this project brought after your design! For example, can show some real data.
      
         You can add what outcomes has this project brought after your design! For example, can show some real data.You can add what outcomes has this project brought after your design! For example, can show some real data.
         
         You can add what outcomes has this project brought after your design! For example, can show some real data.You can add what outcomes has this project brought after your design! For example, can show some real data.You can add what outcomes has this project brought after your design! For example, can show some real data.
         
         You can add what outcomes has this project brought after your design! For example, can show some real data.You can add what outcomes has this project brought after your design! For example, can show some real data.You can add what outcomes has this project brought after your design! For example, can show some real data.
      `}
    />
  );
};
