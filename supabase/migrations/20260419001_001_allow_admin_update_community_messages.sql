-- Allow updating admin messages (user_id is null)
create policy community_wall_update_admin
  on public.community_wall
  for update using (user_id is null);
