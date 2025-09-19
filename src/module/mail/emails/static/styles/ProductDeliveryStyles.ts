import { CSSProperties } from 'react';
import { 
  main as baseMain, 
  container as baseContainer, 
  headerSection as baseHeaderSection, 
  greeting as baseGreeting, 
  tagline as baseTagline, 
  contentSection as baseContentSection, 
  paragraph as baseParagraph, 
  divider as baseDivider, 
  footer as baseFooter, 
  footerDivider as baseFooterDivider, 
  signature as baseSignature, 
  footerNote as baseFooterNote, 
  copyright as baseCopyright,
  ctaSection as baseCtaSection,
  ctaButton as baseCtaButton,
  ctaNote as baseCtaNote,
  listSection as baseListSection,
  listItem as baseListItem,
  personalSection as basePersonalSection
} from './shared';

export const productDeliveryStyles = {
  // Layout styles
  main: baseMain,
  container: {
    ...baseContainer,
    maxWidth: "640px",
  } as CSSProperties,

  // Header styles
  headerSection: baseHeaderSection,
  greeting: {
    ...baseGreeting,
    fontSize: "24px",
  } as CSSProperties,
  tagline: baseTagline,
  intro: baseTagline,

  // Content section
  contentSection: baseContentSection,
  paragraph: baseParagraph,
  tipText: {
    ...baseParagraph,
    color: "#555555",
    fontSize: "15px",
    backgroundColor: "#f8f9fa",
    padding: "16px",
    borderRadius: "8px",
    borderLeft: "3px solid #5c73f6",
  } as CSSProperties,

  // Product section
  productSection: {
    margin: "24px 0",
  } as CSSProperties,
  productImage: {
    maxWidth: "100%",
    borderRadius: "8px",
    marginBottom: "16px",
  } as CSSProperties,
  productTitle: {
    ...baseGreeting,
    fontSize: "22px",
    margin: "0 0 16px 0",
  } as CSSProperties,
  productDescription: {
    ...baseParagraph,
    margin: "0 0 24px 0",
  } as CSSProperties,

  featuresSection: {
    margin: "24px 0",
  } as CSSProperties,
  // Feature list
  featureList: {
    ...baseListSection,
    margin: "16px 0 24px 0",
  } as CSSProperties,
  featureItem: {
    ...baseListItem,
    display: "flex",
    alignItems: "flex-start",
    marginBottom: "12px",
  } as CSSProperties,
  featureIcon: {
    marginRight: "12px",
    color: "#4CAF50",
  } as CSSProperties,
  featureTitle: {
    ...baseListItem,
    margin: "0 0 12px 0",
  } as CSSProperties,

  // CTA section
  ctaSection: {
    ...baseCtaSection,
    backgroundColor: "#fafafa",
    padding: "24px",
    borderRadius: "8px",
    margin: "32px 0",
    border: "1px solid #f0f0f0",
  } as CSSProperties,
  ctaButton: {
    ...baseCtaButton,
    backgroundColor: "#1a1a1a",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: 500,
    padding: "14px 28px",
    borderRadius: "8px",
    textDecoration: "none",
    display: "inline-block",
    margin: "0 0 16px 0",
  } as CSSProperties,
  ctaNote: {
    ...baseCtaNote,
    margin: "16px 0 0 0",
  } as CSSProperties,

  // Personal section
  personalSection: basePersonalSection,
  divider: baseDivider,

  // Footer styles
  footer: baseFooter,
  footerDivider: baseFooterDivider,
  signature: baseSignature,
  footerNote: baseFooterNote,
  copyright: baseCopyright,
};
