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
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { cn } from "@/utils/utils";
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
import { PageHero } from "@/components/shared/pages/shared/page-hero";
import { richTextComponent } from "@/module/content/utils/mdx-components";

const intentions = ["ux_review"] as const;

const schema = z.object({
  intention: z.enum(intentions),
  url: z.string().url().optional().or(z.literal("")),
  email: z.string().email().optional().or(z.literal("")),
  // A/C
  target: z.string().optional(),
  focus: z.string().optional(),
  detail: z.string().optional(),
  // B
  figmaType: z.string().optional(),
  redesignGoal: z.string().optional(),
  // D
  productType: z.string().optional(),
  ideaDescription: z.string().optional(),
  validationGoal: z.string().optional(),
  // E
  freeText: z.string().optional(),
});

export type IntentionFormValues = z.infer<typeof schema>;

export function IntentionForm() {
  const t = useTranslations();

  const form = useForm<IntentionFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { intention: "ux_review" },
  });

  const intention = form.watch("intention");

  const onSubmit: SubmitHandler<IntentionFormValues> = (values) => {
    // TODO: wire to backend or email/service later
    console.log("submit_thought_intention", values);
    toast.success(t("submit.page.toast.success"));
    form.reset({ intention: values.intention });
  };

  const Select = ({
    name,
    options,
    placeholder,
  }: {
    name: keyof IntentionFormValues;
    options: Array<{ value: string; label: string }>;
    placeholder?: string;
  }) => {
    const id = useId();
    return (
      <FormField
        control={form.control}
        name={name as any}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <SelectComponent
                value={field.value ?? ""}
                onValueChange={field.onChange}
              >
                <SelectTrigger id={id} variant="secondary">
                  <SelectValue
                    placeholder={placeholder ?? t("common.button.select")}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>{placeholder}</SelectLabel>
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
    <>
      <PageHero
        title={t("submit.page.header-section.title")}
        description={t.rich("submit.page.header-section.description", {
          ...richTextComponent,
        })}
        badge={t("submit.page.header-section.badge")}
        imagePath={{ emoji: "🐼" }}
        actionButton
      />
      <SectionBase
        sectionClassName="w-full"
        sectionContentClassName="w-full"
        cardClassName="w-full"
        cardContentClassName="w-full p-6 md:p-8"
        className="squircle squircle-b-white squircle-xl md:squircle-3xl squircle-smooth-xl border-0 overflow-hidden min-h-60 py-12"
      >
        <Card className="w-full squircle squircle-b-white squircle-smooth-xl">
          <CardContent className="p-6 md:p-8 space-y-6 gap-6">
            <div className="flex flex-col items-center text-center gap-2 hodd">
              <Badge size="lg">{t("submit.page.header-section.badge")}</Badge>
              <h1 className="h2">{t("submit.page.header-section.title")}</h1>
              <p className="text-b-white-invert-sec max-w-2xl hidden">
                {t("submit.page.header-section.description")}
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 w-full max-w-xl self-center place-self-center "
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <Label>{t("submit.page.fields.name.label")}</Label>
                          <FormControl>
                            <Input
                              placeholder={t(
                                "submit.page.fields.name.placeholder"
                              )}
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
                          <Label>{t("submit.page.fields.email.label")}</Label>
                          <FormControl>
                            <Input
                              placeholder={t(
                                "submit.page.fields.email.placeholder"
                              )}
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
                      <Label>{t("submit.page.fields.url.label")}</Label>
                      <FormControl>
                        <Input
                          placeholder={t("submit.page.fields.url.placeholder")}
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
                    <Label>{t("submit.page.fields.intention.label")}</Label>
                    <Select
                      name="intention"
                      options={[
                        {
                          value: "ux_review",
                          label: `🕵️ ${t("submit.page.options.ux_review")}`,
                        },
                        {
                          value: "redesign_figma",
                          label: `🎨 ${t("submit.page.options.redesign_figma")}`,
                        },
                        {
                          value: "analysis",
                          label: `🌐 ${t("submit.page.options.analysis")}`,
                        },
                        {
                          value: "feature_idea",
                          label: `💡 ${t("submit.page.options.feature_idea")}`,
                        },
                        {
                          value: "other",
                          label: `✨ ${t("submit.page.options.other")}`,
                        },
                      ]}
                    />
                  </div>
                  {/* Conditional sections */}
                  {intention === "ux_review" && (
                    <div className="space-y-2">
                      <Label>{t("submit.page.fields.target.label")}</Label>
                      <Select
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

                {/* Conditional sections */}
                {intention === "redesign_figma" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>{t("submit.page.fields.figmaType.label")}</Label>
                      <Select
                        name="figmaType"
                        options={[
                          {
                            value: "prototype",
                            label: t("submit.page.options.figma.prototype"),
                          },
                          {
                            value: "uikit",
                            label: t("submit.page.options.figma.uikit"),
                          },
                          {
                            value: "wireframe",
                            label: t("submit.page.options.figma.wireframe"),
                          },
                        ]}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>
                        {t("submit.page.fields.redesignGoal.label")}
                      </Label>
                      <Select
                        name="redesignGoal"
                        options={[
                          {
                            value: "fun",
                            label: t("submit.page.options.redesign.fun"),
                          },
                          {
                            value: "productivity",
                            label: t(
                              "submit.page.options.redesign.productivity"
                            ),
                          },
                          {
                            value: "engagement",
                            label: t("submit.page.options.redesign.engagement"),
                          },
                          {
                            value: "aesthetic",
                            label: t("submit.page.options.redesign.aesthetic"),
                          },
                        ]}
                      />
                    </div>
                  </div>
                )}

                {intention === "analysis" && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>{t("submit.page.fields.target.label")}</Label>
                      <Select
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
                    <div className="space-y-2">
                      <Label>{t("submit.page.fields.focus.label")}</Label>
                      <Select
                        name="focus"
                        options={[
                          {
                            value: "ux",
                            label: t("submit.page.options.focus.ux"),
                          },
                          {
                            value: "ui",
                            label: t("submit.page.options.focus.ui"),
                          },
                          {
                            value: "performance",
                            label: t("submit.page.options.focus.performance"),
                          },
                          {
                            value: "accessibility",
                            label: t("submit.page.options.focus.accessibility"),
                          },
                        ]}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>{t("submit.page.fields.detail.label")}</Label>
                      <Select
                        name="detail"
                        options={[
                          {
                            value: "quick",
                            label: t("submit.page.options.detail.quick"),
                          },
                          {
                            value: "deep",
                            label: t("submit.page.options.detail.deep"),
                          },
                        ]}
                      />
                    </div>
                  </div>
                )}

                {intention === "feature_idea" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>
                          {t("submit.page.fields.productType.label")}
                        </Label>
                        <Select
                          name="productType"
                          options={[
                            {
                              value: "saas",
                              label: t("submit.page.options.productType.saas"),
                            },
                            {
                              value: "webapp",
                              label: t(
                                "submit.page.options.productType.webapp"
                              ),
                            },
                            {
                              value: "mobileapp",
                              label: t(
                                "submit.page.options.productType.mobileapp"
                              ),
                            },
                          ]}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>
                          {t("submit.page.fields.validationGoal.label")}
                        </Label>
                        <Select
                          name="validationGoal"
                          options={[
                            {
                              value: "feedback",
                              label: t(
                                "submit.page.options.validation.feedback"
                              ),
                            },
                            {
                              value: "mvp",
                              label: t("submit.page.options.validation.mvp"),
                            },
                            {
                              value: "usertest",
                              label: t(
                                "submit.page.options.validation.usertest"
                              ),
                            },
                          ]}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>
                        {t("submit.page.fields.ideaDescription.label")}
                      </Label>
                      <FormField
                        control={form.control}
                        name="ideaDescription"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Textarea
                                rows={5}
                                variant="secondary"
                                placeholder={t(
                                  "submit.page.fields.ideaDescription.placeholder"
                                )}
                                value={field.value ?? ""}
                                onChange={field.onChange}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                )}

                {intention === "other" && (
                  <div className="space-y-2">
                    <Label>{t("submit.page.fields.freeText.label")}</Label>
                    <FormField
                      control={form.control}
                      name="freeText"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Textarea
                              rows={5}
                              variant="secondary"
                              placeholder={t(
                                "submit.page.fields.freeText.placeholder"
                              )}
                              value={field.value ?? ""}
                              onChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

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
      <Card className="w-full squircle squircle-b-white squircle-smooth-xl">
        <CardContent className="p-6 md:p-8 space-y-6 gap-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 w-full max-w-xl self-center place-self-center "
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <Label>{t("submit.page.fields.name.label")}</Label>
                        <FormControl>
                          <Input
                            placeholder={t(
                              "submit.page.fields.name.placeholder"
                            )}
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
                        <Label>{t("submit.page.fields.email.label")}</Label>
                        <FormControl>
                          <Input
                            placeholder={t(
                              "submit.page.fields.email.placeholder"
                            )}
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
                    <Label>{t("submit.page.fields.url.label")}</Label>
                    <FormControl>
                      <Input
                        placeholder={t("submit.page.fields.url.placeholder")}
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
                  <Label>{t("submit.page.fields.intention.label")}</Label>
                  <Select
                    name="intention"
                    options={[
                      {
                        value: "ux_review",
                        label: `🕵️ ${t("submit.page.options.ux_review")}`,
                      },
                      {
                        value: "redesign_figma",
                        label: `🎨 ${t("submit.page.options.redesign_figma")}`,
                      },
                      {
                        value: "analysis",
                        label: `🌐 ${t("submit.page.options.analysis")}`,
                      },
                      {
                        value: "feature_idea",
                        label: `💡 ${t("submit.page.options.feature_idea")}`,
                      },
                      {
                        value: "other",
                        label: `✨ ${t("submit.page.options.other")}`,
                      },
                    ]}
                  />
                </div>
                {/* Conditional sections */}
                {intention === "ux_review" && (
                  <div className="space-y-2">
                    <Label>{t("submit.page.fields.target.label")}</Label>
                    <Select
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

              <div className="pt-2">
                <Button type="submit" whileTap asPointer asFull size="lg">
                  {t("submit.page.actions.submit")}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
