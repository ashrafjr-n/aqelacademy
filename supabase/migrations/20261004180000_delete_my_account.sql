-- Right to erasure: a signed-in user deletes their own account.
-- Cascades remove the profile, bookings, the messages in them, and notifications;
-- audit log rows stay with actor_id set to null.
-- Security definer on purpose (only the database owner may delete from auth.users). It takes no
-- arguments and only ever deletes auth.uid(), so exposing it over the API is safe.
-- Admins are refused, so the doctor can't lock himself out with one tap.
create function public.delete_my_account()
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
  if private.is_admin() then
    raise exception 'admins cannot delete their own account' using errcode = 'P0001';
  end if;
  delete from auth.users where id = caller;
end;
$$;

revoke all on function public.delete_my_account() from public, anon;
grant execute on function public.delete_my_account() to authenticated;
