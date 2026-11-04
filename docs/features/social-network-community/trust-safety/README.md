# Moderation, Reporting, Blocking & Privacy

**Priority:** P0 safety baseline; P1 moderation operations.  
**Status:** UI/security feature surfaces exist, but social reporting/blocking backend not found in inspected migration.

## Required capabilities
- Report users, posts, comments, messages, groups and media with reason, evidence reference and status.
- Block and unblock users; mute accounts/content; restrict comments and message requests.
- Moderation queue with triage, assignment, severity, evidence retention and audit trail.
- Content states: active, limited, under_review, removed, appealed; user states: active, restricted, suspended, banned.
- Appeals, moderator notes, repeat-offender handling and transparent enforcement notices.
- Anti-spam controls, rate limits, upload scanning, link safety and abuse detection.
- Privacy controls for profile fields, online presence, read receipts, activity and location.
- User safety controls for location-sharing and meetups; never expose precise live location by default.

## Backend requirements
Create reports, user_blocks, user_mutes, moderation_cases, moderation_actions and appeals. Keep moderation authority in trusted server-side roles/app_metadata or a dedicated protected role table, never user-editable user_metadata. Restrict evidence access to reporter (where appropriate) and authorized moderators. Log privileged actions and prevent ordinary users from reading internal notes.

## Current gap
The inspected initial migration defines no reports, blocks, mutes, appeals or moderation tables/policies. The existing `client/src/features/Security` folder is not evidence that these social safety workflows are wired to a protected backend.

## Acceptance criteria
- A blocked relationship is enforced in feed, profile discovery, comments, groups, messages, search and notifications.
- Users cannot read reports or moderation notes they are not authorized to access.
- Moderators cannot silently alter records without an audit event.
- Appeals are available where policy permits and preserve original enforcement evidence.
- Rate limits and upload validation are server-side, not only UI constraints.
