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

// Couleurs squircle disponibles (on garde les clés)
const squircleColors = [
  "BLUE", // squircle-[#ade9ff]
  "GREEN", // squircle-[#adffad]
  "PURPLE", // squircle-[#e2e4ff]
  "INDIGO", // squircle-[#b3baf5]
  "YELLOW", // squircle-[#ffe9ad]
  "RED", // squircle-[#ffadad]
  "SKY", // squircle-[#adffff]
  "PINK", // squircle-[#ffadff]
  "ORANGE", // squircle-[#ffd3ad]
  "VIOLET", // squircle-[#8e8eff]
  "TURQUOISE", // squircle-[#adfbff]
  "GOLD", // squircle-[#ffd700]
  "AMBER", // squircle-[#ffc107]
  "TEAL", // squircle-[#00bfa5]
  "CYAN", // squircle-[#00e5ff]
  "LIME", // squircle-[#c8e6c9]
  "PINKISH_PURPLE", // squircle-[#d8b6ff]
  "PINKISH_ORANGE", // squircle-[#ffab91]
  "PINKISH_PINK", // squircle-[#ff83b0]
  "PINKISH_GREEN", // squircle-[#c5e1a5]
  "PINKISH_BLUE", // squircle-[#b3cde0]
];

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

async function createAuthors() {
  const authorsDir = path.join(process.cwd(), "content", "posts", "authors");
  await fs.mkdir(authorsDir, { recursive: true });

  // Créer un auteur par défaut
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
  const categoriesDir = path.join(
    process.cwd(),
    "content",
    "posts",
    "categories"
  );
  const tagsDir = path.join(process.cwd(), "content", "posts", "tags");
  const projectCategoriesDir = path.join(
    process.cwd(),
    "content",
    "projects",
    "categories"
  );

  await fs.mkdir(categoriesDir, { recursive: true });
  await fs.mkdir(tagsDir, { recursive: true });
  await fs.mkdir(projectCategoriesDir, { recursive: true });

  // Récupérer les catégories des posts depuis la DB
  try {
    const [postCategories] = await connection.execute(
      "SELECT id, name FROM categories"
    );

    for (let i = 0; i < postCategories.length; i++) {
      const category = postCategories[i];
      const slug = createSlug(category.name);
      const ref = createRef(category.name);
      const color = squircleColors[i % squircleColors.length];

      const categoryContent = `---
id: ${category.id}
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
      console.log(`✅ Catégorie créée: ${ref}.md (${category.name})`);
    }
  } catch (error) {
    console.log(
      "Table categories non trouvée, création de catégories par défaut..."
    );

    // Catégories par défaut si pas de table
    const defaultCategories = [
      {
        id: 1,
        name: "Design Web",
        description: "Articles sur le design et l'UX/UI",
      },
      {
        id: 2,
        name: "Développement",
        description: "Tutoriels et guides de développement",
      },
      {
        id: 3,
        name: "Tutoriels",
        description: "Guides pratiques étape par étape",
      },
    ];

    for (let i = 0; i < defaultCategories.length; i++) {
      const category = defaultCategories[i];
      const slug = createSlug(category.name);
      const color = squircleColors[i];
      const ref = createRef(category.name);

      const categoryContent = `---
id: ${category.id}
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
      console.log(
        `✅ Catégorie par défaut créée: ${ref}.md (${category.name})`
      );
    }
  }

  // Récupérer les catégories de projets depuis la DB
  try {
    const [projCategories] = await connection.execute(
      "SELECT id, name FROM project_categories"
    );

    for (let i = 0; i < projCategories.length; i++) {
      const category = projCategories[i];
      const slug = createSlug(category.name);
      const color = squircleColors[(i + 3) % squircleColors.length]; // Offset pour varier les couleurs
      const ref = createRef(category.name);

      const categoryContent = `---
id: ${category.id}
ref: "${ref}"
name: "${category.name}"
description: "Projets dans la catégorie ${category.name}"
color: "${color}"
slug: "${slug}"
---`;

      await fs.writeFile(
        path.join(projectCategoriesDir, `${ref}.md`),
        categoryContent
      );
      console.log(`✅ Catégorie de projet créée: ${ref}.md (${category.name})`);
    }
  } catch (error) {
    console.log(
      "Table project_categories non trouvée, création de catégories de projet par défaut..."
    );

    const defaultProjectCategories = [
      {
        id: 1,
        name: "Développement Web",
        description: "Sites web et applications web",
      },
      {
        id: 2,
        name: "Design UI/UX",
        description: "Interface et expérience utilisateur",
      },
      { id: 3, name: "Application Mobile", description: "Apps iOS et Android" },
    ];

    for (let i = 0; i < defaultProjectCategories.length; i++) {
      const category = defaultProjectCategories[i];
      const slug = createSlug(category.name);
      const color = squircleColors[(i + 3) % squircleColors.length];
      const ref = createRef(category.name);

      const categoryContent = `---
id: ${category.id}
ref: "${ref}"
name: "${category.name}"
description: "${category.description}"
color: "${color}"
slug: "${slug}"
---`;

      await fs.writeFile(
        path.join(projectCategoriesDir, `${ref}.md`),
        categoryContent
      );
      console.log(
        `✅ Catégorie de projet par défaut créée: ${ref}.md (${category.name})`
      );
    }
  }

  // Créer des tags avec IDs et couleurs
  const defaultTags = [
    { id: 1, name: "JavaScript", description: "Langage de programmation web" },
    { id: 2, name: "React", description: "Bibliothèque JavaScript pour UI" },
    { id: 3, name: "Next.js", description: "Framework React fullstack" },
    { id: 4, name: "CSS", description: "Feuilles de style et design" },
    { id: 5, name: "Design", description: "Principes et inspiration design" },
    { id: 6, name: "Tutorial", description: "Guides étape par étape" },
    {
      id: 7,
      name: "Web Development",
      description: "Développement web moderne",
    },
    { id: 8, name: "PHP", description: "Langage de programmation serveur" },
    { id: 9, name: "Laravel", description: "Framework PHP moderne" },
    { id: 10, name: "Vue.js", description: "Framework JavaScript progressif" },
    { id: 11, name: "Node.js", description: "Runtime JavaScript côté serveur" },
    {
      id: 12,
      name: "TypeScript",
      description: "JavaScript avec typage statique",
    },
    { id: 13, name: "API", description: "Interfaces de programmation" },
    { id: 14, name: "Database", description: "Bases de données et SQL" },
    { id: 15, name: "Mobile", description: "Développement mobile" },
  ];

  for (let i = 0; i < defaultTags.length; i++) {
    const tag = defaultTags[i];
    const slug = createSlug(tag.name);
    const ref = createRef(tag.name);
    const color = squircleColors[(i + 6) % squircleColors.length]; // Offset pour varier les couleurs

    const tagContent = `---
id: ${tag.id}
ref: "${ref}"
name: "${tag.name}"
description: "${tag.description}"
color: "${color}"
slug: "${slug}"
---`;

    await fs.writeFile(path.join(tagsDir, `${ref}.md`), tagContent);
    console.log(`✅ Tag créé: ${ref}.md (${tag.name})`);
  }
}

