"use client";

import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle2, CircleAlert } from "lucide-react";

type Status = "success" | "error";

export function FormFeedbackModal({
  open,
  status,
  title,
  description,
  onClose,
  autoHideMs = 3200,
}: {
  open: boolean;
  status: Status;
  title: string;
  description: string;
  onClose: () => void;
  autoHideMs?: number;
}) {
  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(onClose, autoHideMs);
    return () => clearTimeout(timer);
  }, [open, autoHideMs, onClose]);

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-[460px]">
        <DialogHeader className="space-y-3">
          <div className="mx-auto">
            {status === "success" ? (
              <CheckCircle2 className="h-12 w-12 text-green-500" />
            ) : (
              <CircleAlert className="h-12 w-12 text-red-500" />
            )}
          </div>
          <DialogTitle className="text-center text-xl">{title}</DialogTitle>
          <DialogDescription className="text-center text-b-white-invert-sec">
            {description}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
