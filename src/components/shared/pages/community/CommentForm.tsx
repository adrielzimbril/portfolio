"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "use-intl";
import { cn } from "@/utils/utils";
import { Send } from "@aurthle/icons";
import { Textarea } from "@/components/ui/textarea";
import { DialogHeader, DialogSeparator } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Form } from "@/components/ui/form";

interface CommentFormProps {
  user: any;
}

export function CommentForm({ user }: CommentFormProps) {
  const t = useTranslations();
  const [comment, setComment] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setIsSubmitting(true);
    // TODO: Implement comment submission logic
    console.log("Submitting comment:", comment);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setComment("");
    setIsSubmitting(false);
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold text-start">
          {t("community.comment-form.title")}
        </DialogTitle>
      </DialogHeader>

      <DialogSeparator />
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <p className="text-b-white-invert-sec">
            {t("community.comment-form.description")}
          </p>
        </div>

        <Form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="comment"
              className="text-sm font-medium text-foreground"
            >
              {t("community.comment-form.label")}
            </label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={t("community.comment-form.placeholder")}
              className={cn(
                "w-full min-h-[120px] p-4",
                "squircle squircle-background squircle-2xl squircle-border-2 squircle-border-b-base-accent",
                "bg-b-base text-foreground placeholder:text-muted-foreground",
                "focus:outline-none focus:squircle-border-b-base-accent",
                "resize-none transition-all",
              )}
              disabled={isSubmitting}
            />
          </div>

          <Button
            type="submit"
            variant="default"
            whileTap
            disabled={!comment.trim() || isSubmitting}
            className={cn("squircle squircle-smooth-lg squircle-2xl w-full")}
          >
            <span className="flex items-center justify-center gap-2">
              {isSubmitting ? (
                t("community.comment-form.submitting")
              ) : (
                <>
                  <Send size={16} variant="bulk" />
                  {t("community.comment-form.submit")}
                </>
              )}
            </span>
          </Button>
        </form>
      </div>
    </>
  );
}
