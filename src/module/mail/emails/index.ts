import { WelcomeEmail } from "@/module/mail/emails/WelcomeEmail";
import { ProductDeliveryEmail } from "@/module/mail/emails/ProductDeliveryEmail";
import { NewsletterSignup } from "@/module/mail/emails/NewsletterSignup";

export const mailTemplates = {
  welcome: WelcomeEmail,
  productDelivery: ProductDeliveryEmail,
  newsletterSignup: NewsletterSignup,
} as const;
