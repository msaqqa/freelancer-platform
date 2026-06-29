-- =============================================================================
-- Services: richer payload from the multi-step "Add Service" modal.
--   pricing      : { revisions, addOns[], customAddOns[] }
--   requirements : [{ requirementsDetails, allowAttachments, requireAnswer }]
--   images       : gallery image URLs (column already exists)
-- Plus a services <-> skills join and a dedicated storage bucket.
-- =============================================================================
alter table public.services
  add column if not exists pricing jsonb not null default '{}'::jsonb,
  add column if not exists requirements jsonb not null default '[]'::jsonb;

-- ── Service <-> Skills (many-to-many) ────────────────────────────────────────
create table public.service_skills (
  service_id bigint not null references public.services(id) on delete cascade,
  skill_id   bigint not null references public.skills(id) on delete cascade,
  primary key (service_id, skill_id)
);
create index idx_service_skills_service on public.service_skills(service_id);

alter table public.service_skills enable row level security;

create policy "service_skills_read"
  on public.service_skills for select using (true);

create policy "service_skills_write"
  on public.service_skills for all
  using (
    exists (
      select 1 from public.services s
      where s.id = service_id and s.profile_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.services s
      where s.id = service_id and s.profile_id = auth.uid()
    )
  );

-- ── Storage bucket for service gallery images ────────────────────────────────
insert into storage.buckets (id, name, public)
values ('services', 'services', true)
on conflict (id) do nothing;

create policy "services_public_read"
  on storage.objects for select
  using (bucket_id = 'services');

create policy "services_owner_insert"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'services'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "services_owner_update"
  on storage.objects for update to authenticated
  using (
    bucket_id = 'services'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "services_owner_delete"
  on storage.objects for delete to authenticated
  using (
    bucket_id = 'services'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
