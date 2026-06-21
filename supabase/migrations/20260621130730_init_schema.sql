-- =============================================================================
-- Initial schema for taqat-platform (freelancer marketplace)
-- Replaces the external Taqat REST API. Auth handled by Supabase Auth.
-- =============================================================================

-- -----------------------------------------------------------------------------
-- Helpers
-- -----------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- =============================================================================
-- LOOKUP TABLES (public read, admin-managed writes)
-- =============================================================================

create table public.countries (
  id          bigint generated always as identity primary key,
  name        text not null,
  name_ar     text,
  iso_code    text,
  phone_code  text,
  created_at  timestamptz not null default now()
);

create table public.categories (
  id          bigint generated always as identity primary key,
  name        text not null,
  name_ar     text,
  icon        text,
  created_at  timestamptz not null default now()
);

create table public.subcategories (
  id          bigint generated always as identity primary key,
  category_id bigint not null references public.categories(id) on delete cascade,
  name        text not null,
  name_ar     text,
  created_at  timestamptz not null default now()
);

create table public.skills (
  id          bigint generated always as identity primary key,
  category_id bigint references public.categories(id) on delete set null,
  name        text not null,
  name_ar     text,
  created_at  timestamptz not null default now()
);

create table public.socials (
  id          bigint generated always as identity primary key,
  name        text not null,
  name_ar     text,
  icon        text,
  base_url    text,
  created_at  timestamptz not null default now()
);

create table public.languages (
  id          bigint generated always as identity primary key,
  name        text not null,
  name_ar     text,
  code        text,
  created_at  timestamptz not null default now()
);

create table public.language_levels (
  id          bigint generated always as identity primary key,
  name        text not null,
  name_ar     text,
  rank        int,
  created_at  timestamptz not null default now()
);

create table public.education_levels (
  id          bigint generated always as identity primary key,
  name        text not null,
  name_ar     text,
  created_at  timestamptz not null default now()
);

create table public.grades (
  id          bigint generated always as identity primary key,
  name        text not null,
  name_ar     text,
  created_at  timestamptz not null default now()
);

create table public.policies (
  id          bigint generated always as identity primary key,
  slug        text not null unique,
  title       text not null,
  title_ar    text,
  content     text,
  content_ar  text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create trigger trg_policies_updated before update on public.policies
  for each row execute function public.set_updated_at();

-- =============================================================================
-- PROFILES (1:1 with auth.users)
-- =============================================================================

create table public.profiles (
  id                uuid primary key references auth.users(id) on delete cascade,
  user_type         text check (user_type in ('freelancer','client')),
  account_type      text,
  full_name         text,
  email             text,
  phone             text,
  phone_verified    boolean not null default false,
  identity_verified boolean not null default false,
  country_id        bigint references public.countries(id) on delete set null,
  lang              text not null default 'en',
  avatar_url        text,
  profile_complete  boolean not null default false,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);
create trigger trg_profiles_updated before update on public.profiles
  for each row execute function public.set_updated_at();

-- Auto-create a profile row when a new auth user signs up.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name')
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- =============================================================================
-- FREELANCER DATA
-- =============================================================================

-- About / headline
create table public.freelancer_about (
  profile_id      uuid primary key references public.profiles(id) on delete cascade,
  title           text,
  description     text,
  category_id     bigint references public.categories(id) on delete set null,
  subcategory_id  bigint references public.subcategories(id) on delete set null,
  hourly_rate     numeric(10,2),
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);
create trigger trg_fl_about_updated before update on public.freelancer_about
  for each row execute function public.set_updated_at();

-- Skills (junction)
create table public.freelancer_skills (
  id          bigint generated always as identity primary key,
  profile_id  uuid not null references public.profiles(id) on delete cascade,
  skill_id    bigint not null references public.skills(id) on delete cascade,
  created_at  timestamptz not null default now(),
  unique (profile_id, skill_id)
);

-- Languages (junction with level)
create table public.freelancer_languages (
  id          bigint generated always as identity primary key,
  profile_id  uuid not null references public.profiles(id) on delete cascade,
  language_id bigint not null references public.languages(id) on delete cascade,
  level_id    bigint references public.language_levels(id) on delete set null,
  created_at  timestamptz not null default now(),
  unique (profile_id, language_id)
);

-- Socials
create table public.freelancer_socials (
  id          bigint generated always as identity primary key,
  profile_id  uuid not null references public.profiles(id) on delete cascade,
  social_id   bigint not null references public.socials(id) on delete cascade,
  url         text not null,
  created_at  timestamptz not null default now(),
  unique (profile_id, social_id)
);

-- Summary (rich profile section) + images
create table public.freelancer_summary (
  profile_id  uuid primary key references public.profiles(id) on delete cascade,
  title       text,
  description text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create trigger trg_fl_summary_updated before update on public.freelancer_summary
  for each row execute function public.set_updated_at();

create table public.summary_images (
  id          bigint generated always as identity primary key,
  profile_id  uuid not null references public.profiles(id) on delete cascade,
  image_url   text not null,
  sort_order  int not null default 0,
  created_at  timestamptz not null default now()
);

-- Educations
create table public.educations (
  id            bigint generated always as identity primary key,
  profile_id    uuid not null references public.profiles(id) on delete cascade,
  level_id      bigint references public.education_levels(id) on delete set null,
  grade_id      bigint references public.grades(id) on delete set null,
  institution   text,
  field         text,
  start_date    date,
  end_date      date,
  description    text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
create trigger trg_educations_updated before update on public.educations
  for each row execute function public.set_updated_at();

-- Services offered
create table public.services (
  id              bigint generated always as identity primary key,
  profile_id      uuid not null references public.profiles(id) on delete cascade,
  category_id     bigint references public.categories(id) on delete set null,
  subcategory_id  bigint references public.subcategories(id) on delete set null,
  title           text not null,
  description     text,
  price           numeric(10,2),
  delivery_days   int,
  status          text not null default 'draft' check (status in ('draft','active','paused')),
  images          jsonb not null default '[]'::jsonb,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);
create trigger trg_services_updated before update on public.services
  for each row execute function public.set_updated_at();

-- Portfolio items
create table public.portfolios (
  id            bigint generated always as identity primary key,
  profile_id    uuid not null references public.profiles(id) on delete cascade,
  category_id   bigint references public.categories(id) on delete set null,
  title         text not null,
  description   text,
  project_url   text,
  images        jsonb not null default '[]'::jsonb,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
create trigger trg_portfolios_updated before update on public.portfolios
  for each row execute function public.set_updated_at();

-- =============================================================================
-- SYSTEM LOGS
-- =============================================================================
create table public.system_logs (
  id           bigint generated always as identity primary key,
  event        text not null,
  user_id      uuid references auth.users(id) on delete set null,
  entity_id    text,
  entity_type  text,
  description  text,
  ip_address   text,
  meta         jsonb,
  created_at   timestamptz not null default now()
);

-- =============================================================================
-- INDEXES
-- =============================================================================
create index idx_subcategories_category on public.subcategories(category_id);
create index idx_skills_category on public.skills(category_id);
create index idx_fl_skills_profile on public.freelancer_skills(profile_id);
create index idx_fl_languages_profile on public.freelancer_languages(profile_id);
create index idx_fl_socials_profile on public.freelancer_socials(profile_id);
create index idx_summary_images_profile on public.summary_images(profile_id);
create index idx_educations_profile on public.educations(profile_id);
create index idx_services_profile on public.services(profile_id);
create index idx_portfolios_profile on public.portfolios(profile_id);
create index idx_system_logs_user on public.system_logs(user_id);
