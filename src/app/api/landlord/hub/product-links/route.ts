import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/integrations/supabase/server";
import { getAllResources } from "@/integrations/content/lib";
import { hubProductLinksRepository } from "@/integrations/supabase/repository/hubProductLinks";
import { logger } from "@/utils";
import { Locale } from "@/types";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(Number(searchParams.get("page") || 1), 1);
    const pageSize = Math.min(
      Math.max(Number(searchParams.get("pageSize") || 10), 1),
      100,
    );
    const from = (page - 1) * pageSize;
    const to = from + pageSize;

    // 1. Get resources from content
    // We want all resources regardless of locale for the admin, but let's default to FR for labels if needed
    // Or just fetch all and dedup by slug if they are localized?
    // Actually, usually resources are same slug across locales but different titles.
    const allResources = await getAllResources({ published: true, locale: Locale.FR });

    // 2. Get private urls from DB
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const repo = hubProductLinksRepository(supabase);
    const dbLinks = await repo.getAll();
    const dbMap = new Map(dbLinks.map((l) => [l.slug, l.private_url]));

    // 3. Merge them
    const allRows = allResources.map((resource) => ({
      id: resource.id,
      title: resource.title,
      slug: resource.slug,
      private_url: dbMap.get(resource.slug) || "",
      type: resource.type,
      published: resource.published,
    }));

    const rows = allRows.slice(from, to);

    return NextResponse.json({
      rows,
      count: allRows.length,
      page,
      pageSize,
    });
  } catch (error) {
    logger.error("[landlord/hub/product-links] GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch hub product links" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { slug, private_url } = body;

    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const repo = hubProductLinksRepository(supabase);

    const updated = await repo.upsert(slug, private_url || "");

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    logger.error("[landlord/hub/product-links] POST error:", error);
    return NextResponse.json(
      { error: "Failed to update hub product link" },
      { status: 500 },
    );
  }
}
