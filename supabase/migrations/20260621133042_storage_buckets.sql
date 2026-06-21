-- =============================================================================
-- Storage buckets + policies
--   avatars   : profile photos
--   portfolio : portfolio item images
--   summary   : freelancer summary gallery
-- All public-read so images render anywhere. Writes restricted to the owner:
-- the first path segment of the object name must equal the user's uid.
-- e.g. "<uid>/<filename>"
-- =============================================================================

insert into storage.buckets (id, name, public)
values
  ('avatars',   'avatars',   true),
  ('portfolio', 'portfolio', true),
  ('summary',   'summary',   true)
on conflict (id) do nothing;

-- Public read for all three buckets
create policy "storage_public_read"
  on storage.objects for select
  using (bucket_id in ('avatars', 'portfolio', 'summary'));

-- Authenticated users may upload into their own "<uid>/..." folder
create policy "storage_owner_insert"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id in ('avatars', 'portfolio', 'summary')
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- Owners may update their own objects
create policy "storage_owner_update"
  on storage.objects for update
  to authenticated
  using (
    bucket_id in ('avatars', 'portfolio', 'summary')
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- Owners may delete their own objects
create policy "storage_owner_delete"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id in ('avatars', 'portfolio', 'summary')
    and (storage.foldername(name))[1] = auth.uid()::text
  );
