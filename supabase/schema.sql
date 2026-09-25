-- Seenomad Supabase schema for Realtime social feed
-- Run this in the Supabase SQL Editor (Dashboard → SQL → New query)

create extension if not exists "uuid-ossp";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  handle text unique,
  display_name text,
  avatar_url text,
  bio text,
  current_city text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.posts (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete set null,
  author_name text not null default 'Nomad',
  author_handle text not null default '@nomad',
  author_avatar text,
  content text,
  location text,
  vibe text,
  image_url text,
  media jsonb default null,
  poll jsonb default null,
  likes_count int not null default 0,
  comments_count int not null default 0,
  shares_count int not null default 0,
  views_count int not null default 0,
  feed_tab text not null default 'foryou',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists posts_created_at_idx on public.posts (created_at desc);
create index if not exists posts_feed_tab_idx on public.posts (feed_tab, created_at desc);
create index if not exists posts_user_id_idx on public.posts (user_id);

create table if not exists public.comments (
  id uuid primary key default uuid_generate_v4(),
  post_id uuid not null references public.posts(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete set null,
  author_name text not null default 'Nomad',
  author_handle text,
  author_avatar text,
  content text not null,
  created_at timestamptz not null default now()
);

create index if not exists comments_post_id_idx on public.comments (post_id, created_at);

create table if not exists public.likes (
  post_id uuid not null references public.posts(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (post_id, user_id)
);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists posts_set_updated_at on public.posts;
create trigger posts_set_updated_at
  before update on public.posts
  for each row execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, handle, display_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'handle', 'nomad_' || substr(new.id::text, 1, 8)),
    coalesce(new.raw_user_meta_data->>'display_name', new.email),
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.posts enable row level security;
alter table public.comments enable row level security;
alter table public.likes enable row level security;

create policy "Public profiles are viewable by everyone"
  on public.profiles for select using (true);
create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);
create policy "Users can insert own profile"
  on public.profiles for insert with check (auth.uid() = id);

create policy "Anyone can read posts"
  on public.posts for select using (true);
create policy "Authenticated users can insert posts"
  on public.posts for insert
  with check (auth.role() = 'authenticated' or auth.uid() is not null);
create policy "Anon can insert posts (demo)"
  on public.posts for insert with check (true);
create policy "Authors can update own posts"
  on public.posts for update
  using (auth.uid() = user_id or user_id is null);
create policy "Authors can delete own posts"
  on public.posts for delete using (auth.uid() = user_id);

create policy "Anyone can read comments"
  on public.comments for select using (true);
create policy "Anyone can insert comments (demo)"
  on public.comments for insert with check (true);

create policy "Anyone can read likes"
  on public.likes for select using (true);
create policy "Authenticated can like"
  on public.likes for insert with check (auth.uid() = user_id);
create policy "Users can unlike"
  on public.likes for delete using (auth.uid() = user_id);

-- Enable Realtime (also toggle in Dashboard → Database → Replication):
-- alter publication supabase_realtime add table public.posts;

insert into public.posts (author_name, author_handle, author_avatar, content, location, vibe, image_url, likes_count, comments_count, shares_count, views_count, feed_tab)
values
  (
    'Emma Johnson',
    '@emma_nomad',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    'Golden hour on the cliffs of Santorini is unmatched. Found a quiet rooftop cafe with 150 Mbps fiber and zero crowds. If you are heading here this month, hit the alleys before 7 AM! #​Santorini #RemoteWork',
    'Oia, Santorini',
    'Golden Hour',
    'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=900',
    2400, 48, 19, 14200, 'foryou'
  ),
  (
    'Alex Rivera',
    '@alexplorer',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    'Sunrise climb at Mount Fuji 5th station. 3 AM wake up, freezing winds, but watching the morning sun break through the sea of clouds was pure spiritual energy.',
    'Mount Fuji, Japan',
    'Summit Trek',
    'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=900',
    4800, 82, 37, 28000, 'foryou'
  )
on conflict do nothing;