// Fonction pour déterminer les IDs des tags d'un post basé sur son contenu
function extractTagIdsFromContent(title, content, keywords = "") {
  const text = `${title} ${content} ${keywords}`.toLowerCase();
  const tagIds = [];

  // Mapping basé sur le contenu vers les IDs des tags
  if (text.includes("javascript") || text.includes("js")) tagIds.push(1);
  if (text.includes("react")) tagIds.push(2);
  if (text.includes("next") || text.includes("nextjs")) tagIds.push(3);
  if (text.includes("css") || text.includes("style")) tagIds.push(4);
  if (text.includes("design") || text.includes("ui") || text.includes("ux"))
    tagIds.push(5);
  if (
    text.includes("tutorial") ||
    text.includes("guide") ||
    text.includes("comment")
  )
    tagIds.push(6);
  if (text.includes("php")) tagIds.push(8);
  if (text.includes("laravel")) tagIds.push(9);
  if (text.includes("vue") || text.includes("vuejs")) tagIds.push(10);
  if (text.includes("node") || text.includes("nodejs")) tagIds.push(11);
  if (text.includes("typescript") || text.includes("ts")) tagIds.push(12);
  if (text.includes("api") || text.includes("rest") || text.includes("graphql"))
    tagIds.push(13);
  if (
    text.includes("database") ||
    text.includes("sql") ||
    text.includes("mysql")
  )
    tagIds.push(14);
  if (
    text.includes("mobile") ||
    text.includes("app") ||
    text.includes("android") ||
    text.includes("ios")
  )
    tagIds.push(15);
  if (
    text.includes("développement") ||
    text.includes("development") ||
    text.includes("web")
  )
    tagIds.push(7);

  return tagIds.length > 0 ? tagIds : [7]; // Au moins un tag par défaut (Web Development)
}

function createPostFrontmatter(post, categoryId = 1) {
  const tagIds = extractTagIdsFromContent(post.title, post.body, "");

  return `---
title: "${(post.title || "").replace(/"/g, '\\"')}"
slug: "${sanitizeFileName(post.slug || post.title)}"
excerpt: "${(post.meta_description || "").replace(/"/g, '\\"')}"
photo: "${post.photo || ""}"
categories_id: [${post.category_id || categoryId}]
tags_id: [${tagIds.join(", ")}]
created_at: "${new Date(post.created_at).toISOString()}"
updated_at: "${new Date(post.updated_at || "").toISOString()}"
published: true
featured: false
---`;
}

