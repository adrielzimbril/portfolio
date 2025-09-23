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

// Function to clean SVG attributes that are not valid in React
function cleanSvgAttributes(svgContent) {
  // Replace hyphens with camelCase version
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

// Function to convert an SVG to a React TSX component
async function convertSvgToTsx(svgPath, componentName) {
  try {
    // Read the content of the SVG file
    let svgContent = await readFile(svgPath, "utf-8");

    // Clean SVG attributes that are not valid in React
    svgContent = cleanSvgAttributes(svgContent);

    // Extract the SVG content (without the opening and closing tags)
    const svgInnerContent = svgContent
      .replace(/<svg[^>]*>/, "")
      .replace(/<\/svg>/, "")
      .trim();

    // Create the TSX component content
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

// Main function
async function main() {
  try {
    // Create the destination directory if it doesn't exist
    await mkdir(ICONS_DEST_DIR, { recursive: true });

    // Read all SVG files from the source directory
    const files = await fs.readdir(ICONS_SRC_DIR);
    const svgFiles = files.filter((file) => file.endsWith(".svg"));

    console.log(`Found ${svgFiles.length} SVG files to convert.`);

    // Convert each SVG file to a React TSX component
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

    // Create an index.ts file to export all components
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

// Execute the script
main();
