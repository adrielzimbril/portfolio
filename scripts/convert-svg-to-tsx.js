const fs = require("fs").promises;
const path = require("path");
const { readFile, mkdir, writeFile } = fs;

const ICONS_SRC_DIR = path.join(
  __dirname,
  "../src/components/shared/icons/icons-svg"
);
const ICONS_DEST_DIR = path.join(
  __dirname,
  "../src/components/shared/icons/break-icons"
);

// Fonction pour nettoyer les attributs SVG non valides en React
function cleanSvgAttributes(svgContent) {
  // Remplacer les tirets par la version en camelCase
  return svgContent
    .replace(/\b(stroke|fill|stop)-opacity=/g, "$1Opacity=")
    .replace(/\b(stroke|fill|stop)-width=/g, "$1Width=")
    .replace(/\b(stroke|fill|stop)-color=/g, "$1Color=")
    .replace(/\b(stroke|fill|stop)-linecap=/g, "$1Linecap=")
    .replace(/\b(stroke|fill|stop)-linejoin=/g, "$1Linejoin=")
    .replace(/\b(stroke|fill|stop)-miterlimit=/g, "$1Miterlimit=")
    .replace(/\b(stroke|fill|stop)-dasharray=/g, "$1Dasharray=")
    .replace(/\b(stroke|fill|stop)-dashoffset=/g, "$1Dashoffset=")
    .replace(/\bclip-path=/g, "clipPath=")
    .replace(/\bgradientTransform=/g, "gradientTransform=")
    .replace(/\bgradientUnits=/g, "gradientUnits=")
    .replace(/\bxmlns:xlink=/g, "xmlnsXlink=")
    .replace(/\bxlink:href=/g, "xlinkHref=")
    .replace(/\bxml:space=/g, "xmlSpace=")
    .replace(/\btext-anchor=/g, "textAnchor=")
    .replace(/\bfont-family=/g, "fontFamily=")
    .replace(/\bfont-size=/g, "fontSize=")
    .replace(/\bfont-weight=/g, "fontWeight=")
    .replace(/\bletter-spacing=/g, "letterSpacing=")
    .replace(/\bword-spacing=/g, "wordSpacing=")
    .replace(/\btext-decoration=/g, "textDecoration=")
    .replace(/\bwriting-mode=/g, "writingMode=")
    .replace(/\bdominant-baseline=/g, "dominantBaseline=")
    .replace(/\bbaseline-shift=/g, "baselineShift=");
}

// Fonction pour convertir un SVG en composant React TSX
async function convertSvgToTsx(svgPath, componentName) {
  try {
    // Lire le contenu du fichier SVG
    let svgContent = await readFile(svgPath, "utf-8");

    // Nettoyer les attributs SVG non valides en React
    svgContent = cleanSvgAttributes(svgContent);

    // Extraire le contenu du SVG (sans la balise d'ouverture et de fermeture)
    const svgInnerContent = svgContent
      .replace(/<svg[^>]*>/, "")
      .replace(/<\/svg>/, "")
      .trim();

    // Créer le contenu du composant TSX
    const tsxContent = `import React from 'react';

interface ${componentName}Props extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const ${componentName} = ({
  size = 49,
  ...props
}: ${componentName}Props) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 49 49"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      ${svgInnerContent}
    </svg>
  );
};
`;
    return tsxContent;
  } catch (error) {
    console.error(`Error converting ${svgPath}:`, error);
    return null;
  }
}

// Fonction principale
async function main() {
  try {
    // Créer le répertoire de destination s'il n'existe pas
    await mkdir(ICONS_DEST_DIR, { recursive: true });

    // Lire tous les fichiers SVG du répertoire source
    const files = await fs.readdir(ICONS_SRC_DIR);
    const svgFiles = files.filter((file) => file.endsWith(".svg"));

    console.log(`Found ${svgFiles.length} SVG files to convert.`);

    // Convertir chaque fichier SVG en composant TSX
    for (const svgFile of svgFiles) {
      const svgPath = path.join(ICONS_SRC_DIR, svgFile);
      const componentName =
        svgFile
          .replace(/\.svg$/, "")
          .split(/[-_]/)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join("") + "Icon";

      const componentFileName =
        svgFile
          .replace(/\.svg$/, "")
          .split(/[-_]/)
          .join("-") + "-icon";

      console.log(`Converting ${svgFile} to ${componentFileName}.tsx`);

      const tsxContent = await convertSvgToTsx(svgPath, componentName);

      if (tsxContent) {
        const destPath = path.join(ICONS_DEST_DIR, `${componentFileName}.tsx`);
        await writeFile(destPath, tsxContent, "utf-8");
        console.log(`Created ${destPath}`);
      }
    }

    // Créer un fichier index.ts pour exporter tous les composants
    const indexContent =
      svgFiles
        .map((svgFile) => {
          const componentFileName =
            svgFile
              .replace(/\.svg$/, "")
              .split(/[-_]/)
              .join("-") + "-icon";
          return `export * from '@/components/shared/icons/break-icons/${componentFileName}';`;
        })
        .join("\n") + "\n";

    await writeFile(
      path.join(ICONS_DEST_DIR, "index.ts"),
      indexContent,
      "utf-8"
    );
    console.log("Created index.ts with all exports");

    console.log("\nConversion completed successfully!");
  } catch (error) {
    console.error("Error during conversion:", error);
    process.exit(1);
  }
}

// Exécuter le script
main();
