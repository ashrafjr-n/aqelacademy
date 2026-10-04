-- Security tests for the core schema. Run with: npm run test:db
-- Users: A = ...0a, B = ...0b (regular), D = ...0d (admin / the doctor).

create schema tests;
grant usage on schema tests to anon, authenticated;

create function tests.check(condition boolean, label text) returns void language plpgsql as $$
begin
  if condition is not true then raise exception 'FAILED: %', label; end if;
end $$;

create function tests.expect_error(stmt text, expected_sqlstate text) returns void language plpgsql as $$
declare
  succeeded boolean := false;
begin
  begin
    execute stmt;
    succeeded := true;
  exception when others then
    if sqlstate <> expected_sqlstate then
      raise exception 'FAILED: expected %, got % (%) for: %', expected_sqlstate, sqlstate, sqlerrm, stmt;
    end if;
  end;
  if succeeded then raise exception 'FAILED: expected % but it succeeded: %', expected_sqlstate, stmt; end if;
end $$;

create function tests.login(uid uuid) returns void language sql as $$
  select set_config('request.jwt.claims', json_build_object('sub', uid, 'role', 'authenticated')::text, false);
$$;

create function tests.affected(stmt text) returns bigint language plpgsql as $$
declare n bigint;
begin
  execute stmt;
  get diagnostics n = row_count;
  return n;
end $$;

grant execute on all functions in schema tests to anon, authenticated;

-- ---------------------------------------------------------------- setup (as postgres)
insert into auth.users (id, email, raw_user_meta_data) values
  ('00000000-0000-0000-0000-00000000000a', 'a@test.local', '{"full_name": "User A", "privacy_accepted": true}'),
  ('00000000-0000-0000-0000-00000000000b', 'b@test.local', '{"full_name": "User B", "phone": "+962791234567", "country": "jo", "privacy_accepted": "true"}'),
  ('00000000-0000-0000-0000-00000000000d', 'd@test.local', '{"full_name": "Dr Admin", "privacy_accepted": true}');
insert into private.admins (user_id) values ('00000000-0000-0000-0000-00000000000d');
insert into public.courses (slug, title) values ('c2', 'Course 2'), ('c3', 'Course 3'), ('c4', 'Course 4'), ('c5', 'Course 5'), ('c6', 'Course 6');

-- ---------------------------------------------------------------- sign-up trigger
select tests.check((select count(*) from public.profiles) = 3, 'a profile is created for every sign-up');
select tests.check((select country from public.profiles where id = '00000000-0000-0000-0000-00000000000b') = 'JO', 'country is upper-cased');
select tests.expect_error($$insert into auth.users (email, raw_user_meta_data) values ('x@test.local', '{"full_name": "No Consent"}')$$, '23514');
select tests.expect_error($$insert into auth.users (email, raw_user_meta_data) values ('y@test.local', '{"full_name": "Bad Phone", "phone": "0791234567", "privacy_accepted": true}')$$, '23514');
select tests.expect_error($$insert into auth.users (email, raw_user_meta_data) values ('z@test.local', '{"full_name": "", "privacy_accepted": true}')$$, '23514');

-- ---------------------------------------------------------------- OAuth (Google) sign-up
insert into auth.users (id, email, raw_app_meta_data, raw_user_meta_data) values
  ('00000000-0000-0000-0000-0000000000a1', 'g1@gmail.test', '{"provider": "google"}', '{"name": "Google User"}'),
  ('00000000-0000-0000-0000-0000000000a2', 'noname@gmail.test', '{"provider": "google"}', '{}');
select tests.check((select full_name from public.profiles where id = '00000000-0000-0000-0000-0000000000a1') = 'Google User', 'google sign-up takes the name from the provider');
select tests.check((select full_name from public.profiles where id = '00000000-0000-0000-0000-0000000000a2') = 'noname', 'google sign-up without a name falls back to the email');
select tests.check((select privacy_accepted_at is not null from public.profiles where id = '00000000-0000-0000-0000-0000000000a1'), 'google sign-up records consent time');
-- Keep the rest of the suite's counts unchanged (profiles cascade).
delete from auth.users where id in ('00000000-0000-0000-0000-0000000000a1', '00000000-0000-0000-0000-0000000000a2');

