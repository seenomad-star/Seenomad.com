/**
 * Realtime Nexus Feed store (Zustand)
 * - Loads posts from Supabase when configured
 * - Subscribes to postgres_changes on `posts` for INSERT / UPDATE / DELETE
 * - Falls back to local mock data when Supabase is not configured
 */

import { create } from 'zustand';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

/** Map DB row → UI post shape used by SocialFeed / Post components */
export function mapRowToPost(row) {
  if (!row) return null;
  return {
    id: row.id,
    author: {
      name: row.author_name || 'Nomad',
      handle: row.author_handle || '@nomad',
      avatar: row.author_avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + (row.id || 'nomad'),
      verified: Boolean(row.user_id),
    },
    time: formatRelativeTime(row.created_at),
    createdAt: row.created_at,
    location: row.location || null,
    vibe: row.vibe || null,
    content: row.content || '',
    image: row.image_url || null,
    media: row.media || (row.image_url ? { type: 'image', url: row.image_url } : null),
    poll: row.poll || null,
    likes: formatCount(row.likes_count),
    likesCount: row.likes_count ?? 0,
    comments: row.comments_count ?? 0,
    shares: row.shares_count ?? 0,
    views: formatCount(row.views_count),
    feedTab: row.feed_tab || 'foryou',
  };
}

function formatCount(n) {
  if (n == null) return '0';
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
  return String(n);
}

function formatRelativeTime(iso) {
  if (!iso) return 'Just now';
  const diff = Date.now() - new Date(iso).getTime();
  const sec = Math.floor(diff / 1000);
  if (sec < 60) return 'Just now';
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const days = Math.floor(hr / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(iso).toLocaleDateString();
}

let realtimeChannel = null;

export const useFeedStore = create((set, get) => ({
  posts: [],
  loading: false,
  error: null,
  realtimeConnected: false,
  usingMock: !isSupabaseConfigured,

  /** Initial load + start Realtime subscription */
  init: async () => {
    if (!isSupabaseConfigured || !supabase) {
      set({ usingMock: true, loading: false });
      return;
    }

    set({ loading: true, error: null, usingMock: false });

    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;

      set({
        posts: (data || []).map(mapRowToPost),
        loading: false,
      });

      get().subscribeRealtime();
    } catch (err) {
      console.error('[feedStore] load failed', err);
      set({
        error: err.message || 'Failed to load feed',
        loading: false,
        usingMock: true,
      });
    }
  },

  subscribeRealtime: () => {
    if (!supabase || realtimeChannel) return;

    realtimeChannel = supabase
      .channel('seenomad-posts')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'posts' },
        (payload) => {
          const post = mapRowToPost(payload.new);
          if (!post) return;
          set((state) => {
            if (state.posts.some((p) => p.id === post.id)) {
              return {
                posts: state.posts.map((p) => (p.id === post.id ? post : p)),
              };
            }
            return { posts: [post, ...state.posts] };
          });
        }
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'posts' },
        (payload) => {
          const post = mapRowToPost(payload.new);
          if (!post) return;
          set((state) => ({
            posts: state.posts.map((p) => (p.id === post.id ? post : p)),
          }));
        }
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'posts' },
        (payload) => {
          const id = payload.old?.id;
          if (!id) return;
          set((state) => ({
            posts: state.posts.filter((p) => p.id !== id),
          }));
        }
      )
      .subscribe((status) => {
        set({ realtimeConnected: status === 'SUBSCRIBED' });
        if (status === 'SUBSCRIBED') {
          console.info('[Seenomad] Realtime connected to posts');
        }
      });
  },

  unsubscribeRealtime: () => {
    if (realtimeChannel && supabase) {
      supabase.removeChannel(realtimeChannel);
      realtimeChannel = null;
      set({ realtimeConnected: false });
    }
  },

  createPost: async (draft) => {
    const tempId = `temp-${Date.now()}`;
    const optimistic = {
      id: tempId,
      author: draft.author || {
        name: 'You',
        handle: '@your_journey',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
        verified: true,
      },
      time: 'Just now',
      createdAt: new Date().toISOString(),
      location: draft.location || null,
      vibe: draft.vibe || null,
      content: draft.content || '',
      image: draft.image || draft.media?.url || null,
      media: draft.media || null,
      poll: draft.poll || null,
      likes: '0',
      likesCount: 0,
      comments: 0,
      shares: 0,
      views: '0',
      feedTab: draft.feedTab || 'foryou',
    };

    set((state) => ({ posts: [optimistic, ...state.posts] }));

    if (!isSupabaseConfigured || !supabase) {
      return optimistic;
    }

    const row = {
      author_name: optimistic.author.name,
      author_handle: optimistic.author.handle,
      author_avatar: optimistic.author.avatar,
      content: optimistic.content,
      location: optimistic.location,
      vibe: optimistic.vibe,
      image_url: optimistic.image,
      media: optimistic.media,
      poll: optimistic.poll,
      feed_tab: optimistic.feedTab,
    };

    const { data, error } = await supabase.from('posts').insert(row).select().single();

    if (error) {
      console.error('[feedStore] insert failed', error);
      set({ error: error.message });
      return optimistic;
    }

    const serverPost = mapRowToPost(data);
    set((state) => ({
      posts: state.posts.map((p) => (p.id === tempId ? serverPost : p)),
    }));
    return serverPost;
  },

  likePost: async (postId) => {
    set((state) => ({
      posts: state.posts.map((p) => {
        if (p.id !== postId) return p;
        const next = (p.likesCount || 0) + 1;
        return { ...p, likesCount: next, likes: formatCount(next) };
      }),
    }));

    if (!isSupabaseConfigured || !supabase || String(postId).startsWith('temp-')) return;

    const post = get().posts.find((p) => p.id === postId);
    if (!post) return;

    await supabase
      .from('posts')
      .update({ likes_count: post.likesCount })
      .eq('id', postId);
  },

  setPosts: (posts) => set({ posts }),

  mergeMocks: (mockPosts) => {
    set((state) => {
      if (state.posts.length > 0) return state;
      return { posts: mockPosts, usingMock: true };
    });
  },
}));
