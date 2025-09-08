import React, { useEffect, useState } from "react";
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

const emailSchema = z.object({
  email: z.email({ message: "Veuillez entrer une adresse email valide." }),
});

const optionalInfoSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Le nom doit contenir au moins 2 caractères." })
    .optional()
    .or(z.literal("")),
  phone: z
    .string()
    .min(10, { message: "Le numéro doit contenir au moins 10 caractères." })
    .optional()
    .or(z.literal("")),
});

type OptionalInfoForm = z.infer<typeof optionalInfoSchema>;

interface SubscriptionModalProps {
  isOpen: boolean;
  email?: string;
  onClose: () => void;
}

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  isOpen,
  email,
  onClose,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [userCountry, setUserCountry] = useState("CI");

  useEffect(() => {
    if (!isOpen) return;
    const getCountry = async () => {
      const country = await useGetIpInfo(undefined, true);
      setUserCountry(country.data?.country?.code ?? "CI");
    };
    getCountry();
    logger.info("useGetIpInfo received data", userCountry);
  }, [isOpen]); // Retiré userCountry des dépendances pour éviter les boucles

  // SUPPRIMÉ : Le useEffect qui faisait l'inscription automatique
  // useEffect(() => {
  //   if (!isOpen && !email) return;
  //   // ... code d'inscription automatique
  // }, [isOpen, email]);

  const optionalForm = useForm<OptionalInfoForm>({
    resolver: zodResolver(optionalInfoSchema),
    defaultValues: { name: "", phone: "" },
  });

  const animateConfetti = () => {
    const duration = 5 * 1000;
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

  const onSubmit = async (values: OptionalInfoForm) => {
    setIsSubmitting(true);

    try {
      const subscribedFromPage =
        typeof window !== "undefined" ? window.location.pathname : undefined;

      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name: values.name || undefined,
          phone: values.phone || undefined,
          subscribedFromPage,
        }),
      });

      const json = await res.json();
      if (!res.ok)
        throw new Error(json?.error || "Erreur lors de l'inscription");

      setIsSuccess(true);
      animateConfetti();

      // Close the modal after 2 seconds
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
        optionalForm.reset();
      }, 2000);
    } catch (error) {
      logger.error("Erreur lors de l'inscription:", error);
      toast.error(
        "Une erreur est survenue lors de l'inscription. Veuillez réessayer."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
      setIsSuccess(false);
      optionalForm.reset();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            🎁 Recevoir les cadeaux
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600">
            Remplissez vos informations pour recevoir la méthode Tsunami et nos
            cadeaux exclusifs !
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <CheckCircle className="w-16 h-16 text-green-500" />
            <h3 className="text-xl font-semibold text-green-600">
              Inscription réussie !
            </h3>
            <p className="text-center text-gray-600">
              Vous allez recevoir un email avec tous les détails. Merci de votre
              confiance ! 🎉
            </p>
          </div>
        ) : (
          <Form {...optionalForm}>
            <form
              onSubmit={optionalForm.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <FormField
                control={optionalForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Nom</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Votre nom et prénom"
                        className="h-12 border-2 border-input focus:border-blue-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* SUPPRIMÉ : Le premier champ téléphone en double */}

              <FormField
                control={optionalForm.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
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
                          "peer ps-16",
                          "h-auto",
                          "rounded-xl",
                          "focus:border-blue-500"
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

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                asPointer
                asFull
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Inscription en cours...
                  </>
                ) : (
                  "Recevoir mes cadeaux ! 🎁"
                )}
              </Button>

              <p className="text-xs text-gray-500 text-center">
                Vous pouvez passer cette étape, vos informations personnelles
                sont facultatives.
              </p>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};
