# Seenomad — Supabase Realtime

This branch adds a production-ready **Supabase Realtime** layer for the Nexus social feed.

## What you get

| Piece | Path | Role |
|-------|------|------|
| Client | `client/src/lib/supabase.js` | Shared Supabase browser client |
| Schema | `supabase/schema.sql` | `posts`, `profiles`, `comments`, `likes` + RLS |
| Store | `client/src/store/feedStore.js` | Zustand store + `postgres_changes` subscription |
| Hook | `client/src/hooks/useRealtimeFeed.js` | Lifecycle helper for React components |
| Env | `client/.env.example` | `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` |

When env vars are missing, the app **falls back to the existing mock feed** so local development keeps working.

## Setup (≈ 10 minutes)

### 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) → New project  
2. Copy **Project URL** and **anon public** key from Settings → API  

### 2. Environment variables

```bash
cd client
cp .env.example .env.local
```

Fill in:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Database schema

In the Supabase Dashboard → **SQL Editor** → paste and run the contents of:

```
supabase/schema.sql
```

### 4. Enable Realtime replication

**Dashboard → Database → Replication** (or Publications):

- Toggle **ON** for table `posts`  
- (Optional) also enable `comments`

Or run:

```sql
alter publication supabase_realtime add table public.posts;
```

### 5. Install dependency & run

```bash
cd client
npm install @supabase/supabase-js
npm run dev
```

Open the home feed. You should see a small **LIVE** indicator when Realtime is connected.

### 6. Test Realtime

Open the app in two browser windows:

1. Create a post from the Composer in window A  
2. It should appear instantly in window B without refresh  

You can also insert a row from the Supabase Table Editor and watch it stream in.

## Security notes

- RLS is enabled. Current policies allow **public read** and **open insert** for easy demos.  
- Before production:  
  - Remove the "Anon can insert posts (demo)" policy  
  - Require `auth.uid()` for inserts  
  - Add rate limits / moderation  

## Presence (optional next step)

Supabase Realtime also supports **Presence** for "who's online / nearby":

```js
const channel = supabase.channel('nomad-presence', {
  config: { presence: { key: userId } },
});
channel.on('presence', { event: 'sync' }, () => {
  const state = channel.presenceState();
  // update Flash Meetups sidebar
});
await channel.subscribe(async (status) => {
  if (status === 'SUBSCRIBED') {
    await channel.track({ city: 'Bali', activity: 'Coding' });
  }
});
```

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| `usingMock: true` always | Check `.env.local` and restart Vite |
| Posts load but no live updates | Enable Realtime on `posts` in Replication |
| RLS errors on insert | Confirm policies in schema.sql were applied |
| CORS / network errors | Confirm Project URL is correct |

## Files added by this PR

```
client/.env.example
client/src/lib/supabase.js
client/src/store/feedStore.js
client/src/hooks/useRealtimeFeed.js
supabase/schema.sql
docs/SUPABASE_REALTIME.md
```

Also updates `client/package.json` to include `@supabase/supabase-js`.
