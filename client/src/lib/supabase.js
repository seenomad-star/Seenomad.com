/**
 * Supabase client for Seenomad
 * Realtime-enabled client used by the social feed, presence, and notifications.
 *
 * Setup:
 * 1. Create a project at https://supabase.com
 * 2. Copy Project URL + anon key into client/.env.local
 * 3. Run the SQL in supabase/schema.sql in the Supabase SQL editor
 * 4. Enable Realtime for the `posts` table (Database → Replication)
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/** True when env vars are present and client can talk to Supabase */
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured && import.meta.env.DEV) {
  console.info(
    '[Seenomad] Supabase not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local to enable Realtime.'
  );
}

/**
 * Singleton browser client.
 * Uses the public anon key; RLS policies must protect write access.
 */
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
      realtime: {
        params: {
          eventsPerSecond: 10,
        },
      },
    })
  : null;

export default supabase;
