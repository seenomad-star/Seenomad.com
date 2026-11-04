# Posts, Photos, Videos & Reels

**Priority:** P0 for posts/media; P1 for stories/reels lifecycle.  
**Status:** UI surfaces and initial post backend exist; media and short-form content persistence incomplete.

## Existing V4 surfaces
- Home SocialFeed with composer, post cards, story rail, shorts shelf/feed, live feed and travel filters.
- Community Travel Feed, Reels, Stories, Blogs and Post Composer.
- NewVibeModal supports upload/record/library-oriented media composition and location/license metadata.
- Supabase social backend publishes and lists basic posts.

**Source paths:** `client/src/features/SocialFeed/`, `client/src/features/Social/`, `client/src/features/Community/components/`, `client/src/lib/socialBackend.js`, `public.social_posts`.

## Required behavior
- Create, edit, delete, draft and publish text, single-image, carousel, video/reel and travel-blog content.
- Attach canonical destination/location, trip context, tags, alt text, captions, content warnings and licensing/attribution metadata.
- Upload progress, validation, retry, transcoding/thumbnail generation and safe media playback.
- Visibility and comment controls per post; report and takedown states.
- Stories have expiry, audience, view tracking and archive rules; reels have duration, poster, playback and discovery metadata.
- Pagination/cursor loading, duplicate-submit protection and stable deep links.

## Storage design
Use private-by-default upload staging and validated object paths. Define separate policies for public approved media and private/follower/group content. Enforce file size, MIME/type, dimensions/duration and ownership. Store object path, checksum, media type, dimensions, duration, alt text, license and processing state in relational media records. Do not store browser blob URLs as permanent media URLs.

## Existing schema gap
`social_posts` currently has text, location text, feeling, `media_urls text[]`, post_type (standard/carousel/video/poll), metadata JSONB and public/followers visibility. It has no normalized media asset table, stories table, reels-specific lifecycle, destination foreign key, draft state, comment permissions or scheduled publishing. Current followers visibility is not implemented correctly by its SELECT policy (see backend-security spec).

## Acceptance criteria
- Authenticated author can create/update/delete only their own posts.
- Invalid or oversized media is rejected server-side; unauthorized object paths cannot be read or overwritten.
- Public, follower-only and group-only content obey identical rules in feed, permalink, search, media URL and comment APIs.
- Stories expire at the defined server timestamp and cannot be resurrected by client clock changes.
- Reels play accessibly with captions/alt text, reduced-motion handling and stable loading/error states.
- Content is discoverable by destination without duplicating destination records.
