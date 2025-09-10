"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SectionBase } from "@/components/shared/pages/shared/section-base";
import { generateJwtToken, generateToken } from "@/utils/key-encrypt";

export default function HubProductValidationPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [productTitle, setProductTitle] = useState("");
  const [productType, setProductType] = useState<
    "course" | "ebook" | "video" | ""
  >("");
  const [features, setFeatures] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [productUrl, setProductUrl] = useState("");
  const [customText, setCustomText] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const productId = generateJwtToken({ action: "validate-product-id", id: 1 });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);

    try {
      const subscribedFromPage =
        typeof window !== "undefined" ? window.location.pathname : undefined;
      const res = await fetch("/api/hub/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name: name || undefined,
          phone: phone || undefined,
          productTitle,
          productType: productType || undefined,
          features: features
            ? features
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean)
            : undefined,
          coverImage: coverImage || undefined,
          productUrl: productUrl || undefined,
          customText: customText || undefined,
          subscribedFromPage,
          productId: productId,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Erreur d'envoi");
      setSuccess("Email envoyé. Vérifiez votre boîte de réception ✉️");
    } catch (err: any) {
      setError(err?.message || "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SectionBase
      sectionClassName="w-full"
      sectionContentClassName="w-full"
      cardClassName="w-full"
      cardContentClassName="w-full p-6 md:p-8"
      className="squircle squircle-white squircle-xl md:squircle-3xl squircle-smooth-xl border-0 overflow-hidden min-h-60 py-12"
    >
      <Card className="w-full squircle squircle-white squircle-smooth-xl">
        <CardContent className="p-6 md:p-8 space-y-6">
          <div>
            <h1 className="h3">Valider un produit du Hub</h1>
            <p className="text-zinc-600">
              Renseignez les informations ci-dessous pour recevoir le produit
              par email.
            </p>
          </div>

          <form
            onSubmit={onSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Nom (optionnel)</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Téléphone (optionnel)
              </label>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+33 6 12 34 56 78"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Titre du produit</label>
              <Input
                value={productTitle}
                onChange={(e) => setProductTitle(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Type de produit</label>
              <select
                className="h-10 px-3 border rounded-md"
                value={productType}
                onChange={(e) => setProductType(e.target.value as any)}
              >
                <option value="">(Optionnel)</option>
                <option value="course">Course</option>
                <option value="ebook">Ebook</option>
                <option value="video">Video</option>
              </select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">
                Fonctionnalités (séparées par des virgules)
              </label>
              <Input
                value={features}
                onChange={(e) => setFeatures(e.target.value)}
                placeholder="Ex: Guide PDF, Accès privé, 3 vidéos"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">
                Image de couverture (URL)
              </label>
              <Input
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="https://..."
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">
                Lien du produit (URL)
              </label>
              <Input
                value={productUrl}
                onChange={(e) => setProductUrl(e.target.value)}
                placeholder="https://..."
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Texte personnalisé</label>
              <Input
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder="Un message pour l'acheteur..."
              />
            </div>

            <div className="md:col-span-2">
              <Button type="submit" disabled={loading} asPointer asFull>
                {loading ? "Envoi..." : "Envoyer l'accès par email"}
              </Button>
            </div>
          </form>

          {success && <p className="text-green-600">{success}</p>}
          {error && <p className="text-red-600">{error}</p>}
        </CardContent>
      </Card>
    </SectionBase>
  );
}