-- ---------------------------------------------------------------- anon: no access at all
set role anon;
select tests.expect_error('select 1 from public.profiles', '42501');
select tests.expect_error('select 1 from public.courses', '42501');
select tests.expect_error('select 1 from public.bookings', '42501');
select tests.expect_error('select 1 from public.messages', '42501');
select tests.expect_error('select 1 from public.notifications', '42501');
select tests.expect_error('select 1 from public.audit_logs', '42501');
select tests.expect_error('select public.current_user_is_admin()', '42501');
reset role;

-- ---------------------------------------------------------------- user A: profile
set role authenticated;
select tests.login('00000000-0000-0000-0000-00000000000a');
select tests.check((select count(*) from public.profiles) = 1, 'A sees only own profile');
select tests.check(tests.affected($$update public.profiles set full_name = 'User A2', phone = '+962790000000' where id = '00000000-0000-0000-0000-00000000000a'$$) = 1, 'A updates own profile');
select tests.check(tests.affected($$update public.profiles set full_name = 'Hacked' where id = '00000000-0000-0000-0000-00000000000b'$$) = 0, 'A cannot update B''s profile');
select tests.expect_error($$update public.profiles set email = 'evil@test.local' where id = '00000000-0000-0000-0000-00000000000a'$$, '42501');
select tests.expect_error($$update public.profiles set privacy_accepted_at = null where id = '00000000-0000-0000-0000-00000000000a'$$, '42501');
select tests.expect_error('select 1 from private.admins', '42501');
select tests.check(not private.is_admin(), 'A is not an admin');
select tests.check(not public.current_user_is_admin(), 'A is not an admin through the public check');

-- ---------------------------------------------------------------- user A: bookings
insert into public.bookings (user_id, course_slug, user_note) values ('00000000-0000-0000-0000-00000000000a', 'abat', 'Interested');
select tests.check((select status from public.bookings) = 'pending', 'new booking is pending');
select tests.expect_error($$insert into public.bookings (user_id, course_slug, status) values ('00000000-0000-0000-0000-00000000000a', 'c2', 'approved')$$, '42501');
select tests.expect_error($$insert into public.bookings (user_id, course_slug) values ('00000000-0000-0000-0000-00000000000b', 'c2')$$, '42501');
select tests.expect_error($$insert into public.bookings (user_id, course_slug) values ('00000000-0000-0000-0000-00000000000a', 'no-such-course')$$, '42501');
select tests.expect_error($$insert into public.bookings (user_id, course_slug) values ('00000000-0000-0000-0000-00000000000a', 'abat')$$, '23505');
select tests.check(tests.affected($$update public.bookings set status = 'approved'$$) = 0, 'A cannot approve own booking');
select tests.expect_error($$update public.bookings set decided_by = '00000000-0000-0000-0000-00000000000a'$$, '42501');
select tests.expect_error($$insert into public.messages (booking_id, sender_id, body) select id, '00000000-0000-0000-0000-00000000000a', 'hi' from public.bookings$$, '42501');
reset role;

-- ---------------------------------------------------------------- user B: isolation + daily cap
set role authenticated;
select tests.login('00000000-0000-0000-0000-00000000000b');
select tests.check((select count(*) from public.bookings) = 0, 'B cannot see A''s booking');
insert into public.bookings (user_id, course_slug) values
  ('00000000-0000-0000-0000-00000000000b', 'abat'),
  ('00000000-0000-0000-0000-00000000000b', 'c2'),
  ('00000000-0000-0000-0000-00000000000b', 'c3'),
  ('00000000-0000-0000-0000-00000000000b', 'c4'),
  ('00000000-0000-0000-0000-00000000000b', 'c5');
select tests.expect_error($$insert into public.bookings (user_id, course_slug) values ('00000000-0000-0000-0000-00000000000b', 'c6')$$, 'P0001');
reset role;

