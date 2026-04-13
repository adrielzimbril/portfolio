import { WelcomeEmail } from "@/module/mail/templates/WelcomeEmail";
import { ProductDeliveryEmail } from "@/module/mail/templates/ProductDeliveryEmail";
import { NewsletterSignup } from "@/module/mail/templates/NewsletterSignup";
import { FreeProductDeliveryEmail } from "@/module/mail/templates/FreeProductDeliveryEmail";
import { SubmitAdminNotification } from "@/module/mail/templates/SubmitAdminNotification";
import { SubmitUserConfirmation } from "@/module/mail/templates/SubmitUserConfirmation";
import { QuestRegisterUserConfirmation } from "@/module/mail/templates/QuestRegisterUserConfirmation";
import { QuestRegisterAdminNotification } from "@/module/mail/templates/QuestRegisterAdminNotification";
import { QuestSubmitUserConfirmation } from "@/module/mail/templates/QuestSubmitUserConfirmation";
import { QuestSubmitAdminNotification } from "@/module/mail/templates/QuestSubmitAdminNotification";

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
