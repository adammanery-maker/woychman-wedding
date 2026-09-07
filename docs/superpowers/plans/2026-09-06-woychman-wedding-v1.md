# WoychMan Wedding V1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver a data-driven, accessible wedding site with Payload admin, PostgreSQL, and a secure household RSVP workflow.

**Architecture:** A single Next.js App Router project hosts Payload admin/API and the public server-rendered site. Payload schemas are the only content model; server-only typed loaders convert published Payload records into page props. Public operational facts derive from structured records, while editorial prose is confined to focused globals.

**Tech Stack:** Next.js 16.3.3+ compatible patch, React, TypeScript strict mode, Payload 3.88.x, PostgreSQL/Drizzle adapter, Vercel Blob adapter, Zod, Vitest, Testing Library, Playwright, axe.

**Spec:** `docs/superpowers/specs/2026-09-06-wedding-site-v1-design.md`

## Global Constraints

- Use pnpm and a Node 20.9+ supported LTS version, pinned in `.nvmrc` and `packageManager`.
- Keep one Payload admin, one PostgreSQL store, and no hard-coded wedding facts in presentation components.
- Use Server Components by default; client components only for interaction.
- Public anonymous content reads return only published records; RSVP collections have no public API access.
- Use generated Payload types, strict TypeScript, Zod server validation, POST mutations, responsive Next images, native semantic HTML, WCAG 2.2 AA, and reduced-motion support.
- Do not add deferred features or dependencies listed in `docs/future-features.md`.
- Do not commit, deploy, or publish unless explicitly requested.

---

## Planned file map

- `src/app/(frontend)/**`: public route layouts, pages, metadata, and RSVP server actions.
- `src/app/(payload)/admin/[[...segments]]/page.tsx`, `src/app/(payload)/api/[...slug]/route.ts`: Payload’s official Next integration routes.
- `src/payload/collections/**`, `src/payload/globals/**`, `src/payload/access/**`: Payload schema and access rules.
- `src/lib/content/**`: server-only published-content loaders and view models.
- `src/lib/rsvp/**`: RSVP lookup, validation, secure mutation, and code generation.
- `src/components/**`: typed presentational UI with no direct arbitrary Payload fetches.
- `src/styles/**`: tokens and global styles; component styles stay colocated CSS modules.
- `tests/**`, `e2e/**`: unit/integration and browser tests.

### Task 1: Bootstrap the single application and test harness

**Files:**
- Create: `.nvmrc`, `.env.example`, `package.json`, `pnpm-workspace.yaml`, `next.config.ts`, `tsconfig.json`, `payload.config.ts`, `vitest.config.ts`, `playwright.config.ts`
- Create: `src/app/(frontend)/layout.tsx`, `src/app/(frontend)/page.tsx`, `src/app/(payload)/admin/[[...segments]]/page.tsx`, `src/app/(payload)/api/[...slug]/route.ts`
- Create: `tests/smoke/app-shell.test.ts`

**Interfaces:**
- Produces a strict TypeScript Next/Payload project with scripts `dev`, `build`, `test`, `test:watch`, `test:e2e`, `payload:generate-types`, and `payload:migrate`.
- Produces `getPayloadClient(): Promise<Payload>` in `src/lib/payload.ts` for subsequent server-only loaders.

- [ ] **Step 1: Verify the currently supported Node LTS and compatible current security-patched Next 16.3.x / stable Payload 3.88.x versions using official documentation; record selected exact versions in `package.json`.**
- [ ] **Step 2: Scaffold the official Payload 3 Next.js/Postgres template with pnpm, then remove only sample collections/pages that conflict with this plan.**
- [ ] **Step 3: Configure `strict: true`, `noUncheckedIndexedAccess: true`, `.nvmrc`, `packageManager`, and `.env.example` containing `DATABASE_URI`, `PAYLOAD_SECRET`, `NEXT_PUBLIC_SERVER_URL`, `BLOB_READ_WRITE_TOKEN`, and `RSVP_RATE_LIMIT_*` names without values.**
- [ ] **Step 4: Write the failing shell test.**

```ts
import { describe, expect, it } from 'vitest'
import { siteName } from '@/lib/site'

describe('application shell', () => {
  it('identifies the WoychMan Wedding site', () => {
    expect(siteName).toBe('WoychMan Wedding')
  })
})
```

