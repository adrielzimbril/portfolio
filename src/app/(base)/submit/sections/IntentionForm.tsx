"use client";
import React, { useCallback, useId, useState } from "react";
import { Form } from "@/components/ui/form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslations, useLocale } from "next-intl";
import { SectionBase } from "@/components/shared/pages/shared/section-base";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Select as SelectComponent,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { apiRoutes } from "@/data/api-routes";
import { Label } from "@/components/ui/label";
import { FormFeedbackModal } from "@/components/shared/forms/FormFeedbackModal";

enum Intention {
  UX_REVIEW = "ux_review",
}

const intentions = Object.values(Intention);

const Select = ({
  label,
  value,
  onChange,
  options,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
  placeholder: string;
}) => {
  const id = useId();
  return (
    <Field>
      <Label htmlFor={id}>{label}</Label>
      <SelectComponent value={value} onValueChange={onChange}>
        <SelectTrigger id={id} variant="secondary" className="rounded-xl">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{label}</SelectLabel>
            {options.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </SelectComponent>
    </Field>
  );
};

export function IntentionForm() {
  const t = useTranslations();
  const locale = useLocale();
  const [feedback, setFeedback] = useState<{
    open: boolean;
    status: "success" | "error";
    title: string;
    description: string;
  }>({
    open: false,
    status: "success",
    title: "",
    description: "",
  });
  const closeFeedback = useCallback(() => {
    setFeedback((prev) => ({ ...prev, open: false }));
  }, []);

  const [intention, setIntention] = useState(Intention.UX_REVIEW);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [target, setTarget] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name.length < 4) {
      setFeedback({
        open: true,
        status: "error",
        title: t("submit.page.feedback.error.title"),
        description: t("zod.errors.customized.name.required"),
      });
      return;
    }

    if (!email || !email.includes("@")) {
      setFeedback({
        open: true,
        status: "error",
        title: t("submit.page.feedback.error.title"),
        description: t("zod.errors.customized.email.invalid"),
      });
      return;
    }

    if (!url) {
      setFeedback({
        open: true,
        status: "error",
        title: t("submit.page.feedback.error.title"),
        description: t("zod.errors.customized.url.invalid"),
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(apiRoutes.submit.link, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          intention,
          name,
          email,
          url,
          description,
          target,
          locale,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data?.error || "Failed to submit");
      }
      setFeedback({
        open: true,
        status: "success",
        title: t("submit.page.feedback.success.title"),
        description: t("submit.page.feedback.success.description"),
      });
      setName("");
      setEmail("");
      setUrl("");
      setDescription("");
      setTarget("");
      setIntention(Intention.UX_REVIEW);
    } catch (error) {
      setFeedback({
        open: true,
        status: "error",
        title: t("submit.page.feedback.error.title"),
        description: t("submit.page.feedback.error.description"),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SectionBase
        sectionClassName="w-full"
        sectionContentClassName="w-full"
        cardClassName="w-full"
        cardContentClassName="w-full px-4 py-6 md:p-8"
        className="squircle squircle-sh-white squircle-xl md:squircle-3xl squircle-smooth-xl border-0 overflow-hidden min-h-60 py-12"
      >
        <Card className="w-full squircle squircle-sh-white squircle-smooth-xl">
          <CardContent className="flex flex-col items-center justify-center p-6 md:p-8 space-y-6 gap-6 md:gap-8">
            <div className="flex flex-col items-center text-center gap-2">
              <Badge size="lg">
                {t("submit.page.header-section.subBadge")}
              </Badge>
              <h1 className="h3 hidsden">
                {t("submit.page.header-section.subTitle")}
              </h1>
              <p className="text-b-white-invert-sec max-w-2xl hidden">
                {t("submit.page.header-section.subDescription")}
              </p>
            </div>
            <Form
              onSubmit={onSubmit}
              className="space-y-6 w-full max-w-xl self-center place-self-center"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Field>
                    <FieldLabel>
                      {t("submit.page.fields.name.label")}{" "}
                      <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input
                      name="name"
                      placeholder={t("submit.page.fields.name.placeholder")}
                      className="rounded-xl"
                      variant="secondary"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      minLength={4}
                    />
                    <FieldError>{t("submit.page.fields.validation.name_required")}</FieldError>
                  </Field>
                </div>
                <div className="space-y-2">
                  <Field>
                    <FieldLabel>
                      {t("submit.page.fields.email.label")}{" "}
                      <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input
                      name="email"
                      placeholder={t("submit.page.fields.email.placeholder")}
                      className="rounded-xl"
                      variant="secondary"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <FieldError>{t("submit.page.fields.validation.email_invalid")}</FieldError>
                  </Field>
                </div>
              </div>

              <Field>
                <FieldLabel>
                  {t("submit.page.fields.url.label")}{" "}
                  <span className="text-red-500">*</span>
                </FieldLabel>
                <Input
                  name="url"
                  placeholder={t("submit.page.fields.url.placeholder")}
                  className="rounded-xl"
                  variant="secondary"
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                />
                <FieldError>{t("submit.page.fields.validation.url_invalid")}</FieldError>
              </Field>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Select
                    label={t("submit.page.fields.intention.label")}
                    value={intention}
                    onChange={(value) => setIntention(value as Intention)}
                    options={[
                      {
                        value: "ux_review",
                        label: `🕵️ ${t("submit.page.options.ux_review")}`,
                      },
                    ]}
                    placeholder={t("common.button.select")}
                  />
                </div>
                {/* Conditional sections */}
                {intention === "ux_review" && (
                  <div className="space-y-2">
                    <Select
                      label={t("submit.page.fields.target.label")}
                      value={target}
                      onChange={setTarget}
                      options={[
                        {
                          value: "website",
                          label: `🌐 ${t("submit.page.options.support.website")}`,
                        },
                        {
                          value: "mobile",
                          label: `📱 ${t("submit.page.options.support.mobile")}`,
                        },
                        {
                          value: "saas",
                          label: `🧩 ${t("submit.page.options.support.saas")}`,
                        },
                        {
                          value: "prototype",
                          label: `🧪 ${t("submit.page.options.support.prototype")}`,
                        },
                      ]}
                      placeholder={t("common.button.select")}
                    />
                  </div>
                )}
              </div>

              <Field>
                <FieldLabel>
                  {t("submit.page.fields.description.label")}
                </FieldLabel>
                <Textarea
                  name="description"
                  rows={5}
                  placeholder={t("submit.page.fields.description.placeholder")}
                  className="rounded-xl"
                  variant="secondary"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Field>
              <div className="pt-2">
                <Button
                  type="submit"
                  whileTap
                  asPointer
                  asFull
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? t("common.button.sending")
                    : t("submit.page.actions.submit")}
                </Button>
              </div>
            </Form>
          </CardContent>
        </Card>
      </SectionBase>
      <FormFeedbackModal
        open={feedback.open}
        status={feedback.status}
        title={feedback.title}
        description={feedback.description}
        onClose={closeFeedback}
      />
    </>
  );
}
