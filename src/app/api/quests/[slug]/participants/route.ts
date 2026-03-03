import { NextRequest } from "next/server";
import { supabase } from "@/module/supabase/client";
import logger from "@/utils/logger";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const db = supabase as any;
    const { slug } = await params;

    const [registrationsRes, submissionsRes] = await Promise.all([
      db
        .from("challenge_registrations")
        .select("email")
        .eq("challenge_slug", slug),
      db.from("challenge_submissions").select("email").eq("challenge_slug", slug),
    ]);

    if (registrationsRes.error || submissionsRes.error) {
      logger.error("quest participants stats fetch failed", {
        registrationsError: registrationsRes.error,
        submissionsError: submissionsRes.error,
      });
      return new Response(JSON.stringify({ error: "DB_ERROR" }), {
        status: 500,
      });
    }

    const normalized = (email: string | null | undefined) =>
      (email ?? "").trim().toLowerCase();

    const registrationEmails = new Set<string>(
      (registrationsRes.data ?? [])
        .map((row: { email?: string | null }) => normalized(row.email))
        .filter(Boolean),
    );

    const submissionEmails = new Set<string>(
      (submissionsRes.data ?? [])
        .map((row: { email?: string | null }) => normalized(row.email))
        .filter(Boolean),
    );

    const uniqueParticipants = new Set<string>([
      ...registrationEmails,
      ...submissionEmails,
    ]);

    return new Response(
      JSON.stringify({
        stats: {
          registered: registrationEmails.size,
          submitted: submissionEmails.size,
          totalParticipants: uniqueParticipants.size,
        },
      }),
      {
      status: 200,
      headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    logger.error("/api/quests/[slug]/participants failed", error);
    return new Response(JSON.stringify({ error: "UNKNOWN_ERROR" }), {
      status: 500,
    });
  }
}
