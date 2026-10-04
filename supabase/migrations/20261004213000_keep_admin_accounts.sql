-- private.is_admin() now also requires a Google session, so check admin *membership* here:
-- an admin account must never be deletable with one tap, whatever the sign-in method.
create or replace function public.delete_my_account()
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

revoke all on function public.delete_my_account() from public, anon;
grant execute on function public.delete_my_account() to authenticated;
