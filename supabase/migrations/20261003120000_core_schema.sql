-- Core schema: profiles, courses, bookings, messages, notifications, audit log.
--
-- Security model:
--   * anon gets nothing. Every table has RLS on, policies are scoped `to authenticated`,
--     and grants are explicit (column-level where a client may write).
--   * Admin rights come from private.admins, which is not exposed over the Data API.
--     Admins are added by a trusted script with the secret key, never from the app.
--   * Side effects (decision stamps, notifications, audit log) are written by triggers,
--     so a client can never forge them.

-- ---------------------------------------------------------------------------
-- Lock down defaults: new tables/functions in public are NOT exposed unless granted.
-- ---------------------------------------------------------------------------
alter default privileges for role postgres in schema public revoke all on tables from anon, authenticated;
alter default privileges for role postgres in schema public revoke all on sequences from anon, authenticated;
alter default privileges for role postgres in schema public revoke execute on functions from public, anon, authenticated;

-- ---------------------------------------------------------------------------
-- Private schema (not exposed): admins + helper and trigger functions.
-- ---------------------------------------------------------------------------
create schema if not exists private;
revoke all on schema private from public;
grant usage on schema private to authenticated;

create table private.admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);
revoke all on private.admins from public, anon, authenticated;

create function private.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from private.admins where user_id = (select auth.uid()));
$$;
revoke all on function private.is_admin() from public;
grant execute on function private.is_admin() to authenticated;

create function private.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- Types
-- ---------------------------------------------------------------------------
create type public.booking_status as enum ('pending', 'approved', 'rejected');
create type public.notification_type as enum ('booking_created', 'booking_status_changed', 'message_received');

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  full_name text not null check (char_length(btrim(full_name)) between 2 and 100),
  phone text check (phone ~ '^\+[1-9][0-9]{6,14}$'),
  country text check (country ~ '^[A-Z]{2}$'),
  privacy_accepted_at timestamptz not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Booking reference data. Rendering content stays in src/content/courses.ts;
-- every course there that can be booked needs a row here (same slug).
create table public.courses (
  slug text primary key check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title text not null check (char_length(title) between 2 and 200),
  is_bookable boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  course_slug text not null references public.courses (slug) on update cascade,
  user_note text check (char_length(user_note) <= 500),
  status public.booking_status not null default 'pending',
  decided_by uuid references auth.users (id) on delete set null,
  decided_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index bookings_user_id_idx on public.bookings (user_id);
create index bookings_status_created_at_idx on public.bookings (status, created_at desc);
-- One open (pending/approved) booking per user per course.
create unique index bookings_one_open_per_course_idx
  on public.bookings (user_id, course_slug)
  where status in ('pending', 'approved');

create table public.messages (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.bookings (id) on delete cascade,
  sender_id uuid references auth.users (id) on delete set null,
  body text not null check (char_length(btrim(body)) between 1 and 1000),
  read_at timestamptz,
  created_at timestamptz not null default now()
);
create index messages_booking_id_created_at_idx on public.messages (booking_id, created_at);
create index messages_sender_id_created_at_idx on public.messages (sender_id, created_at);

create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  type public.notification_type not null,
  booking_id uuid references public.bookings (id) on delete cascade,
  read_at timestamptz,
  created_at timestamptz not null default now()
);
create index notifications_user_id_created_at_idx on public.notifications (user_id, created_at desc);

