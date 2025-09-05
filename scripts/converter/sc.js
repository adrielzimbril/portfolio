import fs from "fs";
import path from "path";

// Couleurs disponibles pour les tags
const squircleColors = [
  "BLUE",
  "GREEN",
  "PURPLE",
  "INDIGO",
  "YELLOW",
  "RED",
  "SKY",
  "PINK",
  "ORANGE",
  "VIOLET",
  "TURQUOISE",
  "GOLD",
  "AMBER",
  "TEAL",
  "CYAN",
  "LIME",
  "PINKISH_PURPLE",
  "PINKISH_ORANGE",
  "PINKISH_PINK",
  "PINKISH_GREEN",
  "PINKISH_BLUE",
];

// Fonction pour créer un slug à partir d'un titre
function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
// Créer un ref à partir d'un nom
function createRef(name) {
  return createSlug(name);
}

// Fonction pour obtenir une couleur aléatoire
function getRandomColor() {
  return squircleColors[Math.floor(Math.random() * squircleColors.length)];
}

// Fonction pour créer les tags uniques
function createTags(data) {
  const tagsSet = new Set();

  data.forEach((item) => {
    item.tags.forEach((tag) => tagsSet.add(tag));
  });

  return Array.from(tagsSet).map((tag, index) => ({
    id: index + 1,
    name: tag,
    color: getRandomColor(),
  }));
}

// Fonction pour mapper les tags aux IDs
function getTagIds(itemTags, allTags) {
  return itemTags
    .map((tagName) => {
      const tag = allTags.find((t) => t.name === tagName);
      return tag ? tag.id : null;
    })
    .filter((id) => id !== null);
}

// Fonction pour extraire le numéro des étudiants
function extractStudentNumber(userCountText) {
  const match = userCountText.match(/\+?(\d+)/);
  return match ? parseInt(match[1]) : 0;
}

// Fonction pour créer le contenu MDX d'une ressource
function createResourceMDX(item, tagIds) {
  const features = item.details.split("\n").filter((line) => line.trim());

  return `---
id: ${item.id}
title: "${item.title}"
slug: "${createSlug(item.title)}"
excerpt: "${item.description}"
features: [${features.map((feature) => `"${feature.trim()}"`).join(", ")}]
cover: "${item.icon}"
type: "${item.type}"
tags_id: [${tagIds.join(", ")}]
studentsNumber: ${extractStudentNumber(item.userCount)}
studentsProfilImage: [${item.avatars
    .map((avatar) => `"${avatar.src}"`)
    .join(", ")}]
created_at: ${new Date().toISOString()}
updated_at: ${new Date().toISOString()}
published: true
---

# ${item.title}

${item.description}

## Détails du projet

${features.map((feature) => `- ${feature.trim()}`).join("\n")}

## Participants

Ce projet compte ${extractStudentNumber(item.userCount)} participants actifs.

*[Contenu à développer selon le type de ressource]*
`;
}

// Fonction pour créer le contenu MD d'un tag
function createTagMD(tag) {
  return `---
id: ${tag.id}
ref: "${createRef(tag.name)}"
name: "${tag.name}"
description: "Ressources liées au tag ${tag.name}"
color: "${tag.color}"
slug: "${createSlug(tag.name)}"
---
`;
}

