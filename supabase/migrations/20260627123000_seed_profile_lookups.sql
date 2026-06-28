-- =============================================================================
-- Seed the lookups the freelancer Profile tab needs but the first seed missed:
--   education_levels (Education > Degree), grades (Education > Grade),
--   socials (Socials section). Guarded so re-runs are no-ops.
-- =============================================================================

-- Education degrees
insert into public.education_levels (name, name_ar)
select * from (values
  ('High School',  'الثانوية العامة'),
  ('Diploma',      'دبلوم'),
  ('Bachelor''s',  'بكالوريوس'),
  ('Master''s',    'ماجستير'),
  ('PhD',          'دكتوراه')
) as v(name, name_ar)
where not exists (select 1 from public.education_levels);

-- Education grades
insert into public.grades (name, name_ar)
select * from (values
  ('Excellent',   'ممتاز'),
  ('Very Good',   'جيد جداً'),
  ('Good',        'جيد'),
  ('Satisfactory','مقبول'),
  ('Pass',        'ناجح')
) as v(name, name_ar)
where not exists (select 1 from public.grades);

-- Social platforms (icon left null; UI renders nothing when absent)
insert into public.socials (name, name_ar, base_url)
select * from (values
  ('LinkedIn',  'لينكدإن',   'https://linkedin.com/in/'),
  ('GitHub',    'جيت‌هَب',    'https://github.com/'),
  ('X',         'إكس',       'https://x.com/'),
  ('Facebook',  'فيسبوك',    'https://facebook.com/'),
  ('Instagram', 'إنستغرام',  'https://instagram.com/'),
  ('Behance',   'بيهانس',    'https://behance.net/'),
  ('Dribbble',  'دريبل',     'https://dribbble.com/'),
  ('YouTube',   'يوتيوب',    'https://youtube.com/@'),
  ('Website',   'الموقع',    '')
) as v(name, name_ar, base_url)
where not exists (select 1 from public.socials);
