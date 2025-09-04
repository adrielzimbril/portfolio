// scripts/migrate-enhanced.js
import mysql from "mysql2/promise";
import { promises as fs } from "fs";
import path from "path";
import TurndownService from "turndown";
import { dbConfig } from "./config.js";

const turndownService = new TurndownService({
  headingStyle: "atx",
  hr: "---",
  bulletListMarker: "-",
  codeBlockStyle: "fenced",
});

function sanitizeFileName(slug) {
  return slug
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function cleanHtmlContent(html) {
  if (!html) return "";

  let content = html
    .replace(/&eacute;/g, "é")
    .replace(/&egrave;/g, "è")
    .replace(/&ecirc;/g, "ê")
    .replace(/&agrave;/g, "à")
    .replace(/&ccedil;/g, "ç")
    .replace(/&ocirc;/g, "ô")
    .replace(/&icirc;/g, "î")
    .replace(/&ucirc;/g, "û")
    .replace(/&ugrave;/g, "ù")
    .replace(/&laquo;/g, "«")
    .replace(/&raquo;/g, "»")
    .replace(/&nbsp;/g, " ")
    .replace(/&oelig;/g, "œ")
    .replace(/Ã©/g, "é")
    .replace(/Ã /g, "à");

  content = content.replace(/<p>&nbsp;<\/p>/g, "");
  const markdown = turndownService.turndown(content);
  return markdown;
}

// Créer un slug à partir d'un nom
function createSlug(name) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// Créer un ref à partir d'un nom
function createRef(name) {
  return createSlug(name);
}

// Générer les couleurs pour les catégories
const categoryColors = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#EC4899",
  "#06B6D4",
  "#84CC16",
  "#F97316",
  "#6366F1",
];

async function createAuthors() {
  const authorsDir = path.join(process.cwd(), "content", "authors");
  await fs.mkdir(authorsDir, { recursive: true });

  // Créer un auteur par défaut (vous pouvez adapter selon vos besoins)
  const authorContent = `---
ref: "adriel"
displayName: "Adriel Zimbril"
email: "contact@adrielzimbril.com"
bio: "Développeur web fullstack passionné par les technologies modernes."
avatar: "/img/authors/adriel.jpg"
social:
  twitter: "adrielzimbril"
  github: "adrielzimbril"
  linkedin: "adrielzimbril"
---`;

  await fs.writeFile(path.join(authorsDir, "adriel.md"), authorContent);
  console.log("✅ Auteur créé: adriel.md");
}

