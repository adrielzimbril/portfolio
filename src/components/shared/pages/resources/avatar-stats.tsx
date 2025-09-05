import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AvatarGroup } from "@/components/shiro/builder/avatar-group";
import { cn } from "@/utils/utils";
import { ResourceType } from "@/types";
import BoringAvatar from "boring-avatars";
import { pickRandomColor, pickRandomColorCode } from "@/utils";

interface StatsProps {
  avatars: string[];
  userCount: number;
  resourceType: ResourceType;
}

export function Stats({ avatars, userCount, resourceType }: StatsProps) {
  return (
    <div className="inline-flex items-center gap-1.5 px-1 py-0.5 squircle squircle-7xl squircle-white">
      <UserAvatars avatars={avatars} />
      <UserCount count={userCount} resourceType={resourceType} />
    </div>
  );
}

function UserAvatars({ avatars }: { avatars: string[] }) {
  return (
    <div className="inline-flex items-start">
      <AvatarGroup numPeople={99}>
        {avatars.map((avatar, index) => (
          <Avatar key={index} className="w-6 h-6">
            <AvatarImage src={avatar} />
            <AvatarFallback className={cn("relative")}>
              {/* <span className="text-[.5rem] font-bold text-zinc-500 text-wrap">
                A Z
              </span> */}
              <BoringAvatar
                name={avatar.slice(8).replace(".png", "")}
                colors={[
                  pickRandomColorCode(),
                  pickRandomColorCode(),
                  pickRandomColorCode(),
                  pickRandomColorCode(),
                  pickRandomColorCode(),
                ]}
                variant="beam"
              />
            </AvatarFallback>
          </Avatar>
        ))}
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
    <span className="relative text-sm text-zinc-600">
      {count}{" "}
      {resourceType === ResourceType.COURSE
        ? "students"
        : resourceType === ResourceType.EBOOK
        ? "viewers"
        : "watchers"}
    </span>
  );
}
