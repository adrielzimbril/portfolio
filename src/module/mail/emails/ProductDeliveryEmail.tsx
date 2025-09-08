import React from "react";
import { createTranslator } from "use-intl/core";
import Wrapper from "@/module/mail/components/Wrapper";
import { Heading, Text } from "@react-email/components";
import { defaultTranslations } from "@/module/mail/util/translations";
import { defaultLocale } from "@/module/mail/util/translations";
import { BaseMailProps } from "@/module/mail/types/types";

export function ProductDeliveryEmail({
  locale,
  translations,
  ...props
}: BaseMailProps & {
  name?: string;
  productTitle: string;
  features?: string[];
  coverImage?: string;
  productUrl?: string;
  customText?: string;
}) {
  const t = createTranslator({
    locale,
    messages: translations,
  });

  const { name, productTitle, features, coverImage, productUrl, customText } =
    props;

  return (
    <div
      style={{
        fontFamily: "Inter, Arial, sans-serif",
        maxWidth: 640,
        margin: "0 auto",
        color: "#111",
      }}
    >
      <h1 style={{ fontSize: 24, margin: "0 0 12px" }}>{productTitle}</h1>
      {coverImage && (
        <img
          src={coverImage}
          alt={productTitle}
          style={{
            width: "100%",
            maxHeight: 360,
            objectFit: "cover",
            borderRadius: 12,
            margin: "12px 0",
          }}
        />
      )}
      {customText && <p style={{ lineHeight: 1.6 }}>{customText}</p>}
      {features && features.length > 0 && (
        <ul style={{ lineHeight: 1.8, paddingLeft: 20 }}>
          {features.map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>
      )}
      {productUrl && (
        <div style={{ textAlign: "center", margin: "24px 0" }}>
          <a
            href={productUrl}
            style={{
              display: "inline-block",
              background: "#111",
              color: "#fff",
              padding: "12px 20px",
              borderRadius: 8,
              textDecoration: "none",
            }}
          >
            Voir le produit
          </a>
        </div>
      )}
      <hr
        style={{
          border: "none",
          borderTop: "1px solid #eee",
          margin: "24px 0",
        }}
      />
      <p style={{ fontSize: 12, color: "#666" }}>
        {name ? `Pour ${name}` : ""}
      </p>
    </div>
  );
}
