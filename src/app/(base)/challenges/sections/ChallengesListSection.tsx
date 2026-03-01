import { SectionLayout } from "@/components/shared/sections/layout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/components/ui/link";
import { challenges, isSubmissionClosed } from "@/data/challenges-masterclasses";
import { getHumanDate } from "@/utils";

export function ChallengesListSection() {
  return (
    <SectionLayout>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
        {challenges.map((challenge) => (
          <Card
            key={challenge.slug}
            className="squircle squircle-b-base squircle-smooth-xl border"
          >
            <CardContent className="p-5 md:p-6 space-y-4">
              <div className="rounded-2xl border p-4 bg-b-white-invert-fr">
                <p className="text-sm font-medium text-b-base-accent">
                  {challenge.posterLabel}
                </p>
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-semibold">{challenge.title}</h2>
                <p className="text-sm text-b-white-invert-sec">
                  {challenge.tagline}
                </p>
                <p className="text-sm text-b-white-invert-sec">
                  {challenge.details}
                </p>
              </div>
              <div className="flex gap-2 flex-wrap">
                <Badge>{getHumanDate(challenge.startDate)}</Badge>
                <Badge variant="secondary">
                  Deadline: {getHumanDate(challenge.submissionDeadline)}
                </Badge>
                <Badge variant={isSubmissionClosed(challenge) ? "secondary" : "default"}>
                  {isSubmissionClosed(challenge) ? "Soumissions fermées" : "Soumissions ouvertes"}
                </Badge>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Récompenses</p>
                <ul className="text-sm text-b-white-invert-sec space-y-1">
                  {challenge.rewards.map((reward) => (
                    <li key={reward}>• {reward}</li>
                  ))}
                </ul>
              </div>
              <Link href={`/challenges/${challenge.slug}`} likeButton whileTap>
                Voir le challenge
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </SectionLayout>
  );
}

