-- Create guestbook table
CREATE TABLE IF NOT EXISTS public.guestbook (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT SET NULL,
  name TEXT NOT NULL,
  avatar_url TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.guestbook ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Allow public read access" ON public.guestbook
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to insert" ON public.guestbook
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow users to delete their own messages" ON public.guestbook
  FOR DELETE USING (auth.uid() = user_id);
