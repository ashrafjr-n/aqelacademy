-- Lets the app ask "is the signed-in user an admin?" without exposing private.admins.
-- Security invoker: it only answers for the caller (auth.uid()), via private.is_admin().
create function public.current_user_is_admin()
returns boolean
language sql
stable
set search_path = ''
as $$
  select private.is_admin();
$$;

revoke all on function public.current_user_is_admin() from public, anon;
grant execute on function public.current_user_is_admin() to authenticated;
