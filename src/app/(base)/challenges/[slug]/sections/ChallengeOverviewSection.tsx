import { PageHero } from "@/components/shared/pages/shared/page-hero";
import { SectionLayout } from "@/components/shared/sections/layout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ChallengeItem } from "@/data/challenges-masterclasses";
import { getHumanDate } from "@/utils";

export function ChallengeOverviewSection({
  challenge,
}: {
  challenge: ChallengeItem;
}) {
  return (
    <>
      <PageHero
        title={challenge.title}
        description={challenge.tagline}
        badge="Challenge detail"
        imagePath={{ emoji: "🎯" }}
        isMobileShowed
      />
      <SectionLayout>
        <Card className="w-full squircle squircle-b-base squircle-smooth-xl border">
          <CardContent className="p-5 md:p-6 space-y-4">
            <div className="rounded-2xl border p-4 bg-b-white-invert-fr">
              <p className="text-sm font-medium text-b-base-accent">
                {challenge.posterLabel}
              </p>
            </div>
            <p className="text-b-white-invert-sec">{challenge.details}</p>
            <div className="flex gap-2 flex-wrap">
              <Badge>Début: {getHumanDate(challenge.startDate)}</Badge>
              <Badge variant="secondary">
                Fin soumissions: {getHumanDate(challenge.submissionDeadline)}
              </Badge>
              <Badge variant="secondary">
                Fin challenge: {getHumanDate(challenge.endDate)}
              </Badge>
            </div>
            <div className="space-y-2">
              <p className="font-medium">Récompenses</p>
              <ul className="space-y-1 text-b-white-invert-sec">
                {challenge.rewards.map((reward) => (
                  <li key={reward}>• {reward}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </SectionLayout>
    </>
  );
}

