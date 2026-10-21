import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Browser-local engagement state for the prototype feed.
 * This is intentionally device-local; server-side social sync requires an authenticated backend.
 */
export const useSocialEngagementStore = create(
  persist(
    (set) => ({
      reactions: {},
      likeDeltas: {},
      reposts: {},
      repostDeltas: {},
      bookmarks: {},
      commentsByPost: {},

      setReaction: (postId, nextReaction, fallbackReaction = null) => set((state) => {
        const hasStoredReaction = Object.prototype.hasOwnProperty.call(state.reactions, postId);
        const previousReaction = hasStoredReaction ? state.reactions[postId] : fallbackReaction;
        if (previousReaction === nextReaction) return state;

        const deltaChange = Number(Boolean(nextReaction)) - Number(Boolean(previousReaction));
        return {
          reactions: { ...state.reactions, [postId]: nextReaction },
          likeDeltas: {
            ...state.likeDeltas,
            [postId]: (state.likeDeltas[postId] || 0) + deltaChange
          }
        };
      }),

      setReposted: (postId, nextReposted, fallbackReposted = false) => set((state) => {
        const hasStoredRepost = Object.prototype.hasOwnProperty.call(state.reposts, postId);
        const previousReposted = hasStoredRepost ? state.reposts[postId] : fallbackReposted;
        if (previousReposted === nextReposted) return state;

        const deltaChange = Number(Boolean(nextReposted)) - Number(Boolean(previousReposted));
        return {
          reposts: { ...state.reposts, [postId]: nextReposted },
          repostDeltas: {
            ...state.repostDeltas,
            [postId]: (state.repostDeltas[postId] || 0) + deltaChange
          }
        };
      }),

      setBookmark: (postId, bookmarked) => set((state) => ({
        bookmarks: { ...state.bookmarks, [postId]: Boolean(bookmarked) }
      })),

      replaceComments: (postId, comments) => set((state) => ({
        commentsByPost: { ...state.commentsByPost, [postId]: comments }
      })),

      toggleBookmark: (postId, fallbackBookmarked = false) => {
        let nextBookmarked = false;
        set((state) => {
          const hasStoredBookmark = Object.prototype.hasOwnProperty.call(state.bookmarks, postId);
          const previousBookmarked = hasStoredBookmark ? state.bookmarks[postId] : fallbackBookmarked;
          nextBookmarked = !previousBookmarked;
          return { bookmarks: { ...state.bookmarks, [postId]: nextBookmarked } };
        });
        return nextBookmarked;
      },

      addComment: (postId, comment) => set((state) => ({
        commentsByPost: {
          ...state.commentsByPost,
          [postId]: [...(state.commentsByPost[postId] || []), comment]
        }
      }))
    }),
    {
      name: 'seenomad-social-engagement-v1',
      version: 1,
      partialize: (state) => ({
        reactions: state.reactions,
        likeDeltas: state.likeDeltas,
        reposts: state.reposts,
        repostDeltas: state.repostDeltas,
        bookmarks: state.bookmarks,
        commentsByPost: state.commentsByPost
      })
    }
  )
);

export default useSocialEngagementStore;
