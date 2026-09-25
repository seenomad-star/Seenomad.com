/**
 * Drop-in Realtime bridge for SocialFeed.
 * Import and call useSocialFeedRealtime() inside SocialFeed, then use the returned values.
 *
 * Example:
 *   const rt = useSocialFeedRealtime(INITIAL_POSTS.foryou);
 *   const posts = rt.posts;
 *   <Composer onAddPost={rt.handleAddPost} />
 */
import { useEffect } from 'react';
import { useRealtimeFeed } from './useRealtimeFeed';

export function useSocialFeedRealtime(mockPosts = []) {
  const {
    posts: livePosts,
    loading,
    error,
    realtimeConnected,
    usingMock,
    createPost,
    likePost,
    mergeMocks,
  } = useRealtimeFeed();

  useEffect(() => {
    if (usingMock || !livePosts?.length) {
      mergeMocks(mockPosts);
    }
  }, [usingMock, livePosts, mergeMocks, mockPosts]);

  const handleAddPost = async (draft) => {
    if (!usingMock) {
      return createPost(draft);
    }
    // Caller should still update local state when usingMock
    return draft;
  };

  const posts =
    !usingMock && livePosts?.length
      ? livePosts
      : mockPosts;

  return {
    posts,
    loading,
    error,
    realtimeConnected,
    usingMock,
    handleAddPost,
    likePost,
    createPost,
  };
}

export default useSocialFeedRealtime;
