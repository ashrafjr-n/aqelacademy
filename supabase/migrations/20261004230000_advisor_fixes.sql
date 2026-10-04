-- Database advisor fixes:
-- 1) SECURITY DEFINER functions live only in the private (unexposed) schema; the public RPCs
--    are SECURITY INVOKER wrappers around them.
-- 2) Covering indexes for foreign keys.
-- 3) Drop public.current_user_is_admin(): unused since current_user_admin_status() replaced it.

drop function public.current_user_is_admin();

create function private.is_admin_member()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from private.admins where user_id = (select auth.uid()));
$$;
revoke all on function private.is_admin_member() from public;
grant execute on function private.is_admin_member() to authenticated;

create or replace function public.current_user_admin_status()
returns text
language sql
stable
security invoker
set search_path = ''
as $$
  select case
    when not private.is_admin_member() then 'none'
    when private.is_admin() then 'admin'
    else 'needs_google'
  end;
$$;

create function private.delete_current_account()
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  caller uuid := (select auth.uid());
begin
  if caller is null then
    raise exception 'not signed in' using errcode = '42501';
  end if;
  if exists (select 1 from private.admins where user_id = caller) then
    raise exception 'admins cannot delete their own account' using errcode = 'P0001';
  end if;
  delete from auth.users where id = caller;
end;
$$;
revoke all on function private.delete_current_account() from public;
grant execute on function private.delete_current_account() to authenticated;

create or replace function public.delete_my_account()
returns void
language sql
security invoker
set search_path = ''
as $$
  select private.delete_current_account();
$$;

-- A query that touches the database is all the keep-alive needs; no privileges required.
create or replace function public.health_check()
returns boolean
language sql
stable
security invoker
set search_path = ''
as $$
  select true;
$$;

create index audit_logs_actor_id_idx on public.audit_logs (actor_id);
create index bookings_course_slug_idx on public.bookings (course_slug);
create index bookings_decided_by_idx on public.bookings (decided_by);
create index notifications_booking_id_idx on public.notifications (booking_id);
