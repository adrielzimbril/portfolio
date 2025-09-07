// app/api/supabase-health-check/route.ts (ou pages/api/supabase-health-check.ts)
import { createClient } from "@supabase/supabase-js";
import { supabaseKey } from "@/module/supabase/client";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const supabase = createClient(supabaseKey.url, supabaseKey.anonKey);

    const { data, error } = await supabase.functions.invoke(
      "check_tables_rls",
      {
        body: { name: "Functions" },
      }
    );

    if (error) {
      return NextResponse.json(
        {
          success: false,
          error: error.message || error,
          timestamp: new Date().toISOString(),
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data,
      dataCount: data?.length || 0,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

// Optionnel : GET pour tester manuellement
export async function GET() {
  return POST();
}
