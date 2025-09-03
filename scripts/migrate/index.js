// scripts/migrate-all.js
import "module-alias/register.js";
import { migratePostsToMDX } from "./blog/index.js";
import { migrateProjectsToMDX } from "./projects/index.js";

async function migrateAll() {
  console.log("🚀 Début de la migration complète...\n");

  try {
    console.log("📝 Migration des articles de blog...");
    await migratePostsToMDX()
      .then(() => {
        console.log(
          "Voulez-vous également migrer les images? Décommentez la ligne suivante:"
        );
        // return migrateImages();
      })
      .catch(console.error);

    console.log("\n🎨 Migration des projets...");
    await migrateProjectsToMDX()
      .then(() => {
        console.log(
          "Voulez-vous également migrer les images? Décommentez la ligne suivante:"
        );
        // return migrateImages();
      })
      .catch(console.error);

    console.log("\n🎉 Migration complète terminée avec succès!");
    console.log("\n📁 Fichiers créés:");
    console.log("   - content/posts/*.mdx (articles de blog)");
    console.log("   - content/projects/*.mdx (projets portfolio)");
    console.log("\n🔧 Prochaines étapes:");
    console.log("   1. Vérifiez les fichiers MDX générés");
    console.log("   2. Copiez vos images vers le dossier public/");
    console.log("   3. Lancez: npm run dev");
    console.log("   4. Testez vos pages /blog et /portfolio");
  } catch (error) {
    console.error("❌ Erreur durant la migration:", error);
  }
}

migrateAll();

export { migrateAll };
