"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
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
import { SectionLayout } from "@/components/shared/sections/layout";
import { Card, CardContent } from "@/components/ui/card";
import { apiRoutes } from "@/data/api-routes";
import type { Challenge } from "@/module/content/utils/lib/challenges";
import { getHumanDate } from "@/utils";

const schema = z.object({
  name: z.string().min(2, "Nom requis"),
  email: z.email("Email invalide"),
  workTitle: z.string().min(3, "Titre requis"),
  workUrl: z.url("URL invalide"),
  portfolioUrl: z.url("URL invalide").optional().or(z.literal("")),
  figmaUrl: z.url("URL invalide").optional().or(z.literal("")),
  posterUrl: z.url("URL invalide").optional().or(z.literal("")),
  message: z.string().max(1500, "Message trop long").optional(),
});

type FormValues = z.infer<typeof schema>;

export function ChallengeSubmissionForm({
  challenge,
  isClosed,
}: {
  challenge: Challenge;
  isClosed: boolean;
}) {
  const locale = useLocale();
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      workTitle: "",
      workUrl: "",
      portfolioUrl: "",
      figmaUrl: "",
      posterUrl: "",
      message: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const res = await fetch(apiRoutes.challengesSubmit(challenge.slug).link, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, locale }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data?.error || "SUBMIT_FAILED");
      }
      toast.success(
        "Soumission reçue. Tu as reçu un email de confirmation, il ne reste plus qu'à patienter."
      );
      form.reset();
    } catch (error) {
      toast.error("Impossible d'envoyer ta soumission.");
    }
  };

  return (
    <SectionLayout>
      <Card className="w-full squircle squircle-b-base squircle-smooth-xl border">
        <CardContent className="p-5 md:p-6 space-y-4">
          <div>
            <h3 className="h5">Soumettre son travail</h3>
            <p className="text-sm text-b-white-invert-sec">
              Deadline: {getHumanDate(challenge.submission_deadline)}. Après cette
              date, les soumissions sont verrouillées.
            </p>
          </div>
          {isClosed ? (
            <Card className="squircle squircle-b-base squircle-smooth-xl border">
              <CardContent className="p-4 text-sm text-b-white-invert-sec">
                Les soumissions sont fermées pour ce challenge.
              </CardContent>
            </Card>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom</FormLabel>
                        <FormControl>
                          <Input {...field} variant="secondary" placeholder="Ton nom" />
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
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} type="email" variant="secondary" placeholder="ton@email.com" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="workTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Titre du travail</FormLabel>
                      <FormControl>
                        <Input {...field} variant="secondary" placeholder="Ex: Refonte dashboard analytics" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="workUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lien du travail (portfolio, Figma, live)</FormLabel>
                      <FormControl>
                        <Input {...field} variant="secondary" placeholder="https://..." />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="portfolioUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Portfolio (optionnel)</FormLabel>
                        <FormControl>
                          <Input {...field} variant="secondary" placeholder="https://..." />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="figmaUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Figma (optionnel)</FormLabel>
                        <FormControl>
                          <Input {...field} variant="secondary" placeholder="https://figma.com/..." />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="posterUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Affiche (optionnel)</FormLabel>
                        <FormControl>
                          <Input {...field} variant="secondary" placeholder="https://..." />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message (optionnel)</FormLabel>
                      <FormControl>
                        <Textarea
                          value={field.value ?? ""}
                          onChange={field.onChange}
                          variant="secondary"
                          rows={4}
                          placeholder="Contexte, contraintes, choix design..."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" asPointer whileTap>
                  Envoyer ma soumission
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </SectionLayout>
  );
}
