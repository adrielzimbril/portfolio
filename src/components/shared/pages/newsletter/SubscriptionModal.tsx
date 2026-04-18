"use client";
import React, { useEffect, useState, useRef } from "react";
import { CheckCircle } from "@aurthle/icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import logger from "@/utils/logger";
import { toast } from "@/lib/toast";
import { PhoneInput } from "@aurthle/react-phone";
import * as RPNInput from "react-phone-number-input";
import confetti from "canvas-confetti";
import { getIpInfo, useGetIpInfo } from "@/hooks/useIpInfo";
import { cn } from "@/utils/utils";
import { ResourceTypeKey } from "@/types";
import { Loader } from "@/components/shared/_layouts/loader";
import { useTranslations, useLocale } from "use-intl";
import { apiRoutes } from "@/data/api-routes";

interface SubscriptionModalProps {
  isOpen: boolean;
  email?: string;
  productId?: string;
  productType?: ResourceTypeKey;
  onClose: () => void;
}

const confettiConfig: {
  beforeName: boolean;
  afterName: boolean;
} = {
  beforeName: false,
  afterName: true,
};

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  isOpen,
  email,
  productId,
  productType,
  onClose,
}) => {
  const t = useTranslations();
  const locale = useLocale();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [userCountry, setUserCountry] = useState<RPNInput.Country>("FR");
  const [hasInitialSubscription, setHasInitialSubscription] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  // Use of useRef to ensure we only fetch the IP once
  const ipInfoFetched = useRef(false);
  const countryFetched = useRef(false);

  // Fetch the country once at open
  useEffect(() => {
    if (!isOpen || countryFetched.current) return;

    const getCountry = async () => {
      try {
        const country = await getIpInfo();
        setUserCountry(
          (country.data?.country?.iso2 as RPNInput.Country) ??
            ("FR" as unknown as RPNInput.Country),
        );
      } catch (error) {
        logger.error(t("logger.ip.fetch.country-failed"), error);
      }
    };

    getCountry();
    countryFetched.current = true;
  }, [isOpen]);

  const apiSubscribe = (data: {
    email: string;
    name?: string;
    phone?: string;
    subscribedFromPage?: string;
    updateExisting: boolean;
    productId?: string;
    productType?: ResourceTypeKey;
    updateLayer?: boolean;
  }) => {
    return fetch(apiRoutes.subscribe.link, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, locale }),
    });
  };

  // Automatic subscription with email at open
  useEffect(() => {
    //if (!isOpen || !email || hasInitialSubscription || ipInfoFetched.current)
    if (!isOpen || !email) return;

    const subscribeWithEmail = async () => {
      try {
        const subscribedFromPage =
          typeof window !== "undefined" ? window.location.pathname : undefined;

        await apiSubscribe({
          email,
          subscribedFromPage,
          updateExisting: false,
          productId,
          productType,
          updateLayer: false,
        }).then(async (res) => {
          const json = await res.json();
          if (!res.ok) {
            throw new Error(json?.error || t("zod.errors.customized.hint"));
          }

          const handleClick = () => {
            const end = Date.now() + 3 * 1000; // 3 seconds
            const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

            const scalar = 2;
            const triangle = confetti.shapeFromPath({
              path: "M0 10 L5 0 L10 10z",
            });
            const square = confetti.shapeFromPath({
              path: "M0 0 L10 0 L10 10 L0 10 Z",
            });
            const coin = confetti.shapeFromPath({
              path: "M5 0 A5 5 0 1 0 5 10 A5 5 0 1 0 5 0 Z",
            });
            const tree = confetti.shapeFromPath({
              path: "M5 0 L10 10 L0 10 Z",
            });

            const frame = () => {
              if (Date.now() > end) return;
              if (confettiConfig.beforeName) {
                confetti({
                  particleCount: 2,
                  angle: 60,
                  spread: 55,
                  startVelocity: 60,
                  origin: { x: 0, y: 0.5 },
                  colors: colors,
                  shapes: [triangle, square, coin, tree],
                  scalar,
                });
                confetti({
                  particleCount: 2,
                  angle: 120,
                  spread: 55,
                  startVelocity: 60,
                  origin: { x: 1, y: 0.5 },
                  colors: colors,
                  shapes: [triangle, square, coin, tree],
                  scalar,
                });
              }
              requestAnimationFrame(frame);
            };
            frame();
          };

          handleClick();
        });

        setHasInitialSubscription(true);
      } catch (error) {
        toast.error(t("logger.newsletter.subscribe.failed"));
        logger.error(t("logger.newsletter.subscribe.failed"), error);
      }
    };

    subscribeWithEmail();
    ipInfoFetched.current = true;
  }, [isOpen, email, hasInitialSubscription]);

  const animateConfetti = () => {
    const duration = 8 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      toast.error(t("zod.errors.customized.email.update-required"));
      return;
    }

    if (name.length < 4) {
      toast.error(t("zod.errors.customized.name.required"));
      return;
    }

    if (phone.length < 10) {
      toast.error(t("zod.errors.customized.phone.required"));
      return;
    }

    setIsSubmitting(true);

    try {
      await apiSubscribe({
        email,
        name: name || undefined,
        phone: phone || undefined,
        productId,
        productType,
        subscribedFromPage:
          typeof window !== "undefined" ? window.location.pathname : undefined,
        updateExisting: true,
        updateLayer: true,
      });

      setIsSuccess(true);
      if (confettiConfig.afterName) {
        animateConfetti();
      }

      // Show playful toast
      toast.success("🎉 Super ! Tu vas être redirigé vers la page produit...", {
        duration: 2000,
      });

      setTimeout(() => {
        onClose();
        setIsSuccess(false);
        setName("");
        setPhone("");
        if (confettiConfig.afterName) {
          animateConfetti();
        }
        // Redirect to product page
        if (typeof window !== "undefined") {
          window.location.href = "/hub";
        }
      }, 2000);
    } catch (error) {
      logger.error(t("logger.newsletter.subscribe.failed"), error);
      toast.error(t("logger.form.submit-update-failed"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
      setIsSuccess(false);
      setName("");
      setPhone("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-start">
            {productId
              ? t("common.page-sections.newsletter.hub-title")
              : t("common.page-sections.newsletter.title")}
          </DialogTitle>
          <DialogDescription className="text-center hidden text-b-white-invert-sec">
            {hasInitialSubscription
              ? t("common.page-sections.newsletter.description.state")
              : t("common.page-sections.newsletter.description.default")}
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <CheckCircle className="text-green-500" size={48} />
            <h3 className="text-xl font-semibold text-green-600">
              {t("common.page-sections.newsletter.form.success.message.title")}
            </h3>
            <p className="text-center text-b-white-invert-sec">
              {t(
                "common.page-sections.newsletter.form.success.message.description",
              )}
            </p>
          </div>
        ) : (
          <Form onSubmit={onSubmit} className="space-y-6">
            <Field>
              <FieldLabel className="text-sm font-medium">
                {t("common.page-sections.newsletter.form.fields.name.label")}
              </FieldLabel>
              <Input
                name="name"
                placeholder={t(
                  "common.page-sections.newsletter.form.fields.name.placeholder",
                )}
                className="h-12 border-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                minLength={4}
              />
              <FieldError>Name must be at least 4 characters</FieldError>
            </Field>

            <Field>
              <FieldLabel className="tesxt-sm font-medium">
                {t("common.page-sections.newsletter.form.fields.phone.label")}
              </FieldLabel>
              <PhoneInput
                defaultCountry={userCountry}
                wrapperClassName="rounded-xl w-full h-12"
                className="rounded-xl w-full h-12"
                inputComponent={Input}
                inputClassName={cn(
                  "-ms-px shadow-none",
                  "peer ps-18",
                  "h-auto",
                  "rounded-xl",
                  "text-base",
                )}
                triggerClassName={cn(
                  "bg-b-base-it border-b-base-accent! hover:bg-b-base h-auto rounded-s-xl peer z-10",
                  "h-auto border-2",
                )}
                contentClassName="data-[selected=true]:bg-b-base data-[selected=true]:text-inherit"
                value={phone || ""}
                onChange={(value) => setPhone(value || "")}
              />
              <FieldError>Phone must be at least 10 digits</FieldError>
            </Field>

            <div className="flex gap-3">
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="flex-1"
                asFull
                asPointer
                whileTap
              >
                {isSubmitting ? (
                  <>
                    <Loader
                      color="bg-b-base"
                      variant="bounce"
                      className="py-2"
                    />
                    {/* <span>{t("common.button.sending")}</span> */}
                  </>
                ) : (
                  <>
                    <span>{t("common.button.receive")} 🦄</span>
                  </>
                )}
              </Button>
            </div>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};
