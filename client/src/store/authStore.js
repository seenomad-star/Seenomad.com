/**
 * Supabase Auth + profile store for Seenomad
 * - Session persistence via supabase-js
 * - Loads / upserts public.profiles row
 * - Exposes signUp, signIn, signOut, updateProfile
 */

import { create } from 'zustand';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

/** Map profiles row → UI shape */
function mapProfile(row, user) {
  if (!row && !user) return null;
  return {
    id: row?.id || user?.id,
    email: user?.email || null,
    handle: row?.handle || user?.user_metadata?.handle || null,
    displayName:
      row?.display_name ||
      user?.user_metadata?.display_name ||
      user?.email?.split('@')[0] ||
      'Nomad',
    avatarUrl:
      row?.avatar_url ||
      user?.user_metadata?.avatar_url ||
      `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.id || 'nomad'}`,
    bio: row?.bio || null,
    currentCity: row?.current_city || null,
  };
}

let authListenerUnsub = null;

export const useAuthStore = create((set, get) => ({
  user: null,
  profile: null,
  session: null,
  loading: true,
  error: null,
  configured: isSupabaseConfigured,

  init: async () => {
    if (!isSupabaseConfigured || !supabase) {
      set({ loading: false, configured: false });
      return;
    }

    set({ loading: true, error: null });

    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;

      const session = data.session;
      if (session?.user) {
        await get()._setSession(session);
      } else {
        set({ user: null, profile: null, session: null, loading: false });
      }

      if (authListenerUnsub) authListenerUnsub();
      const { data: sub } = supabase.auth.onAuthStateChange(async (_event, nextSession) => {
        if (nextSession?.user) {
          await get()._setSession(nextSession);
        } else {
          set({ user: null, profile: null, session: null, loading: false });
        }
      });
      authListenerUnsub = () => sub.subscription.unsubscribe();
    } catch (err) {
      console.error('[authStore] init failed', err);
      set({ error: err.message, loading: false });
    }
  },

  _setSession: async (session) => {
    const user = session.user;
    set({ session, user, loading: true });

    try {
      let { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (error) throw error;

      if (!profile) {
        const handle =
          user.user_metadata?.handle ||
          `nomad_${user.id.replace(/-/g, '').slice(0, 8)}`;
        const display_name =
          user.user_metadata?.display_name ||
          user.email?.split('@')[0] ||
          'Nomad';
        const avatar_url =
          user.user_metadata?.avatar_url ||
          `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`;

        const { data: created, error: upsertErr } = await supabase
          .from('profiles')
          .upsert(
            {
              id: user.id,
              handle,
              display_name,
              avatar_url,
            },
            { onConflict: 'id' }
          )
          .select()
          .single();

        if (upsertErr) throw upsertErr;
        profile = created;
      }

      set({
        profile: mapProfile(profile, user),
        loading: false,
        error: null,
      });
    } catch (err) {
      console.error('[authStore] profile load failed', err);
      set({
        profile: mapProfile(null, user),
        loading: false,
        error: err.message,
      });
    }
  },

  signUp: async ({ email, password, handle, displayName }) => {
    if (!supabase) return { error: 'Supabase not configured' };
    set({ error: null, loading: true });

    const cleanHandle = (handle || email.split('@')[0])
      .replace(/[^a-zA-Z0-9_]/g, '')
      .slice(0, 24)
      .toLowerCase();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          handle: cleanHandle,
          display_name: displayName || cleanHandle,
        },
      },
    });

    if (error) {
      set({ error: error.message, loading: false });
      return { error: error.message };
    }

    if (data.session) {
      await get()._setSession(data.session);
    } else {
      set({ loading: false });
    }

    return {
      user: data.user,
      needsEmailConfirmation: !data.session,
    };
  },

  signIn: async ({ email, password }) => {
    if (!supabase) return { error: 'Supabase not configured' };
    set({ error: null, loading: true });

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      set({ error: error.message, loading: false });
      return { error: error.message };
    }

    await get()._setSession(data.session);
    return { user: data.user };
  },

  signOut: async () => {
    if (!supabase) return;
    set({ loading: true });
    await supabase.auth.signOut();
    set({ user: null, profile: null, session: null, loading: false, error: null });
  },

  updateProfile: async (partial) => {
    const { user, profile } = get();
    if (!supabase || !user) return { error: 'Not signed in' };

    const row = {};
    if (partial.handle != null) row.handle = partial.handle;
    if (partial.displayName != null) row.display_name = partial.displayName;
    if (partial.avatarUrl != null) row.avatar_url = partial.avatarUrl;
    if (partial.bio != null) row.bio = partial.bio;
    if (partial.currentCity != null) row.current_city = partial.currentCity;

    const { data, error } = await supabase
      .from('profiles')
      .update(row)
      .eq('id', user.id)
      .select()
      .single();

    if (error) return { error: error.message };

    set({ profile: mapProfile(data, user) });
    return { profile: mapProfile(data, user) };
  },

  getAuthorPayload: () => {
    const { profile, user } = get();
    if (!user) return null;
    return {
      user_id: user.id,
      author_name: profile?.displayName || 'You',
      author_handle: profile?.handle
        ? `@${profile.handle.replace(/^@/, '')}`
        : '@nomad',
      author_avatar:
        profile?.avatarUrl ||
        `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`,
    };
  },

  isAuthenticated: () => Boolean(get().user),
}));
