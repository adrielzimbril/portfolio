"use client";
import React, { useState, useEffect } from "react";
import { HeaderSection } from "./sections/HeaderSection";
import { MyThoughtsSection } from "./sections/MyThoughtsSection";
import { CallToAction } from "@/components/shared/pages/shared/call-to-action";
import { getAllPosts } from "@/module/content/utils/lib/posts";
import { PreviewItem } from "@/types";

export default function MyThoughts() {
  const [posts, setPosts] = useState<PreviewItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Charger les données côté client
  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await getAllPosts();
        setPosts(data as unknown as PreviewItem[]);
      } catch (err) {
        setError("Erreur lors du chargement des posts");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    loadPosts();
  }, []);

  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;
  return (
    <>
      <HeaderSection />
      <MyThoughtsSection key={posts.length} initialData={posts} />
      <CallToAction isPage />
    </>
  );
}
