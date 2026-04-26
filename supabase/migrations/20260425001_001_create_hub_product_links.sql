-- Migration: Create hub_product_links table
-- Created at: 2026-04-25

CREATE TABLE IF NOT EXISTS public.hub_product_links (
    slug TEXT PRIMARY KEY,
    private_url TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.hub_product_links ENABLE ROW LEVEL SECURITY;

-- Policies for Admin access
CREATE POLICY "Admins can do everything on hub_product_links"
ON public.hub_product_links
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
BEFORE UPDATE ON public.hub_product_links
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- Note: We assume admins are the only authenticated users with access to the landlord dashboard.
-- If there are other authenticated users, we should add a more restrictive check (e.g., role = 'admin').
