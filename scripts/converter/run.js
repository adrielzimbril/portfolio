#!/usr/bin/env node

import { convertDataToFiles } from "./sc";
import fs from "fs";

// Utilisation du script de conversion
async function main() {
  try {
    // 1. Charger les données depuis le fichier JSON
    const dataPath = "./data.json";

    if (!fs.existsSync(dataPath)) {
      console.error("❌ Fichier data.json non trouvé");
      console.log("💡 Créez un fichier data.json avec vos données");
      return;
    }

    console.log("📖 Lecture des données...");
    const rawData = fs.readFileSync(dataPath, "utf8");
    const data = JSON.parse(rawData);

    console.log(`📊 ${data.length} éléments trouvés`);

    // 2. Convertir les données
    await convertDataToFiles(data);

    console.log("\n✨ Structure de fichiers créée :");
    console.log("📁 content/");
    console.log("  ├── 📁 hub/ (ressources MDX)");
    console.log("  ├── 📁 tags/ (tags MD)");
    console.log("  └── 📄 tags-mapping.json");
  } catch (error) {
    console.error("❌ Erreur:", error.message);
  }
}

// Instructions d'utilisation
if (process.argv.includes("--help") || process.argv.includes("-h")) {
  console.log(`
🚀 Script de conversion JSON vers MDX/MD

Usage:
  node run.js                 # Utilise ./data.json
  node converter.js data.json # Utilise le fichier spécifié

Structure générée:
  content/
  ├── hub/           # Fichiers MDX des ressources
  ├── tags/          # Fichiers MD des tags
  └── tags-mapping.json # Mapping des relations

Exemple de data.json:
[
  {
    "id": 1,
    "title": "Mon Projet",
    "type": "ebook",
    "tags": ["SaaS", "Design"],
    "description": "Description du projet",
    "details": "🕓 Time: 7-30 Days\\n⚡ Level: from 0 to PRO",
    "avatars": [{"src": "./avatar1.png"}],
    "userCount": "+256 lecteurs",
    "icon": "/icon.png"
  }
]
  `);
  return;
}

main();