- [ ] **Step 5: Run `pnpm vitest run tests/smoke/app-shell.test.ts`; confirm it fails because `@/lib/site` does not exist.**
- [ ] **Step 6: Implement `src/lib/site.ts` with `export const siteName = 'WoychMan Wedding'`, configure the alias, and add test, typecheck, Payload type generation, and Playwright scripts.**
- [ ] **Step 7: Run `pnpm test`, `pnpm exec tsc --noEmit`, `pnpm payload:generate-types`, and `pnpm build`; fix only bootstrap failures.**

### Task 2: Configure admin, media, access primitives, and database migration workflow

**Files:**
- Create: `src/payload/collections/Admins.ts`, `src/payload/collections/Media.ts`
- Create: `src/payload/access/authenticated.ts`, `src/payload/access/publishedOrAuthenticated.ts`
- Modify: `payload.config.ts`, `src/payload-types.ts`
- Test: `tests/payload/access.test.ts`, `tests/payload/media.test.ts`

**Interfaces:**
- Produces `authenticated` and `publishedOrAuthenticated` access functions used by all later schemas.
- Produces `Media` records with upload, decorative flag, conditional alt text, caption, credit, and responsive image sizes.

- [ ] **Step 1: Write failing access tests that assert anonymous public reads include exactly `{ _status: { equals: 'published' } }` and authenticated reads return `true`.**
- [ ] **Step 2: Run `pnpm vitest run tests/payload/access.test.ts`; confirm the access modules are missing.**
- [ ] **Step 3: Implement the two access functions and apply them to public content collections; keep `Admins` authenticated-only.**
- [ ] **Step 4: Write a failing Media schema test asserting alt text is required when `decorative` is false and that image sizes include `sm`, `md`, `lg`, and `xl`.**
- [ ] **Step 5: Implement `Media` with Vercel Blob client uploads, upload/image fields, conditional alt validation, and 640/960/1440/2000-equivalent widths.**
- [ ] **Step 6: Configure `@payloadcms/db-postgres`, migrations, Blob storage, Admin authentication, version/draft defaults, and generated types.**
- [ ] **Step 7: Run the focused tests, generate a migration, apply it to the development database, regenerate Payload types, then run `pnpm test` and `pnpm exec tsc --noEmit`.**

### Task 3: Implement canonical wedding settings and prove admin-to-homepage flow

**Files:**
- Create: `src/payload/globals/WeddingSettings.ts`, `src/lib/content/getWeddingSettings.ts`, `src/lib/formatting/dates.ts`, `src/lib/formatting/locations.ts`
- Create: `src/components/home/WeddingIdentity.tsx`
- Modify: `payload.config.ts`, `src/app/(frontend)/page.tsx`, `src/app/(frontend)/layout.tsx`
- Test: `tests/content/getWeddingSettings.test.ts`, `tests/formatting/dates.test.ts`, `e2e/wedding-settings.spec.ts`

**Interfaces:**
- Produces `getWeddingSettings(): Promise<WeddingSettingsViewModel>` returning names, weekend date display data, location, RSVP state, contact, and indexing state.
- `WeddingIdentity` consumes `Pick<WeddingSettingsViewModel, 'couple' | 'weekend' | 'location'>`; it never accepts raw literals.

- [ ] **Step 1: Write a failing loader test with a published Payload global fixture; assert the view model returns city from `location.city` and derives the location display from canonical fields.**
- [ ] **Step 2: Run `pnpm vitest run tests/content/getWeddingSettings.test.ts`; confirm the loader is absent.**
- [ ] **Step 3: Define the global fields exactly as specified, with field descriptions identifying canonical data, draft/version support, and default `allowSearchIndexing: false`.**
- [ ] **Step 4: Implement the server-only loader and pure date/location formatters; use generated types and throw a controlled configuration error only for genuinely required missing settings.**
- [ ] **Step 5: Render `WeddingIdentity` on `/` from loader output and make `generateMetadata` emit `robots: { index: false, follow: false }` only when canonical settings disallow indexing.**
- [ ] **Step 6: Write the failing browser test: update the city through authenticated Payload fixture/API setup, visit `/`, and expect the new city with no source mutation.**
- [ ] **Step 7: Implement the test setup/seed helper, run Vitest and `pnpm playwright test e2e/wedding-settings.spec.ts`, then manually verify `/admin → Wedding Settings → publish → /` in local development.**

