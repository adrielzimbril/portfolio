import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/utils/utils";
import { Badge, badgeVariants } from "@/components/ui/badge";

const statusIndicatorVariants = cva("rounded-full", {
  variants: {
    status: {
      online: "bg-green-500",
      offline: "bg-gray-400",
      busy: "bg-red-500",
      away: "bg-yellow-500",
      available: "bg-green-500",
      error: "bg-red-600",
      warning: "bg-orange-500",
      info: "bg-blue-500",
    },
    size: {
      default: "h-2 w-2",
      xs: "h-1.5 w-1.5",
      sm: "h-2.5 w-2.5",
      md: "h-3 w-3",
      lg: "h-3.5 w-3.5",
      xl: "h-4 w-4",
    },
    animated: {
      true: "animate-pulse",
      false: "",
    },
  },
  defaultVariants: {
    status: "online",
    size: "default",
    animated: true,
  },
});

export interface StatusBadgeProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  status?:
    | "online"
    | "offline"
    | "busy"
    | "away"
    | "available"
    | "error"
    | "warning"
    | "info";
  primaryText?: string;
  showIndicator?: boolean;
  animated?: boolean;
  mode?: "stack" | "inline";
  indicatorClassName?: string;
  primaryTextClassName?: string;
  secondaryTextClassName?: string;
}

function StatusBadge({
  className,
  variant,
  size,
  mode = "inline",
  status = "online",
  primaryText,
  showIndicator = true,
  animated = true,
  indicatorClassName,
  primaryTextClassName,
  secondaryTextClassName,
  ...props
}: StatusBadgeProps) {
  const IndicatorComponent = showIndicator && (
    <span className="relative flex justify-center items-center h-3 w-3">
      <span
        className={cn(
          "absolute inline-flex h-full w-full rounded-full opacity-75",
          animated ? "animate-ping-slow" : "",
          {
            "bg-green-300": status === "online" || status === "available",
            "bg-purple-300": status === "info",
            "bg-red-300": status === "busy" || status === "error",
            "bg-gray-300": status === "offline",
            "bg-yellow-300": status === "away",
            "bg-orange-300": status === "warning",
          },
        )}
      />
      <span
        className={cn(
          "relative inline-flex h-3 w-3 rounded-full",
          statusIndicatorVariants({ status, size, animated: false }),
          indicatorClassName,
        )}
      />
    </span>
  );

  if (mode === "stack") {
    return (
      <div
        className={cn(
          "flex items-center gap-2",
          badgeVariants({ variant, size }),
          className,
        )}
        {...props}
      >
        {IndicatorComponent}
        <div className="flex flex-col items-start gap-0.5">
          {primaryText && (
            <span
              className={cn("font-semibold leading-none", primaryTextClassName)}
            >
              {primaryText}
            </span>
          )}
          {props.children && (
            <span
              className={cn(
                "text-[0.7em] opacity-70 leading-none",
                secondaryTextClassName,
              )}
            >
              {props.children}
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2",
        primaryText && badgeVariants({ variant, size }),
        "squircle-sh-white text-b-white-invert",
        "inline-flex",
        className,
      )}
      {...props}
    >
      <Badge size={size} circle={!primaryText}>
        <div className="flex items-center gap-2">
          {IndicatorComponent}
          {primaryText && (
            <span className={cn("font-semibold", primaryTextClassName)}>
              {primaryText}
            </span>
          )}
        </div>
      </Badge>
      {props.children && (
        <>
          <span
            className={cn("font-normal opacity-90", secondaryTextClassName)}
          >
            {props.children}
          </span>
        </>
      )}
    </div>
  );
}

export { StatusBadge, statusIndicatorVariants };
