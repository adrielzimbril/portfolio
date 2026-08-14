// import { auth } from "@/integrations/auth/config"
// import { toNextJsHandler } from "better-auth/next-js"

// export const { POST, GET } = toNextJsHandler(auth)

import { NextResponse } from "next/server"

export async function GET(request: Request) {
  return NextResponse.json({ message: "Good day" }, { status: 200 })
}
