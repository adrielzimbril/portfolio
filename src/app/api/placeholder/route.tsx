// app/api/placeholder/route.ts
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Paramètres avec valeurs par défaut
    const width = parseInt(searchParams.get("width") || "600");
    const height = parseInt(searchParams.get("height") || "400");
    const text = searchParams.get("text") || `${width}×${height}`;
    const bgColor = searchParams.get("bg") || "#f3f4f6";
    const textColor = searchParams.get("color") || "#374151";
    const fontSize = parseInt(searchParams.get("size") || "24");
    const format = searchParams.get("format") || "modern"; // modern, minimal, gradient, pattern

    // Validation des dimensions
    const maxWidth = 2048;
    const maxHeight = 2048;
    const finalWidth = Math.min(Math.max(width, 100), maxWidth);
    const finalHeight = Math.min(Math.max(height, 100), maxHeight);

    // Styles selon le format
    const getBackgroundStyle = (): React.CSSProperties => {
      switch (format) {
        case "gradient":
          return {
            background: `linear-gradient(135deg, ${bgColor}, ${adjustColor(
              bgColor,
              -30
            )})`,
          };
        case "pattern":
          return {
            background: bgColor,
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)",
            backgroundSize: "20px 20px",
          };
        case "minimal":
          return {
            background: "#ffffff",
            border: `2px dashed ${bgColor}`,
          };
        default: // modern
          return {
            background: `linear-gradient(135deg, ${bgColor}40, ${bgColor})`,
          };
      }
    };

    return new ImageResponse(
      (
        <div
          style={{
            width: finalWidth,
            height: finalHeight,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            fontFamily: "Inter, system-ui, sans-serif",
            ...getBackgroundStyle(),
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
            {/* Icône ou emoji selon le format */}
            {format === "modern" && (
              <div
                style={{
                  fontSize: fontSize * 1.5,
                  marginBottom: "10px",
                  opacity: 0.7,
                }}
              >
                🖼️
              </div>
            )}

            {/* Texte principal */}
            <div
              style={{
                fontSize: fontSize,
                fontWeight: "bold",
                color: textColor,
                fontFamily: "Inter, system-ui, sans-serif",
                marginBottom: "8px",
                maxWidth: finalWidth - 40,
                wordWrap: "break-word",
              }}
            >
              {text}
            </div>

            {/* Dimensions */}
            <div
              style={{
                fontSize: Math.max(fontSize * 0.6, 12),
                color: adjustColor(textColor, 50),
                fontFamily: "Inter, system-ui, sans-serif",
                opacity: 0.8,
              }}
            >
              {finalWidth} × {finalHeight}
            </div>
          </div>

          {/* Éléments décoratifs selon le format */}
          {format === "modern" && (
            <>
              {/* Cercles décoratifs */}
              <div
                style={{
                  position: "absolute",
                  top: "20px",
                  left: "20px",
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: `${textColor}20`,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "20px",
                  right: "20px",
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  background: `${textColor}15`,
                }}
              />
            </>
          )}
        </div>
      ),
      {
        width: finalWidth,
        height: finalHeight,
      }
    );
  } catch (error) {
    console.error("Error generating placeholder:", error);

    // Image d'erreur simple
    return new ImageResponse(
      (
        <div
          style={{
            width: 600,
            height: 400,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#fee2e2",
            color: "#dc2626",
            fontSize: "20px",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          ❌ Erreur de génération
        </div>
      ),
      {
        width: 600,
        height: 400,
      }
    );
  }
}

// Fonction utilitaire pour ajuster la couleur
function adjustColor(color: string, amount: number): string {
  // Convertit une couleur hex en RGB et ajuste la luminosité
  const hex = color.replace("#", "");
  const num = parseInt(hex, 16);
  const r = Math.max(0, Math.min(255, (num >> 16) + amount));
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00ff) + amount));
  const b = Math.max(0, Math.min(255, (num & 0x0000ff) + amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}
