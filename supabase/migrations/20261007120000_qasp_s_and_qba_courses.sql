-- Two new bookable courses; their content lives in src/content/courses.ts under the same slugs.
insert into public.courses (slug, title) values
  ('qasp-s', 'دورة ممارس خدمات التوحد المؤهل – مشرف QASP-S'),
  ('qba', 'دورة محلل سلوك مؤهل QBA');
