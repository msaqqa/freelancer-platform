-- =============================================================================
-- Reconcile the schema with what the freelancer Profile tab UI expects.
--   freelancer_about   : experience (years) + total_jobs (stat)
--   freelancer_summary : gallery title + video link/title
--   freelancer_socials : allow custom (label-only) socials -> social_id nullable
--   badges             : lookup + per-freelancer junction (Community Badges card)
-- =============================================================================

-- About: years of experience (edited from the About dialog) + total jobs stat.
alter table public.freelancer_about
  add column if not exists experience int not null default 0,
  add column if not exists total_jobs int not null default 0;

-- Summary: the dialog also collects a gallery title and a YouTube video.
alter table public.freelancer_summary
  add column if not exists images_title text,
  add column if not exists video_url    text,
  add column if not exists video_title  text;

-- Socials: custom socials carry a free-text label and no lookup id.
-- (NULLs are distinct in a unique constraint, so many custom rows per profile
--  are allowed under the existing unique (profile_id, social_id).)
alter table public.freelancer_socials
  alter column social_id drop not null,
  add column if not exists label text;

-- =============================================================================
-- Community badges (display-only; awarded out-of-band / seeded later)
-- =============================================================================
create table if not exists public.badges (
  id          bigint generated always as identity primary key,
  name        text not null,
  name_ar     text,
  icon        text,
  description text,
  created_at  timestamptz not null default now()
);

create table if not exists public.freelancer_badges (
  id          bigint generated always as identity primary key,
  profile_id  uuid not null references public.profiles(id) on delete cascade,
  badge_id    bigint not null references public.badges(id) on delete cascade,
  created_at  timestamptz not null default now(),
  unique (profile_id, badge_id)
);
create index if not exists idx_fl_badges_profile on public.freelancer_badges(profile_id);

-- RLS: badges are a public lookup; freelancer_badges public-read, owner-write.
alter table public.badges            enable row level security;
alter table public.freelancer_badges enable row level security;

create policy "lookups_read"   on public.badges            for select using (true);
create policy "fl_badges_read"  on public.freelancer_badges for select using (true);
create policy "fl_badges_write" on public.freelancer_badges
  for all using (auth.uid() = profile_id) with check (auth.uid() = profile_id);
