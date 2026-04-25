import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/integrations/supabase/types";

export interface HubProductLinkRow {
  slug: string;
  private_url: string;
  created_at: string;
  updated_at: string;
}

export const hubProductLinksRepository = (
  supabase: SupabaseClient<Database>,
) => {
  const table = "hub_product_links";

  return {
    /**
     * Fetch all resource link mappings
     */
    async getAll() {
      const { data, error } = await supabase
        .from(table)
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as HubProductLinkRow[];
    },

    /**
     * Get a specific resource link by slug
     */
    async getBySlug(slug: string) {
      const { data, error } = await supabase
        .from(table)
        .select("*")
        .eq("slug", slug)
        .single();

      if (error) {
        if (error.code === "PGRST116") return null; // Not found
        throw error;
      }
      return data as HubProductLinkRow;
    },

    /**
     * Upsert a resource link
     */
    async upsert(slug: string, private_url: string) {
      const { data, error } = await supabase
        .from(table)
        .upsert({
          slug,
          private_url,
        })
        .select()
        .single();

      if (error) throw error;
      return data as HubProductLinkRow;
    },

    /**
     * Delete a resource link
     */
    async delete(slug: string) {
      const { error } = await supabase.from(table).delete().eq("slug", slug);

      if (error) throw error;
      return true;
    },
  };
};
