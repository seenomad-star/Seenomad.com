# Social Network & Community — Module Specification

**Module ID:** SOC-01  
**Status:** Documentation baseline complete; implementation audit in progress  
**Priority:** P0 foundation / P1 expansion  
**Scope:** Profiles, feed publishing, media, engagement, social graph, groups, messaging, notifications, creator tools, trust & safety, backend and security.

## 1. Product objective

Make Seenomad the trusted social layer for travel: travelers discover people and places, share useful first-hand travel knowledge, build relationships, coordinate journeys, and participate in destination communities. Social content must connect to Explore, destination records, saved items, and trip planning rather than becoming an isolated generic feed.

## 2. Existing V4 code locations (repository inspection)

| Area | Existing source | Evidence/status |
|---|---|---|
| Main feed | `client/src/features/SocialFeed/` | Feed, story rail, composer, posts, shorts shelf, live feed and destination-oriented widgets exist in source. Demo/sample data remains present. |
| Social surfaces | `client/src/features/Social/` | NewVibeModal, NomadShortsFeed, NomadEventsHub, NomadSparks and related components exist. |
| Community | `client/src/features/Community/` | Community routes/components include feed, reels, stories, blogs, profiles, groups, messaging, collaboration board, meetups and composer. |
| User profile | `client/src/features/UserHub/` | NomadProfile, edit profile, activity, reputation and saved-vibe components exist. |
| Creator | `client/src/features/CreatorStudio/` | Creator Studio entry point and creator components exist. |
| Notifications | `client/src/features/Notifications/` | NotificationCenter exists, but the inspected implementation uses an in-file static notification array and component state. |
| Auth | `client/src/contexts/AuthContext.jsx`, `client/src/lib/supabaseClient.js` | Supabase Auth provider and Vite environment-based client exist. |
| Social backend | `client/src/lib/socialBackend.js` | Supabase functions exist for posts, reactions, comments, saved posts and follows. |
| Database | `supabase/migrations/202610220001_authenticated_social.sql` | Initial profiles/posts/reactions/comments/follows/saved-post schema with RLS exists. |

These are repository-presence findings, not proof that every screen is reachable, functional, production-configured, or fully integrated. The current route table in `client/src/App.jsx` places the feed at `/`, Community at `/community/*`, messaging under the User Hub, and notification/profile routes under the User Hub. Verify route guards and actual navigation during implementation QA.

## 3. Scope and feature-owned documentation

| Feature | Specification |
|---|---|
| Profiles & account privacy | [profiles/README.md](profiles/README.md) |
| Posts, photos, video & reels | [publishing/README.md](publishing/README.md) |
| Likes, comments, shares & bookmarks | [engagement/README.md](engagement/README.md) |
| Followers, following & communities | [social-graph-communities/README.md](social-graph-communities/README.md) |
| Messaging & notifications | [messaging-notifications/README.md](messaging-notifications/README.md) |
| Creator accounts & publishing | [creator-tools/README.md](creator-tools/README.md) |
| Moderation, reporting, blocking & privacy | [trust-safety/README.md](trust-safety/README.md) |
| Auth, database, realtime, storage & RLS | [backend-security/README.md](backend-security/README.md) |

## 4. Integration map

- **Explore:** posts, profiles and groups link to canonical destination IDs; destination pages surface relevant community content.
- **Saved & Trip Planning:** users can save posts/places into collections or a trip; trip collaboration must not be conflated with public group membership.
- **User Hub:** profile, privacy settings, messages, notifications, creator tools and saved content are accessible from the account area.
- **Navigation shell:** feed, community, create, inbox and notifications entry points must be consistent across desktop and mobile.
- **Creator ecosystem:** creator content remains discoverable through the same feed and search index; creator status adds capabilities, not a separate identity.

## 5. Architecture principles

1. Supabase Auth owns identity; `profiles.id` references `auth.users.id`.
2. All user-generated content has an explicit author, visibility, lifecycle state and timestamps.
3. Every exposed table has RLS enabled and least-privilege grants. Policies enforce ownership, audience and relationship rules.
4. Public, followers-only, private and group-only access are distinct; UI hiding is never an authorization boundary.
5. Media objects live in controlled Storage buckets; database rows store object paths and metadata, not arbitrary unvalidated public URLs.
6. Realtime is enabled only for use cases requiring it and only after access policies are tested.
7. Mutations are idempotent where possible; counts are derived from authoritative rows or maintained transactionally.
8. Preserve existing UI and sample experiences while migrating feature-by-feature to persistent data. Do not delete or replace existing functionality as part of this documentation task.

## 6. Current backend baseline and material gaps

The existing migration creates `profiles`, `social_posts`, `social_reactions`, `social_comments`, `social_follows`, and `social_saved_posts`. It enables RLS and defines policies. The client service includes operations for publishing/listing posts, personal reactions, comments, saved posts and follows.

Important gaps found in the inspected baseline:
- Profiles have no private-account field or field-level visibility model; profile SELECT is public.
- Post visibility includes `public` and `followers`, but the current SELECT policy only exposes public posts or the author's own posts. It does not authorize followers.
- Reactions are selectable only by the reacting user, so public aggregate counts need a carefully designed safe view/RPC or another server-side aggregation pattern.
- Comments are publicly readable regardless of the parent post's visibility; parent-post audience must govern comment access.
- `post_key` is a text key without a foreign key to a canonical post, allowing orphaned interaction rows unless service validation prevents them.
- The inspected migration does not define group membership, group posts, direct/group messages, message participants, stories lifecycle, media asset records, notification inbox, reports, blocks, mutes, moderation actions, creator verification or creator analytics.
- No Storage bucket/policy or Realtime publication configuration was established by the inspected migration.
- Existing groups, messaging, stories, reels and notification UI contain demo/static/local state in inspected components; do not treat their presence as durable backend functionality.

Do not apply a new schema or modify the production Supabase project as part of this documentation-only module. Inspect the live project's current schema first, then design additive migrations and verify them in a non-production environment.

## 7. Priority plan

- **P0:** Auth/session lifecycle, profile ownership, public feed, safe media upload, post CRUD, comments/reactions/bookmarks, follow graph, visibility/RLS tests.
- **P1:** Stories/reels persistence, groups and memberships, inbox and notifications, realtime subscriptions, report/block/mute workflows.
- **P2:** Creator verification and analytics, moderation queue tooling, recommendation/ranking signals, advanced community events and monetization.

## 8. Definition of done

- Each feature has a dedicated specification and acceptance criteria.
- Existing live/V4 UI surfaces are mapped to source paths and routes.
- Every gap is explicitly marked as missing, partial, demo/local, or verified backend.
- Database design and RLS policies are reviewed against anonymous, owner, follower, group-member, blocked-user and moderator personas.
- Desktop/mobile, accessibility, failure/loading/empty states and realtime reconnection are tested.
- No production schema, secrets, deployment settings or live content are changed by documentation work.

## 9. Audit limitation

This pass inspects the connected GitHub repository's default branch source and migration files. It does not inspect the currently deployed live website, execute the application, query the production Supabase database, or verify production environment variables. Accordingly, no claim of live-site parity or production backend readiness is made.
