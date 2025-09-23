import { createServerHmac } from "@/utils/key-hmac-server";

export async function POST(req: Request) {
  const { data } = await req.json();

  const signature = await createServerHmac(
    "sha256",
    process.env.API_SECRET_KEY!,
    data
  );

  return new Response(JSON.stringify({ signature }), { status: 200 });
}
