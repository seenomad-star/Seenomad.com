-- Seenomad core destination and trip-planning schema.
-- Public destination reads are limited to published records. User-owned data is protected by RLS.
-- This helper is intended for the database event trigger, not as a callable Data API RPC.
do $ begin
  if to_regprocedure('public.rls_auto_enable()') is not null then
    revoke execute on function public.rls_auto_enable() from public, anon, authenticated;
  end if;
end $;

alter table public.profiles add column if not exists home_country text;

create table if not exists public.destinations (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  name text not null check (char_length(name) between 1 and 160),
  country text not null,
  region text,
  category text not null default 'Other',
  description text,
  latitude double precision check (latitude is null or latitude between -90 and 90),
  longitude double precision check (longitude is null or longitude between -180 and 180),
  image_url text,
  highlights text[] not null default '{}',
  tags text[] not null default '{}',
  best_time_to_visit text,
  ideal_stay_days smallint check (ideal_stay_days is null or ideal_stay_days between 1 and 90),
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists destinations_published_country_idx
  on public.destinations (country, name) where is_published = true;
create index if not exists destinations_category_published_idx
  on public.destinations (category, name) where is_published = true;
create index if not exists destinations_tags_idx on public.destinations using gin (tags);

create table if not exists public.saved_destinations (
  user_id uuid not null references auth.users(id) on delete cascade,
  destination_id uuid not null references public.destinations(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, destination_id)
);
create index if not exists saved_destinations_destination_idx
  on public.saved_destinations(destination_id);

create table if not exists public.trips (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null check (char_length(title) between 1 and 120),
  start_date date,
  end_date date,
  status text not null default 'draft' check (status in ('draft', 'planned', 'completed', 'cancelled')),
  notes text check (notes is null or char_length(notes) <= 5000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (start_date is null or end_date is null or end_date >= start_date)
);
create index if not exists trips_user_updated_idx on public.trips(user_id, updated_at desc);

create table if not exists public.trip_destinations (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null references public.trips(id) on delete cascade,
  destination_id uuid not null references public.destinations(id) on delete restrict,
  day_number smallint check (day_number is null or day_number between 1 and 90),
  sort_order integer not null default 0,
  notes text check (notes is null or char_length(notes) <= 2000),
  created_at timestamptz not null default now(),
  unique (trip_id, destination_id)
);
create index if not exists trip_destinations_trip_order_idx
  on public.trip_destinations(trip_id, day_number, sort_order);

alter table public.destinations enable row level security;
alter table public.saved_destinations enable row level security;
alter table public.trips enable row level security;
alter table public.trip_destinations enable row level security;

grant select on public.destinations to anon, authenticated;
grant select, insert, delete on public.saved_destinations to authenticated;
grant select, insert, update, delete on public.trips to authenticated;
grant select, insert, update, delete on public.trip_destinations to authenticated;
revoke all on table public.saved_destinations, public.trips, public.trip_destinations from anon;

drop policy if exists "Published destinations are readable" on public.destinations;
create policy "Published destinations are readable"
  on public.destinations for select to anon, authenticated
  using (is_published = true);

drop policy if exists "Users can read their saved destinations" on public.saved_destinations;
create policy "Users can read their saved destinations"
  on public.saved_destinations for select to authenticated
  using ((select auth.uid()) = user_id);
drop policy if exists "Users can save their own destinations" on public.saved_destinations;
create policy "Users can save their own destinations"
  on public.saved_destinations for insert to authenticated
  with check ((select auth.uid()) = user_id);
drop policy if exists "Users can remove their own saved destinations" on public.saved_destinations;
create policy "Users can remove their own saved destinations"
  on public.saved_destinations for delete to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Users can manage their own trips" on public.trips;
create policy "Users can manage their own trips"
  on public.trips for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can read trip destinations for their own trips" on public.trip_destinations;
create policy "Users can read trip destinations for their own trips"
  on public.trip_destinations for select to authenticated
  using (exists (
    select 1 from public.trips t
    where t.id = trip_id and t.user_id = (select auth.uid())
  ));
drop policy if exists "Users can add destinations to their own trips" on public.trip_destinations;
create policy "Users can add destinations to their own trips"
  on public.trip_destinations for insert to authenticated
  with check (exists (
    select 1 from public.trips t
    where t.id = trip_id and t.user_id = (select auth.uid())
  ));
drop policy if exists "Users can update destinations in their own trips" on public.trip_destinations;
create policy "Users can update destinations in their own trips"
  on public.trip_destinations for update to authenticated
  using (exists (
    select 1 from public.trips t
    where t.id = trip_id and t.user_id = (select auth.uid())
  ))
  with check (exists (
    select 1 from public.trips t
    where t.id = trip_id and t.user_id = (select auth.uid())
  ));
drop policy if exists "Users can remove destinations from their own trips" on public.trip_destinations;
create policy "Users can remove destinations from their own trips"
  on public.trip_destinations for delete to authenticated
  using (exists (
    select 1 from public.trips t
    where t.id = trip_id and t.user_id = (select auth.uid())
  ));
