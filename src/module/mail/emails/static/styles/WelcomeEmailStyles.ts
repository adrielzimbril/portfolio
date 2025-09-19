import { CSSProperties } from 'react';
import { 
  main, container, headerSection, greeting as baseGreeting, tagline, 
  contentSection, paragraph, divider, listSection, listItem, footer, 
  footerDivider, signature, footerNote, copyright 
} from './shared';

export const welcomeStyles = {
  main,
  container,
  headerSection,
  greeting: {
    ...baseGreeting,
    fontSize: '28px',
  } as CSSProperties,
  tagline,
  contentSection,
  paragraph,
  divider,
  listSection,
  listItem,
  footer,
  footerDivider,
  signature,
  footerNote,
  copyright,
  reminderSection: {
    backgroundColor: "#fafafa",
    padding: "24px",
    borderRadius: "12px",
    margin: "24px 0",
    border: "1px solid #f0f0f0",
  } as CSSProperties,
};
