-- =============================================================================
-- Portfolio: store the project's ordered content (alternating text / image
-- blocks) and a dedicated cover image.
--   content_blocks : [{ "type": "text", "value": "..." },
--                     { "type": "image", "url": "https://..." }, ...]
--   cover_url      : thumbnail shown in the portfolio grid
-- `images` (already present) keeps a flat list of the block image URLs.
-- =============================================================================
alter table public.portfolios
  add column if not exists content_blocks jsonb not null default '[]'::jsonb,
  add column if not exists cover_url text;