-- Append-only: written by triggers only, readable by admins only.
create table public.audit_logs (
  id bigint generated always as identity primary key,
  actor_id uuid references auth.users (id) on delete set null,
  action text not null,
  entity text not null,
  entity_id uuid,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create index audit_logs_created_at_idx on public.audit_logs (created_at desc);

insert into public.courses (slug, title) values
  ('abat', 'دورة فني تحليل سلوك تطبيقي دولي ABAT');

-- ---------------------------------------------------------------------------
-- Grants (what a role may do at all). RLS below decides which rows.
-- ---------------------------------------------------------------------------
revoke all on public.profiles, public.courses, public.bookings, public.messages,
  public.notifications, public.audit_logs from public, anon, authenticated;

grant select on public.profiles to authenticated;
grant update (full_name, phone, country) on public.profiles to authenticated;

grant select on public.courses to authenticated;

grant select on public.bookings to authenticated;
grant insert (user_id, course_slug, user_note) on public.bookings to authenticated;
grant update (status) on public.bookings to authenticated;

grant select on public.messages to authenticated;
grant insert (booking_id, sender_id, body) on public.messages to authenticated;
grant update (read_at) on public.messages to authenticated;

grant select on public.notifications to authenticated;
grant update (read_at) on public.notifications to authenticated;

grant select on public.audit_logs to authenticated;

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.courses enable row level security;
alter table public.bookings enable row level security;
alter table public.messages enable row level security;
alter table public.notifications enable row level security;
alter table public.audit_logs enable row level security;

create policy "profiles: read own, admins read all" on public.profiles
  for select to authenticated
  using (id = (select auth.uid()) or (select private.is_admin()));

create policy "profiles: update own" on public.profiles
  for update to authenticated
  using (id = (select auth.uid()))
  with check (id = (select auth.uid()));

create policy "courses: readable when signed in" on public.courses
  for select to authenticated
  using (true);

create policy "bookings: read own, admins read all" on public.bookings
  for select to authenticated
  using (user_id = (select auth.uid()) or (select private.is_admin()));

create policy "bookings: create own for a bookable course" on public.bookings
  for insert to authenticated
  with check (
    user_id = (select auth.uid())
    and exists (select 1 from public.courses c where c.slug = course_slug and c.is_bookable)
  );

create policy "bookings: admins decide" on public.bookings
  for update to authenticated
  using ((select private.is_admin()))
  with check ((select private.is_admin()));

create policy "messages: read in own bookings, admins read all" on public.messages
  for select to authenticated
  using (
    (select private.is_admin())
    or exists (select 1 from public.bookings b where b.id = booking_id and b.user_id = (select auth.uid()))
  );

-- Users can write only in their own approved booking; admins in any booking.
create policy "messages: send as self" on public.messages
  for insert to authenticated
  with check (
    sender_id = (select auth.uid())
    and (
      (select private.is_admin())
      or exists (
        select 1 from public.bookings b
        where b.id = booking_id and b.user_id = (select auth.uid()) and b.status = 'approved'
      )
    )
  );

-- Only the recipient marks a message as read.
create policy "messages: recipient marks read" on public.messages
  for update to authenticated
  using (
    sender_id is distinct from (select auth.uid())
    and (
      (select private.is_admin())
      or exists (select 1 from public.bookings b where b.id = booking_id and b.user_id = (select auth.uid()))
    )
  )
  with check (sender_id is distinct from (select auth.uid()));

create policy "notifications: read own" on public.notifications
  for select to authenticated
  using (user_id = (select auth.uid()));

create policy "notifications: mark own read" on public.notifications
  for update to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

create policy "audit_logs: admins read" on public.audit_logs
  for select to authenticated
  using ((select private.is_admin()));

-- ---------------------------------------------------------------------------
-- Triggers
-- ---------------------------------------------------------------------------
create trigger profiles_set_updated_at before update on public.profiles
  for each row execute function private.set_updated_at();
create trigger bookings_set_updated_at before update on public.bookings
  for each row execute function private.set_updated_at();

-- Create the profile from sign-up metadata. Constraints on profiles validate it.
create function private.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if coalesce(new.raw_user_meta_data ->> 'privacy_accepted', '') <> 'true' then
    raise exception 'privacy policy must be accepted' using errcode = 'check_violation';
  end if;

  insert into public.profiles (id, email, full_name, phone, country, privacy_accepted_at)
  values (
    new.id,
    new.email,
    btrim(new.raw_user_meta_data ->> 'full_name'),
    nullif(btrim(new.raw_user_meta_data ->> 'phone'), ''),
    nullif(upper(btrim(new.raw_user_meta_data ->> 'country')), ''),
    now()
  );
  return new;
end;
$$;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function private.handle_new_user();

create function private.handle_user_email_change()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  update public.profiles set email = new.email where id = new.id;
  return null;
end;
$$;
create trigger on_auth_user_email_changed after update of email on auth.users
  for each row when (old.email is distinct from new.email)
  execute function private.handle_user_email_change();

-- New bookings always start pending; a status change is stamped with who and when.
create function private.before_booking_write()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if tg_op = 'INSERT' then
    -- ponytail: per-user daily cap in SQL; move to a rate-limit table if it ever needs tuning per role.
    if (select count(*) from public.bookings
        where user_id = new.user_id and created_at > now() - interval '1 day') >= 5 then
      raise exception 'too many bookings today' using errcode = 'P0001';
    end if;
    new.status := 'pending';
    new.decided_by := null;
    new.decided_at := null;
    new.created_at := now();
  elsif new.status is distinct from old.status then
    new.decided_by := (select auth.uid());
    new.decided_at := now();
  end if;
  return new;
end;
$$;
create trigger bookings_before_write before insert or update on public.bookings
  for each row execute function private.before_booking_write();

create function private.after_booking_created()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.notifications (user_id, type, booking_id)
  select a.user_id, 'booking_created', new.id from private.admins a;
  return null;
end;
$$;
create trigger bookings_after_insert after insert on public.bookings
  for each row execute function private.after_booking_created();

create function private.after_booking_status_changed()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.notifications (user_id, type, booking_id)
  values (new.user_id, 'booking_status_changed', new.id);

  insert into public.audit_logs (actor_id, action, entity, entity_id, details)
  values (
    (select auth.uid()), 'booking.status_changed', 'booking', new.id,
    jsonb_build_object('from', old.status, 'to', new.status)
  );
  return null;
end;
$$;
create trigger bookings_after_status_update after update of status on public.bookings
  for each row when (old.status is distinct from new.status)
  execute function private.after_booking_status_changed();

create function private.before_message_insert()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  -- ponytail: per-sender burst cap in SQL; enough for a two-person chat.
  if (select count(*) from public.messages
      where sender_id = new.sender_id and created_at > now() - interval '1 minute') >= 10 then
    raise exception 'too many messages, slow down' using errcode = 'P0001';
  end if;
  new.read_at := null;
  new.created_at := now();
  return new;
end;
$$;
create trigger messages_before_insert before insert on public.messages
  for each row execute function private.before_message_insert();

-- Notify the other side: the booking owner, or every admin.
create function private.after_message_created()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  booking_owner uuid;
begin
  select user_id into booking_owner from public.bookings where id = new.booking_id;

  if new.sender_id is not distinct from booking_owner then
    insert into public.notifications (user_id, type, booking_id)
    select a.user_id, 'message_received', new.booking_id from private.admins a;
  else
    insert into public.notifications (user_id, type, booking_id)
    values (booking_owner, 'message_received', new.booking_id);
  end if;
  return null;
end;
$$;
create trigger messages_after_insert after insert on public.messages
  for each row execute function private.after_message_created();

-- Trigger functions are never callable directly.
revoke all on function
  private.set_updated_at(),
  private.handle_new_user(),
  private.handle_user_email_change(),
  private.before_booking_write(),
  private.after_booking_created(),
  private.after_booking_status_changed(),
  private.before_message_insert(),
  private.after_message_created()
from public;
