-- Allow sign-ups through an OAuth provider (Google).
-- Email sign-ups must still send privacy_accepted = true (the form's checkbox).
-- OAuth sign-ups accept the policy through the notice next to the provider button,
-- and their name comes from the provider profile (falling back to the email's local part).

create or replace function private.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  is_oauth boolean := coalesce(new.raw_app_meta_data ->> 'provider', 'email') <> 'email';
  display_name text := btrim(coalesce(
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'name',
    ''
  ));
begin
  if not is_oauth and coalesce(new.raw_user_meta_data ->> 'privacy_accepted', '') <> 'true' then
    raise exception 'privacy policy must be accepted' using errcode = 'check_violation';
  end if;

  if is_oauth and char_length(display_name) < 2 then
    display_name := left(split_part(new.email, '@', 1), 100);
  end if;

  insert into public.profiles (id, email, full_name, phone, country, privacy_accepted_at)
  values (
    new.id,
    new.email,
    left(display_name, 100),
    nullif(btrim(new.raw_user_meta_data ->> 'phone'), ''),
    nullif(upper(btrim(new.raw_user_meta_data ->> 'country')), ''),
    now()
  );
  return new;
end;
$$;

revoke all on function private.handle_new_user() from public;
