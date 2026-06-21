-- =============================================================================
-- Seed lookup data so onboarding dropdowns work. Guarded so re-runs are no-ops.
-- =============================================================================

-- Countries (form defaults country = '1', so the first row must be id 1)
insert into public.countries (name, name_ar, iso_code, phone_code)
select * from (values
  ('Jordan',        'الأردن',        'JO', '+962'),
  ('Saudi Arabia',  'السعودية',      'SA', '+966'),
  ('Egypt',         'مصر',           'EG', '+20'),
  ('United Arab Emirates', 'الإمارات', 'AE', '+971'),
  ('Palestine',     'فلسطين',        'PS', '+970')
) as v(name, name_ar, iso_code, phone_code)
where not exists (select 1 from public.countries);

-- Categories
insert into public.categories (name, name_ar)
select * from (values
  ('Programming & Tech', 'برمجة وتقنية'),
  ('Design & Creative',  'تصميم وإبداع'),
  ('Writing & Translation', 'كتابة وترجمة'),
  ('Digital Marketing',  'تسويق رقمي')
) as v(name, name_ar)
where not exists (select 1 from public.categories);

-- Subcategories (linked to the categories above by name)
insert into public.subcategories (category_id, name, name_ar)
select c.id, v.name, v.name_ar
from (values
  ('Programming & Tech',    'Web Development',   'تطوير الويب'),
  ('Programming & Tech',    'Mobile Apps',       'تطبيقات الجوال'),
  ('Design & Creative',     'Logo Design',       'تصميم شعارات'),
  ('Design & Creative',     'UI/UX Design',      'تصميم واجهات'),
  ('Writing & Translation', 'Translation',       'ترجمة'),
  ('Writing & Translation', 'Content Writing',   'كتابة محتوى'),
  ('Digital Marketing',     'SEO',               'تحسين محركات البحث'),
  ('Digital Marketing',     'Social Media',      'تواصل اجتماعي')
) as v(category, name, name_ar)
join public.categories c on c.name = v.category
where not exists (select 1 from public.subcategories);

-- Skills (linked to categories by name)
insert into public.skills (category_id, name, name_ar)
select c.id, v.name, v.name_ar
from (values
  ('Programming & Tech',    'React',        'رياكت'),
  ('Programming & Tech',    'Next.js',      'نكست'),
  ('Programming & Tech',    'Node.js',      'نود'),
  ('Programming & Tech',    'Flutter',      'فلاتر'),
  ('Design & Creative',     'Figma',        'فيجما'),
  ('Design & Creative',     'Photoshop',    'فوتوشوب'),
  ('Design & Creative',     'Illustrator',  'إليستريتور'),
  ('Writing & Translation', 'Arabic',       'عربي'),
  ('Writing & Translation', 'English',      'إنجليزي'),
  ('Digital Marketing',     'Google Ads',   'إعلانات جوجل'),
  ('Digital Marketing',     'Meta Ads',     'إعلانات ميتا')
) as v(category, name, name_ar)
join public.categories c on c.name = v.category
where not exists (select 1 from public.skills);

-- Languages + levels (used elsewhere in the freelancer profile)
insert into public.languages (name, name_ar, code)
select * from (values
  ('Arabic', 'العربية', 'ar'),
  ('English', 'الإنجليزية', 'en'),
  ('French', 'الفرنسية', 'fr')
) as v(name, name_ar, code)
where not exists (select 1 from public.languages);

insert into public.language_levels (name, name_ar, rank)
select * from (values
  ('Beginner', 'مبتدئ', 1),
  ('Intermediate', 'متوسط', 2),
  ('Advanced', 'متقدم', 3),
  ('Native', 'لغة أم', 4)
) as v(name, name_ar, rank)
where not exists (select 1 from public.language_levels);
