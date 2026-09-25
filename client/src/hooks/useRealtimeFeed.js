/**
 * Hook that boots the Realtime feed store and cleans up on unmount.
 * Use inside SocialFeed (or any feed page).
 */

import { useEffect } from 'react';
import { useFeedStore } from '../store/feedStore';

export function useRealtimeFeed() {
  const init = useFeedStore((s) => s.init);
  const unsubscribeRealtime = useFeedStore((s) => s.unsubscribeRealtime);
  const posts = useFeedStore((s) => s.posts);
  const loading = useFeedStore((s) => s.loading);
  const error = useFeedStore((s) => s.error);
  const realtimeConnected = useFeedStore((s) => s.realtimeConnected);
  const usingMock = useFeedStore((s) => s.usingMock);
  const createPost = useFeedStore((s) => s.createPost);
  const likePost = useFeedStore((s) => s.likePost);
  const mergeMocks = useFeedStore((s) => s.mergeMocks);

  useEffect(() => {
    init();
    return () => {
      unsubscribeRealtime();
    };
  }, [init, unsubscribeRealtime]);

  return {
    posts,
    loading,
    error,
    realtimeConnected,
    usingMock,
    createPost,
    likePost,
    mergeMocks,
  };
}

export default useRealtimeFeed;
