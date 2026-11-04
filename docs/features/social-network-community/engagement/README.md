# Likes, Comments, Shares & Bookmarks

**Priority:** P0  
**Status:** Initial backend exists for reactions/comments/saved posts; feed engagement remains partly browser-local.

## Existing implementation
- `social_reactions`, `social_comments`, `social_saved_posts` tables and RLS policies.
- `client/src/lib/socialBackend.js` exposes reaction, comment and saved-post operations.
- `client/src/store/socialEngagementStore.js` persists reactions, reposts, bookmarks and comments in browser-local Zustand storage.
- Feed components render engagement controls.

## Required behavior
- Like/reaction toggle with optimistic UI and rollback on failure.
- Comment create/read/delete with pagination, validation, parent visibility inheritance, edit window and moderation state.
- Share via internal permalink, native share sheet and copy-link fallback; record shares only where consent/product analytics require.
- Bookmarks are private to the owner and sync across devices.
- Counts are accurate, resilient to retries and not trusted from client-supplied values.
- Reposts/reshare attribution, quote-post rules and deduplication.
- Rate limits and abuse controls for repeated interactions.

## Critical gaps
- Browser-local store is not cross-device persistence.
- Reaction SELECT policy allows users to read only their own reactions; public totals need a safe aggregate mechanism.
- Comment SELECT currently permits all comments, even if their parent post is not visible to the reader.
- `post_key` is not a foreign key to a canonical post; interaction integrity needs to be enforced.
- Existing migration does not include repost/share records or per-post comment controls.

## Acceptance criteria
- Duplicate likes/retries do not create duplicate rows.
- User can see their own reaction state and permitted aggregate counts without exposing private interaction data.
- Comments inherit the post's audience and are inaccessible when the parent post is inaccessible.
- Bookmark state is private, user-scoped and persists across devices.
- Failed writes restore the previous UI state and show actionable feedback.
