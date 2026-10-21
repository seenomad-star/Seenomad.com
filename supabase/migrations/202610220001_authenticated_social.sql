-- Seenomad authenticated social foundation.
-- Apply only after reviewing in a Supabase project; all exposed tables use RLS.
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique,
  display_name text not null default 'Traveler',
  avatar_url text,
  bio text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profiles_username_length check (username is null or char_length(username) between 3 and 30)
);

create table if not exists public.social_posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references auth.users(id) on delete cascade,
  content text not null default '',
  location text,
  feeling text,
  media_urls text[] not null default '{}',
  post_type text not null default 'standard' check (post_type in ('standard', 'carousel', 'video', 'poll')),
  metadata jsonb not null default '{}'::jsonb,
  visibility text not null default 'public' check (visibility in ('public', 'followers')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint social_posts_content_or_media check (char_length(trim(content)) > 0 or cardinality(media_urls) > 0)
);

-- post_key supports both database posts and the existing demo feed's stable string IDs.
create table if not exists public.social_reactions (
  id uuid primary key default gen_random_uuid(),
  post_key text not null,
  user_id uuid not null references auth.users(id) on delete cascade,
  reaction text not null check (reaction in ('like', 'love', 'care', 'haha', 'wow', 'sad')),
  created_at timestamptz not null default now(),
  unique (post_key, user_id)
);

create table if not exists public.social_comments (
  id uuid primary key default gen_random_uuid(),
  post_key text not null,
  author_id uuid not null references auth.users(id) on delete cascade,
  content text not null check (char_length(trim(content)) between 1 and 2000),
  created_at timestamptz not null default now()
);

create table if not exists public.social_follows (
  follower_id uuid not null references auth.users(id) on delete cascade,
  following_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (follower_id, following_id),
  constraint social_follows_no_self_follow check (follower_id <> following_id)
);

create table if not exists public.social_saved_posts (
  user_id uuid not null references auth.users(id) on delete cascade,
  post_key text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, post_key)
);

create index if not exists social_posts_author_created_idx on public.social_posts (author_id, created_at desc);
create index if not exists social_posts_created_idx on public.social_posts (created_at desc);
create index if not exists social_reactions_post_idx on public.social_reactions (post_key);
create index if not exists social_comments_post_created_idx on public.social_comments (post_key, created_at asc);
create index if not exists social_follows_following_idx on public.social_follows (following_id);

alter table public.profiles enable row level security;
alter table public.social_posts enable row level security;
alter table public.social_reactions enable row level security;
alter table public.social_comments enable row level security;
alter table public.social_follows enable row level security;
alter table public.social_saved_posts enable row level security;

drop policy if exists "Public profiles are readable" on public.profiles;
create policy "Public profiles are readable" on public.profiles for select to anon, authenticated using (true);
drop policy if exists "Users create their own profile" on public.profiles;
create policy "Users create their own profile" on public.profiles for insert to authenticated with check ((select auth.uid()) = id);
drop policy if exists "Users update their own profile" on public.profiles;
create policy "Users update their own profile" on public.profiles for update to authenticated using ((select auth.uid()) = id) with check ((select auth.uid()) = id);

drop policy if exists "Public posts are readable" on public.social_posts;
create policy "Public posts are readable" on public.social_posts for select to anon, authenticated using (visibility = 'public' or (select auth.uid()) = author_id);
drop policy if exists "Authenticated users create own posts" on public.social_posts;
create policy "Authenticated users create own posts" on public.social_posts for insert to authenticated with check ((select auth.uid()) = author_id);
drop policy if exists "Authors update own posts" on public.social_posts;
create policy "Authors update own posts" on public.social_posts for update to authenticated using ((select auth.uid()) = author_id) with check ((select auth.uid()) = author_id);
drop policy if exists "Authors delete own posts" on public.social_posts;
create policy "Authors delete own posts" on public.social_posts for delete to authenticated using ((select auth.uid()) = author_id);

drop policy if exists "Reactions are publicly readable" on public.social_reactions;
create policy "Reactions are publicly readable" on public.social_reactions for select to anon, authenticated using (true);
drop policy if exists "Users create own reactions" on public.social_reactions;
create policy "Users create own reactions" on public.social_reactions for insert to authenticated with check ((select auth.uid()) = user_id);
drop policy if exists "Users update own reactions" on public.social_reactions;
create policy "Users update own reactions" on public.social_reactions for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
drop policy if exists "Users remove own reactions" on public.social_reactions;
create policy "Users remove own reactions" on public.social_reactions for delete to authenticated using ((select auth.uid()) = user_id);

drop policy if exists "Comments are publicly readable" on public.social_comments;
create policy "Comments are publicly readable" on public.social_comments for select to anon, authenticated using (true);
drop policy if exists "Signed-in users create own comments" on public.social_comments;
create policy "Signed-in users create own comments" on public.social_comments for insert to authenticated with check ((select auth.uid()) = author_id);
drop policy if exists "Users remove own comments" on public.social_comments;
create policy "Users remove own comments" on public.social_comments for delete to authenticated using ((select auth.uid()) = author_id);

drop policy if exists "Follows are publicly readable" on public.social_follows;
create policy "Follows are publicly readable" on public.social_follows for select to anon, authenticated using (true);
drop policy if exists "Users follow as themselves" on public.social_follows;
create policy "Users follow as themselves" on public.social_follows for insert to authenticated with check ((select auth.uid()) = follower_id and follower_id <> following_id);
drop policy if exists "Users unfollow as themselves" on public.social_follows;
create policy "Users unfollow as themselves" on public.social_follows for delete to authenticated using ((select auth.uid()) = follower_id);

drop policy if exists "Users read their own saved posts" on public.social_saved_posts;
create policy "Users read their own saved posts" on public.social_saved_posts for select to authenticated using ((select auth.uid()) = user_id);
drop policy if exists "Users save posts for themselves" on public.social_saved_posts;
create policy "Users save posts for themselves" on public.social_saved_posts for insert to authenticated with check ((select auth.uid()) = user_id);
drop policy if exists "Users unsave their own posts" on public.social_saved_posts;
create policy "Users unsave their own posts" on public.social_saved_posts for delete to authenticated using ((select auth.uid()) = user_id);

grant select on public.profiles to anon, authenticated;
grant insert, update on public.profiles to authenticated;
grant select on public.social_posts to anon, authenticated;
grant insert, update, delete on public.social_posts to authenticated;
grant select on public.social_reactions to anon, authenticated;
grant insert, update, delete on public.social_reactions to authenticated;
grant select on public.social_comments to anon, authenticated;
grant insert, delete on public.social_comments to authenticated;
grant select on public.social_follows to anon, authenticated;
grant insert, delete on public.social_follows to authenticated;
grant select, insert, delete on public.social_saved_posts to authenticated;
