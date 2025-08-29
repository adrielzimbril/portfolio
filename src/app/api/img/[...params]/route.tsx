// app/api/img/[...params]/route.ts
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(
  request: NextRequest,
  { params }: { params: { params: string[] } }
) {
  try {
    console.log("API called with params:", params);

    // Extraire les dimensions depuis l'URL
    let width = 600;
    let height = 400;

    if (params.params && params.params.length > 0) {
      const firstParam = params.params[0];
      if (firstParam.includes("x")) {
        const [w, h] = firstParam.split("x");
        width = parseInt(w) || 600;
        height = parseInt(h) || 400;
      } else {
        width = parseInt(firstParam) || 600;
        height = params.params[1] ? parseInt(params.params[1]) || 400 : width;
      }
    }

    // Extraire les paramètres de requête
    const { searchParams } = new URL(request.url);
    const text = searchParams.get("text") || "";
    const theme = searchParams.get("theme") || "default";

    // Validation des dimensions
    width = Math.min(Math.max(width, 50), 1200);
    height = Math.min(Math.max(height, 50), 800);

    // Couleurs selon le thème
    let bgColor = "#e5e7eb";
    let textColor = "#374151";
    let accentColor = "#6366f1";

    switch (theme) {
      case "dark":
        bgColor = "#1f2937";
        textColor = "#f9fafb";
        accentColor = "#60a5fa";
        break;
      case "colorful":
        bgColor = "#fbbf24";
        textColor = "#1f2937";
        accentColor = "#ef4444";
        break;
      case "minimal":
        bgColor = "#ffffff";
        textColor = "#6b7280";
        accentColor = "#d1d5db";
        break;
      case "success":
        bgColor = "#dcfce7";
        textColor = "#166534";
        accentColor = "#22c55e";
        break;
    }

    // Calculer la taille de police
    const fontSize = Math.min(width, height) / 20;
    const finalFontSize = Math.max(16, Math.min(fontSize, 48));

    console.log("Generating image:", { width, height, text, theme });

    return new ImageResponse(
      (
        <div
          style={{
            width: width,
            height: height,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: bgColor,
            fontFamily: "system-ui, sans-serif",
            position: "relative",
          }}
        >
          {/* Contenu principal */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              padding: "20px",
            }}
          >
            {text ? (
              <>
                <div
                  style={{
                    fontSize: finalFontSize,
                    fontWeight: "600",
                    color: textColor,
                    marginBottom: "10px",
                    maxWidth: width - 40,
                  }}
                >
                  {text}
                </div>
                <div
                  style={{
                    fontSize: finalFontSize * 0.6,
                    color: textColor,
                    opacity: 0.7,
                  }}
                >
                  {width} × {height}
                </div>
              </>
            ) : (
              <>
                <div
                  style={{
                    fontSize: finalFontSize * 0.8,
                    marginBottom: "8px",
                    opacity: 0.6,
                  }}
                >
                  📷
                </div>
                <div
                  style={{
                    fontSize: finalFontSize,
                    fontWeight: "600",
                    color: textColor,
                  }}
                >
                  {width} × {height}
                </div>
              </>
            )}
          </div>

          {/* Barre d'accent en bas */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "4px",
              backgroundColor: accentColor,
              opacity: 0.8,
            }}
          />
        </div>
      ),
      {
        width: width,
        height: height,
      }
    );
  } catch (error) {
    console.error("Error in placeholder API:", error);

    // Image d'erreur de base
    return new Response(
      `<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#fee2e2"/>
        <text x="50%" y="50%" text-anchor="middle" fill="#dc2626" font-size="16" font-family="system-ui">
          Error generating image
        </text>
      </svg>`,
      {
        headers: {
          "Content-Type": "image/svg+xml",
        },
      }
    );
  }
}
