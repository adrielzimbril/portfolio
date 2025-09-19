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
  listSection as baseListSection, 
  listItem as baseListItem, 
  footer as baseFooter, 
  footerDivider as baseFooterDivider, 
  signature as baseSignature, 
  footerNote as baseFooterNote, 
  copyright as baseCopyright,
  ctaSection as baseCtaSection,
  ctaLink as baseCtaLink,
  ctaNote as baseCtaNote
} from './shared';

export const newsletterSignupStyles = {
  main: baseMain,
  container: baseContainer,
  headerSection: {
    ...baseHeaderSection,
    padding: "48px 40px 32px 40px",
  } as CSSProperties,
  greeting: {
    ...baseGreeting,
    fontSize: '28px',
  } as CSSProperties,
  tagline: baseTagline,
  contentSection: baseContentSection,
  paragraph: baseParagraph,
  divider: baseDivider,
  listSection: baseListSection,
  listItem: baseListItem,
  ctaSection: {
    ...baseCtaSection,
    backgroundColor: "#fafafa",
    padding: "32px",
    borderRadius: "16px",
    margin: "32px 0",
    border: "1px solid #f0f0f0",
  } as CSSProperties,
  ctaLink: {
    ...baseCtaLink,
    color: "#5c73f6",
    fontSize: "18px",
    borderBottom: "1px solid #4e68fa",
  } as CSSProperties,
  ctaNote: baseCtaNote,
  footer: baseFooter,
  footerDivider: baseFooterDivider,
  signature: {
    ...baseSignature,
    fontSize: '18px',
  } as CSSProperties,
  footerNote: baseFooterNote,
  copyright: baseCopyright,
};
