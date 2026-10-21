# Seenomad authenticated social backend

This change adds the client-side Supabase Auth foundation, a protected-by-RLS database schema, and reusable social data functions. It does not provision a Supabase project or configure production secrets automatically.

## 1. Create or select a Supabase project
1. Open the Supabase dashboard and create a project in the Seenomad organization, or select the existing project you intend to use.
2. Copy the Project URL and **publishable key** from Project Settings / Connect.
3. Do not place a Supabase secret or service-role key in the frontend.

## 2. Apply the schema
Run the SQL in `supabase/migrations/202610220001_authenticated_social.sql` in the project's SQL Editor, after reviewing it. It creates profiles, user posts, reactions, comments, follows, and saved-post tables with row-level security policies. No production database has been modified by this repository PR.

## 3. Configure local development and Vercel
Add these environment variables to the client build environment:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

For local development, create `client/.env.local` (never commit it). For Vercel, add both variables to the relevant project/environment and redeploy. The current app's client is under `client/`, so make sure the variables are available to that Vite build.

## 4. Configure authentication URLs
In Supabase Authentication URL Configuration, set the Site URL to the deployed Seenomad origin and add the local and deployed `/auth` callback/redirect origins as allowed redirect URLs. Enable email/password sign-in and configure email confirmation and SMTP according to the launch requirements.

## 5. Test before launch
- Create a test account and confirm the sign-in / sign-out lifecycle.
- Test profile ownership and ensure a user cannot edit another user's posts, comments, reactions, follows, or saved posts.
- Test unauthenticated reads and rejected writes.
- Run Supabase security and performance advisors after the migration.
- Verify Vercel preview checks, then deploy only after review.

## Current boundary
The existing demo feed and browser-local engagement store are preserved. The new database tables and service functions provide the server-side foundation; existing feed components still need to be switched to these functions in the next integration pass. Until a Supabase project and environment variables are configured, the app continues operating without remote authentication.