### Task 4: Model venues and events and prove relationship-driven Weekend rendering

**Files:**
- Create: `src/payload/collections/Venues.ts`, `src/payload/collections/Events.ts`, `src/payload/globals/WeekendPage.ts`
- Create: `src/lib/content/getEvents.ts`, `src/lib/formatting/addresses.ts`
- Create: `src/components/events/EventList.tsx`, `src/components/events/EventCard.tsx`, `src/app/(frontend)/weekend/page.tsx`
- Test: `tests/content/getEvents.test.ts`, `tests/components/EventCard.test.tsx`, `e2e/weekend.spec.ts`

**Interfaces:**
- Produces `getEvents(): Promise<EventViewModel[]>`, sorted ascending by `startAt`, with populated `venue` supplied from the canonical relation.
- `EventCard` receives `EventViewModel`; it does not receive or render an Event address field.

- [ ] **Step 1: Write failing tests asserting chronological sort, published-only filtering, and that a rendered event’s address comes from a referenced Venue fixture.**
- [ ] **Step 2: Run focused tests and confirm loader/components do not exist.**
- [ ] **Step 3: Implement Venues with structured address, map, parking, accessibility, and notes; implement Events with a required Venue relationship, date/times, arrival, attire, description, parking note, and published/hidden workflow.**
- [ ] **Step 4: Implement `getEvents`, address/time formatting, and semantic event markup with `<time>` and ordinary textual address markup—not `<address>`.**
- [ ] **Step 5: Add the Weekend intro global and route, preserving clean omission of unpublished/empty optional data.**
- [ ] **Step 6: Write and run a Playwright test that edits a Venue address, reloads `/weekend`, and observes the changed address while the Event record remains untouched.**

### Task 5: Build the public shell, announcement, and responsive design foundations

**Files:**
- Create: `src/payload/globals/Announcement.ts`, `src/lib/content/getAnnouncement.ts`
- Create: `src/styles/tokens.css`, `src/styles/globals.css`
- Create: `src/components/layout/SiteHeader.tsx`, `SiteFooter.tsx`, `AnnouncementBanner.tsx`, `MobileNavigation.tsx`, `src/components/ui/Button.tsx`, `Container.tsx`
- Modify: `src/app/(frontend)/layout.tsx`
- Test: `tests/components/SiteHeader.test.tsx`, `e2e/navigation.spec.ts`

**Interfaces:**
- `SiteHeader` consumes names and `rsvpEnabled` from `WeddingSettingsViewModel`, plus a typed section-visibility object from later globals.
- `AnnouncementBanner` consumes nullable published announcement data and renders nothing when disabled.

- [ ] **Step 1: Write failing component tests for global announcement visibility and an exposed RSVP link when RSVP is enabled.**
- [ ] **Step 2: Implement only the defined tokens, responsive container/reading widths, typography, focus states, and reduced-motion CSS; do not add a UI framework.**
- [ ] **Step 3: Implement header/footer/announcement with landmarks, keyboard-operable mobile menu, visible focus, no hover-only controls, and an always-exposed mobile RSVP control while active.**
- [ ] **Step 4: Run component tests and Playwright at phone and desktop projects, asserting Weekend, Travel, FAQ, and RSVP can be reached.**
- [ ] **Step 5: Run axe on the shell and repair semantic/label/contrast violations before moving on.**

### Task 6: Implement Travel & Stay and prove accommodations are owner-maintained data

**Files:**
- Create: `src/payload/collections/Accommodations.ts`, `src/payload/globals/TravelPage.ts`, `src/lib/content/getAccommodations.ts`, `src/lib/content/getTravelPage.ts`
- Create: `src/components/travel/AccommodationList.tsx`, `AccommodationCard.tsx`, `TravelSection.tsx`, `src/app/(frontend)/travel/page.tsx`
- Test: `tests/content/getAccommodations.test.ts`, `tests/components/AccommodationCard.test.tsx`, `e2e/travel.spec.ts`

**Interfaces:**
- Produces `getAccommodations(): Promise<AccommodationViewModel[]>`, filtered `active`/published and sorted by `sortOrder` then name.
- `AccommodationCard` receives URL, deadline, booking code, labels, and optional facts; it owns no data lookup.

