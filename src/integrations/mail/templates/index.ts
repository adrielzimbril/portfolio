import { WelcomeEmail } from "@/integrations/mail/templates/WelcomeEmail";
import { ProductDeliveryEmail } from "@/integrations/mail/templates/ProductDeliveryEmail";
import { NewsletterSignup } from "@/integrations/mail/templates/NewsletterSignup";
import { FreeProductDeliveryEmail } from "@/integrations/mail/templates/FreeProductDeliveryEmail";
import { SubmitAdminNotification } from "@/integrations/mail/templates/SubmitAdminNotification";
import { SubmitUserConfirmation } from "@/integrations/mail/templates/SubmitUserConfirmation";
import { QuestRegisterUserConfirmation } from "@/integrations/mail/templates/QuestRegisterUserConfirmation";
import { QuestRegisterAdminNotification } from "@/integrations/mail/templates/QuestRegisterAdminNotification";
import { QuestSubmitUserConfirmation } from "@/integrations/mail/templates/QuestSubmitUserConfirmation";
import { QuestSubmitAdminNotification } from "@/integrations/mail/templates/QuestSubmitAdminNotification";
import { CommunityWallAdminNotification } from "@/integrations/mail/templates/CommunityWallAdminNotification";
import { CommunityWallUserConfirmation } from "@/integrations/mail/templates/CommunityWallUserConfirmation";

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
  communityWallAdminNotification: CommunityWallAdminNotification,
  communityWallUserConfirmation: CommunityWallUserConfirmation,
} as const;
