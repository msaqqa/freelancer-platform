-- Freelancer work-experience entries (mirrors the educations table pattern).
create table public.experiences (
  id              bigint generated always as identity primary key,
  profile_id      uuid not null references public.profiles(id) on delete cascade,
  title           text,
  company         text,
  location        text,
  employment_type text,
  start_date      date,
  end_date        date,
  description     text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create trigger trg_experiences_updated before update on public.experiences
  for each row execute function public.set_updated_at();

create index idx_experiences_profile on public.experiences(profile_id);

alter table public.experiences enable row level security;

create policy "experiences_read"  on public.experiences for select using (true);
create policy "experiences_write" on public.experiences
  for all using (auth.uid() = profile_id) with check (auth.uid() = profile_id);