-- ---------------------------------------------------------------- admin D
set role authenticated;
select tests.login('00000000-0000-0000-0000-00000000000d');
select tests.check(private.is_admin(), 'D is an admin');
select tests.check(public.current_user_is_admin(), 'D is an admin through the public check');
select tests.check((select count(*) from public.profiles) = 3, 'admin sees all profiles');
select tests.check((select count(*) from public.bookings) = 6, 'admin sees all bookings');
select tests.check((select count(*) from public.notifications where type = 'booking_created') = 6, 'admin is notified of every booking');
select tests.check(tests.affected($$update public.bookings set status = 'approved' where user_id = '00000000-0000-0000-0000-00000000000a'$$) = 1, 'admin approves A''s booking');
select tests.check((select decided_by = '00000000-0000-0000-0000-00000000000d' and decided_at is not null from public.bookings where user_id = '00000000-0000-0000-0000-00000000000a'), 'decision is stamped with admin and time');
select tests.check((select count(*) from public.audit_logs where action = 'booking.status_changed' and details ->> 'to' = 'approved') = 1, 'approval is audit-logged');
select tests.expect_error($$update public.bookings set user_note = 'edited by admin'$$, '42501');
insert into public.messages (booking_id, sender_id, body)
  select id, '00000000-0000-0000-0000-00000000000d', 'Welcome, I will contact you soon.' from public.bookings where user_id = '00000000-0000-0000-0000-00000000000a';
insert into public.messages (booking_id, sender_id, body)
  select id, '00000000-0000-0000-0000-00000000000d', 'Note for B' from public.bookings where user_id = '00000000-0000-0000-0000-00000000000b' and course_slug = 'abat';
reset role;

-- ---------------------------------------------------------------- user A after approval: messages + notifications
set role authenticated;
select tests.login('00000000-0000-0000-0000-00000000000a');
select tests.check((select count(*) from public.notifications) = 2, 'A is notified of the decision and the message');
select tests.check((select count(*) from public.messages) = 1, 'A sees only messages in own booking');
select tests.check((select count(*) from public.audit_logs) = 0, 'A cannot read the audit log');
insert into public.messages (booking_id, sender_id, body) select id, '00000000-0000-0000-0000-00000000000a', 'Thank you' from public.bookings;
select tests.expect_error($$insert into public.messages (booking_id, sender_id, body) select id, '00000000-0000-0000-0000-00000000000d', 'spoofed' from public.bookings$$, '42501');
select tests.expect_error($$insert into public.messages (booking_id, sender_id, body) select id, '00000000-0000-0000-0000-00000000000a', repeat('x', 1001) from public.bookings$$, '23514');
select tests.check(tests.affected($$update public.messages set read_at = now() where sender_id = '00000000-0000-0000-0000-00000000000d'$$) = 1, 'A marks the doctor''s message read');
select tests.check(tests.affected($$update public.messages set read_at = now() where sender_id = '00000000-0000-0000-0000-00000000000a'$$) = 0, 'A cannot mark own message read');
select tests.check(tests.affected($$update public.notifications set read_at = now()$$) = 2, 'A marks own notifications read');
select tests.expect_error($$update public.notifications set user_id = '00000000-0000-0000-0000-00000000000b'$$, '42501');
-- Burst cap: A already sent 1 message; 9 more are allowed, the 11th is rejected.
insert into public.messages (booking_id, sender_id, body)
  select b.id, '00000000-0000-0000-0000-00000000000a', 'msg ' || g from public.bookings b, generate_series(1, 9) g;
select tests.expect_error($$insert into public.messages (booking_id, sender_id, body) select id, '00000000-0000-0000-0000-00000000000a', 'one too many' from public.bookings$$, 'P0001');
reset role;

-- ---------------------------------------------------------------- user B: cannot read A's conversation, cannot write before approval
set role authenticated;
select tests.login('00000000-0000-0000-0000-00000000000b');
select tests.check((select count(*) from public.messages) = 1, 'B sees only the message in own booking');
select tests.expect_error($$insert into public.messages (booking_id, sender_id, body) select id, '00000000-0000-0000-0000-00000000000b', 'hi' from public.bookings where course_slug = 'abat'$$, '42501');
reset role;

-- ---------------------------------------------------------------- admin notifications from user messages
set role authenticated;
select tests.login('00000000-0000-0000-0000-00000000000d');
select tests.check((select count(*) from public.notifications where type = 'message_received') = 10, 'admin is notified of each user message');
reset role;

-- ---------------------------------------------------------------- email sync
update auth.users set email = 'a-new@test.local' where id = '00000000-0000-0000-0000-00000000000a';
select tests.check((select email from public.profiles where id = '00000000-0000-0000-0000-00000000000a') = 'a-new@test.local', 'profile email follows auth email');

