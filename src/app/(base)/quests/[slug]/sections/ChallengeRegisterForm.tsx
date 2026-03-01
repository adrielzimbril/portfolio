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

const schema = z.object({
  name: z.string().min(2, "Nom requis"),
  email: z.email("Email invalide"),
  portfolioUrl: z.url("URL portfolio invalide").optional().or(z.literal("")),
  motivation: z.string().max(1000, "Message trop long").optional(),
});

type FormValues = z.infer<typeof schema>;

export function ChallengeRegisterForm({ questSlug }: { questSlug: string }) {
  const locale = useLocale();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      portfolioUrl: "",
      motivation: "",
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

      toast.success("Inscription validée. Un email vient d'être envoyé.");
      form.reset();
    } catch (error) {
      toast.error("Impossible de finaliser l'inscription.");
    }
  };

  return (
    <SectionLayout>
      <Card className="w-full squircle squircle-b-base squircle-smooth-xl border">
        <CardContent className="p-5 md:p-6 space-y-4">
          <div>
            <h3 className="h5">Inscription au quest</h3>
            <p className="text-sm text-b-white-invert-sec">
              Tu seras ajouté à la newsletter du quest et recontacté par email.
            </p>
          </div>
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
                name="portfolioUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Portfolio (optionnel)</FormLabel>
                    <FormControl>
                      <Input {...field} variant="secondary" placeholder="https://ton-portfolio.com" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="motivation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message (optionnel)</FormLabel>
                    <FormControl>
                      <Textarea
                        value={field.value ?? ""}
                        onChange={field.onChange}
                        variant="secondary"
                        rows={4}
                        placeholder="Ton objectif dans ce quest"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" asPointer whileTap>
                S'inscrire
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </SectionLayout>
  );
}

