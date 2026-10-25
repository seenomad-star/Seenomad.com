-- Stable external IDs allow repeatable, idempotent imports from Seenomad's bundled catalogue.
alter table public.destinations
  add column if not exists external_id text;

create unique index if not exists destinations_external_id_unique_idx
  on public.destinations (external_id)
  where external_id is not null;