// Fonction principale de conversion
export async function convertDataToFiles(inputData) {
  const outputDir = "./content";
  const hubDir = path.join(outputDir, "hub");
  const tagsDir = path.join(outputDir, "hub", "tags");

  // Créer les dossiers
  [outputDir, hubDir, tagsDir].forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });

  // Créer les tags
  const allTags = createTags(inputData);

  // Créer les fichiers de tags
  allTags.forEach((tag) => {
    const tagContent = createTagMD(tag);
    const tagFilePath = path.join(tagsDir, `${createSlug(tag.name)}.md`);
    fs.writeFileSync(tagFilePath, tagContent, "utf8");
    console.log(`✅ Créé: ${tagFilePath}`);
  });

  // Créer les fichiers de ressources
  inputData.forEach((item) => {
    const tagIds = getTagIds(item.tags, allTags);
    const resourceContent = createResourceMDX(item, tagIds);
    const resourceFilePath = path.join(
      hubDir,
      `${createSlug(item.title)}-${item.id}.mdx`
    );
    fs.writeFileSync(resourceFilePath, resourceContent, "utf8");
    console.log(`✅ Créé: ${resourceFilePath}`);
  });

  // Créer un fichier de mapping des tags pour référence
  const tagsMapping = {
    tags: allTags,
    mapping: inputData.map((item) => ({
      id: item.id,
      title: item.title,
      tags: getTagIds(item.tags, allTags),
    })),
  };

  fs.writeFileSync(
    path.join(outputDir, "tags-mapping.json"),
    JSON.stringify(tagsMapping, null, 2),
    "utf8"
  );

  console.log("\n🎉 Conversion terminée !");
  console.log(`📁 ${allTags.length} tags créés dans ./content/tags/`);
  console.log(`📄 ${inputData.length} ressources créées dans ./content/hub/`);
  console.log(
    `🗂️ Mapping des tags sauvegardé dans ./content/tags-mapping.json`
  );
}

// Données d'exemple (remplacez par vos vraies données)
const sampleData = [
  {
    id: 1,
    title: "Guide Complet du Design System",
    type: "ebook",
    icon: "/bold-duotone---school---book.png",
    iconAlt: "Bold duotone school",
    primaryTag: "E-book 📕",
    tags: ["SaaS", "Design", "Conseils"],
    description:
      "Apprenez à créer et maintenir un design system robuste pour vos projets SaaS. Ce guide couvre tous les aspects essentiels.",
    details:
      "🕓 Time: 7-30 Days\n⚡ Level: from 0 to PRO\n🎁 Figma files, extra lessons, certificate, community",
    avatars: [
      {
        src: "./content.png",
        bg: "bg-avatar-user-squareamlie-laurent-color-background",
      },
      {
        src: "./content-1.png",
        bg: "bg-avatar-user-squaresienna-hewitt-neutral-background",
      },
      {
        src: "./content-2.png",
        bg: "bg-avatar-user-squareammar-foley-color-background",
      },
      {
        src: "./content-3.png",
        bg: "bg-avatar-user-squarejulius-vaughan-color-background",
      },
    ],
    userCount: "+256 lecteurs",
    buttonText: "Lire",
  },
  {
    id: 2,
    title: "Formation React Avancée",
    type: "course",
    icon: "/bold-duotone---video--audio--sound---video-library.svg",
    iconAlt: "Bold duotone video",
    primaryTag: "Formation 🎥",
    tags: ["SaaS", "Development", "React"],
    description:
      "Maîtrisez React et ses concepts avancés pour créer des applications SaaS performantes et maintenables.",
    details:
      "🕓 Time: 1-4 Days\n⚡ Level: from 0 to PRO\n🎁 400+ Figma Templates\n💻 Code examples\n🎯 Practical projects",
    avatars: [
      {
        src: "./content-4.png",
        bg: "bg-avatar-user-squareali-mahdi-color-background",
      },
      {
        src: "./content-5.png",
        bg: "bg-avatar-user-squarezahra-christensen-neutral-background",
      },
      {
        src: "./content-6.png",
        bg: "bg-avatar-user-squareriley-omoore-color-background",
      },
      {
        src: "./content-7.png",
        bg: "bg-avatar-user-squareyoussef-roberson-color-background",
      },
    ],
    userCount: "+2468 étudiants",
    buttonText: "Rejoindre",
  },
];

// Charger les données depuis un fichier JSON si fourni
// const dataFile = process.argv[2];

// if (dataFile && fs.existsSync(dataFile)) {
//   const inputData = JSON.parse(fs.readFileSync(dataFile, "utf8"));
//   convertDataToFiles(inputData);
// } else {
//   console.log("🚀 Utilisation des données d'exemple...");
//   convertDataToFiles(sampleData);
// }