- [ ] **Step 1: Write failing loader tests for active sorting and a component test for booking URL, code, and deadline.**
- [ ] **Step 2: Implement the collection with every V1 field, clear admin descriptions, and multi-select short `bestFor` labels.**
- [ ] **Step 3: Implement Travel editorial global sections and typed loader, then render semantic sections/cards without horizontal scrolling at narrow widths.**
- [ ] **Step 4: Write and run a browser test that creates/publishes an Accommodation fixture and verifies it automatically appears on `/travel` without a React edit.**
- [ ] **Step 5: Run focused tests, mobile browser test, axe, and keyboard link checks.**

### Task 7: Implement FAQ and editorial/registry pages with drafts and previews

**Files:**
- Create: `src/payload/collections/FAQs.ts`, `Registries.ts`; globals `FAQPage.ts`, `StoryPage.ts`, `RegistryPage.ts`, `Homepage.ts`
- Create: loaders `getFAQs.ts`, `getRegistries.ts`, `getHomepage.ts`, `getStoryPage.ts`
- Create: components `faq/FAQList.tsx`, `FAQItem.tsx`, `story/StoryContent.tsx`, `EditorialImage.tsx`, `registry/RegistryList.tsx`, `RegistryCard.tsx`, `home/Hero.tsx`, `HomeIntroduction.tsx`
- Create: routes `faq/page.tsx`, `story/page.tsx`, `registry/page.tsx`
- Test: `tests/content/getFAQs.test.ts`, `tests/components/FAQItem.test.tsx`, `e2e/faq.spec.ts`, `e2e/editorial-pages.spec.ts`

**Interfaces:**
- FAQ answers are rich text but operational components remain structured. `FAQItem` uses native `details`/`summary`.
- Homepage primary action is typed as `{ kind: 'rsvp' | 'weekend' | 'travel' | 'custom'; label: string; href: string }` derived by the loader.

- [ ] **Step 1: Write failing tests for published FAQ filtering, native disclosure keyboard behavior, and a custom homepage action resolving only when both custom label and URL exist.**
- [ ] **Step 2: Implement schemas with drafts/versions, focused field descriptions, Story enabled/limited layout controls, Registry active/sort controls, and no generic blocks/page builder.**
- [ ] **Step 3: Implement loaders and routes; hide unpublished optional Story/Registry cleanly in navigation and routes using a friendly not-found/omission policy.**
- [ ] **Step 4: Implement the hero with canonical wedding identity from settings, responsive `next/image`, eager hero priority, and editable primary/secondary actions.**
- [ ] **Step 5: Write and run browser tests proving a newly published FAQ appears without source changes and a keyboard-only user opens/closes it.**
- [ ] **Step 6: Configure direct draft preview URLs for these globals and verify an unpublished draft is previewable to an authenticated editor but never visible anonymously.**

### Task 8: Implement RSVP data model, invitation security, and rate-limited server operations

**Files:**
- Create: `src/payload/collections/Households.ts`, `Guests.ts`, `GuestResponses.ts`
- Create: `src/lib/rsvp/validation.ts`, `generateInvitationCode.ts`, `getHouseholdByCode.ts`, `submitGuestResponses.ts`, `rateLimit.ts`
- Create: `src/app/(frontend)/rsvp/actions.ts`
- Test: `tests/rsvp/generateInvitationCode.test.ts`, `getHouseholdByCode.test.ts`, `submitGuestResponses.test.ts`, `e2e/rsvp-security.spec.ts`

**Interfaces:**
- `lookupInvitation(input: { code: string }): Promise<LookupResult>` returns only one household’s safe guest view model or `{ kind: 'invalid' }`.
- `submitGuestResponses(input: SubmitResponsesInput): Promise<SubmitResult>` validates code and guest-to-household membership before upserting one current response per guest.

