import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarGroup } from "@/components/shiro/builder/avatar-group";
import { cn } from "@/lib/utils";

interface StatsProps {
  avatars: Array<{ bg: string }>;
  userCount: string;
}

export function Stats({ avatars, userCount }: StatsProps) {
  return (
    <div className="inline-flex items-center gap-1.5 px-1 py-0.5 squircle squircle-7xl squircle-white">
      <UserAvatars avatars={avatars} />
      <UserCount count={userCount} />
    </div>
  );
}

function UserAvatars({ avatars }: { avatars: Array<{ bg: string }> }) {
  return (
    <div className="inline-flex items-start">
      <AvatarGroup numPeople={99}>
        {avatars.map((avatar, index) => (
          <Avatar key={index} className="w-6 h-6">
            <AvatarFallback className={cn(avatar.bg)}>
              <span className="text-xs">a</span>
            </AvatarFallback>
          </Avatar>
        ))}
      </AvatarGroup>
    </div>
  );
}

function UserCount({ count }: { count: string }) {
  return <span className="relative text-sm text-zinc-600">{count}</span>;
}
