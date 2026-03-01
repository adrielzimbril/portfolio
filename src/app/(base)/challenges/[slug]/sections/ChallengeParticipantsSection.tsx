import { SectionLayout } from "@/components/shared/sections/layout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/components/ui/link";
import { ChallengeItem } from "@/data/challenges-masterclasses";

export function ChallengeParticipantsSection({
  challenge,
}: {
  challenge: ChallengeItem;
}) {
  return (
    <SectionLayout>
      <div className="space-y-4 w-full">
        <h2 className="h4">Participants</h2>
        {challenge.participants.length === 0 && (
          <Card className="w-full squircle squircle-b-base squircle-smooth-xl border">
            <CardContent className="p-5 md:p-6 text-b-white-invert-sec">
              Aucun participant publié pour le moment.
            </CardContent>
          </Card>
        )}
        {challenge.participants.map((participant, index) => (
          <Card
            key={`${participant.name}-${participant.projectTitle}-${index}`}
            className="w-full squircle squircle-b-base squircle-smooth-xl border"
          >
            <CardContent className="p-5 md:p-6 space-y-3">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div>
                  <p className="font-semibold">{participant.name}</p>
                  <p className="text-sm text-b-white-invert-sec">
                    {participant.projectTitle}
                  </p>
                </div>
                {participant.winnerRank && (
                  <Badge>🏆 Top {participant.winnerRank}</Badge>
                )}
              </div>
              {participant.posterLabel && (
                <div className="rounded-2xl border p-3 bg-b-white-invert-fr text-sm font-medium text-b-base-accent">
                  {participant.posterLabel}
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                {participant.portfolioUrl && (
                  <Link href={participant.portfolioUrl} likeButton whileTap>
                    Portfolio
                  </Link>
                )}
                {participant.figmaUrl && (
                  <Link href={participant.figmaUrl} likeButton whileTap>
                    Figma
                  </Link>
                )}
                {participant.projectUrl && (
                  <Link href={participant.projectUrl} likeButton whileTap>
                    Projet
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </SectionLayout>
  );
}

