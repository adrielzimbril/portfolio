"use client"
import { cn } from "@/utils/utils"
import { Skeleton as BoneyardSkeleton, type SkeletonProps as BoneyardSkeletonProps } from "boneyard-js/react"
import type React from "react"
import { useLayout } from "@/components/aurthle/providers/layout-provider"

type AutomatedSkeletonProps = {
  name: string
  loading?: boolean
  children?: React.ReactNode
} & Omit<BoneyardSkeletonProps, "name" | "loading" | "children">

type ManualSkeletonProps = {
  name?: undefined
  loading?: boolean
  children?: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>

/**
 * Skeleton component powered by boneyard-js for automated, pixel-perfect loader screens.
 */
export function Skeleton({
  name,
  loading,
  className,
  children,
  ...props
}: AutomatedSkeletonProps | ManualSkeletonProps): React.ReactElement {
  const { isLoaded } = useLayout()
  const isCurrentlyLoading = loading ?? !isLoaded

  if (name) {
    const { snapshotConfig, fixture, ...rest } = props as any

    return (
      <BoneyardSkeleton
        name={name}
        loading={isCurrentlyLoading}
        className={className}
        snapshotConfig={snapshotConfig}
        fixture={fixture}
        {...rest}
      >
        {children}
      </BoneyardSkeleton>
    )
  }

  return (
    <div
      className={cn(
        isCurrentlyLoading && "animate-skeleton-shimmer bg-muted rounded-sm bg-[linear-gradient(90deg,transparent_25%,var(--shimmer-color)_50%,transparent_75%)] bg-size-[200%_100%] [--shimmer-color:rgba(255,255,255,0.05)] dark:[--shimmer-color:rgba(255,255,255,0.02)]",
        className,
      )}
      data-slot="skeleton"
      {...props}
    >
      {!isCurrentlyLoading && children}
    </div>
  )
}

