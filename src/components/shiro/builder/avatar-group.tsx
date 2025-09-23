"use client";

import * as React from "react";
import { motion, type Transition } from "motion/react";

import { cn } from "@/utils/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  type TooltipProps,
  type TooltipContentProps,
} from "@/components/ui/tooltip";

type AvatarProps = TooltipProps & {
  children: React.ReactNode;
  zIndex: number;
  transition: Transition;
  translate: string | number;
};

function AvatarContainer({
  children,
  zIndex,
  transition,
  translate,
  ...props
}: AvatarProps) {
  return (
    <Tooltip {...props}>
      <TooltipTrigger>
        <motion.div
          data-slot="avatar-container"
          initial="initial"
          whileHover="hover"
          whileTap="hover"
          className="relative"
          style={{ zIndex }}
        >
          <motion.div
            variants={{
              initial: { y: 0 },
              hover: { y: translate },
            }}
            transition={transition}
          >
            {children}
          </motion.div>
        </motion.div>
      </TooltipTrigger>
    </Tooltip>
  );
}

type AvatarGroupTooltipProps = TooltipContentProps;

function AvatarGroupTooltip(props: AvatarGroupTooltipProps) {
  return <TooltipContent {...props} />;
}

type AvatarGroupProps = Omit<React.ComponentProps<"div">, "translate"> & {
  children: React.ReactElement[];
  transition?: Transition;
  invertOverlap?: boolean;
  translate?: string | number;
  numPeople?: number;
  tooltipProps?: Omit<TooltipProps, "children">;
};

function AvatarGroup({
  ref,
  children,
  className,
  transition = { type: "spring", stiffness: 300, damping: 17 },
  invertOverlap = false,
  translate = "0%",
  numPeople,
  tooltipProps = { side: "top", sideOffset: 24 },
  ...props
}: AvatarGroupProps) {
  return (
    <TooltipProvider openDelay={0} closeDelay={0}>
      <div
        ref={ref}
        data-slot="avatar-group"
        className={cn("flex flex-row -space-x-2 items-center h-8", className)}
        {...props}
      >
        {children?.map((child, index) => (
          <AvatarContainer
            key={index}
            zIndex={
              invertOverlap ? React.Children.count(children) - index : index
            }
            transition={transition}
            translate={translate}
            {...tooltipProps}
          >
            {child}
          </AvatarContainer>
        ))}
        <span className="sr-only">
          +{numPeople} {numPeople === 1 ? "person" : "people"}
        </span>
        {/* {(numPeople ?? 0) > 0 && (
          <AvatarContainer
            zIndex={React.Children.count(children)}
            transition={transition}
            translate={translate}
            {...tooltipProps}
          >
            <Avatar className="w-6 h-6">
              <AvatarFallback>
                <span className="text-[0.625rem]">+{numPeople}</span>
              </AvatarFallback>
            </Avatar>
          </AvatarContainer>
        )} */}
      </div>
    </TooltipProvider>
  );
}

export {
  AvatarGroup,
  AvatarGroupTooltip,
  type AvatarGroupProps,
  type AvatarGroupTooltipProps,
};
