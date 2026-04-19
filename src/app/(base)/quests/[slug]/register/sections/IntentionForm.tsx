"use client";
import React, { useCallback, useState } from "react";
import { useLocale, useTranslations } from "use-intl";
import { Form } from "@/components/ui/form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { apiRoutes } from "@/data/api-routes";
import { SectionBase } from "@/components/shared/pages/shared/section-base";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FormFeedbackModal } from "@/components/shared/forms/FormFeedbackModal";

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

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name.length < 2) {
      setFeedback({
        open: true,
        status: "error",
        title: t("quests.register.form.feedback.error.title"),
        description: "Le nom est requis",
      });
      return;
    }

    if (!email || !email.includes("@")) {
      setFeedback({
        open: true,
        status: "error",
        title: t("quests.register.form.feedback.error.title"),
        description: "Email invalide",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(apiRoutes.quests.register(questSlug).link, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, locale }),
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
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setFeedback({
        open: true,
        status: "error",
        title: t("quests.register.form.feedback.error.title"),
        description: t("quests.register.form.feedback.error.description"),
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
              <Badge size="lg">{t("quests.register.form.badge")}</Badge>
              <h2 className="h3">{t("quests.register.form.title")}</h2>
              <p className="text-b-white-invert-sec max-w-2xl">
                {t("quests.register.form.description")}
              </p>
            </div>

            <Form
              onSubmit={onSubmit}
              className="space-y-6 w-full max-w-xl self-center place-self-center"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field>
                  <FieldLabel>
                    {t("quests.register.form.fields.name.label")}{" "}
                    <span className="text-red-500">*</span>
                  </FieldLabel>
                  <Input
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    variant="secondary"
                    className="rounded-xl"
                    placeholder={t("submit.page.fields.name.placeholder")}
                    required
                    minLength={2}
                  />
                  <FieldError>Le nom est requis</FieldError>
                </Field>
                <Field>
                  <FieldLabel>
                    {t("quests.register.form.fields.email.label")}{" "}
                    <span className="text-red-500">*</span>
                  </FieldLabel>
                  <Input
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    variant="secondary"
                    className="rounded-xl"
                    placeholder={t("submit.page.fields.email.placeholder")}
                    required
                  />
                  <FieldError>Email invalide</FieldError>
                </Field>
              </div>

              <Field>
                <FieldLabel>
                  {t("quests.register.form.fields.message.label")}
                </FieldLabel>
                <Textarea
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  variant="secondary"
                  className="rounded-xl"
                  placeholder={t(
                    "quests.register.form.fields.message.placeholder",
                  )}
                  maxLength={1200}
                />
              </Field>

              <Button
                type="submit"
                whileTap
                asPointer
                asFull
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting
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