async function createCategoriesAndTags(connection) {
  // Créer les dossiers
  const categoriesDir = path.join(process.cwd(), "content", "categories");
  const tagsDir = path.join(process.cwd(), "content", "tags");
  const projectCategoriesDir = path.join(
    process.cwd(),
    "content",
    "project-categories"
  );

  await fs.mkdir(categoriesDir, { recursive: true });
  await fs.mkdir(tagsDir, { recursive: true });
  await fs.mkdir(projectCategoriesDir, { recursive: true });

  // Récupérer les catégories des posts
  try {
    const [postCategories] = await connection.execute(
      "SELECT id, name FROM categories"
    );

    for (let i = 0; i < postCategories.length; i++) {
      const category = postCategories[i];
      const ref = createRef(category.name);
      const slug = createSlug(category.name);
      const color = categoryColors[i % categoryColors.length];

      const categoryContent = `---
ref: "${ref}"
name: "${category.name}"
description: "Articles dans la catégorie ${category.name}"
color: "${color}"
slug: "${slug}"
---`;

      await fs.writeFile(
        path.join(categoriesDir, `${ref}.md`),
        categoryContent
      );
      console.log(`✅ Catégorie créée: ${ref}.md`);
    }
  } catch (error) {
    console.log(
      "Table categories non trouvée, création de catégories par défaut..."
    );

    // Catégories par défaut
    const defaultCategories = [
      { name: "Design Web", description: "Articles sur le design et l'UX/UI" },
      {
        name: "Développement",
        description: "Tutoriels et guides de développement",
      },
      { name: "Tutoriels", description: "Guides pratiques étape par étape" },
    ];

    for (let i = 0; i < defaultCategories.length; i++) {
      const category = defaultCategories[i];
      const ref = createRef(category.name);
      const slug = createSlug(category.name);
      const color = categoryColors[i];

      const categoryContent = `---
ref: "${ref}"
name: "${category.name}"
description: "${category.description}"
color: "${color}"
slug: "${slug}"
---`;

      await fs.writeFile(
        path.join(categoriesDir, `${ref}.md`),
        categoryContent
      );
      console.log(`✅ Catégorie par défaut créée: ${ref}.md`);
    }
  }

  // Récupérer les catégories de projets
  try {
    const [projCategories] = await connection.execute(
      "SELECT id, name FROM project_categories"
    );

    for (const category of projCategories) {
      const ref = createRef(category.name);
      const slug = createSlug(category.name);

      const categoryContent = `---
ref: "${ref}"
name: "${category.name}"
description: "Projets dans la catégorie ${category.name}"
slug: "${slug}"
---`;

      await fs.writeFile(
        path.join(projectCategoriesDir, `${ref}.md`),
        categoryContent
      );
      console.log(`✅ Catégorie de projet créée: ${ref}.md`);
    }
  } catch (error) {
    console.log(
      "Table project_categories non trouvée, création de catégories de projet par défaut..."
    );

    const defaultProjectCategories = [
      {
        name: "Développement Web",
        description: "Sites web et applications web",
      },
      {
        name: "Design UI/UX",
        description: "Interface et expérience utilisateur",
      },
      { name: "Application Mobile", description: "Apps iOS et Android" },
    ];

    for (const category of defaultProjectCategories) {
      const ref = createRef(category.name);
      const slug = createSlug(category.name);

      const categoryContent = `---
ref: "${ref}"
name: "${category.name}"
description: "${category.description}"
slug: "${slug}"
---`;

      await fs.writeFile(
        path.join(projectCategoriesDir, `${ref}.md`),
        categoryContent
      );
      console.log(`✅ Catégorie de projet par défaut créée: ${ref}.md`);
    }
  }

  // Créer des tags par défaut
  const defaultTags = [
    { name: "JavaScript", description: "Langage de programmation web" },
    { name: "React", description: "Bibliothèque JavaScript pour UI" },
    { name: "Next.js", description: "Framework React fullstack" },
    { name: "CSS", description: "Feuilles de style et design" },
    { name: "Design", description: "Principes et inspiration design" },
    { name: "Tutorial", description: "Guides étape par étape" },
    { name: "Web Development", description: "Développement web moderne" },
  ];

  for (const tag of defaultTags) {
    const ref = createRef(tag.name);
    const slug = createSlug(tag.name);

    const tagContent = `---
ref: "${ref}"
name: "${tag.name}"
description: "${tag.description}"
slug: "${slug}"
---`;

    await fs.writeFile(path.join(tagsDir, `${ref}.md`), tagContent);
    console.log(`✅ Tag créé: ${ref}.md`);
  }
}

// Fonction pour déterminer les tags d'un post basé sur son contenu
function extractTagsFromContent(title, content, keywords = "") {
  const text = `${title} ${content} ${keywords}`.toLowerCase();
  const tags = [];

  if (text.includes("javascript") || text.includes("js"))
    tags.push("javascript");
  if (text.includes("react")) tags.push("react");
  if (text.includes("next") || text.includes("nextjs")) tags.push("nextjs");
  if (text.includes("css") || text.includes("style")) tags.push("css");
  if (text.includes("design") || text.includes("ui") || text.includes("ux"))
    tags.push("design");
  if (
    text.includes("tutorial") ||
    text.includes("guide") ||
    text.includes("comment")
  )
    tags.push("tutorial");
  if (
    text.includes("développement") ||
    text.includes("development") ||
    text.includes("web")
  )
    tags.push("web-development");

  return tags.length > 0 ? tags : ["web-development"]; // Au moins un tag par défaut
}

function createPostFrontmatter(post, categoryRef = "design-web") {
  const tags = extractTagsFromContent(post.title, post.body, "");

  return `---
title: "${(post.title || "").replace(/"/g, '\\"')}"
slug: "${sanitizeFileName(post.slug || post.title)}"
photo: "${post.photo || ""}"
author: "adriel"
category: "${categoryRef}"
tags: [${tags.map((tag) => `"${tag}"`).join(", ")}]
meta_title: "${(post.meta_title || post.title || "").replace(/"/g, '\\"')}"
meta_description: "${(post.meta_description || "").replace(/"/g, '\\"')}"
created_at: "${post.created_at}"
updated_at: "${post.updated_at || ""}"
published: true
featured: false
---`;
}

