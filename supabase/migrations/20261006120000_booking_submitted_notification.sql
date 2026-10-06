-- The student is told their booking was sent, next to the "new booking" notice every admin gets.
alter type public.notification_type add value 'booking_submitted';

create or replace function private.after_booking_created()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.notifications (user_id, type, booking_id)
  select a.user_id, 'booking_created', new.id from private.admins a;

  insert into public.notifications (user_id, type, booking_id)
  values (new.user_id, 'booking_submitted', new.id);
  return null;
end;
$$;

revoke all on function private.after_booking_created() from public;
