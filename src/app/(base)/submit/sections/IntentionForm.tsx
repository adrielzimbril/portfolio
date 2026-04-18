"use client";
import React, { useCallback, useId, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import {
  Field,
  FieldControl,
  FieldError,
  FieldItem,
  FieldLabel,
} from "@/components/ui/field";
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

  const schema = z.object({
    intention: z.enum(intentions),
    name: z
      .string({ error: t("zod.errors.customized.name.invalid") })
      .min(4, { error: t("zod.errors.customized.name.required") }),
    email: z.email({ error: t("zod.errors.customized.email.invalid") }),
    url: z.url({ error: t("zod.errors.customized.url.invalid") }),
    description: z.string().optional(),
    // A/C
    target: z.string().optional(),
  });

  type IntentionFormValues = z.infer<typeof schema>;

  const form = useForm<IntentionFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { intention: Intention.UX_REVIEW },
  });

  const intention = form.watch("intention");

  const onSubmit: SubmitHandler<IntentionFormValues> = async (values) => {
    try {
      const res = await fetch(apiRoutes.submit.link, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, locale }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data?.error || "REQUEST_FAILED");
      }
      setFeedback({
        open: true,
        status: "success",
        title: t("submit.page.toast.success"),
        description:
          "Ton projet a ete recu. On revient vers toi tres vite par email.",
      });
      form.reset({ intention: Intention.UX_REVIEW });
    } catch {
      setFeedback({
        open: true,
        status: "error",
        title: t("submit.page.toast.error"),
        description:
          "Une erreur est survenue pendant l'envoi. Merci de reessayer.",
      });
    }
  };

  const Select = ({
    label,
    name,
    options,
    placeholder,
  }: {
    label: string;
    name: keyof IntentionFormValues;
    options: Array<{ value: string; label: string }>;
    placeholder?: string;
  }) => {
    const id = useId();
    return (
      <Field name={name}>
        <Label htmlFor={id}>{label}</Label>
        <FieldItem>
          <FieldControl>
            <SelectComponent
              value={form.watch(name) ?? ""}
              onValueChange={(value) => form.setValue(name, value)}
            >
              <SelectTrigger id={id} variant="secondary" className="rounded-xl">
                <SelectValue
                  placeholder={placeholder ?? t("common.button.select")}
                />
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
          </FieldControl>
          <FieldError />
        </FieldItem>
      </Field>
    );
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
              onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit(onSubmit)(e);
              }}
              className="space-y-6 w-full max-w-xl self-center place-self-center"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Field name="name">
                    <FieldLabel>
                      {t("submit.page.fields.name.label")}{" "}
                      <span className="text-red-500">*</span>
                    </FieldLabel>
                    <FieldItem>
                      <FieldControl>
                        <Input
                          placeholder={t("submit.page.fields.name.placeholder")}
                          className="rounded-xl"
                          variant="secondary"
                          type="text"
                          value={form.watch("name")}
                          onChange={(e) =>
                            form.setValue("name", e.target.value)
                          }
                        />
                      </FieldControl>
                      <FieldError />
                    </FieldItem>
                  </Field>
                </div>
                <div className="space-y-2">
                  <Field name="email">
                    <FieldLabel>
                      {t("submit.page.fields.email.label")}{" "}
                      <span className="text-red-500">*</span>
                    </FieldLabel>
                    <FieldItem>
                      <FieldControl>
                        <Input
                          placeholder={t(
                            "submit.page.fields.email.placeholder",
                          )}
                          className="rounded-xl"
                          variant="secondary"
                          type="email"
                          value={form.watch("email")}
                          onChange={(e) =>
                            form.setValue("email", e.target.value)
                          }
                        />
                      </FieldControl>
                      <FieldError />
                    </FieldItem>
                  </Field>
                </div>
              </div>

              <Field name="url">
                <FieldLabel>
                  {t("submit.page.fields.url.label")}{" "}
                  <span className="text-red-500">*</span>
                </FieldLabel>
                <FieldItem>
                  <FieldControl>
                    <Input
                      placeholder={t("submit.page.fields.url.placeholder")}
                      className="rounded-xl"
                      variant="secondary"
                      type="url"
                      value={form.watch("url")}
                      onChange={(e) => form.setValue("url", e.target.value)}
                    />
                  </FieldControl>
                  <FieldError />
                </FieldItem>
              </Field>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Select
                    label={t("submit.page.fields.intention.label")}
                    name="intention"
                    options={[
                      {
                        value: "ux_review",
                        label: `🕵️ ${t("submit.page.options.ux_review")}`,
                      },
                    ]}
                  />
                </div>
                {/* Conditional sections */}
                {intention === "ux_review" && (
                  <div className="space-y-2">
                    <Select
                      label={t("submit.page.fields.target.label")}
                      name="target"
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
                    />
                  </div>
                )}
              </div>

              <Field name="description">
                <FieldLabel>
                  {t("submit.page.fields.description.label")}
                </FieldLabel>
                <FieldItem>
                  <FieldControl>
                    <Textarea
                      rows={5}
                      placeholder={t(
                        "submit.page.fields.description.placeholder",
                      )}
                      className="rounded-xl"
                      variant="secondary"
                      value={form.watch("description") ?? ""}
                      onChange={(e) =>
                        form.setValue("description", e.target.value)
                      }
                    />
                  </FieldControl>
                  <FieldError />
                </FieldItem>
              </Field>
              <div className="pt-2">
                <Button
                  type="submit"
                  whileTap
                  asPointer
                  asFull
                  size="lg"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting
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
