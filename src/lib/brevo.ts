type AddToListParams = {
  email: string;
  firstName?: string;
  phone?: string;
  listIds: number[];
};

const BREVO_API = "https://api.brevo.com/v3";

export async function brevoAddContact({ email, firstName, phone, listIds }: AddToListParams) {
  const apiKey = process.env.BREVO_API_KEY || process.env.NEXT_PUBLIC_BREVO_API_KEY;
  if (!apiKey) {
    throw new Error("Missing BREVO_API_KEY env var");
  }

  const res = await fetch(`${BREVO_API}/contacts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      email,
      attributes: {
        FIRSTNAME: firstName || undefined,
        SMS: phone || undefined,
      },
      listIds,
      updateEnabled: false,
    }),
  });

  if (!res.ok) {
    // if already exists, Brevo returns 400 with message; we treat as success for idempotency
    const err = await res.json().catch(() => ({}));
    const message = err?.message || "Brevo error";
    if (typeof message === 'string' && message.toLowerCase().includes('exists')) {
      return { ok: true, alreadyExists: true } as const;
    }
    throw new Error(message);
  }

  return { ok: true, alreadyExists: false } as const;
}

type SendEmailParams = {
  toEmail: string;
  toName?: string;
  subject: string;
  html: string;
};

export async function brevoSendEmail({ toEmail, toName, subject, html }: SendEmailParams) {
  const apiKey = process.env.BREVO_API_KEY || process.env.NEXT_PUBLIC_BREVO_API_KEY;
  if (!apiKey) {
    throw new Error("Missing BREVO_API_KEY env var");
  }
  const senderEmail = process.env.BREVO_SENDER_EMAIL || process.env.NEXT_PUBLIC_BREVO_SENDER_EMAIL;
  const senderName = process.env.BREVO_SENDER_NAME || 'No-Reply';
  if (!senderEmail) {
    throw new Error("Missing BREVO_SENDER_EMAIL env var");
  }

  const res = await fetch(`${BREVO_API}/smtp/email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': apiKey,
    },
    body: JSON.stringify({
      sender: { email: senderEmail, name: senderName },
      to: [{ email: toEmail, name: toName }],
      subject,
      htmlContent: html,
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.message || 'Brevo SMTP error');
  }

  return { ok: true } as const;
}
