"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useTranslations } from "use-intl";
import { cn } from "@/utils/utils";
import { Send } from "@aurthle/icons";
import { Textarea } from "@/components/ui/textarea";
import { DialogHeader, DialogSeparator } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import logger from "@/utils/logger";
import { apiRoutes } from "@/data/api-routes";
import { toast } from "sonner";
import { useLocale } from "next-intl";

interface CommentFormProps {
  user: any;
}

const schema = z.object({
  comment: z
    .string()
    .min(1, { message: "Comment cannot be empty" })
    .max(500, { message: "Comment must be less than 500 characters" }),
});

type CommentFormValues = z.infer<typeof schema>;

export function CommentForm({ user }: CommentFormProps) {
  const t = useTranslations();
  const locale = useLocale();

  const form = useForm<CommentFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { comment: "" },
  });

  const onSubmit: SubmitHandler<CommentFormValues> = async (values) => {
    try {
      logger.info("Submitting comment", { comment: values.comment });

      const res = await fetch(apiRoutes.community.guestbook.link, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: values.comment,
          author: user?.user_metadata?.name || user?.email,
          profilePicture: user?.user_metadata?.avatar_url,
          language: locale,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        toast.error(data?.error || "Failed to submit comment");
        throw new Error(data?.error || "Failed to submit comment");
      }

      logger.info("Comment submitted successfully", data);
      toast.success("Comment submitted successfully!");
      form.reset();
    } catch (error) {
      logger.error("Failed to submit comment", error);
      toast.error("Failed to submit comment");
      throw error;
    }
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

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("community.comment-form.label")}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t("community.comment-form.placeholder")}
                      className={cn(
                        "w-full min-h-[120px] p-4",
                        "squircle squircle-background squircle-2xl squircle-border-2 squircle-border-b-base-accent",
                        "bg-b-base text-foreground placeholder:text-muted-foreground",
                        "focus:outline-none focus:squircle-border-b-base-accent",
                        "resize-none transition-all",
                      )}
                      disabled={form.formState.isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              variant="default"
              whileTap
              disabled={form.formState.isSubmitting}
              className={cn("squircle squircle-smooth-lg squircle-2xl w-full")}
            >
              <span className="flex items-center justify-center gap-2">
                {form.formState.isSubmitting ? (
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
        </Form>
      </div>
    </>
  );
}