function createProjectFrontmatter(project, categoryRef = "developpement-web") {
  const tags = extractTagsFromContent(
    project.title,
    project.body,
    project.project_keywords
  );

  return `---
title: "${(project.title || "").replace(/"/g, '\\"')}"
slug: "${project.slug || ""}"
project_type: "${project.project_type || "web"}"
project_link: "${project.project_link || ""}"
project_keywords: "${project.project_keywords || ""}"
category: "${categoryRef}"
tags: [${tags.map((tag) => `"${tag}"`).join(", ")}]
image_big: "${project.image_big || ""}"
image_thumbnail: "${project.image_thumbnail || ""}"
gallery: [${[
    project.img_gal1,
    project.img_gal2,
    project.img_gal3,
    project.img_gal4,
  ]
    .filter((img) => img && img.trim() !== "")
    .map((img) => `"${img}"`)
    .join(", ")}]
date_project: "${project.date || ""}"
client: "${project.client || ""}"
button_text: "${project.button_text || ""}"
button_link: "${project.button_link || ""}"
meta_title: "${(project.meta_title || "").replace(/"/g, '\\"')}"
meta_description: "${(project.meta_description || "").replace(/"/g, '\\"')}"
created_at: "${project.created_at}"
updated_at: "${project.updated_at || ""}"
published: true
featured: false
---`;
}

