-- Make saved destinations and trip stops idempotent.
-- Duplicate checks were run against the current database before adding these indexes.
create unique index if not exists saved_destinations_user_destination_unique
  on public.saved_destinations (user_id, destination_id);

create unique index if not exists trip_destinations_trip_destination_unique
  on public.trip_destinations (trip_id, destination_id);

create index if not exists trips_user_updated_idx
  on public.trips (user_id, updated_at desc);

create index if not exists trip_destinations_trip_order_idx
  on public.trip_destinations (trip_id, day_number, sort_order);

-- RLS must remain enabled for every exposed user-owned table.
alter table public.saved_destinations enable row level security;
alter table public.trips enable row level security;
alter table public.trip_destinations enable row level security;
