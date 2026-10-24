# Supabase setup for Seenomad

The React/Vite client already depends on `@supabase/supabase-js` and has:
- `src/lib/supabaseClient.js` — environment-based browser client
- `src/contexts/AuthContext.jsx` — session restore, sign-in, sign-up, sign-out

## 1. Configure environment variables

Copy `.env.example` to `.env.local` in the `client/` directory and set:
- `VITE_SUPABASE_URL`: Project URL from Supabase → Project Settings → API
- `VITE_SUPABASE_PUBLISHABLE_KEY`: publishable key from Supabase → Project Settings → API Keys

Set the same variables in Vercel Project Settings → Environment Variables. Redeploy after saving.
Only use a publishable key in browser code. Never expose a service-role or secret key through a `VITE_*` variable.

## 2. Auth configuration

In Supabase → Authentication → URL Configuration:
- Set Site URL to `https://seenomad.com`
- Add `https://seenomad.com/**` only if using wildcard redirect URLs is appropriate; otherwise add the exact callback URLs used by the app.
- Add local development callback URLs explicitly when needed.
- Configure email confirmation and SMTP according to the desired account signup experience.

## 3. Database, RLS, Storage, and Realtime

Do not apply a generic schema until the existing project schema has been inspected. Keep user-owned rows protected by Row Level Security. For Storage, create dedicated buckets and policies appropriate to each asset type; do not make private user uploads public. Enable Realtime only for tables that actually need live updates and only after verifying their RLS policies.

## 4. Verification checklist

- Verify client configuration without exposing credentials.
- Test sign-up, sign-in, session restore, and sign-out using a test account.
- Verify anonymous users cannot read or modify private rows.
- Verify a user cannot read/update another user's rows.
- Upload/download a test file under the intended Storage policy.
- Subscribe/unsubscribe to a Realtime channel and confirm authorized updates only.
- Run Supabase Database Advisors and resolve security findings.

## Current limitation

The source repository contains the client/auth scaffold, but this setup guide does not claim the production Supabase project has been configured. Before database migrations or bucket/policy changes are applied, connect the existing Supabase project so its current schema and policies can be inspected safely.
