import { Skeleton as BoneyardSkeleton } from "boneyard-js";
import { cn } from "@/utils/utils";
import type React from "react";

/**
 * Skeleton component powered by boneyard-js for automated, pixel-perfect loader screens.
 * 
 * Usage 1 (Automated):
 * <Skeleton name="user-profile" loading={isLoading}>
 *   <UserProfile data={data} />
 * </Skeleton>
 * 
 * Usage 2 (Manual/Legacy):
 * <Skeleton className="h-10 w-40 rounded-full" />
 */
export function Skeleton({
  name,
  loading = true,
  className,
  children,
  ...props
}: {
  name?: string;
  loading?: boolean;
} & React.ComponentProps<"div">): React.ReactElement {
  // If a name is provided, use Boneyard's automated skeleton
  if (name) {
    return (
      <BoneyardSkeleton name={name} loading={loading} {...props}>
        {children}
      </BoneyardSkeleton>
    );
  }

  // Fallback to manual skeleton for simple shapes (legacy compatibility)
  return (
    <div
      className={cn(
        "animate-skeleton-shimmer bg-muted rounded-sm",
        "bg-[linear-gradient(90deg,transparent_25%,var(--shimmer-color)_50%,transparent_75%)] bg-[length:200%_100%]",
        "[--shimmer-color:rgba(255,255,255,0.05)] dark:[--shimmer-color:rgba(255,255,255,0.02)]",
        className,
      )}
      data-slot="skeleton"
      {...props}
    />
  );
}
