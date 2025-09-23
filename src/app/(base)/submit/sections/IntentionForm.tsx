"use client";

import React, { useId } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslations, useLocale } from "next-intl";
import { toast } from "sonner";
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

enum Intention {
  UX_REVIEW = "ux_review",
}

const intentions = Object.values(Intention);

export function IntentionForm() {
  const t = useTranslations();
  const locale = useLocale();

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
      toast.success(t("submit.page.toast.success"));
    } catch (e) {
      toast.error(t("submit.page.toast.error"));
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
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <SelectLabel>{label}</SelectLabel>
            <FormControl>
              <SelectComponent
                value={field.value ?? ""}
                onValueChange={field.onChange}
              >
                <SelectTrigger
                  id={id}
                  variant="secondary"
                  className="rounded-xl"
                >
                  <SelectValue
                    placeholder={placeholder ?? t("common.button.select")}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {options.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </SelectComponent>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

  return (
    <SectionBase
      sectionClassName="w-full"
      sectionContentClassName="w-full"
      cardClassName="w-full"
      cardContentClassName="w-full p-6 md:p-8"
      className="squircle squircle-b-white squircle-xl md:squircle-3xl squircle-smooth-xl border-0 overflow-hidden min-h-60 py-12"
    >
      <Card className="w-full squircle squircle-b-white squircle-smooth-xl">
        <CardContent className="flex flex-col items-center justify-center p-6 md:p-8 space-y-6 gap-6 md:gap-8">
          <div className="flex flex-col items-center text-center gap-2">
            <Badge size="lg">{t("submit.page.header-section.subBadge")}</Badge>
            <h1 className="h3 hidsden">
              {t("submit.page.header-section.subTitle")}
            </h1>
            <p className="text-b-white-invert-sec max-w-2xl hidden">
              {t("submit.page.header-section.subDescription")}
            </p>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 w-full max-w-xl self-center place-self-center"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t("submit.page.fields.name.label")}{" "}
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t(
                              "submit.page.fields.name.placeholder"
                            )}
                            className="rounded-xl"
                            variant="secondary"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t("submit.page.fields.email.label")}{" "}
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t(
                              "submit.page.fields.email.placeholder"
                            )}
                            className="rounded-xl"
                            variant="secondary"
                            type="email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t("submit.page.fields.url.label")}{" "}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("submit.page.fields.url.placeholder")}
                        className="rounded-xl"
                        variant="secondary"
                        type="url"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t("submit.page.fields.description.label")}
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        rows={5}
                        placeholder={t(
                          "submit.page.fields.description.placeholder"
                        )}
                        className="rounded-xl"
                        variant="secondary"
                        value={field.value ?? ""}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-2">
                <Button type="submit" whileTap asPointer asFull size="lg">
                  {t("submit.page.actions.submit")}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </SectionBase>
  );
}
