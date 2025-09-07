import { render } from "@react-email/render";
import React from "react";

export function renderEmail(component: React.ReactElement) {
  const html = render(component, {
    pretty: true,
  });

  return `<!DOCTYPE html><html><head><meta charSet="utf-8"/></head><body>${html}</body></html>`;
}
