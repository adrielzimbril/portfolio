import { CSSProperties } from 'react';

// Layout styles
export const main: CSSProperties = {
  backgroundColor: "#f5f5f5",
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

export const container: CSSProperties = {
  maxWidth: "600px",
  margin: "0 auto",
  backgroundColor: "#ffffff",
};

export const headerSection: CSSProperties = {
  padding: "40px 40px 20px 40px",
  backgroundColor: "#ffffff",
};

export const contentSection: CSSProperties = {
  padding: "0 40px 40px 40px",
  backgroundColor: "#ffffff",
};

// Text styles
export const greeting: CSSProperties = {
  color: "#1a1a1a",
  fontSize: "24px",
  fontWeight: 500,
  lineHeight: "1.3",
  margin: "0 0 8px 0",
};

export const tagline: CSSProperties = {
  color: "#666666",
  fontSize: "16px",
  fontWeight: 400,
  margin: "0",
};

export const paragraph: CSSProperties = {
  color: "#333333",
  fontSize: "16px",
  lineHeight: "1.6",
  margin: "0 0 20px 0",
  fontWeight: 400,
};

export const intro: CSSProperties = {
  ...paragraph,
  color: "#666666",
};

// Divider
export const divider: CSSProperties = {
  border: "none",
  borderTop: "1px solid #e0e0e0",
  margin: "32px 0",
};

// List styles
export const listSection: CSSProperties = {
  margin: "16px 0 24px 0",
};

export const listItem: CSSProperties = {
  color: "#555555",
  fontSize: "16px",
  lineHeight: "1.6",
  margin: "0 0 8px 0",
  fontWeight: 400,
};

// CTA styles
export const ctaSection: CSSProperties = {
  textAlign: "center" as const,
  margin: "32px 0",
};

export const ctaButton: CSSProperties = {
  backgroundColor: "#1a1a1a",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: 500,
  padding: "14px 28px",
  borderRadius: "8px",
  textDecoration: "none",
  display: "inline-block",
  border: "none",
};

export const ctaLink: CSSProperties = {
  color: "#5c73f6",
  fontSize: "18px",
  fontWeight: 500,
  textDecoration: "none",
  display: "inline-block",
  margin: "16px 0",
  borderBottom: "1px solid #4e68fa",
  paddingBottom: "2px",
};

export const ctaNote: CSSProperties = {
  color: "#777777",
  fontSize: "14px",
  margin: "16px 0 0 0",
  fontStyle: "italic",
};

// Footer styles
export const footer: CSSProperties = {
  padding: "32px 40px",
  backgroundColor: "#fafafa",
};

export const footerDivider: CSSProperties = {
  border: "none",
  borderTop: "1px solid #e0e0e0",
  margin: "0 0 24px 0",
};

export const signature: CSSProperties = {
  color: "#1a1a1a",
  fontSize: "18px",
  fontWeight: 500,
  margin: "0 0 16px 0",
  textAlign: "center" as const,
};

export const footerNote: CSSProperties = {
  color: "#666666",
  fontSize: "14px",
  lineHeight: "1.5",
  margin: "0 0 24px 0",
  textAlign: "center" as const,
};

export const copyright: CSSProperties = {
  color: "#999999",
  fontSize: "12px",
  textAlign: "center" as const,
  margin: "0 0 12px 0",
};

// Additional section styles
export const reminderSection: CSSProperties = {
  backgroundColor: "#fafafa",
  padding: "24px",
  borderRadius: "12px",
  margin: "24px 0",
  border: "1px solid #f0f0f0",
};

export const personalSection: CSSProperties = {
  padding: "20px 40px",
  backgroundColor: "#ffffff",
};
