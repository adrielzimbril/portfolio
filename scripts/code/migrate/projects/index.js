// scripts/migrate-projects-to-mdx.js
import mysql from "mysql2/promise";
import { promises as fs } from "fs";
import path from "path";
import TurndownService from "turndown";
import { dbConfig } from "../config.js";

// Configuration du convertisseur HTML vers Markdown
const turndownService = new TurndownService({
  headingStyle: "atx",
  hr: "---",
  bulletListMarker: "-",
  codeBlockStyle: "fenced",
});

// Nettoyer le slug pour le nom de fichier
function sanitizeFileName(slug) {
  return slug
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

// Nettoyer le contenu HTML et le convertir en Markdown
function cleanHtmlContent(html) {
  if (!html) return "";

  // Remplacer les entités HTML
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

  // Nettoyer les balises WordPress
  content = content.replace(/<p>&nbsp;<\/p>/g, "");

  // Convertir en Markdown
  const markdown = turndownService.turndown(content);

  return markdown;
}

// Obtenir le type de projet en français
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

function getDateProject(date) {
  if (!date) return { date_start: null, date_end: null };
  const [start, end] = date.split(" to ").map((d) => d.trim());

  return {
    date_start: `"${new Date(start).toISOString()}"`,
    date_end: `"${new Date(end).toISOString()}"`,
  };
}

// Créer le frontmatter YAML pour les projets
function createProjectFrontmatter(project, categories = {}) {
  const categoryName =
    categories[project.project_category_id] || "Non catégorisé";

  return `---
title: "${(project.title || "").replace(/"/g, '\\"')}"
slug: "${project.slug || ""}"
project_type: "${project.project_type || "web"}"
project_type_id: ${getProjectTypeId(project.project_type)}
project_type_label: "${getProjectTypeLabel(project.project_type)}"
project_link: "${project.project_link || ""}"
project_keywords: "${project.project_keywords || ""}"
category: "${categoryName}"
category_id: ${project.project_category_id || 0}
image_big: "${project.image_big || ""}"
image_thumbnail: "${project.image_thumbnail || ""}"
gallery: ["${project.img_gal1 || ""}", "${project.img_gal2 || ""}", "${
    project.img_gal3 || ""
  }", "${project.img_gal4 || ""}"]
date_project_start: ${getDateProject(project.date).date_start}
date_project_end: ${getDateProject(project.date).date_end}
client: "${project.client || ""}"
button_text: "${project.button_text || ""}"
button_link: "${project.button_link || ""}"
meta_title: "${(project.meta_title || "").replace(/"/g, '\\"')}"
meta_description: "${(project.meta_description || "").replace(/"/g, '\\"')}"
created_at: "${new Date(project.created_at).toISOString()}"
updated_at: "${new Date(project.updated_at).toISOString()}"
published: true
---`;
}

async function migrateProjectsToMDX() {
  let connection;

  try {
    // Connexion à la base de données
    connection = await mysql.createConnection(dbConfig);
    console.log("Connecté à la base de données MySQL");

    // Récupérer les catégories de projets (si vous avez une table project_categories)
    let categories = {};
    try {
      const [categoryRows] = await connection.execute(
        "SELECT id, name FROM project_categories"
      );
      categories = categoryRows.reduce((acc, cat) => {
        acc[cat.id] = cat.name;
        return acc;
      }, {});
    } catch (error) {
      console.log("Table project_categories non trouvée, utilisation des IDs");
    }

    // Récupérer tous les projets
    const [projects] = await connection.execute(
      "SELECT * FROM projects ORDER BY created_at DESC"
    );
    console.log(`${projects.length} projets trouvés`);

    // Créer le dossier content/projects s'il n'existe pas
    const projectsDir = path.join(process.cwd(), "content", "projects");
    // console.log(
    //   "   - Repertoire des articles : content/*/*.mdx (projets portfolio) : ",
    //   postsDir
    // );
    fs.mkdir(projectsDir, { recursive: true });

    // Traiter chaque projet
    for (const project of projects) {
      try {
        // Nettoyer le contenu
        const cleanContent = cleanHtmlContent(project.body);

        // Créer le frontmatter
        const frontmatter = createProjectFrontmatter(project, categories);

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

        // Combiner frontmatter et contenu
        const mdxContent = `${frontmatter}

${cleanContent}${additionalContent}`;

        // Créer le nom de fichier
        const fileName = `${sanitizeFileName(
          project.slug || project.title || `project-${project.id}`
        )}.mdx`;
        const filePath = path.join(projectsDir, fileName);

        // Écrire le fichier MDX
        await fs.writeFile(filePath, mdxContent, "utf8");
        console.log(`✅ Projet migré: ${fileName}`);
      } catch (error) {
        console.error(
          `❌ Erreur lors de la migration du projet ${project.id}:`,
          error.message
        );
      }
    }

    console.log("🎉 Migration des projets terminée!");
  } catch (error) {
    console.error("Erreur de migration:", error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Fonction pour migrer les images des projets
async function migrateProjectImages() {
  const connection = await mysql.createConnection(dbConfig);
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

      // Copier l'image
      await fs.copyFile(sourcePath, destPath);
      console.log(`📷 Image copiée: ${imagePath}`);
    } catch (error) {
      console.error(`❌ Erreur copie image ${imagePath}:`, error.message);
    }
  });

  await Promise.all(imagePromises);
  await connection.end();

  console.log(`🖼️ ${uniqueImages.length} images de projets traitées`);
}

// Exécuter la migration
// if (require.main === module) {
//   migrateProjectsToMDX()
//     .then(() => {
//       console.log(
//         "Voulez-vous également migrer les images des projets? Décommentez la ligne suivante:"
//       );
//       // return migrateProjectImages();
//     })
//     .catch(console.error);
// }

export { migrateProjectsToMDX, migrateProjectImages };
