import { WelcomeEmail } from "@/module/mail/emails/WelcomeEmail";
import { ProductDeliveryEmail } from "@/module/mail/emails/ProductDeliveryEmail";
import { NewsletterSignup } from "@/module/mail/emails/NewsletterSignup";
import { FreeProductDeliveryEmail } from "@/module/mail/emails/FreeProductDeliveryEmail";
import { SubmitAdminNotification } from "@/module/mail/emails/SubmitAdminNotification";
import { SubmitUserConfirmation } from "@/module/mail/emails/SubmitUserConfirmation";
import { QuestRegisterUserConfirmation } from "@/module/mail/emails/QuestRegisterUserConfirmation";
import { QuestRegisterAdminNotification } from "@/module/mail/emails/QuestRegisterAdminNotification";
import { QuestSubmitUserConfirmation } from "@/module/mail/emails/QuestSubmitUserConfirmation";
import { QuestSubmitAdminNotification } from "@/module/mail/emails/QuestSubmitAdminNotification";

export const mailTemplates = {
  welcome: WelcomeEmail,
  productDelivery: ProductDeliveryEmail,
  freeProductDelivery: FreeProductDeliveryEmail,
  newsletterSignup: NewsletterSignup,
  submitAdminNotification: SubmitAdminNotification,
  submitUserConfirmation: SubmitUserConfirmation,
  questRegisterUserConfirmation: QuestRegisterUserConfirmation,
  questRegisterAdminNotification: QuestRegisterAdminNotification,
  questSubmitUserConfirmation: QuestSubmitUserConfirmation,
  questSubmitAdminNotification: QuestSubmitAdminNotification,
} as const;
