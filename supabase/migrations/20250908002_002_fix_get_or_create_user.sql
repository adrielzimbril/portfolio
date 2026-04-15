-- 5) RPC: upsert_user(name, email, phone) -> users
create or replace function public.upsert_user(
  p_name text,
  p_email text,
  p_phone text
)
returns public.users
language plpgsql
as $$
declare
  v_user public.users;
  v_email text := nullif(trim(p_email), '');
  v_phone text := nullif(trim(p_phone), '');
  v_id uuid;
begin
  v_id := public.get_or_create_user(p_name, v_email, v_phone);

  update public.users
  set
    name = coalesce(p_name, name),
    email = coalesce(v_email, email),
    phone = coalesce(v_phone, phone)
  where id = v_id
  returning * into v_user;

  return v_user;
end;
$$;