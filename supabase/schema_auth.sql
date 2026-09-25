-- Seenomad: tighten RLS for Auth + profile-linked posts
-- Run AFTER supabase/schema.sql
-- Goal: only authenticated users can insert posts; user_id must match auth.uid()

drop policy if exists "Anon can insert posts (demo)" on public.posts;
drop policy if exists "Authenticated users can insert posts" on public.posts;

create policy "Authenticated users insert own posts"
  on public.posts for insert
  with check (
    auth.uid() is not null
    and (user_id is null or user_id = auth.uid())
  );

drop policy if exists "Authors can update own posts" on public.posts;
create policy "Authors can update own posts"
  on public.posts for update
  using (auth.uid() = user_id);

drop policy if exists "Authors can delete own posts" on public.posts;
create policy "Authors can delete own posts"
  on public.posts for delete
  using (auth.uid() = user_id);

drop policy if exists "Users can insert own profile" on public.profiles;
create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);
