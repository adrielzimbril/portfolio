import { WelcomeEmail } from "@/module/mail/emails/WelcomeEmail";
import { ProductDeliveryEmail } from "@/module/mail/emails/ProductDeliveryEmail";
import { NewsletterSignup } from "@/module/mail/emails/NewsletterSignup";
import { FreeProductDeliveryEmail } from "@/module/mail/emails/FreeProductDeliveryEmail";
import { SubmitAdminNotification } from "@/module/mail/emails/SubmitAdminNotification";
import { SubmitUserConfirmation } from "@/module/mail/emails/SubmitUserConfirmation";

export const mailTemplates = {
  welcome: WelcomeEmail,
  productDelivery: ProductDeliveryEmail,
  freeProductDelivery: FreeProductDeliveryEmail,
  newsletterSignup: NewsletterSignup,
  submitAdminNotification: SubmitAdminNotification,
  submitUserConfirmation: SubmitUserConfirmation,
} as const;
