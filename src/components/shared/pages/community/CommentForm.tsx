"use client";
import React, { useState, useRef } from "react";
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
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import logger from "@/utils/logger";
import { apiRoutes } from "@/data/api-routes";
import { toast } from "@/components/shiro/providers/toast-provider";
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
    default: 0,
    endAt: 10,
    step: 1,
  },
};

export function CommentForm({ user, onSuccess }: CommentFormProps) {
  const t = useTranslations();
  const locale = useLocale();
  const [screen, setScreen] = useState<"input" | "preview">("input");
  const [patternIndex, setPatternIndex] = useState(() =>
    Math.floor(Math.random() * patterns.length),
  );
  const [rotation, setRotation] = useState(config.rotation.default);
  const [comment, setComment] = useState("");

  const handlePrevPattern = () => {
    setPatternIndex((prev) => (prev - 1 + patterns.length) % patterns.length);
  };

  const handleNextPattern = () => {
    setPatternIndex((prev) => (prev + 1) % patterns.length);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!comment.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    if (comment.length > config.maxCommentLength) {
      toast.error(
        `Comment must be less than ${config.maxCommentLength} characters`,
      );
      return;
    }

    try {
      logger.info("Submitting comment", { comment });

      const res = await fetch(apiRoutes.community.guestbook.link, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: comment,
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
      setComment("");
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
    if (comment.trim()) {
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
              onSubmit={onSubmit}
              className="flex flex-col size-full space-y-4"
            >
              <Field>
                <FieldLabel>{t("community.comment-form.label")}</FieldLabel>
                <Textarea
                  name="comment"
                  placeholder={t("community.comment-form.placeholder")}
                  rows={3}
                  limit={config.maxCommentLength}
                  showLimit
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                  maxLength={config.maxCommentLength}
                />
                <FieldError>Comment cannot be empty</FieldError>
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
                  onClick={() => setComment("")}
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
                  disabled={!comment.trim()}
                >
                  <span className="flex items-center justify-center gap-1">
                    {t("community.comment-form.submit")}
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
                  message={comment}
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
            <Form onSubmit={onSubmit} className="space-y-4">
              <Field>
                <FieldLabel>{t("community.comment-form.label")}</FieldLabel>
                <Textarea
                  name="comment"
                  placeholder={t("community.comment-form.placeholder")}
                  rows={5}
                  limit={config.maxCommentLength}
                  showLimit
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                  maxLength={config.maxCommentLength}
                />
                <FieldError>Comment cannot be empty</FieldError>
              </Field>

              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  asIcon
                  onClick={() => setComment("")}
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
                  disabled={!comment.trim()}
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
                  message={comment}
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

              <Form onSubmit={onSubmit} className="flex gap-2 w-full max-w-md">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={handleBack}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="default"
                  asIcon
                  whileTap
                  asPointer
                  className="flex-1"
                  disabled={!comment.trim()}
                >
                  <span className="flex items-center justify-center gap-1">
                    {t("community.comment-form.submit")}
                  </span>
                </Button>
              </Form>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