async function migrateAll() {
  let connection;

  try {
    connection = await mysql.createConnection(dbConfig);
    console.log("🔗 Connecté à la base de données MySQL");

    // 1. Créer l'auteur
    await createAuthors();

    // 2. Créer les catégories et tags
    await createCategoriesAndTags(connection);

    // 3. Migrer les posts
    console.log("\n📝 Migration des posts...");
    const [posts] = await connection.execute(
      "SELECT * FROM posts ORDER BY created_at DESC"
    );

    const postsDir = path.join(process.cwd(), "content", "posts");
    await fs.mkdir(postsDir, { recursive: true });

    for (const post of posts) {
      try {
        const cleanContent = cleanHtmlContent(post.body);
        const frontmatter = createPostFrontmatter(post);
        const mdxContent = `${frontmatter}\n\n${cleanContent}`;

        const fileName = `${sanitizeFileName(post.slug || post.title)}.mdx`;
        const filePath = path.join(postsDir, fileName);

        await fs.writeFile(filePath, mdxContent, "utf8");
        console.log(`✅ Post migré: ${fileName}`);
      } catch (error) {
        console.error(`❌ Erreur post ${post.id}:`, error.message);
      }
    }

    // 4. Migrer les projets
    console.log("\n🎨 Migration des projets...");
    const [projects] = await connection.execute(
      "SELECT * FROM projects ORDER BY created_at DESC"
    );

    const projectsDir = path.join(process.cwd(), "content", "projects");
    await fs.mkdir(projectsDir, { recursive: true });

    for (const project of projects) {
      try {
        const cleanContent = cleanHtmlContent(project.body);
        const frontmatter = createProjectFrontmatter(project);

        // Ajouter des sections supplémentaires pour le projet
        let additionalContent = "";

        // Section informations du projet
        if (project.client || project.date || project.project_link) {
          additionalContent += "\n## Informations du projet\n\n";

          if (project.client) {
            additionalContent += `**Client:** ${project.client.replace(
              "Client: ",
              ""
            )}\n\n`;
          }

          if (project.date) {
            additionalContent += `**Période:** ${project.date}\n\n`;
          }

          if (project.project_link) {
            additionalContent += `**Site web:** [Voir le projet](${project.project_link})\n\n`;
          }
        }

        // Section galerie d'images
        const galleryImages = [
          project.img_gal1,
          project.img_gal2,
          project.img_gal3,
          project.img_gal4,
        ].filter((img) => img && img.trim() !== "");

        if (galleryImages.length > 0) {
          additionalContent += "\n## Galerie\n\n";
          galleryImages.forEach((img, index) => {
            additionalContent += `![Image ${index + 1}](/${img})\n\n`;
          });
        }

        const mdxContent = `${frontmatter}\n\n${cleanContent}${additionalContent}`;

        const fileName = `${sanitizeFileName(
          project.slug || project.title || `project-${project.id}`
        )}.mdx`;
        const filePath = path.join(projectsDir, fileName);

        await fs.writeFile(filePath, mdxContent, "utf8");
        console.log(`✅ Projet migré: ${fileName}`);
      } catch (error) {
        console.error(`❌ Erreur projet ${project.id}:`, error.message);
      }
    }

    console.log("\n🎉 Migration complète terminée!");
    console.log("\n📋 Résumé:");
    console.log(`- ${posts.length} posts migrés`);
    console.log(`- ${projects.length} projets migrés`);
    console.log("- Auteur créé");
    console.log("- Catégories et tags créés");

    console.log("\n🚀 Prochaines étapes:");
    console.log("1. Vérifiez les fichiers générés dans content/");
    console.log("2. Ajustez les catégories et tags si nécessaire");
    console.log("3. Lancez votre application Next.js avec: npm run dev");
  } catch (error) {
    console.error("❌ Erreur de migration:", error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Fonction pour créer un mapping des catégories
async function createCategoryMapping(connection) {
  const mapping = new Map();

  try {
    const [categories] = await connection.execute(
      "SELECT id, name FROM categories"
    );
    categories.forEach((cat) => {
      mapping.set(cat.id, createRef(cat.name));
    });
  } catch (error) {
    console.log("Utilisation du mapping par défaut des catégories");
  }

  // Valeurs par défaut si pas de table categories
  if (mapping.size === 0) {
    mapping.set(1, "design-web");
    mapping.set(2, "developpement");
    mapping.set(3, "tutoriels");
  }

  return mapping;
}

async function createProjectCategoryMapping(connection) {
  const mapping = new Map();

  try {
    const [categories] = await connection.execute(
      "SELECT id, name FROM project_categories"
    );
    categories.forEach((cat) => {
      mapping.set(cat.id, createRef(cat.name));
    });
  } catch (error) {
    console.log("Utilisation du mapping par défaut des catégories de projets");
  }

  // Valeurs par défaut si pas de table project_categories
  if (mapping.size === 0) {
    mapping.set(1, "developpement-web");
    mapping.set(2, "design-ui-ux");
    mapping.set(3, "application-mobile");
  }

  return mapping;
}

// Fonction utilitaire pour migrer uniquement les images
async function migrateAllImages() {
  let connection;

  try {
    connection = await mysql.createConnection(dbConfig);

    // Migrer images des posts
    const [posts] = await connection.execute(
      'SELECT photo FROM posts WHERE photo IS NOT NULL AND photo != ""'
    );

    // Migrer images des projets
    const [projects] = await connection.execute(`
      SELECT image_big, image_thumbnail, img_gal1, img_gal2, img_gal3, img_gal4 
      FROM projects 
      WHERE image_big IS NOT NULL OR image_thumbnail IS NOT NULL 
         OR img_gal1 IS NOT NULL OR img_gal2 IS NOT NULL 
         OR img_gal3 IS NOT NULL OR img_gal4 IS NOT NULL
    `);

    const publicDir = path.join(process.cwd(), "public");
    const allImages = [];

    // Collecter toutes les images
    posts.forEach((post) => {
      if (post.photo) allImages.push(post.photo);
    });

    projects.forEach((project) => {
      [
        project.image_big,
        project.image_thumbnail,
        project.img_gal1,
        project.img_gal2,
        project.img_gal3,
        project.img_gal4,
      ]
        .filter((img) => img && img.trim() !== "")
        .forEach((img) => allImages.push(img));
    });

    // Supprimer les doublons
    const uniqueImages = [...new Set(allImages)];

    const imagePromises = uniqueImages.map(async (imagePath) => {
      const sourcePath = path.join("/path/to/your/laravel/public", imagePath);
      const destPath = path.join(publicDir, imagePath);

      try {
        // Créer les dossiers nécessaires
        await fs.mkdir(path.dirname(destPath), { recursive: true });

        // Copier l'image (vous devrez adapter le chemin source)
        // await fs.copyFile(sourcePath, destPath);
        console.log(`📷 Image à copier: ${imagePath}`);
      } catch (error) {
        console.error(`❌ Erreur copie image ${imagePath}:`, error.message);
      }
    });

    await Promise.all(imagePromises);
    console.log(`🖼️ ${uniqueImages.length} images traitées`);
  } catch (error) {
    console.error("Erreur migration images:", error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

migrateAll()
  .then(() => {
    console.log("\n💡 Pour migrer uniquement les images, utilisez:");
    console.log("node scripts/migrate-enhanced.js --images-only");
  })
  .catch(console.error);

// // Exécuter la migration
// if (require.main === module) {
//   const args = process.argv.slice(2);

//   if (args.includes("--images-only")) {
//     migrateAllImages().catch(console.error);
//   } else {
//     migrateAll()
//       .then(() => {
//         console.log("\n💡 Pour migrer uniquement les images, utilisez:");
//         console.log("node scripts/migrate-enhanced.js --images-only");
//       })
//       .catch(console.error);
//   }
// }

// module.exports = {
//   migrateAll,
//   migrateAllImages,
//   createAuthors,
//   createCategoriesAndTags,
// };
