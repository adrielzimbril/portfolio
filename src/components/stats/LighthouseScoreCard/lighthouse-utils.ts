import type { LighthouseScores } from "@/lib/stats/types";

export function getScoreColor(score: number) {
  if (score === 100) {
    return {
      bar: "bg-green-600",
      barBg: "bg-green-600/10",
      text: "text-green-600",
      glow: "shadow-green-600/60",
      squircle: "squircle-green-600",
      iconColor: "text-green-600",
    };
  }
  if (score >= 90) {
    return {
      bar: "bg-green-400",
      barBg: "bg-green-400/10",
      text: "text-green-400",
      glow: "shadow-green-400/60",
      squircle: "squircle-green-400",
      iconColor: "text-green-400",
    };
  }
  if (score >= 70) {
    return {
      bar: "bg-blue-500",
      barBg: "bg-blue-500/10",
      text: "text-blue-500",
      glow: "shadow-blue-500/60",
      squircle: "squircle-blue-500",
      iconColor: "text-blue-500",
    };
  }
  if (score >= 50) {
    return {
      bar: "bg-amber-500",
      barBg: "bg-amber-500/10",
      text: "text-amber-500",
      glow: "shadow-amber-500/60",
      squircle: "squircle-amber-500",
      iconColor: "text-amber-500",
    };
  }
  if (score >= 25) {
    return {
      bar: "bg-yellow-500",
      barBg: "bg-yellow-500/10",
      text: "text-yellow-500",
      glow: "shadow-yellow-500/60",
      squircle: "squircle-yellow-500",
      iconColor: "text-yellow-500",
    };
  }
  return {
    bar: "bg-destructive",
    barBg: "bg-destructive/10",
    text: "text-destructive",
    glow: "shadow-destructive/60",
    squircle: "squircle-destructive",
    iconColor: "text-destructive",
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
