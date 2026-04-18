import { createClient } from "@supabase/supabase-js";
import { supabaseKey } from "@/integrations/supabase/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // const { token } = await request.json();

    // Validation du token
    // if (!token || !validateToken(token)) {
    //   return NextResponse.json(
    //     { success: false, error: "Invalid or expired token" },
    //     { status: 401 }
    //   );
    // }

    const supabase = createClient(
      supabaseKey.url || "",
      supabaseKey.anonKey || "",
    );

    const { data, error } = await supabase.functions.invoke(
      "check_tables_rls",
      {
        body: { name: "Functions" },
      },
    );

    if (error) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: error.message,
            error: error,
            data: data,
          },
          timestamp: new Date().toISOString(),
        },
        { status: 500 },
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
        error: `Request processing failed: ${error}`,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    );
  }
}
