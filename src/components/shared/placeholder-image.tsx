// components/PlaceholderImage.tsx
"use client";

import React, { useState } from "react";
import {
  usePlaceholder,
  PlaceholderTheme,
  PlaceholderFormat,
} from "@/hooks/usePlaceholder";

interface PlaceholderImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  // Dimensions
  width?: number;
  height?: number;

  // Contenu
  text?: string;

  // Style
  bg?: string;
  color?: string;
  theme?: PlaceholderTheme;
  format?: PlaceholderFormat;

  // Comportement
  fallback?: string;
  showDimensions?: boolean;
  responsive?: boolean;

  // Override className pour éviter les conflits
  className?: string;
}

export function PlaceholderImage({
  width = 600,
  height = 400,
  text,
  bg,
  color,
  theme = "default",
  format,
  fallback,
  showDimensions = false,
  responsive = false,
  className = "",
  alt,
  ...imgProps
}: PlaceholderImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Utilisation du hook sans récursion
  const { url } = usePlaceholder({
    width,
    height,
    text: showDimensions ? `${text || ""} ${width}×${height}`.trim() : text,
    bg,
    color,
    theme,
    format,
  });

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  // URL finale à utiliser
  const finalUrl = hasError && fallback ? fallback : url;

  // Classes CSS responsives
  const responsiveClass = responsive ? "w-full h-auto" : "";
  const loadingClass = isLoading ? "animate-pulse bg-gray-200" : "";
  const errorClass = hasError ? "border-2 border-red-300 border-dashed" : "";

  const finalClassName = [className, responsiveClass, loadingClass, errorClass]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="relative inline-block">
      <img
        src={finalUrl}
        alt={alt || `Placeholder image ${width}x${height}`}
        width={responsive ? undefined : width}
        height={responsive ? undefined : height}
        onLoad={handleLoad}
        onError={handleError}
        className={finalClassName}
        {...imgProps}
      />

      {/* Overlay d'erreur */}
      {hasError && !fallback && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-red-50 text-red-600"
          style={{ minWidth: width, minHeight: height }}
        >
          <div className="text-center">
            <div className="text-2xl mb-1">❌</div>
            <div className="text-sm">Image Error</div>
          </div>
        </div>
      )}

      {/* Indicateur de chargement */}
      {isLoading && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-gray-100"
          style={{ minWidth: width, minHeight: height }}
        >
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600"></div>
        </div>
      )}
    </div>
  );
}

// Composant simplifié pour éviter les erreurs
export function SimplePlaceholderImage({
  width = 300,
  height = 200,
  text = "",
  theme = "default" as PlaceholderTheme,
  className = "",
  alt,
}: {
  width?: number;
  height?: number;
  text?: string;
  theme?: PlaceholderTheme;
  className?: string;
  alt?: string;
}) {
  // Génération directe de l'URL pour éviter tout problème
  const url = `/api/img/${width}x${height}${
    text || theme !== "default" ? "?" : ""
  }${new URLSearchParams({
    ...(text && { text }),
    ...(theme && theme !== "default" && { theme }),
  }).toString()}`;

  return (
    <img
      src={url}
      alt={alt || `${text || "Placeholder"} ${width}x${height}`}
      width={width}
      height={height}
      className={`rounded-lg ${className}`}
    />
  );
}

// Composant pour la galerie d'exemples - version simplifiée
export function PlaceholderGallery() {
  const examples = [
    {
      width: 300,
      height: 200,
      text: "Hero Image",
      theme: "colorful" as PlaceholderTheme,
    },
    {
      width: 400,
      height: 300,
      text: "Product Shot",
      theme: "minimal" as PlaceholderTheme,
    },
    {
      width: 350,
      height: 250,
      text: "Dashboard",
      theme: "dark" as PlaceholderTheme,
    },
    {
      width: 380,
      height: 280,
      text: "Banner",
      theme: "success" as PlaceholderTheme,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {examples.map((example, index) => (
        <div key={index} className="space-y-2">
          <SimplePlaceholderImage {...example} className="shadow-lg" />
          <p className="text-sm text-gray-600">
            {example.width}×{example.height} - {example.theme} theme
            {example.text && ` - "${example.text}"`}
          </p>
        </div>
      ))}
    </div>
  );
}
