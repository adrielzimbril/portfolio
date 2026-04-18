"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useLocale, useTranslations } from "use-intl";
import { Form } from "@/components/ui/form";
import {
  Field,
  FieldControl,
  FieldError,
  FieldItem,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { apiRoutes } from "@/data/api-routes";
import { SectionBase } from "@/components/shared/pages/shared/section-base";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FormFeedbackModal } from "@/components/shared/forms/FormFeedbackModal";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.email("Invalid email"),
  message: z.string().max(1200, "Message is too long").optional(),
});

type FormValues = z.infer<typeof schema>;

export function IntentionForm({ questSlug }: { questSlug: string }) {
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

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const res = await fetch(apiRoutes.quests.register(questSlug).link, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, locale }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data?.error || "REGISTER_FAILED");
      }

      setFeedback({
        open: true,
        status: "success",
        title: t("quests.register.form.feedback.success.title"),
        description: t("quests.register.form.feedback.success.description"),
      });
      form.reset();
    } catch {
      setFeedback({
        open: true,
        status: "error",
        title: t("quests.register.form.feedback.error.title"),
        description: t("quests.register.form.feedback.error.description"),
      });
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
              <Badge size="lg">{t("quests.register.form.badge")}</Badge>
              <h2 className="h3">{t("quests.register.form.title")}</h2>
              <p className="text-b-white-invert-sec max-w-2xl">
                {t("quests.register.form.description")}
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
                <Field name="name">
                  <FieldLabel>
                    {t("quests.register.form.fields.name.label")}{" "}
                    <span className="text-red-500">*</span>
                  </FieldLabel>
                  <FieldItem>
                    <FieldControl>
                      <Input
                        value={form.watch("name")}
                        onChange={(e) => form.setValue("name", e.target.value)}
                        variant="secondary"
                        className="rounded-xl"
                        placeholder={t("submit.page.fields.name.placeholder")}
                      />
                    </FieldControl>
                    <FieldError />
                  </FieldItem>
                </Field>
                <Field name="email">
                  <FieldLabel>
                    {t("quests.register.form.fields.email.label")}{" "}
                    <span className="text-red-500">*</span>
                  </FieldLabel>
                  <FieldItem>
                    <FieldControl>
                      <Input
                        value={form.watch("email")}
                        onChange={(e) => form.setValue("email", e.target.value)}
                        type="email"
                        variant="secondary"
                        className="rounded-xl"
                        placeholder={t("submit.page.fields.email.placeholder")}
                      />
                    </FieldControl>
                    <FieldError />
                  </FieldItem>
                </Field>
              </div>

              <Field name="message">
                <FieldLabel>
                  {t("quests.register.form.fields.message.label")}
                </FieldLabel>
                <FieldItem>
                  <FieldControl>
                    <Textarea
                      value={form.watch("message") ?? ""}
                      onChange={(e) => form.setValue("message", e.target.value)}
                      rows={5}
                      variant="secondary"
                      className="rounded-xl"
                      placeholder={t(
                        "quests.register.form.fields.message.placeholder",
                      )}
                    />
                  </FieldControl>
                  <FieldError />
                </FieldItem>
              </Field>

              <Button
                type="submit"
                whileTap
                asPointer
                asFull
                size="lg"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting
                  ? t("quests.register.form.actions.submitting")
                  : t("quests.register.form.actions.submit")}
              </Button>
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
