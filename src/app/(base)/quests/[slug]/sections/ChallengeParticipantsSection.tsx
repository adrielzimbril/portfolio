"use client";

import { useEffect, useState } from "react";
import { SectionLayout } from "@/components/shared/sections/layout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/components/ui/link";
import { apiRoutes } from "@/data/api-routes";

type Participant = {
  id: string;
  name: string;
  work_title: string;
  work_url: string;
  portfolio_url: string | null;
  figma_url: string | null;
  poster_url: string | null;
  winner_rank: number | null;
};

export function ChallengeParticipantsSection({
  challengeSlug,
}: {
  challengeSlug: string;
}) {
  const [participants, setParticipants] = useState<Participant[]>([]);

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch(apiRoutes.questsParticipants(challengeSlug).link);
        const data = await res.json();
        setParticipants(data.participants || []);
      } catch {
        setParticipants([]);
      }
    };
    run();
  }, [challengeSlug]);

  return (
    <SectionLayout>
      <div className="space-y-4 w-full">
        <h2 className="h4">Participants et vainqueurs</h2>
        {participants.length === 0 && (
          <Card className="w-full squircle squircle-b-base squircle-smooth-xl border">
            <CardContent className="p-5 md:p-6 text-b-white-invert-sec">
              Les participants seront affiches ici depuis le backend.
            </CardContent>
          </Card>
        )}
        {participants.map((participant) => (
          <Card
            key={participant.id}
            className="w-full squircle squircle-b-base squircle-smooth-xl border"
          >
            <CardContent className="p-5 md:p-6 space-y-3">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div>
                  <p className="font-semibold">{participant.name}</p>
                  <p className="text-sm text-b-white-invert-sec">
                    {participant.work_title}
                  </p>
                </div>
                {participant.winner_rank && <Badge>🏆 Top {participant.winner_rank}</Badge>}
              </div>
              <div className="flex flex-wrap gap-2">
                <Link href={participant.work_url} likeButton whileTap>
                  Travail
                </Link>
                {participant.portfolio_url && (
                  <Link href={participant.portfolio_url} likeButton whileTap variant="secondary">
                    Portfolio
                  </Link>
                )}
                {participant.figma_url && (
                  <Link href={participant.figma_url} likeButton whileTap variant="secondary">
                    Figma
                  </Link>
                )}
                {participant.poster_url && (
                  <Link href={participant.poster_url} likeButton whileTap variant="secondary">
                    Affiche
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

