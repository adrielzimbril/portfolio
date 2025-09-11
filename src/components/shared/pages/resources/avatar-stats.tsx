import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AvatarGroup } from "@/components/shiro/builder/avatar-group";
import { cn } from "@/utils/utils";
import { ResourceType } from "@/types";
import BoringAvatar from "boring-avatars";
import { getImageUrl, pickRandomColor, pickRandomColorCode } from "@/utils";
import { useMemo } from "react";

interface StatsProps {
  avatars?: string[];
  userCount: number;
  resourceType: ResourceType;
  colorName?: string;
  className?: string;
}

export function AvatarsStats({
  avatars,
  userCount,
  resourceType,
  colorName,
  className,
}: StatsProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-1 py-0.5 squircle squircle-7xl",
        colorName ?? "squircle-white",
        className
      )}
    >
      <UserAvatars avatars={avatars} userCount={userCount} />
      <UserCount count={userCount} resourceType={resourceType} />
    </div>
  );
}

function UserAvatars({
  avatars,
  userCount,
}: {
  avatars?: string[];
  userCount?: number;
}) {
  const numPeople = avatars?.length ?? userCount ?? 0;

  // ✅ Generate all colors in one time, outside of .map()
  const colorSets: string[][] = useMemo(() => {
    return Array.from({ length: numPeople }).map(() =>
      Array.from({ length: 8 }).map(() => pickRandomColorCode() ?? "#ffffff")
    );
  }, [numPeople]);

  return (
    <div className="inline-flex items-start">
      <AvatarGroup numPeople={numPeople}>
        {Array.from({ length: numPeople })
          .slice(0, 5)
          .map((_, index) => {
            return (
              <Avatar key={index} className="w-6 h-6">
                <AvatarImage src={getImageUrl(avatars?.[index] ?? "")} />
                <AvatarFallback className={cn("relative pointer-events-none")}>
                  <BoringAvatar
                    name={
                      avatars?.[index]?.slice(8)?.replace(".png", "") ??
                      (index + 1).toString()
                    }
                    colors={colorSets[index] ?? []}
                    variant="beam"
                  />
                </AvatarFallback>
              </Avatar>
            );
          })}
      </AvatarGroup>
    </div>
  );
}

function UserCount({
  count,
  resourceType,
}: {
  count: number;
  resourceType: ResourceType;
}) {
  return (
    <span className="relative flex items-center gap-1 font-bold text-sm text-zinc-600">
      {count > 2 ? `+${count}` : count}{" "}
      {resourceType === ResourceType.COURSE
        ? "Étudiants 🧑‍🎓"
        : resourceType === ResourceType.EBOOK
          ? "Lecteurs 📖"
          : "Participants 🍿"}
    </span>
  );
}
