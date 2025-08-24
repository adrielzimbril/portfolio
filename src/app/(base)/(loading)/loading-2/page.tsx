import React from "react";
import { GenericLoadingPage } from "./content";
import Layout from "../layout";

export default function LoadingPage() {
  return (
    <GenericLoadingPage
      title="Chargement en cours..."
      subtitle="Nous préparons votre contenu"
      emoji="⚡"
    />
  );
}
