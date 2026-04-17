import { createClient } from "@/integrations/supabase/middleware";
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
import { ConfigValue } from "@/config";

export async function middleware(request: NextRequest) {
  const supabase = createClient(request);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Refresh session if expired - required for Server Components
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Check session timeout
  if (session && user) {
    const timeoutHours = parseInt(
      ConfigValue.NEXT_PRIVATE_SESSION_TIMEOUT_HOURS || "1",
      10,
    );
    const sessionAge =
      Date.now() -
      new Date(session.user.last_sign_in_at || session.created_at).getTime();
    const timeoutMs = timeoutHours * 60 * 60 * 1000;

    if (sessionAge > timeoutMs) {
      // Session expired, redirect to logout
      const logoutUrl = new URL("/logout", request.url);
      return NextResponse.redirect(logoutUrl);
    }
  }

  // Return the response with updated session
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - api/auth/callback (OAuth callback)
     */
    "/((?!_next/static|_next/image|favicon.ico|api/auth/callback|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
