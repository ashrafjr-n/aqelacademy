-- Keep the decision a "booking_status_changed" notification announced, so its text stays
-- correct even if the doctor changes the decision later.
alter table public.notifications add column booking_status public.booking_status;

create or replace function private.after_booking_status_changed()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.notifications (user_id, type, booking_id, booking_status)
  values (new.user_id, 'booking_status_changed', new.id, new.status);

  insert into public.audit_logs (actor_id, action, entity, entity_id, details)
  values (
    (select auth.uid()), 'booking.status_changed', 'booking', new.id,
    jsonb_build_object('from', old.status, 'to', new.status)
  );
  return null;
end;
$$;

revoke all on function private.after_booking_status_changed() from public;
