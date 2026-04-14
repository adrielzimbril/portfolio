"use client";

import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle, InfoCircle } from "@aurthle/icons";

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
              <CheckCircle size={48} className="text-green-500" />
            ) : (
              <InfoCircle size={48} className="text-red-500" />
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
