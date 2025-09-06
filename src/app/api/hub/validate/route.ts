import { NextRequest } from 'next/server'
import { brevoSendEmail } from '@/lib/brevo'

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
  } = body

  if (!email || !productTitle) {
    return new Response(JSON.stringify({ error: 'Missing required fields: email, productTitle' }), { status: 400 })
  }

  const html = `
    <div style="font-family:Inter,Arial,sans-serif;max-width:640px;margin:0 auto;color:#111">
      <h1 style="font-size:24px;margin:0 0 12px">${productTitle}</h1>
      ${coverImage ? `<img src="${coverImage}" alt="${productTitle}" style="width:100%;max-height:360px;object-fit:cover;border-radius:12px;margin:12px 0"/>` : ''}
      ${customText ? `<p style="line-height:1.6">${customText}</p>` : ''}
      ${features?.length ? `
        <ul style="line-height:1.8;padding-left:20px">
          ${features.map((f: string) => `<li>${f}</li>`).join('')}
        </ul>
      ` : ''}
      ${productUrl ? `
        <div style="text-align:center;margin:24px 0">
          <a href="${productUrl}" style="display:inline-block;background:#111;color:#fff;padding:12px 20px;border-radius:8px;text-decoration:none">Voir le produit</a>
        </div>
      ` : ''}
      <hr style="border:none;border-top:1px solid #eee;margin:24px 0"/>
      <p style="font-size:12px;color:#666">${name ? `Pour ${name}. ` : ''}${phone ? `Tel: ${phone}` : ''}</p>
    </div>
  `

  try {
    await brevoSendEmail({ toEmail: email, toName: name, subject: `Votre accès: ${productTitle}`, html })
    return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json' } })
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e?.message || 'Failed to send email' }), { status: 500 })
  }
}
