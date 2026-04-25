import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/integrations/supabase/server";
import { getAllResources } from "@/integrations/content/lib";
import { hubResourcesRepository } from "@/integrations/supabase/repository/hubResources";
import logger from "@/utils/logger";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const repo = hubResourcesRepository(supabase);

    // 1. Get all resources from Content Collections
    const allResources = await getAllResources({ published: true });

    // 2. Get all private URLs from Supabase
    const dbResources = await repo.getAll();
    const dbMap = new Map(dbResources.map((r) => [r.slug, r.private_url]));

    // 3. Merge them
    const rows = allResources.map((resource) => ({
      id: resource.id,
      title: resource.title,
      slug: resource.slug,
      private_url: dbMap.get(resource.slug) || "",
      type: resource.type,
      published: resource.published,
    }));

    return NextResponse.json({ rows, count: rows.length });
  } catch (error) {
    logger.error("[landlord/hub-resources] GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch hub resources" },
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
    const repo = hubResourcesRepository(supabase);

    const updated = await repo.upsert(slug, private_url || "");

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    logger.error("[landlord/hub-resources] POST error:", error);
    return NextResponse.json(
      { error: "Failed to update hub resource" },
      { status: 500 },
    );
  }
}
