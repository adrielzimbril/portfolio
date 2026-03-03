"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useLocale } from "use-intl";
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
import { SectionBase } from "@/components/shared/pages/shared/section-base";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FormFeedbackModal } from "@/components/shared/forms/FormFeedbackModal";

const schema = z.object({
  name: z.string().min(2, "Nom requis"),
  email: z.email("Email invalide"),
  contexte: z.string().max(1200, "Message trop long").optional(),
});

type FormValues = z.infer<typeof schema>;

export function QuestRegisterForm({ questSlug }: { questSlug: string }) {
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
      contexte: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const res = await fetch(apiRoutes.questsRegister(questSlug).link, {
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
        title: "Inscription enregistree",
        description:
          "Message recu. Un email de confirmation vient de t'etre envoye.",
      });
      form.reset();
    } catch {
      setFeedback({
        open: true,
        status: "error",
        title: "Envoi impossible",
        description:
          "Une erreur est survenue pendant l'inscription. Merci de reessayer.",
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
              <Badge size="lg">Inscription au defi</Badge>
              <h2 className="h3">Rejoins le defi</h2>
              <p className="text-b-white-invert-sec max-w-2xl">
                Reserve ta place pour recevoir le brief, les regles et toutes
                les infos pratiques avant le lancement.
              </p>
            </div>

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
                          Nom <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            variant="secondary"
                            className="rounded-xl"
                            placeholder="Ton nom"
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
                          Email <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            variant="secondary"
                            className="rounded-xl"
                            placeholder="ton@email.com"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="contexte"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contexte (optionnel)</FormLabel>
                      <FormControl>
                        <Textarea
                          value={field.value ?? ""}
                          onChange={field.onChange}
                          rows={5}
                          variant="secondary"
                          className="rounded-xl"
                          placeholder="Ton contexte, ce que tu veux travailler et ce que tu attends du defi..."
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
                    ? "Enregistrement..."
                    : "Confirmer mon inscription"}
                </Button>
              </form>
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
