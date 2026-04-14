"use client";

import { cn } from "@/utils/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React, { PropsWithChildren } from "react";

export interface DockProps extends VariantProps<typeof dockVariants> {
  className?: string;
  children: React.ReactNode;
}

const dockVariants = cva(
  "mx-auto w-max h-full p-2 flex items-end rounded-full border",
);

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  ({ className, children, ...props }, ref) => {
    const renderChildren = () => {
      return React.Children.map(children, (child: React.ReactNode) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {} as DockIconProps);
        }
        return child;
      });
    };

    return (
      <div ref={ref} {...props} className={cn(dockVariants({ className }))}>
        {renderChildren()}
      </div>
    );
  },
);

Dock.displayName = "Dock";

export interface DockIconProps {
  size?: number;
  className?: string;
  children?: React.ReactNode;
  props?: PropsWithChildren;
}

const DockIcon = ({ size, className, children, ...props }: DockIconProps) => {
  return (
    <div
      className={cn(
        "flex aspect-square cursor-pointer items-center justify-center rounded-full",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

DockIcon.displayName = "DockIcon";

export { Dock, DockIcon, dockVariants };
