import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Loader2, CheckCircle } from 'lucide-react'
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
import { supabase } from "@/module/supabase/supabase";
import logger from "@/utils/logger";

const formSchema = z.object({
  nom: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères.",
  }),
  numero: z.string().min(10, {
    message: "Le numéro doit contenir au moins 10 caractères.",
  }),
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide.",
  }).optional().or(z.literal('')),
})

type FormData = z.infer<typeof formSchema>

interface SubscriptionModalProps {
  isOpen: boolean
  onClose: () => void
}

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nom: '',
      numero: '',
      email: '',
    },
  })

  const onSubmit = async (values: FormData) => {
    setIsSubmitting(true)
    
    try {
      // 1. Insérer le nouvel abonné
      const { error: insertError } = await supabase
        .from('newsletter_subscribers')
        .insert([
          {
            nom: values.nom,
            numero: values.numero,
            email: values.email || null,
          }
        ])

      if (insertError) {
        throw insertError
      }

      // 2. Incrémenter le nombre de lecteurs
      const { data: currentStats, error: fetchError } = await supabase
        .from('newsletter_stats')
        .select('total_readers')
        .eq('id', 'main')
        .single()

      if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError
      }

      const newReaderCount = (currentStats?.total_readers || 90000) + 1

      const { error: updateError } = await supabase
        .from('newsletter_stats')
        .upsert([
          {
            id: 'main',
            total_readers: newReaderCount,
            updated_at: new Date().toISOString(),
          }
        ])

      if (updateError) {
        throw updateError
      }

      // 3. Envoyer l'email via Edge Function
      const { error: emailError } = await supabase.functions.invoke('send-welcome-email', {
        body: {
          nom: values.nom,
          numero: values.numero,
          email: values.email,
        }
      })

      if (emailError) {
        logger.warn("Erreur lors de l'envoi de l'email:", emailError);
        // Ne pas bloquer le processus si l'email échoue
      }

      setIsSuccess(true)
      
      // Fermer la modal après 2 secondes
      setTimeout(() => {
        onClose()
        setIsSuccess(false)
        form.reset()
      }, 2000)

    } catch (error) {
      logger.error("Erreur lors de l'inscription:", error);
      alert('Une erreur est survenue lors de l\'inscription. Veuillez réessayer.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      onClose()
      setIsSuccess(false)
      form.reset()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            🎁 Recevoir les cadeaux
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600">
            Remplissez vos informations pour recevoir la méthode Tsunami et nos cadeaux exclusifs !
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <CheckCircle className="w-16 h-16 text-green-500" />
            <h3 className="text-xl font-semibold text-green-600">
              Inscription réussie !
            </h3>
            <p className="text-center text-gray-600">
              Vous allez recevoir un email avec tous les détails. Merci de votre confiance ! 🎉
            </p>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="nom"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Nom complet *
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Votre nom et prénom"
                        className="h-12 border-2 border-gray-200 focus:border-blue-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="numero"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Numéro de téléphone *
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="+33 6 12 34 56 78"
                        className="h-12 border-2 border-gray-200 focus:border-blue-500"
                        {...field}
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
                    <FormLabel className="text-sm font-medium">
                      Email (optionnel)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="votre@email.com"
                        className="h-12 border-2 border-gray-200 focus:border-blue-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-black hover:bg-gray-800 text-white font-semibold text-lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Inscription en cours...
                  </>
                ) : (
                  'Recevoir mes cadeaux ! 🎁'
                )}
              </Button>

              <p className="text-xs text-gray-500 text-center">
                En vous inscrivant, vous acceptez de recevoir nos communications.
                Vous pouvez vous désabonner à tout moment.
              </p>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  )
}