- [ ] **Step 1: Write failing tests asserting generated codes are unique, non-sequential, server-generated, and have at least 128 bits of entropy before encoding.**
- [ ] **Step 2: Define Households, Guests, and GuestResponses with zero anonymous read access and fields exactly in the spec; add unique household code and one-response-per-guest database constraint/index.**
- [ ] **Step 3: Write failing Zod tests for rejected malformed codes, attendance outside the three allowed values, oversized free text, and foreign guest IDs.**
- [ ] **Step 4: Implement schemas, generators, Zod limits, deliberate Local API calls with `overrideAccess: false` where access must apply, and scoped server-only operations.**
- [ ] **Step 5: Write and run integration tests proving valid codes expose only their household, invalid codes expose none, and tampering a Guest ID to another household fails without a write.**
- [ ] **Step 6: Implement rate limiting appropriate to the configured deployment store, returning a generic retry message without revealing code validity; test it with deterministic injected clock/store fakes.**

### Task 9: Implement accessible RSVP lookup, review, submission, and confirmation

**Files:**
- Create: `src/components/rsvp/InvitationLookup.tsx`, `HouseholdRSVPForm.tsx`, `RSVPReview.tsx`, `RSVPConfirmation.tsx`, `src/app/(frontend)/rsvp/page.tsx`
- Modify: `src/app/(frontend)/rsvp/actions.ts`
- Test: `tests/components/HouseholdRSVPForm.test.tsx`, `e2e/rsvp.spec.ts`

**Interfaces:**
- Form components consume safe `HouseholdInvitationViewModel`, never raw Payload guests or invitation code from a URL.
- Server actions return `FormState` discriminated by `invalid-code | validation-error | retryable-error | success`.

- [ ] **Step 1: Write a failing component test requiring labelled invitation input, fieldset/legend per household, radio choices for each guest, and dietary/accessibility fields only for attending guests.**
- [ ] **Step 2: Implement server validation and clean `/rsvp?invite=` token handoff using an HTTP-only short-lived context cookie; redirect to clean `/rsvp` after valid lookup.**
- [ ] **Step 3: Implement five workflow states: lookup, household responses, review, POST submit, confirmation; preserve values and move focus to useful error summary after failure.**
- [ ] **Step 4: Write and run the complete Playwright mobile flow: enter code, verify household, choose attendance, add dietary information, review, submit, and observe confirmation.**
- [ ] **Step 5: Run the tampering and repeat-update tests, proving `pending → attending → not attending` updates one canonical response rather than creating duplicates.**

### Task 10: Seed development data, production configuration, and quality gates

**Files:**
- Create: `src/lib/seed/development.ts`, `scripts/seed-development.ts`, `docs/operations.md`
- Create: `.github/workflows/ci.yml` only if the repository’s chosen CI provider is confirmed
- Modify: `README.md`, `.env.example`, `next.config.ts`, `playwright.config.ts`
- Test: `e2e/public-content.spec.ts`, `e2e/accessibility.spec.ts`

**Interfaces:**
- Produces `pnpm seed:dev`, safe only in development and idempotent by stable fixture identifiers.
- Documents exact environment configuration, initial admin creation, database migration, Blob, backups, preview, custom-domain, and production smoke-test procedures.

- [ ] **Step 1: Write a failing seed test that runs twice against an isolated test database and asserts one canonical settings record, no duplicate venues/events, and a valid RSVP household fixture.**
- [ ] **Step 2: Implement idempotent development-only seeding using Payload Local API deliberately and never in production.**
- [ ] **Step 3: Add Lighthouse/Playwright checks for image dimensions, no horizontal overflow, `prefers-reduced-motion`, mobile navigation, noindex metadata default, and published-vs-draft content behavior.**
- [ ] **Step 4: Run `pnpm test`, `pnpm exec tsc --noEmit`, `pnpm build`, `pnpm playwright test`, and an authenticated local admin smoke test.**
- [ ] **Step 5: Follow `docs/operations.md` against a Vercel preview: configure Postgres, Blob, secrets, HTTPS, backup verification, initial admin, migrations, noindex, and execute the full production-like smoke test.**

## Plan self-review

- Spec coverage: Tasks 1–3 establish the mandated first canonical vertical slice; Task 4 proves Venue→Event; Tasks 6–7 prove owner-maintained Travel/FAQ/editorial; Tasks 8–9 implement the deliberately limited secure RSVP; Task 10 covers deploy readiness, accessibility, performance, backups, and operation.
- Scope: Private events, invitation matrices, advanced RSVP, page builder, analytics, calendar, communications, and galleries remain only in `docs/future-features.md`.
- Consistency: Every public component receives a typed view model through a loader; all guest writes pass code-to-household membership validation; all structures use the same collection/global names as the specification.
