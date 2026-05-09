import { cn } from "@/utils/utils";
import type { SkeletonProps as BoneyardSkeletonProps } from "boneyard-js/react";
import type React from "react";

type AutomatedSkeletonProps = {
  name: string;
  loading?: boolean;
  children?: React.ReactNode;
} & Omit<BoneyardSkeletonProps, "name" | "loading" | "children">;

type ManualSkeletonProps = {
  name?: undefined;
  loading?: boolean;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

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
}: AutomatedSkeletonProps | ManualSkeletonProps): React.ReactElement {
  if (name) {
    const { snapshotConfig } = props as AutomatedSkeletonProps;

    return (
      <div
        className={className}
        data-boneyard={name}
        data-boneyard-config={
          snapshotConfig ? JSON.stringify(snapshotConfig) : undefined
        }
        style={{ position: "relative" }}
      >
        <div
          className={cn(
            loading &&
              !children &&
              "h-full w-full animate-skeleton-shimmer bg-muted rounded-sm bg-[linear-gradient(90deg,transparent_25%,var(--shimmer-color)_50%,transparent_75%)] bg-size-[200%_100%] [--shimmer-color:rgba(255,255,255,0.05)] dark:[--shimmer-color:rgba(255,255,255,0.02)]",
          )}
          data-boneyard-content="true"
        >
          {loading ? null : children}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "animate-skeleton-shimmer bg-muted rounded-sm",
        "bg-[linear-gradient(90deg,transparent_25%,var(--shimmer-color)_50%,transparent_75%)] bg-size-[200%_100%]",
        "[--shimmer-color:rgba(255,255,255,0.05)] dark:[--shimmer-color:rgba(255,255,255,0.02)]",
        className,
      )}
      data-slot="skeleton"
      {...props}
    />
  );
}
