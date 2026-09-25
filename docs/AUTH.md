# Seenomad — Supabase Auth + profile-linked posts

## What this adds

| Piece | Path |
|-------|------|
| Auth store | `client/src/store/authStore.js` |
| Auth provider | `client/src/contexts/AuthProvider.jsx` |
| Sign-in / Sign-up modal | `client/src/features/Auth/AuthModal.jsx` |
| Navbar control | `client/src/features/Auth/AuthButton.jsx` |
| Stricter RLS | `supabase/schema_auth.sql` |
| Feed posts use `user_id` | `client/src/store/feedStore.js` |

## Flow

1. User signs up / signs in via `AuthModal` (email + password).
2. `auth.users` row is created; trigger `handle_new_user` inserts `public.profiles`.
3. `authStore` loads the profile and exposes `getAuthorPayload()`.
4. When posting, `feedStore.createPost` sets:
   - `user_id` = `auth.uid()`
   - `author_name` / `author_handle` / `author_avatar` from profile
5. After `schema_auth.sql`, only authenticated users can insert posts, and only for their own `user_id`.

## Setup

1. Complete the Realtime setup in `docs/SUPABASE_REALTIME.md`.
2. In Supabase → **Authentication → Providers**, ensure **Email** is enabled.
3. (Optional) disable “Confirm email” under Auth settings for faster local testing.
4. Run `supabase/schema_auth.sql` in the SQL Editor (tightens RLS).
5. Restart Vite after `.env.local` is set.

```bash
cd client
npm install
npm run dev
```

## UX

- **Sign in** button appears in the top nav (`AuthButton`).
- After sign-in, avatar + name show; Log out is available.
- Composer posts without a session are rejected when Supabase is configured.
- Mock mode (no env keys) still allows local-only posts.

## Profile fields

| DB column | UI |
|-----------|-----|
| `handle` | `@handle` on posts |
| `display_name` | Author name |
| `avatar_url` | Avatar |
| `bio` | Ready for profile page |
| `current_city` | Ready for presence / nearby |

Update via `useAuthStore.getState().updateProfile({ displayName, handle, avatarUrl, bio, currentCity })`.

## Security checklist before production

- [ ] Run `schema_auth.sql` (drop anon insert policy)
- [ ] Enable email confirmation
- [ ] Review rate limits in Supabase Auth
- [ ] Add moderation for posts
- [ ] Restrict site URL in Supabase Auth settings
