import type { LighthouseScores } from "@/lib/stats/types";

export function getScoreColor(score: number) {
  if (score === 100) {
    return {
      bar: "bg-yellow-400",
      barBg: "bg-yellow-400/10",
      text: "text-yellow-400",
      glow: "shadow-yellow-400/20",
    };
  }
  if (score >= 90) {
    return {
      bar: "bg-primary",
      barBg: "bg-primary/10",
      text: "text-primary",
      glow: "shadow-primary/20",
    };
  }
  if (score >= 70) {
    return {
      bar: "bg-green-500",
      barBg: "bg-green-500/10",
      text: "text-green-500",
      glow: "shadow-green-500/20",
    };
  }
  if (score >= 50) {
    return {
      bar: "bg-accent",
      barBg: "bg-accent/10",
      text: "text-accent",
      glow: "shadow-accent/20",
    };
  }
  if (score >= 25) {
    return {
      bar: "bg-orange-500",
      barBg: "bg-orange-500/10",
      text: "text-orange-500",
      glow: "shadow-orange-500/20",
    };
  }
  return {
    bar: "bg-destructive",
    barBg: "bg-destructive/10",
    text: "text-destructive",
    glow: "shadow-destructive/20",
  };
}

export function getOverallScore(scores: LighthouseScores) {
  const avg =
    (scores.performance +
      scores.accessibility +
      scores.bestPractices +
      scores.seo) /
    4;
  return Math.round(avg);
}
