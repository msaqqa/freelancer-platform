-- =============================================================================
-- Portfolio <-> Skills (many-to-many). Lets each project be tagged with skills
-- pulled from the shared `skills` table.
-- =============================================================================
create table public.portfolio_skills (
  portfolio_id bigint not null references public.portfolios(id) on delete cascade,
  skill_id     bigint not null references public.skills(id) on delete cascade,
  primary key (portfolio_id, skill_id)
);

create index idx_portfolio_skills_portfolio
  on public.portfolio_skills(portfolio_id);

alter table public.portfolio_skills enable row level security;

-- Public read (portfolios are shareable).
create policy "portfolio_skills_read"
  on public.portfolio_skills for select using (true);

-- Owner-only write: the parent portfolio must belong to the current user.
create policy "portfolio_skills_write"
  on public.portfolio_skills for all
  using (
    exists (
      select 1 from public.portfolios p
      where p.id = portfolio_id and p.profile_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.portfolios p
      where p.id = portfolio_id and p.profile_id = auth.uid()
    )
  );
