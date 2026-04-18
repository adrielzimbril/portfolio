"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useTranslations } from "use-intl";
import { cn } from "@/utils/utils";
import { ArrowLeftOne, ArrowRightOne } from "@aurthle/icons";
import {
  DialogHeader,
  DialogSeparator,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import {
  Field,
  FieldControl,
  FieldDescription,
  FieldError,
  FieldItem,
  FieldLabel,
} from "@/components/ui/field";
import logger from "@/utils/logger";
import { apiRoutes } from "@/data/api-routes";
import { toast } from "sonner";
import { useLocale } from "next-intl";
import { CommunityWallCard } from "@/components/shared/pages/community/CommunityWallCard";
import { patterns } from "@/components/shared/pages/community/pattern";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, Radio } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface CommentFormProps {
  user: any;
  onSuccess?: () => void;
}

const config = {
  maxCommentLength: 110,
  rotation: {
    startAt: -10,
    endAt: 10,
    step: 1,
  },
};

const schema = z.object({
  comment: z
    .string()
    .min(1, { message: "Comment cannot be empty" })
    .max(config.maxCommentLength, {
      message: `Comment must be less than ${config.maxCommentLength} characters`,
    }),
});

type CommentFormValues = z.infer<typeof schema>;

export function CommentForm({ user, onSuccess }: CommentFormProps) {
  const t = useTranslations();
  const locale = useLocale();
  const [screen, setScreen] = useState<"input" | "preview">("input");
  const [patternIndex, setPatternIndex] = useState(() =>
    Math.floor(Math.random() * patterns.length),
  );
  const [rotation, setRotation] = useState(config.rotation.startAt);

  const form = useForm<CommentFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { comment: "" },
  });

  const handlePrevPattern = () => {
    setPatternIndex((prev) => (prev - 1 + patterns.length) % patterns.length);
  };

  const handleNextPattern = () => {
    setPatternIndex((prev) => (prev + 1) % patterns.length);
  };

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
          pattern_index: patternIndex,
          rotation: rotation,
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
      setScreen("input");
      setPatternIndex(Math.floor(Math.random() * patterns.length));
      setRotation(config.rotation.startAt);
      onSuccess?.();
    } catch (error) {
      logger.error("Failed to submit comment", error);
      toast.error("Failed to submit comment");
      throw error;
    }
  };

  const handleNext = () => {
    if (form.formState.isValid) {
      setScreen("preview");
    }
  };

  const handleBack = () => {
    setScreen("input");
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
        {/* Desktop: 2-column layout, Mobile: step-by-step */}
        <div className="hidden md:grid md:grid-cols-2 gap-6">
          {/* Left column: Controls */}
          <div className="size-full space-y-4">
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                const comment = form.getValues("comment");
                if (comment) {
                  onSubmit({ comment });
                }
              }}
              className="flex flex-col size-full space-y-4"
            >
              <Field name="comment">
                <FieldLabel>{t("community.comment-form.label")}</FieldLabel>
                <FieldItem>
                  <FieldControl>
                    <Textarea
                      placeholder={t("community.comment-form.placeholder")}
                      rows={3}
                      limit={config.maxCommentLength}
                      showLimit
                      disabled={form.formState.isSubmitting}
                      value={form.watch("comment")}
                      onChange={(e) => form.setValue("comment", e.target.value)}
                    />
                  </FieldControl>
                  <FieldError />
                </FieldItem>
              </Field>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium">Rotation:</label>
                  <input
                    type="range"
                    min={config.rotation.startAt}
                    max={config.rotation.endAt}
                    step={config.rotation.step}
                    value={rotation}
                    onChange={(e) => setRotation(parseInt(e.target.value))}
                    className="flex-1 accent-primary"
                  />
                  <span className="text-sm w-12 text-right">{rotation}°</span>
                </div>

                <div className="flex items-center gap-2">
                  <Label className="text-sm font-medium">Pattern:</Label>
                  <RadioGroup
                    value={patternIndex.toString()}
                    onValueChange={(value) => setPatternIndex(parseInt(value))}
                    className="flex gap-1 flex-1 flex-row"
                  >
                    {patterns.map((_, index) => (
                      <Radio
                        key={index}
                        value={index.toString()}
                        size="xl"
                        aria-label={`Pattern ${index + 1}`}
                      />
                    ))}
                  </RadioGroup>
                </div>
              </div>

              <div className="flex gap-2 mt-auto">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  asIcon
                  onClick={() => form.reset()}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="default"
                  asIcon
                  whileTap
                  asPointer
                  className="flex-1"
                  disabled={form.formState.isSubmitting}
                >
                  <span className="flex items-center justify-center gap-1">
                    {form.formState.isSubmitting ? (
                      t("community.comment-form.submitting")
                    ) : (
                      <>{t("community.comment-form.submit")}</>
                    )}
                  </span>
                </Button>
              </div>
            </Form>
          </div>

          {/* Right column: Preview */}
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex items-center gap-4 md:gap-8">
              <Button
                type="button"
                variant="outline"
                size="icon"
                asIcon
                onClick={handlePrevPattern}
                aria-label="Previous pattern"
              >
                <ArrowLeftOne size={20} />
              </Button>

              <div className="relative">
                <CommunityWallCard
                  patternIndex={patternIndex}
                  author={user?.user_metadata?.name || user?.email}
                  profilePicture={user?.user_metadata?.avatar_url}
                  rotation={rotation}
                  message={form.watch("comment")}
                  className="h-[400px] w-[300px]"
                />
              </div>

              <Button
                type="button"
                variant="outline"
                size="icon"
                asIcon
                onClick={handleNextPattern}
                aria-label="Next pattern"
              >
                <ArrowRightOne size={20} />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile: Step-by-step */}
        <div className="md:hidden">
          {screen === "input" ? (
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                const comment = form.getValues("comment");
                if (comment) {
                  onSubmit({ comment });
                }
              }}
              className="space-y-4"
            >
              <Field name="comment">
                <FieldLabel>{t("community.comment-form.label")}</FieldLabel>
                <FieldItem>
                  <FieldControl>
                    <Textarea
                      placeholder={t("community.comment-form.placeholder")}
                      rows={5}
                      limit={config.maxCommentLength}
                      showLimit
                      disabled={form.formState.isSubmitting}
                      value={form.watch("comment")}
                      onChange={(e) => form.setValue("comment", e.target.value)}
                    />
                  </FieldControl>
                  <FieldError />
                </FieldItem>
              </Field>

              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  asIcon
                  onClick={() => form.reset()}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  variant="default"
                  asIcon
                  whileTap
                  asPointer
                  className="flex-1"
                  onClick={handleNext}
                  disabled={!form.formState.isValid}
                >
                  Next
                </Button>
              </div>
            </Form>
          ) : (
            <div className="flex flex-col items-center gap-6">
              <div className="relative">
                <CommunityWallCard
                  patternIndex={patternIndex}
                  author={user?.user_metadata?.name || user?.email}
                  profilePicture={user?.user_metadata?.avatar_url}
                  rotation={rotation}
                  message={form.watch("comment")}
                  className="h-[350px] w-[280px]"
                />
              </div>

              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  asIcon
                  onClick={handlePrevPattern}
                  aria-label="Previous pattern"
                >
                  <ArrowLeftOne size={20} />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  asIcon
                  onClick={handleNextPattern}
                  aria-label="Next pattern"
                >
                  <ArrowRightOne size={20} />
                </Button>
              </div>

              <div className="flex flex-col gap-4 w-full max-w-md">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium">Rotation:</label>
                  <input
                    type="range"
                    min={config.rotation.startAt}
                    max={config.rotation.endAt}
                    step={config.rotation.step}
                    value={rotation}
                    onChange={(e) => setRotation(parseInt(e.target.value))}
                    className="flex-1 accent-primary"
                  />
                  <span className="text-sm w-12 text-right">{rotation}°</span>
                </div>

                <div className="flex items-center gap-2">
                  <Label className="text-sm font-medium">Pattern:</Label>
                  <RadioGroup
                    value={patternIndex.toString()}
                    onValueChange={(value) => setPatternIndex(parseInt(value))}
                    className="flex gap-1 flex-1 flex-row"
                  >
                    {patterns.map((_, index) => (
                      <Radio
                        key={index}
                        value={index.toString()}
                        size="xl"
                        aria-label={`Pattern ${index + 1}`}
                      />
                    ))}
                  </RadioGroup>
                </div>
              </div>

              <div className="flex gap-2 w-full max-w-md">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={handleBack}
                >
                  Back
                </Button>
                <Button
                  type="button"
                  variant="default"
                  asIcon
                  whileTap
                  asPointer
                  className="flex-1"
                  onClick={form.handleSubmit(onSubmit)}
                  disabled={form.formState.isSubmitting}
                >
                  <span className="flex items-center justify-center gap-1">
                    {form.formState.isSubmitting ? (
                      t("community.comment-form.submitting")
                    ) : (
                      <>{t("community.comment-form.submit")}</>
                    )}
                  </span>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
