# Creator Accounts & Content Publishing

**Priority:** P1  
**Status:** Creator Studio and creator profile surfaces exist; backend entitlements/verification/analytics not verified.

## Existing V4 surfaces
- CreatorStudio route/module.
- Creator Tools embedded in User Hub earnings route.
- Creator discovery/profile cards with badges, influence and sample earnings.
- NewVibeModal and short-form media creation surfaces.

**Source:** `client/src/features/CreatorStudio/`, `client/src/features/UserHub/components/`, `client/src/features/Community/components/Profiles.jsx`, `client/src/features/Social/NewVibeModal.jsx`.

## Required behavior
- Creator application/onboarding, identity and content-rights verification appropriate to feature risk.
- Creator profile fields, category, languages, destinations covered and portfolio.
- Publishing tools for posts, reels, guides, itineraries and destination collections.
- Drafts, scheduling, editorial calendar and content performance analytics.
- Transparent monetization eligibility, payout onboarding and policy disclosures where monetization is enabled.
- Sponsored-content disclosure, affiliate link disclosure, licensing and takedown workflows.
- Creator support inbox and audience insights with privacy-preserving aggregation.

## Backend requirements
Model creator_profiles/status, applications/reviews, creator_content_links, content_analytics_daily, disclosure records and payout-provider references (never raw financial credentials). Role/entitlement changes must be server-authorized and auditable. A client-editable profile field or badge must never grant creator privileges.

## Gaps
The repository includes creator UI components, but the inspected social migration has no creator application, verification, entitlement, analytics, sponsorship or payout tables. Static influence/earnings values shown in sample cards are not verified metrics.

## Acceptance criteria
- Creator capabilities require approved server-side status.
- Paid/sponsored content is clearly disclosed and linked to an auditable campaign/contract record.
- Analytics are access-controlled and cannot expose another creator's private metrics.
- Content ownership, licensing and takedown rules are enforced.
