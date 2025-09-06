import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

export function renderEmail(component: React.ReactElement) {
  const html = renderToStaticMarkup(component)
  // Basic HTML wrapper to ensure proper email structure
  return `<!DOCTYPE html><html><head><meta charSet="utf-8"/></head><body>${html}</body></html>`
}
