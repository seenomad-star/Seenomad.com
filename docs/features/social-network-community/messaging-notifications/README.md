# Messaging & Notifications

**Priority:** P1  
**Status:** Messaging and notification UI exists; inspected implementation is sample/local state, not a verified persistent inbox.

## Existing V4 surfaces
- Messaging route under User Hub and Community's Message System navigation.
- Messaging UI includes chat list, one-to-one/group labels, creator/priority indicators and message composer controls.
- NotificationCenter displays social, alert and earnings examples with local read/dismiss state.

**Source:** `client/src/features/Community/components/Messaging.jsx`, `client/src/features/Notifications/NotificationCenter.jsx`, `client/src/features/UserHub/index.jsx`.

## Required behavior
- One-to-one and group conversations, participant membership, message history, delivery/read state and unread counts.
- Text, image/file attachments, reply/thread, edit/delete policy, reactions and typing/presence where justified.
- Message requests and privacy controls (followers only, nobody, or approved contacts).
- Block/report actions, spam throttling and safe attachment handling.
- Notifications for follows/requests, reactions, comments, mentions, messages, group activity, events and moderation outcomes.
- Per-category preferences, push/email opt-in, mark-read, mute and retention controls.
- Realtime delivery with reconnect, offline retry and ordered pagination.

## Backend design
Use conversations, conversation_members, messages, message_receipts and notification_inbox tables. Enforce membership on every read/write and every Realtime subscription. Store attachment objects in private Storage. Notification rows are user-targeted; do not broadcast private notifications. Use server-generated notification events or trusted database functions, not client-authoritative recipient IDs.

## Existing schema gap
No messaging, participant, receipt, notification, preference, presence or message-request tables were found in the inspected migration. The Messaging component initializes chats in local React state; NotificationCenter initializes a hard-coded array. Realtime configuration was not present in the migration.

## Acceptance criteria
- Non-members cannot fetch a conversation or subscribe to its Realtime stream.
- A user cannot spoof sender_id, participant membership or notification recipient.
- Unread counts and read receipts are consistent across devices.
- Blocked users cannot initiate new conversations or bypass message-request policy.
- Attachments are private and validated; notification preferences are respected.
