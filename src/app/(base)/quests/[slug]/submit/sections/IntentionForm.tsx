"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useLocale, useTranslations } from "use-intl";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { apiRoutes } from "@/data/api-routes";
import type { Quest } from "@/module/content/lib/quests";
import { getHumanDate } from "@/utils";
import { SectionBase } from "@/components/shared/pages/shared/section-base";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FormFeedbackModal } from "@/components/shared/forms/FormFeedbackModal";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.email("Invalid email"),
  workUrl: z.url("Invalid URL"),
  message: z.string().max(1500, "Message is too long").optional(),
});

type FormValues = z.infer<typeof schema>;

export function IntentionForm({
  quest,
  isClosed,
}: {
  quest: Quest;
  isClosed: boolean;
}) {
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
      workUrl: "",
      message: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const res = await fetch(apiRoutes.questsSubmit(quest.slug).link, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, locale }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data?.error || "SUBMIT_FAILED");
      }
      setFeedback({
        open: true,
        status: "success",
        title: t("quests.submit.form.feedback.success.title"),
        description: t("quests.submit.form.feedback.success.description"),
      });
      form.reset();
    } catch {
      setFeedback({
        open: true,
        status: "error",
        title: t("quests.submit.form.feedback.error.title"),
        description: t("quests.submit.form.feedback.error.description"),
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
              <Badge size="lg">{t("quests.submit.form.badge")}</Badge>
              <h2 className="h3">{t("quests.submit.form.title")}</h2>
              <p className="text-b-white-invert-sec max-w-2xl">
                {t("quests.submit.form.deadline", {
                  date: getHumanDate(quest.submission_deadline, true),
                })}
              </p>
            </div>

            {isClosed ? (
              <Card className="w-full max-w-xl squircle squircle-b-base squircle-smooth-xl border">
                <CardContent className="p-4 text-sm text-b-white-invert-sec text-center">
                  {t("quests.submit.form.closedInline")}
                </CardContent>
              </Card>
            ) : (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6 w-full max-w-xl self-center place-self-center"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {t("quests.submit.form.fields.name.label")} <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              variant="secondary"
                              className="rounded-xl"
                              placeholder={t("submit.page.fields.name.placeholder")}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {t("quests.submit.form.fields.email.label")} <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              variant="secondary"
                              className="rounded-xl"
                              placeholder={t("submit.page.fields.email.placeholder")}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="workUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t("quests.submit.form.fields.link.label")} <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            variant="secondary"
                            className="rounded-xl"
                            placeholder={t("submit.page.fields.url.placeholder")}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("quests.submit.form.fields.message.label")}</FormLabel>
                        <FormControl>
                          <Textarea
                            value={field.value ?? ""}
                            onChange={field.onChange}
                            rows={5}
                            variant="secondary"
                            className="rounded-xl"
                            placeholder={t("quests.submit.form.fields.message.placeholder")}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    whileTap
                    asPointer
                    asFull
                    size="lg"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting
                      ? t("quests.submit.form.actions.submitting")
                      : t("quests.submit.form.actions.submit")}
                  </Button>
                </form>
              </Form>
            )}
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
