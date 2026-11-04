# Profiles & Account Privacy

**Priority:** P0  
**Status:** Partial UI and profile state; backend privacy model incomplete.

## Live/V4 surface to preserve
- User Hub profile route and share-profile action.
- NomadProfile with cover/avatar, bio, location, links, travel history, badges, reputation, activity and profile editing.
- Creator/public profile cards and profile discovery in Community.
- Auth sign-up/sign-in foundation and `public.profiles` table.

**V4 source:** `client/src/features/UserHub/components/NomadProfile.jsx`, `EditProfileModal`, `client/src/features/Community/components/Profiles.jsx`, `client/src/contexts/AuthContext.jsx`, `supabase/migrations/202610220001_authenticated_social.sql`.

## Required behavior
- Stable profile identity tied to Auth UUID; unique normalized username/handle.
- Public/private account setting; public profile fields separated from private account/security settings.
- Profile visibility: public, followers, or owner-only fields where appropriate.
- Edit avatar, cover, display name, bio, home/current base, travel interests, links and creator metadata.
- Follow request/approval workflow for private accounts; follower/following lists respect privacy and blocks.
- Account deactivation/deletion, export and consent-aware visibility controls.
- Profile preview as another user and clear verified/creator badges with auditable provenance.

## Data requirements
Extend profiles additively with username normalization, account_visibility, profile fields, moderation state and timestamps. Keep sensitive settings in a private table keyed by auth user ID; never expose private email, phone, legal identity or exact live location in public profile queries.

## Gap / requirements
The existing profile table only contains id, username, display_name, avatar_url and bio. Current public SELECT policy exposes all profile rows; private accounts and field-level privacy are not implemented in the inspected migration. UI profile data also contains static defaults and local Zustand stores. Map UI fields to durable columns before migrating; do not blindly persist every displayed field.

## Acceptance criteria
- User A cannot edit User B's profile or private settings.
- Anonymous users see only approved public fields.
- Followers see followers-only fields only after relationship approval.
- Blocks override profile, follow, search, content and messaging visibility.
- Username uniqueness is case-insensitive and race-safe.
- Profile edits persist across sessions/devices and recover gracefully from upload/network errors.
