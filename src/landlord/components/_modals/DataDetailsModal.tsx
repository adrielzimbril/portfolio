"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogSeparator,
  DialogTitle,
} from "@/components/ui/dialog";
import { StatusPill } from "../AdminPrimitives";
import { Locale } from "@/types/enum";
import { formatDateTimePremium, formatLabel, formatReaction } from "../admin-utils";

export function DataDetailsModal({
  open,
  onOpenChange,
  title = "Détails de l'entrée",
  data,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  data: Record<string, any> | null;
}) {
  if (!data) return null;

  const locales = Object.values(Locale) as string[];

  const isTranslationObject = (value: any) => {
    if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
    const keys = Object.keys(value);
    if (keys.length === 0) return false;
    return keys.every((key) => locales.includes(key));
  };

  const isImageUrl = (value: any) => {
    if (typeof value !== "string") return false;
    const lower = value.toLowerCase();

    // Standard extensions
    if (lower.match(/\.(jpeg|jpg|gif|png|webp|svg|avif)/i)) return true;

    // Common CDNs and keywords
    const imagePatterns = [
      "googleusercontent.com",
      "gravatar.com",
      "githubusercontent.com",
      "discordapp.com",
      "twimg.com",
      "cloudinary.com",
      "imgix.net",
      "avatar",
      "image",
      "profile_photo",
    ];

    if (imagePatterns.some((pattern) => lower.includes(pattern))) {
      return lower.startsWith("http") || lower.startsWith("/api/");
    }

    return false;
  };

  const isDateUrl = (value: any) => {
    if (typeof value !== "string") return false;
    // Basic ISO 8601 check (simplified)
    return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(value);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="xl" variant="modern">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogSeparator />
        <ScrollArea className="max-h-[min(640px,75dvh)] w-full py-2" scrollbarGutter>
          <div className="grid min-w-0 gap-6 px-1">
            {Object.entries(data).map(([key, value]) => {
              const isImage = isImageUrl(value);
              const isTranslation = isTranslationObject(value);
              const isDate = !isImage && !isTranslation && isDateUrl(value);
              const isReaction =
                !isImage &&
                !isTranslation &&
                !isDate &&
                (key.toLowerCase().includes("reaction") || key.toLowerCase() === "type");
              const isJson =
                !isTranslation &&
                !isDate &&
                !isReaction &&
                typeof value === "object" &&
                value !== null;

              return (
                <div key={key} className="group space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-black/25 transition-colors group-hover:text-black/40">
                    {formatLabel(key)}
                  </p>

                  {isImage ? (
                    <div className="relative aspect-video max-h-48 w-full overflow-hidden rounded-3xl border border-black/5 bg-black/[0.02]">
                      <img
                        src={value}
                        alt={key}
                        className="size-full object-contain p-2"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://ui-avatars.com/api/?name=Error&background=f87171&color=fff";
                        }}
                      />
                    </div>
                  ) : isTranslation ? (
                    <div className="grid min-w-0 gap-2">
                      {Object.entries(value).map(([lang, text]) => (
                        <div
                          key={lang}
                          className="flex flex-col gap-1 rounded-2xl border border-black/5 bg-black/[0.01] p-3 text-sm transition-all hover:bg-black/[0.03]"
                        >
                          <div className="flex items-center gap-2">
                            <StatusPill tone="neutral">
                              {lang.toUpperCase()}
                            </StatusPill>
                          </div>
                          <p className="whitespace-pre-wrap break-words leading-relaxed text-black/70">
                            {String(text) || "—"}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="min-w-0 rounded-2xl border border-black/5 bg-black/[0.015] p-4 text-sm transition-all hover:bg-black/[0.03] hover:border-black/10">
                      {isJson ? (
                        <pre className="overflow-x-auto whitespace-pre-wrap rounded-lg font-mono text-[11px] leading-relaxed text-black/60">
                          {JSON.stringify(value, null, 2)}
                        </pre>
                      ) : isDate ? (
                        <p className="font-semibold leading-relaxed text-black/75">
                          {formatDateTimePremium(value)}
                        </p>
                      ) : isReaction ? (
                        <p className="font-semibold leading-relaxed text-black/75">
                          {formatReaction(String(value))}
                        </p>
                      ) : (
                        <p className="whitespace-pre-wrap break-all font-medium leading-relaxed text-black/70 md:break-words">
                          {String(value) || "—"}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </ScrollArea>
        <DialogFooter className="mt-4">
          <Button variant="outline" asPointer onClick={() => onOpenChange(false)}>
            Fermer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
