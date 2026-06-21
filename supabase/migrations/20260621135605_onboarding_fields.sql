-- =============================================================================
-- Extra columns the onboarding "required data" forms collect.
--   profiles : gender, birth_date (freelancer) + bio, website (client)
--   freelancer_about : available (open to hire toggle)
-- =============================================================================

alter table public.profiles
  add column if not exists gender     text,
  add column if not exists birth_date date,
  add column if not exists bio        text,
  add column if not exists website    text;

alter table public.freelancer_about
  add column if not exists available boolean not null default true;
