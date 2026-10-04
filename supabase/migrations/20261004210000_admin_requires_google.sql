-- 1) Admin powers require a Google sign-in. Every RLS policy goes through private.is_admin(),
--    so a password session of an admin account (e.g. a leaked password) gets no admin rights.
--    Google accounts are protected by Google's own 2-step verification.
--    The session's sign-in method comes from the JWT "amr" claim ("oauth" for Google ID tokens).
create or replace function private.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from private.admins where user_id = (select auth.uid()))
    and coalesce((select auth.jwt()) -> 'amr' @> '[{"method": "oauth"}]'::jsonb, false);
$$;

-- 2) Lets the app tell an admin who signed in with a password to sign in with Google instead.
--    Answers only about the caller: 'admin', 'needs_google', or 'none'.
create function public.current_user_admin_status()
returns text
language sql
stable
security definer
set search_path = ''
as $$
  select case
    when not exists (select 1 from private.admins where user_id = (select auth.uid())) then 'none'
    when private.is_admin() then 'admin'
    else 'needs_google'
  end;
$$;

revoke all on function public.current_user_admin_status() from public, anon;
grant execute on function public.current_user_admin_status() to authenticated;

-- 3) Daily keep-alive for the free plan (it pauses after 7 days without database activity).
--    Callable without signing in; returns only true/false.
create function public.health_check()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.courses);
$$;

revoke all on function public.health_check() from public;
grant execute on function public.health_check() to anon, authenticated;
