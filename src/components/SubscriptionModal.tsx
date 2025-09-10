import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, CheckCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import logger from "@/utils/logger";
import { toast } from "sonner";
import { PhoneInput } from "@aurthle/react-phone";
import confetti from "canvas-confetti";
import { useGetIpInfo } from "@/hooks/useIpInfo";
import { cn } from "@/utils";
import posthog from "posthog-js";
import { ResourceTypeKey } from "@/types";
import { motion } from "motion/react";

// Form Info Schema for ensuring name and phone
const FormInfoSchema = z.object({
  name: z
    .string({ error: "Oups, le nom est requis 😅" })
    .min(4, { message: "Le nom doit contenir au moins 4 caractères 😅" }),
  phone: z
    .string({ error: "Oups, le numéro de téléphone est requis 😅" })
    .min(10, {
      message: "Le numéro de téléphone ne semble pas être valide 😅",
    }),
});

type FormInfoForm = z.infer<typeof FormInfoSchema>;

interface SubscriptionModalProps {
  isOpen: boolean;
  email?: string;
  productId?: string;
  productType?: ResourceTypeKey;
  onClose: () => void;
}

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  isOpen,
  email,
  productId,
  productType,
  onClose,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [userCountry, setUserCountry] = useState("FR");
  const [hasInitialSubscription, setHasInitialSubscription] = useState(false);

  // Use of useRef to ensure we only fetch the IP once
  const ipInfoFetched = useRef(false);
  const countryFetched = useRef(false);

  // Fetch the country once at open
  useEffect(() => {
    if (!isOpen || countryFetched.current) return;

    const getCountry = async () => {
      try {
        const country = await useGetIpInfo(undefined, true);
        setUserCountry(country.data?.country?.code ?? "FR");
      } catch (error) {
        logger.error("Erreur lors de la récupération du pays:", error);
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
    return fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
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

        const res = await apiSubscribe({
          email,
          subscribedFromPage,
          updateExisting: false, // Première inscription
          productId,
          productType,
          updateLayer: false,
        });

        const json = await res.json();
        if (!res.ok) {
          throw new Error(json?.error || "Erreur lors de l'inscription");
        }

        setHasInitialSubscription(true);
      } catch (error) {
        toast.error("Erreur lors de l'inscription. Veuillez réessayer.");
      }
    };

    subscribeWithEmail();
    ipInfoFetched.current = true;
  }, [isOpen, email, hasInitialSubscription]);

  const formSchemaValidate = useForm<FormInfoForm>({
    resolver: zodResolver(FormInfoSchema),
  });

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

  const onSubmit = async (values: FormInfoForm) => {
    if (!email) {
      toast.error("Oups, l'email est requis pour la mise à jour 😅");
      return;
    }

    setIsSubmitting(true);

    try {
      posthog.capture("subscription_modal_optional_info_submitted", {
        email: email,
        has_name: !!values.name,
        has_phone: !!values.phone,
      });
      await apiSubscribe({
        email,
        name: values.name || undefined,
        phone: values.phone || undefined,
        productId,
        productType,
        subscribedFromPage:
          typeof window !== "undefined" ? window.location.pathname : undefined,
        updateExisting: true,
        updateLayer: true,
      });

      setIsSuccess(true);
      animateConfetti();

      setTimeout(() => {
        onClose();
        setIsSuccess(false);
        formSchemaValidate.reset();
        animateConfetti();
      }, 200000);
    } catch (error) {
      logger.error("Erreur lors de la mise à jour:", error);
      toast.error(
        "Une erreur est survenue lors de la mise à jour. Veuillez réessayer."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      posthog.capture("subscription_modal_skipped", {
        email: email,
      });
      onClose();
      setIsSuccess(false);
      formSchemaValidate.reset();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            🎁 Recevoir les cadeaux
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600">
            {hasInitialSubscription
              ? "Votre inscription est confirmée ! Vous pouvez ajouter vos informations pour personnaliser votre expérience."
              : "Inscription en cours... Vous pouvez ajouter vos informations personnelles."}
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <CheckCircle className="w-16 h-16 text-green-500" />
            <h3 className="text-xl font-semibold text-green-600">
              Informations mises à jour !
            </h3>
            <p className="text-center text-gray-600">
              Vos informations ont été mises à jour avec succès. Merci ! 🎉
            </p>
          </div>
        ) : (
          <Form {...formSchemaValidate}>
            <form
              onSubmit={formSchemaValidate.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <FormField
                control={formSchemaValidate.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Nom</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Votre nom et prénom"
                        className="h-12 border-2 border-input"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={formSchemaValidate.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="tesxt-sm font-medium">
                      Numéro de téléphone
                    </FormLabel>
                    <FormControl>
                      <PhoneInput
                        defaultCountry={userCountry as unknown as any}
                        wrapperClassName="rounded-xl w-full h-12"
                        className="rounded-xl w-full h-12"
                        inputComponent={Input}
                        inputClassName={cn(
                          "-ms-px shadow-none",
                          "peer ps-18",
                          "h-auto",
                          "rounded-xl",
                          "text-base"
                        )}
                        triggerClassName={cn(
                          "bg-zinc-50 hover:bg-zinc-100 h-auto rounded-s-xl peer z-10",
                          "h-auto border-2"
                        )}
                        contentClassName="data-[selected=true]:bg-zinc-100 data-[selected=true]:text-inherit"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                      <motion.div
                        className="flex gap-2 items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 }}
                      >
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="w-3 h-3 bg-[#2a2a2a] rounded-full"
                            animate={{
                              scale: [1, 1.3, 1],
                              opacity: [0.4, 1, 0.4],
                            }}
                            transition={{
                              duration: 1.2,
                              repeat: Infinity,
                              delay: i * 0.2 + 1.5,
                            }}
                          />
                        ))}
                      </motion.div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-zinc-100 rounded-full animate-bounce animate-infinite delay-0"></div>
                        <div className="w-3 h-3 bg-zinc-100 rounded-full animate-bounce animate-infinite delay-150"></div>
                        <div className="w-3 h-3 bg-zinc-100 rounded-full animate-bounce animate-infinite delay-300"></div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-zinc-100 rounded-full animate-pulse animate-infinite delay-0"></div>
                        <div className="w-3 h-3 bg-zinc-100 rounded-full animate-pulse animate-infinite delay-300"></div>
                        <div className="w-3 h-3 bg-zinc-100 rounded-full animate-pulse animate-infinite delay-600"></div>
                      </div>
                      <motion.div
                        className="size-4 mr-2 bg-white rounded-full"
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.6, 1, 0.4],
                        }}
                        transition={{
                          duration: 2,
                          ease: "easeInOut",
                          repeat: Infinity,
                        }}
                      />
                      <span>Un instant...</span>
                    </>
                  ) : (
                    <>
                      <motion.div
                        className="flex gap-2 items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 }}
                      >
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="w-3 h-3 bg-zinc-100 rounded-full"
                            animate={{
                              scale: [1, 1.3, 1],
                              opacity: [0.4, 1, 0.6],
                            }}
                            transition={{
                              duration: 1.6,
                              repeat: Infinity,
                              delay: i * 0.2 + 1.5,
                            }}
                          />
                        ))}
                      </motion.div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-zinc-100 rounded-full animate-bounce animate-infinite delay-0"></div>
                        <div className="w-3 h-3 bg-zinc-100 rounded-full animate-bounce animate-infinite delay-150"></div>
                        <div className="w-3 h-3 bg-zinc-100 rounded-full animate-bounce animate-infinite delay-300"></div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-zinc-100 rounded-full animate-pulse animate-infinite delay-0"></div>
                        <div className="w-3 h-3 bg-zinc-100 rounded-full animate-pulse animate-infinite delay-300"></div>
                        <div className="w-3 h-3 bg-zinc-100 rounded-full animate-pulse animate-infinite delay-600"></div>
                      </div>
                      <motion.div
                        className="size-4 mr-2 bg-white rounded-full"
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.6, 1, 0.4],
                        }}
                        transition={{
                          duration: 2,
                          ease: "easeInOut",
                          repeat: Infinity,
                        }}
                      />
                      <span>Recevoir 🦄</span>
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};