function getDateProject(date) {
  if (!date) return { date_start: null, date_end: null };
  const [start, end] = date.split(" to ").map((d) => d.trim());

  return {
    date_start: `"${new Date(start).toISOString()}"`,
    date_end: `"${new Date(end).toISOString()}"`,
  };
}

function getProjectTypeLabel(type) {
  const types = {
    web: "Développement Web",
    design: "Design",
    external: "Projet Externe",
  };
  return types[type] || type || "Non spécifié";
}

function getProjectTypeId(type) {
  const types = { web: 1, design: 2, external: 3 };
  return types[type] || 0;
}

function createProjectFrontmatter(project, categoryId = 1) {
  const tagIds = extractTagIdsFromContent(
    project.title,
    project.body,
    project.project_keywords
  );

  return `---
title: "${(project.title || "").replace(/"/g, '\\"')}"
slug: "${project.slug || ""}"
excerpt: "${(project.meta_description || "").replace(/"/g, '\\"')}"
project_type: "${project.project_type || "web"}"
project_type_id: ${getProjectTypeId(project.project_type)}
project_type_label: "${getProjectTypeLabel(project.project_type)}"
project_link: "${project.button_link || ""}"
project_keywords: "${project.project_keywords || ""}"
categories_id: [${project.category_id || categoryId}]
tags_id: [${tagIds.join(", ")}]
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
date_project:  [${getDateProject(project.date).date_start}, ${
    getDateProject(project.date).date_end
  }]
client: "${
    project.client
      ? project.client.replace("Client: ", "").replace("Client : ", "")
      : ""
  }"
button_text: "${project.button_text || ""}"
button_link: "${project.button_link || ""}"
created_at: "${new Date(project.created_at).toISOString()}"
updated_at: "${new Date(project.updated_at).toISOString()}"
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

    // 4. Migrer les posts
    console.log("\n📝 Migration des posts...");
    const [posts] = await connection.execute(
      "SELECT * FROM posts ORDER BY created_at DESC"
    );

    const postsDir = path.join(process.cwd(), "content", "posts");
    await fs.mkdir(postsDir, { recursive: true });

    for (const post of posts) {
      try {
        const cleanContent = cleanHtmlContent(post.body);
        const categoryId = post.category_id || 1; // Utilise l'ID de la catégorie ou 1 par défaut
        const frontmatter = createPostFrontmatter(post, categoryId);
        const mdxContent = `${frontmatter}\n\n${cleanContent}`;

        const fileName = `${sanitizeFileName(post.slug || post.title)}.mdx`;
        const filePath = path.join(postsDir, fileName);

        await fs.writeFile(filePath, mdxContent, "utf8");
        console.log(`✅ Post migré: ${fileName} (catégorie ID: ${categoryId})`);
      } catch (error) {
        console.error(`❌ Erreur post ${post.id}:`, error.message);
      }
    }

    // 5. Migrer les projets
    console.log("\n🎨 Migration des projets...");
    const [projects] = await connection.execute(
      "SELECT * FROM projects ORDER BY created_at DESC"
    );

    const projectsDir = path.join(process.cwd(), "content", "projects");
    await fs.mkdir(projectsDir, { recursive: true });

    for (const project of projects) {
      try {
        const cleanContent = cleanHtmlContent(project.body);
        const categoryId = project.category_id || 1; // Utilise l'ID de la catégorie ou 1 par défaut
        const frontmatter = createProjectFrontmatter(project, categoryId);

        // Ajouter des sections supplémentaires pour le projet
        let additionalContent = "";

        // Section informations du projet
        if (project.client || project.date || project.project_link) {
          additionalContent += "\n\n## Informations du projet\n\n";

          // if (project.client) {
          //   additionalContent += `**Client:** ${project.client.replace(
          //     "Client: ",
          //     ""
          //   )}\n\n`;
          // }

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
        console.log(
          `✅ Projet migré: ${fileName} (catégorie ID: ${categoryId})`
        );
      } catch (error) {
        console.error(`❌ Erreur projet ${project.id}:`, error.message);
      }
    }

    console.log("\n🎉 Migration complète terminée!");
    console.log("\n📋 Résumé:");
    console.log(`- ${posts.length} posts migrés`);
    console.log(`- ${projects.length} projets migrés`);
    console.log("- Auteur créé");
    console.log("- Catégories et tags créés avec couleurs squircle");
    console.log("- Utilisation des IDs pour les références");

    console.log("\n🎨 Couleurs disponibles:");
    squircleColors.forEach((color, index) => {
      console.log(`  ${index + 1}. ${color}`);
    });

    console.log("\n🚀 Prochaines étapes:");
    console.log("1. Vérifiez les fichiers générés dans content/");
    console.log("2. Ajustez les catégories et tags si nécessaire");
    console.log(
      "3. Modifiez les couleurs en éditant les fichiers .md individuels"
    );
    console.log("4. Lancez votre application Next.js avec: npm run dev");
  } catch (error) {
    console.error("❌ Erreur de migration:", error);
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
