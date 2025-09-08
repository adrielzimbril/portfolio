// scripts/migrate-to-mdx.js
import mysql from "mysql2/promise";
import { promises as fs } from "fs";
import path from "path";
import TurndownService from "turndown";

// Configuration de la base de données
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
    .replace(/&oelig;/g, "œ");

  // Nettoyer les balises WordPress
  content = content.replace(/<p>&nbsp;<\/p>/g, "");

  // Convertir en Markdown
  const markdown = turndownService.turndown(content);

  return markdown;
}

// Créer le frontmatter YAML
function createFrontmatter(post, categories = {}) {
  const categoryName = categories[post.category_id] || "Non catégorisé";

  return `---
title: "${post.title.replace(/"/g, '\\"')}"
slug: "${post.slug}"
photo: "${post.photo}"
category: "${categoryName}"
category_id: ${post.category_id}
meta_title: "${post.meta_title.replace(/"/g, '\\"')}"
meta_description: "${post.meta_description.replace(/"/g, '\\"')}"
created_at: "${new Date(post.created_at).toISOString()}"
updated_at: "${new Date(post.updated_at).toISOString()}"
published: true
---`;
}

async function migratePostsToMDX() {
  let connection;

  try {
    // Connexion à la base de données
    connection = await mysql.createConnection(dbConfig);
    console.log("Connecté à la base de données MySQL");

    // Récupérer les catégories (si vous avez une table categories)
    let categories = {};
    try {
      const [categoryRows] = await connection.execute(
        "SELECT id, name FROM categories"
      );
      categories = categoryRows.reduce((acc, cat) => {
        acc[cat.id] = cat.name;
        return acc;
      }, {});
    } catch (error) {
      console.log("Table categories non trouvée, utilisation des IDs");
    }

    // Récupérer tous les posts
    const [posts] = await connection.execute(
      "SELECT * FROM posts ORDER BY created_at DESC"
    );
    console.log(`${posts.length} posts trouvés`);

    // Créer le dossier content/posts s'il n'existe pas
    const postsDir = path.join(process.cwd(), "content", "posts");
    // console.log(
    //   "   - Repertoire des articles : content/*/*.mdx (articles de blog) : ",
    //   postsDir
    // );
    fs.mkdir(postsDir, { recursive: true });

    // Traiter chaque post
    for (const post of posts) {
      try {
        // Nettoyer le contenu
        const cleanContent = cleanHtmlContent(post.body);

        // Créer le frontmatter
        const frontmatter = createFrontmatter(post, categories);

        // Combiner frontmatter et contenu
        const mdxContent = `${frontmatter}

${cleanContent}`;

        // Créer le nom de fichier
        const fileName = `${sanitizeFileName(post.slug)}.mdx`;
        const filePath = path.join(postsDir, fileName);

        // Écrire le fichier MDX
        await fs.writeFile(filePath, mdxContent, "utf8");
        console.log(`✅ Post migré: ${fileName}`);
      } catch (error) {
        console.error(
          `❌ Erreur lors de la migration du post ${post.id}:`,
          error.message
        );
      }
    }

    console.log("🎉 Migration terminée!");
  } catch (error) {
    console.error("Erreur de migration:", error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Fonction pour migrer les images
async function migrateImages() {
  const connection = await mysql.createConnection(dbConfig);
  const [posts] = await connection.execute(
    'SELECT photo FROM posts WHERE photo IS NOT NULL AND photo != ""'
  );

  const publicDir = path.join(process.cwd(), "public");
  const imagePromises = posts.map(async (post) => {
    const imagePath = post.photo;
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
}

// Exécuter la migration
// if (require.main === module) {
//   migratePostsToMDX()
//     .then(() => {
//       console.log(
//         "Voulez-vous également migrer les images? Décommentez la ligne suivante:"
//       );
//       // return migrateImages();
//     })
//     .catch(console.error);
// }

export { migratePostsToMDX, migrateImages };
