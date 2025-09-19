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
  copyright as baseCopyright
} from './shared';

export const freeProductDeliveryStyles = {
  main: baseMain,
  container: {
    ...baseContainer,
    maxWidth: '640px',
  } as CSSProperties,
  headerSection: baseHeaderSection,
  greeting: {
    ...baseGreeting,
    fontSize: '24px',
  } as CSSProperties,
  intro: baseTagline,
  productSection: {
    padding: '20px 40px',
    backgroundColor: '#ffffff',
  } as CSSProperties,
  productTitleStyle: {
    color: '#1a1a1a',
    fontSize: '28px',
    fontWeight: 500,
    lineHeight: '1.2',
    margin: '0 0 20px 0',
    textAlign: 'center',
  } as CSSProperties,
  productImage: {
    width: '100%',
    maxHeight: '360px',
    objectFit: 'cover' as const,
    borderRadius: '12px',
    margin: '20px 0',
    border: '1px solid #f0f0f0',
  } as CSSProperties,
  productDescription: {
    ...baseParagraph,
    margin: '0 0 24px 0',
  } as CSSProperties,
  featuresSection: {
    margin: '24px 0',
  } as CSSProperties,
  featuresTitle: {
    ...baseParagraph,
    margin: '0 0 12px 0',
  } as CSSProperties,
  featuresList: {
    margin: '12px 0',
  } as CSSProperties,
  featureItem: {
    color: '#555555',
    fontSize: '15px',
    lineHeight: '1.6',
    margin: '0 0 6px 0',
    fontWeight: 400,
  } as CSSProperties,
  ctaSection: {
    textAlign: 'center' as const,
    margin: '32px 0',
  } as CSSProperties,
  ctaButton: {
    backgroundColor: '#1a1a1a',
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: 500,
    padding: '14px 28px',
    borderRadius: '8px',
    textDecoration: 'none',
    display: 'inline-block',
    border: 'none',
  } as CSSProperties,
  personalSection: {
    padding: '20px 40px',
    backgroundColor: '#ffffff',
  } as CSSProperties,
  paragraph: baseParagraph,
  divider: baseDivider,
  footer: baseFooter,
  footerDivider: baseFooterDivider,
  signature: baseSignature,
  footerNote: baseFooterNote,
  copyright: baseCopyright,
};
