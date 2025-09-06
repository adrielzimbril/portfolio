import { NextRequest } from 'next/server'
import { brevoSendEmail } from '@/lib/brevo'
import { supabase } from "@/module/supabase/client";
import { renderEmail } from '@/lib/email'
import { ProductDeliveryEmail } from '@/emails/ProductDeliveryEmail'

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}))
  const {
    email,
    name,
    phone,
    productTitle,
    productType, // 'course' | 'ebook' | 'video'
    features,
    coverImage,
    productUrl,
    customText,
  }: {
    email: string
    name?: string
    phone?: string
    productTitle: string
    productType?: 'course'|'ebook'|'video'
    features?: string[]
    coverImage?: string
    productUrl?: string
    customText?: string
    subscribedFromPage?: string
  } = body

  if (!email || !productTitle) {
    return new Response(JSON.stringify({ error: 'Missing required fields: email, productTitle' }), { status: 400 })
  }

  const html = renderEmail(
    ProductDeliveryEmail({
      name,
      productTitle,
      features,
      coverImage,
      productUrl,
      customText,
    })
  )

  try {
    // Store request in Supabase
    const { error: insertError } = await supabase
      .from('hub_product_requests')
      .insert([
        {
          email,
          name,
          phone,
          product_title: productTitle,
          product_type: productType,
          features: features ?? null,
          cover_image: coverImage ?? null,
          product_url: productUrl ?? null,
          custom_text: customText ?? null,
          subscribed_from_page: body.subscribedFromPage ?? null,
        },
      ])

    if (insertError) {
      console.warn('Failed to store hub_product_request:', insertError)
    }

    await brevoSendEmail({ toEmail: email, toName: name, subject: `Votre accès: ${productTitle}`, html })
    return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json' } })
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e?.message || 'Failed to send email' }), { status: 500 })
  }
}
