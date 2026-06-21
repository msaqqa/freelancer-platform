-- =============================================================================
-- Row Level Security
--  * Lookups        -> public read, no client writes (managed via service_role)
--  * profiles       -> a user reads/updates only their own row
--  * freelancer data-> owner manages own rows; public can read (portfolio site)
--  * system_logs    -> no client access (service_role only)
-- =============================================================================

-- Enable RLS everywhere
alter table public.countries        enable row level security;
alter table public.categories       enable row level security;
alter table public.subcategories    enable row level security;
alter table public.skills           enable row level security;
alter table public.socials          enable row level security;
alter table public.languages        enable row level security;
alter table public.language_levels  enable row level security;
alter table public.education_levels enable row level security;
alter table public.grades           enable row level security;
alter table public.policies         enable row level security;
alter table public.profiles             enable row level security;
alter table public.freelancer_about      enable row level security;
alter table public.freelancer_skills     enable row level security;
alter table public.freelancer_languages  enable row level security;
alter table public.freelancer_socials    enable row level security;
alter table public.freelancer_summary    enable row level security;
alter table public.summary_images        enable row level security;
alter table public.educations            enable row level security;
alter table public.services              enable row level security;
alter table public.portfolios            enable row level security;
alter table public.system_logs           enable row level security;

-- -----------------------------------------------------------------------------
-- Lookups: anyone (incl. anon) may read
-- -----------------------------------------------------------------------------
create policy "lookups_read" on public.countries        for select using (true);
create policy "lookups_read" on public.categories       for select using (true);
create policy "lookups_read" on public.subcategories    for select using (true);
create policy "lookups_read" on public.skills           for select using (true);
create policy "lookups_read" on public.socials          for select using (true);
create policy "lookups_read" on public.languages        for select using (true);
create policy "lookups_read" on public.language_levels  for select using (true);
create policy "lookups_read" on public.education_levels for select using (true);
create policy "lookups_read" on public.grades           for select using (true);
create policy "lookups_read" on public.policies         for select using (true);

-- -----------------------------------------------------------------------------
-- profiles
-- -----------------------------------------------------------------------------
create policy "profiles_select_public" on public.profiles
  for select using (true);
create policy "profiles_insert_own" on public.profiles
  for insert with check (auth.uid() = id);
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

-- -----------------------------------------------------------------------------
-- Owner-managed freelancer data. Public read so portfolios are shareable.
-- One template applied per table (keyed on profile_id = auth.uid()).
-- -----------------------------------------------------------------------------

-- freelancer_about
create policy "fl_about_read"   on public.freelancer_about for select using (true);
create policy "fl_about_write"  on public.freelancer_about
  for all using (auth.uid() = profile_id) with check (auth.uid() = profile_id);

-- freelancer_skills
create policy "fl_skills_read"  on public.freelancer_skills for select using (true);
create policy "fl_skills_write" on public.freelancer_skills
  for all using (auth.uid() = profile_id) with check (auth.uid() = profile_id);

-- freelancer_languages
create policy "fl_langs_read"   on public.freelancer_languages for select using (true);
create policy "fl_langs_write"  on public.freelancer_languages
  for all using (auth.uid() = profile_id) with check (auth.uid() = profile_id);

-- freelancer_socials
create policy "fl_socials_read"  on public.freelancer_socials for select using (true);
create policy "fl_socials_write" on public.freelancer_socials
  for all using (auth.uid() = profile_id) with check (auth.uid() = profile_id);

-- freelancer_summary
create policy "fl_summary_read"  on public.freelancer_summary for select using (true);
create policy "fl_summary_write" on public.freelancer_summary
  for all using (auth.uid() = profile_id) with check (auth.uid() = profile_id);

-- summary_images
create policy "summary_images_read"  on public.summary_images for select using (true);
create policy "summary_images_write" on public.summary_images
  for all using (auth.uid() = profile_id) with check (auth.uid() = profile_id);

-- educations
create policy "educations_read"  on public.educations for select using (true);
create policy "educations_write" on public.educations
  for all using (auth.uid() = profile_id) with check (auth.uid() = profile_id);

-- services
create policy "services_read"  on public.services for select using (true);
create policy "services_write" on public.services
  for all using (auth.uid() = profile_id) with check (auth.uid() = profile_id);

-- portfolios
create policy "portfolios_read"  on public.portfolios for select using (true);
create policy "portfolios_write" on public.portfolios
  for all using (auth.uid() = profile_id) with check (auth.uid() = profile_id);

-- system_logs: no policies -> only service_role (which bypasses RLS) can touch it.
