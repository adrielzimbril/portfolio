-- 20250908_create_get_or_create_user.sql

-- Supprime la mauvaise fonction si elle existe
drop function if exists public._get_or_create_user(text, text, text);

-- (Ré)crée la bonne fonction
create or replace function public.get_or_create_user(
  p_name text,
  p_email text,
  p_phone text
)
returns uuid
language plpgsql
as $$
declare
  v_user_id uuid;
  v_email text := nullif(trim(p_email), '');
  v_phone text := nullif(trim(p_phone), '');
begin
  -- Chercher par email d’abord
  if v_email is not null then
    select u.id
    into v_user_id
    from public.users u
    where lower(u.email) = lower(v_email)
    limit 1;
  end if;

  -- Créer si pas trouvé
  if v_user_id is null then
    insert into public.users(name, email, phone)
    values (p_name, v_email, v_phone)
    returning id into v_user_id;
  else
    -- Sinon mettre à jour les champs manquants
    update public.users
    set
      name  = coalesce(public.users.name, p_name),
      email = coalesce(public.users.email, v_email),
      phone = coalesce(public.users.phone, v_phone)
    where id = v_user_id;
  end if;

  return v_user_id;
end;
$$;