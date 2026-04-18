"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/utils/utils";
import { useTranslations } from "use-intl";
import { ChatBubbleCircle } from "@aurthle/icons";
import { LoginModal } from "@/components/shared/pages/community/LoginModal";
import { CommentForm } from "@/components/shared/pages/community/CommentForm";

interface LeaveNoteButtonProps {
  user: any;
}

export function LeaveNoteButton({ user }: LeaveNoteButtonProps) {
  const t = useTranslations();
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex justify-center mt-8">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="default"
            asIcon
            asPointer
            className={cn(
              "squircle squircle-smooth-lg squircle-2xl",
              "flex items-center gap-3 px-6 py-4",
            )}
          >
            {user ? (
              <>
                <div className="relative">
                  <StatusBadge
                    status="online"
                    showIndicator
                    animated
                    size="sm"
                    indicatorClassName="h-2 w-2"
                  />
                </div>
                <span className="flex items-center gap-2">
                  <ChatBubbleCircle size={18} variant="bulk" />
                  {t("community.leave-note.online")}
                </span>
              </>
            ) : (
              <span className="flex items-center gap-2">
                <ChatBubbleCircle size={18} variant="bulk" />
                {t("community.leave-note.button")}
              </span>
            )}
          </Button>
        </DialogTrigger>
        <DialogContent size={user ? "full" : "md"} variant="modern">
          {user ? (
            <CommentForm user={user} onSuccess={() => setOpen(false)} />
          ) : (
            <LoginModal />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
