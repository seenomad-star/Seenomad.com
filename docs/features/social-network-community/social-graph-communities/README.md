# Followers, Following & Travel Communities

**Priority:** P0 follow graph; P1 communities/groups.  
**Status:** Follow table exists; community UI exists; durable group backend not found in inspected migration.

## Existing V4 surfaces
- Creator/profile discovery with Follow and Mate actions.
- Community navigation includes Groups & Forums, meetups, collaboration board, bounty board and travel feed.
- Groups component contains sample destination/budget/utility groups, membership state and challenge cards.
- Follow graph table and client follow service exist in the initial social backend.

**Source:** `client/src/features/Community/`, `client/src/features/Social/`, `client/src/lib/socialBackend.js`, `public.social_follows`.

## Required behavior
- Follow/unfollow; private-account follow requests and approval/rejection.
- Follower/following lists, counts and feed ranking with block/mute exclusions.
- Group directory, categories, destination/topic tags, public/private/secret visibility.
- Group creation, owner/admin/moderator/member roles, invitations, join requests, membership lifecycle and group rules.
- Group feed, pinned posts, announcements, events/meetups, member search and reporting.
- Leave/delete/archive group workflows and owner succession.
- Group deep links and destination/trip cross-links.

## Data requirements
Model groups, group_memberships, group_invites, group_posts or a group_id on canonical posts, group_events, group_roles and group moderation actions. Use unique membership constraints, explicit state transitions and server-side role checks. Private/secret group membership and content must never be exposed through public counts or search in a way that reveals protected membership.

## Existing schema gap
`social_follows` supports direct follow rows and blocks self-follow, but has no private follow-request state, no block/mute relationship and no group tables. Follow SELECT is public in the migration. Community groups currently use local sample state in the inspected Groups component.

## Acceptance criteria
- A user cannot follow themselves or create duplicate relationships.
- Private profiles require approval; pending requests do not grant follower access.
- Blocked users cannot follow, discover protected content or participate in the blocker’s groups where policy requires exclusion.
- Only group owners/admins can perform privileged group actions.
- Private group content and member data are inaccessible to non-members, including through direct API calls.
