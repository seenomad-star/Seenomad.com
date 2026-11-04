# Authenticated Backend, Realtime, Storage & RLS

**Priority:** P0  
**Status:** Partial foundation in repository; production project state not inspected in this documentation pass.

## Existing foundation
- `client/src/lib/supabaseClient.js` reads `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`.
- `client/src/contexts/AuthContext.jsx` restores sessions and exposes sign-in, sign-up and sign-out.
- `client/src/lib/socialBackend.js` implements post, reaction, comment, saved-post and follow operations.
- `supabase/migrations/202610220001_authenticated_social.sql` creates six core tables, enables RLS and grants table privileges.

## Existing migration tables
`profiles`, `social_posts`, `social_reactions`, `social_comments`, `social_follows`, `social_saved_posts`.

## Security findings to resolve before production reliance
1. **Follower visibility:** social_posts SELECT policy currently allows public rows or the author only. It does not check an approved follow relationship; followers-only posts are therefore not visible to followers.
2. **Private profiles:** no account-visibility model; profile SELECT policy is public for all rows.
3. **Comment inheritance:** social_comments SELECT is unconditional for anon/authenticated; comments can be read without checking parent post visibility.
4. **Reaction aggregation:** social_reactions SELECT is owner-only. Do not weaken it to public SELECT merely to display counts; use a safe aggregate view/RPC with controlled output.
5. **Orphan interactions:** reaction/comment/saved post_key is text and not a foreign key. Validate keys and move to canonical UUID references or a rigorously constrained polymorphic reference model.
6. **Follows:** follow rows are publicly readable and there are no pending private-account requests, block/mute checks or privacy-aware list policies.
7. **Storage:** the inspected migration does not create buckets or object policies. Media upload must not proceed on assumptions of public bucket access.
8. **Realtime:** no publication/channel setup or realtime authorization test is included in this migration.
9. **Schema scope:** no groups, conversations, messages, notifications, stories, media assets, reports, moderation or creator-entitlement tables are present.
10. **Client trust:** all authorization must be enforced by RLS and trusted server-side functions. Never expose service_role/secret keys in Vite variables. Do not authorize using user-editable user_metadata.

## Target domain model (design proposal; not yet implemented)
- Identity: profiles, profile_private_settings, follow_requests.
- Publishing: social_posts, media_assets, stories, reels (or a unified content model with typed subresources).
- Engagement: reactions, comments, reposts, saved_items.
- Graph: follows, blocks, mutes.
- Communities: groups, group_memberships, group_invites, group_events.
- Messaging: conversations, conversation_members, messages, message_receipts.
- Notifications: notification_inbox, notification_preferences, push_subscriptions.
- Trust: reports, moderation_cases, moderation_actions, appeals.
- Creator: creator_applications, creator_profiles, creator_content_metrics.

Use foreign keys, check constraints, unique constraints, indexes aligned with query patterns, soft-delete/moderation lifecycle fields where needed and explicit ownership/audience semantics. Avoid a single generic JSONB table as a substitute for relational authorization boundaries.

## RLS design rules
- Enable RLS on every exposed table and grant only required operations.
- Use `TO authenticated` plus row ownership/relationship predicates; role alone is not authorization.
- UPDATE policies require both USING and WITH CHECK.
- A post's audience policy must be reused by feed, permalink, search, comments and media access.
- Group content requires active membership and role checks.
- Conversation/message access requires active conversation membership.
- Blocks override otherwise valid follow/group/message access.
- Moderation actions are limited to trusted moderator roles and audited.
- Views must be reviewed for RLS behavior; on supported Postgres versions use security-invoker views where appropriate.
- Do not use user-editable JWT user_metadata for authorization. Do not expose service-role/secret keys.

## Safe implementation sequence
1. Inspect existing Supabase schema, migrations, grants, policies, buckets and publications read-only.
2. Reconcile repo migration history with the connected project's actual migration history before proposing SQL.
3. Define canonical content/media IDs and access matrix.
4. Additive migration in a non-production project; no destructive table/column changes.
5. Add Storage policies and safe aggregate endpoints.
6. Add realtime only for conversations, notifications and selected feed events after RLS review.
7. Run SQL tests as anon, owner, follower, non-follower, group member/non-member, conversation member/non-member, blocked user and moderator.
8. Run Supabase advisors and application integration tests; record evidence before production release.

## Environment boundary
The client code expects the publishable key and project URL. The repository guide says production environment variables must be configured in the Vercel project; this audit does not verify current Vercel values or the production Supabase schema. This specification does not apply migrations or alter production.
