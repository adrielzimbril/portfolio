"use client";
import * as React from "react";
import { cn } from "@/utils/utils";
import { X } from "@aurthle/icons";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return (
    <DialogPrimitive.Root data-lenis-preventdata-slot="dialog" {...props} />
  );
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/10 backdrop-blur-sm",
        className,
      )}
      {...props}
    />
  );
}

function DialogContent({
  className,
  children,
  size = "md",
  variant = "modern",
  scrollArea = false,
  closeButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  size?: "sm" | "md" | "lg" | "xl" | "full";
  variant?: "default" | "modern" | "glass";
  scrollArea?: boolean;
  closeButton?: boolean;
}) {
  const sizeClasses = {
    sm: "sm:max-w-sm",
    md: "sm:max-w-md",
    lg: "sm:max-w-lg",
    xl: "sm:max-w-2xl",
    full: "sm:max-w-4xl",
  };

  const variantClasses = {
    default:
      "squircle squircle-background squircle-2xl md:squircle-5xl squircle-smooth-lg md:squircle-smooth-xl border-0",
    modern:
      "squircle squircle-sh-white squircle-2xl md:squircle-5xl squircle-smooth-lg md:squircle-smooth-xl squircle-border-4 squircle-border-b-base-accent",
    glass:
      "squircle squircle-sh-white squircle-2xl md:squircle-5xl squircle-smooth-lg md:squircle-smooth-xl squircle-border-4 squircle-border-b-base-accent",
  };

  return (
    <DialogPortal data-lenis-prevent>
      <DialogOverlay data-lenis-prevent />
      <DialogPrimitive.Content
        data-lenis-prevent
        data-slot="dialog-content"
        className={cn(
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "fixed top-1/2 left-1/2 z-50 grid max-h-[calc(100vh-2rem)] w-full max-w-[calc(100%-1rem)] -translate-x-1/2 -translate-y-1/2",
          "gap-6 overflow-ys-auto p-6 sm:p-8 duration-200",
          sizeClasses[size],
          variantClasses[variant],
          className,
        )}
        {...props}
      >
        {scrollArea ? (
          <ScrollArea className="flex max-h-full flex-col overflow-hidden">
            {children}
          </ScrollArea>
        ) : (
          children
        )}
        {closeButton && (
          <DialogPrimitive.Close
            className={cn(
              "group absolute top-2.5 md:top-6 right-4 md:right-6 flex size-8 items-center justify-center disabled:pointer-events-none",
              "p-0",
            )}
            asChild
          >
            <Button asPointer whileTap asIcon size="icon">
              <X
                size={16}
                className="opacity-80 transition-opacity duration-200 group-hover:opacity-100"
              />
              <span className="sr-only">Close</span>
            </Button>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col gap-3 sm:flex-row sm:justify-end sm:gap-4",
        className,
      )}
      {...props}
    />
  );
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn(
        "text-xl font-bold leading-[120%] text-white-invert-fr",
        className,
      )}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-base text-white-invert-fr", className)}
      {...props}
    />
  );
}

// Composants supplémentaires dans le style de référence
function DialogSeparator({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("h-px bg-b-base-accent w-full", className)} {...props} />
  );
}

function DialogCard({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & {
  variant?: "default" | "highlight" | "success" | "warning" | "info";
}) {
  const variantClasses = {
    default:
      "squircle-stone-50 dark:squircle-b-base-second squircle-border-2 dark:squircle-border-b-base-accent",
    highlight: "squircle-blue-50 squircle-border-2 squircle-border-blue-200",
    success: "squircle-green-50 squircle-border-2 squircle-border-green-200",
    warning: "squircle-orange-50 squircle-border-2 squircle-border-orange-200",
    info: "squircle-indigo-50 squircle-border-2 squircle-border-indigo-200",
  };

  return (
    <div
      className={cn(
        "squircle squircle-xl md:squircle-3xl squircle-smooth-xl p-4 sm:p-6",
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  );
}

function DialogBadge({
  className,
  variant = "default",
  children,
  ...props
}: React.ComponentProps<"div"> & {
  variant?: "default" | "success" | "warning" | "info" | "colored";
}) {
  const variantClasses = {
    default: "squircle-b-base text-white-invert-fr",
    success: "squircle-green-100 text-green-800",
    warning: "squircle-orange-100 text-orange-800",
    info: "squircle-blue-100 text-blue-800",
    colored:
      "squircle-b-base-accent squircle-border-2 squircle-border-b-base-accent text-white-invert-fr",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center px-3 py-1 text-sm font-medium squircle squircle-lg",
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// Animated Dialog Components
const AnimatedDialog = ({
  children,
  ...props
}: React.ComponentProps<typeof Dialog>) => (
  <Dialog {...props}>{children}</Dialog>
);

const AnimatedDialogContent = React.forwardRef<
  React.ElementRef<typeof DialogContent>,
  React.ComponentPropsWithoutRef<typeof DialogContent>
>(({ children, ...props }, ref) => (
  <DialogContent ref={ref} {...props}>
    <div>{children}</div>
  </DialogContent>
));
AnimatedDialogContent.displayName = "AnimatedDialogContent";

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  DialogSeparator,
  DialogCard,
  DialogBadge,
  AnimatedDialog,
  AnimatedDialogContent,
};
