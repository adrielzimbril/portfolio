// app/api/placeholder-svg/[...params]/route.ts
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { params: string[] } }
) {
  try {
    // Extraire dimensions
    let width = 600;
    let height = 400;

    if (params.params && params.params.length > 0) {
      const firstParam = params.params[0];
      if (firstParam.includes("x")) {
        const [w, h] = firstParam.split("x");
        width = parseInt(w) || 600;
        height = parseInt(h) || 400;
      }
    }

    // Paramètres de requête
    const { searchParams } = new URL(request.url);
    const text = searchParams.get("text") || `${width}×${height}`;
    const theme = searchParams.get("theme") || "default";

    // Validation
    width = Math.min(Math.max(width, 50), 1200);
    height = Math.min(Math.max(height, 50), 800);

    // Couleurs selon le thème
    const themes = {
      default: { bg: "#e5e7eb", text: "#374151", accent: "#6366f1" },
      dark: { bg: "#1f2937", text: "#f9fafb", accent: "#60a5fa" },
      colorful: { bg: "#fbbf24", text: "#1f2937", accent: "#ef4444" },
      minimal: { bg: "#ffffff", text: "#6b7280", accent: "#d1d5db" },
      success: { bg: "#dcfce7", text: "#166534", accent: "#22c55e" },
    };

    const currentTheme = themes[theme as keyof typeof themes] || themes.default;
    const fontSize = Math.min(width, height) / 20;

    const svg = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <!-- Background -->
        <rect width="100%" height="100%" fill="${currentTheme.bg}"/>
        
        <!-- Grid pattern for minimal theme -->
        ${
          theme === "minimal"
            ? `
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="${currentTheme.accent}" stroke-width="0.5" opacity="0.3"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)"/>
        `
            : ""
        }
        
        <!-- Main text -->
        <text 
          x="50%" 
          y="45%" 
          text-anchor="middle" 
          fill="${currentTheme.text}" 
          font-size="${Math.max(16, Math.min(fontSize, 48))}" 
          font-family="system-ui, sans-serif" 
          font-weight="600"
        >
          ${text}
        </text>
        
        <!-- Dimensions -->
        <text 
          x="50%" 
          y="60%" 
          text-anchor="middle" 
          fill="${currentTheme.text}" 
          font-size="${Math.max(12, fontSize * 0.6)}" 
          font-family="system-ui, sans-serif" 
          opacity="0.7"
        >
          ${width} × ${height}
        </text>
        
        <!-- Accent bar -->
        <rect x="0" y="${height - 4}" width="100%" height="4" fill="${
      currentTheme.accent
    }" opacity="0.8"/>
        
        <!-- Decorative elements -->
        ${
          theme === "colorful"
            ? `
        <circle cx="40" cy="40" r="15" fill="${
          currentTheme.accent
        }" opacity="0.3"/>
        <circle cx="${width - 40}" cy="${height - 40}" r="20" fill="${
                currentTheme.text
              }" opacity="0.1"/>
        `
            : ""
        }
      </svg>
    `;

    return new Response(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=31536000",
      },
    });
  } catch (error) {
    console.error("SVG generation error:", error);

    const errorSvg = `
      <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#fee2e2"/>
        <text x="50%" y="50%" text-anchor="middle" fill="#dc2626" font-size="16" font-family="system-ui">
          ❌ Error
        </text>
      </svg>
    `;

    return new Response(errorSvg, {
      headers: { "Content-Type": "image/svg+xml" },
    });
  }
}
