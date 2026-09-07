# Wedding Website/App V1 — Design Specification

## Status and governing priorities

This document records the authoritative Version 1 specification supplied on 2026-09-06. Priorities, in order: guest usability; owner editing after launch; one authoritative source for each wedding fact; simple V1 architecture; excellent visual design; accessibility and mobile performance; clean extension points; and no unnecessary platform complexity.

Build a bespoke, private-event publication supported by a simple event-information application—not a generic wedding template, scrapbook, corporate dashboard, or wedding SaaS. Guests must quickly find whose wedding it is, date, Canmore location, weekend schedule, travel/stay, attire, FAQ, registry, and RSVP.

## Required architecture

One Next.js application contains Payload CMS admin, PostgreSQL-backed structured and editorial content, public Server Component pages, and a server-validated RSVP flow. Payload is the only admin and PostgreSQL is the only authoritative store. Do not create a separate CMS, content JSON, hard-coded page copy, separate backend, GraphQL client, global client state, generic page builder, or sophisticated permission system.

Use Next.js 16.3.3 or a later compatible 16.3.x security patch; App Router; strict TypeScript; React Server Components by default; and Client Components only for browser interaction. Use stable Payload 3.88.x (not Payload 4 preview), `@payloadcms/db-postgres`, PostgreSQL, `@payloadcms/storage-vercel-blob` with `clientUploads: true` for Vercel, pnpm, and Node 20.9+ supported LTS pinned by `.nvmrc` and `packageManager`. Deployment target is Vercel with external managed PostgreSQL and Vercel Blob.

The required data path is:

```text
/admin → Payload → PostgreSQL → public website / RSVP
```

Routine edits—schedule, addresses, RSVP deadline, accommodations, travel, FAQ, story, photographs, registry, announcements, visibility—must be made in `/admin`, previewed, published, and reflected publicly without Git, code edits, or redeployment.

## Canonical data rule

An operational fact has one canonical stored value. Components render structured data and must not hard-code wedding facts. Couple/date/location live in `WeddingSettings`; ceremony times live in `Events`; venues and addresses live in `Venues`; accommodation details live in `Accommodations`; registry URLs live in `Registries`; editorial copy lives in focused Globals/collections.

Do not build dynamic rich-text tokens in V1. Keep volatile facts out of editable prose, use structured components for operational information, and explain the canonical source in admin field descriptions.

## Public routes and content schemas

Required routes are `/`, `/weekend`, `/travel`, `/faq`, `/story`, `/registry`, and `/rsvp`.

Required Globals: `WeddingSettings`, `Homepage`, `WeekendPage`, `TravelPage`, `FAQPage`, `StoryPage`, `RegistryPage`, and `Announcement`. Required Collections: `Admins`, `Media`, `Venues`, `Events`, `Accommodations`, `FAQs`, `Registries`, `Households`, `Guests`, and `GuestResponses`. Use owner-friendly admin group labels: Wedding Site, Content, RSVP, System.

`WeddingSettings` canonically stores couple display names; wedding-weekend start/end dates; city, province/region, country; `America/Edmonton`; RSVP enabled/deadline/button label; contact details; and `allowSearchIndexing` defaulting false. When indexing is off, public metadata is `noindex,nofollow`.

`Homepage` stores hero image, eyebrow, welcome heading/copy, editable primary action (`RSVP`, `Weekend`, `Travel & Stay`, or custom label/URL), optional secondary action, and optional-section state—but never names/date/location. The homepage immediately shows names, date/weekend, Canmore, hero photography, and primary CTA.

`Venues` store name, structured address fields, map URL, parking, accessibility, and notes. `Events` reference a venue and store title, start/end, recommended arrival, attire, description, parking note, and published/hidden state. Events sort chronologically. No guest-specific event permissions in V1 and no duplicated address fields.

`Accommodations` store name, property/booking URLs, summary, optional location, distance/travel time, price range, room information, deadline/code, parking, check-in/out, multi-value `bestFor`, active, and sort order. `FAQs` store question, rich-text answer, optional category, sort order, and published state. `Registries` store name, URL, description, optional image/logo, active, and sort order. `Media` has upload, required alt text unless decorative, optional caption/credit, and responsive derivatives near 640/960/1440/2000 px.

The global announcement has enabled, message, optional link, and information/important tone. It appears globally when enabled. Story supports enabled, title, introduction, rich body, images, and only restrained editorial layout options. Travel stores editable introduction, getting-to-Canmore, transport, parking, weather/location guidance, and local notes. FAQ renders native `<details>`/`<summary>`.

## Public experience and design

Desktop header: names/monogram, Weekend, Travel & Stay, FAQ, Our Story, Registry, and a visually distinct active RSVP button. Story and Registry can be hidden via settings. Mobile has a compact sticky header with names/monogram, menu, and exposed RSVP while active; hybrid navigation is allowed when space permits.

Weekend answers what happens and when; Travel & Stay is practical rather than a tourism directory; Registry is understated; photography provides editorial pacing rather than gallery clutter. Use a small code-defined token system for typography, colour, spacing, widths, radii, and transitions. Use one expressive display family and one readable body/UI family. Design controls remain code-defined; admin controls content, imagery, presence, and limited layouts only.

Use semantic landmarks and headings, `<time>`, forms, fieldsets, legends, labels, buttons, and native disclosure controls as appropriate. Do not use `<address>` for venue street addresses. Meet WCAG 2.2 AA: keyboard access, visible focus, contrast, form errors/focus management, text zoom, alt text, reduced motion, no hover-only functionality, and roughly 44–48 px interactive targets. Design mobile-first across narrow/standard/large phone, tablet orientations, laptop, and desktop. Avoid autoplay video, map SDKs, third-party marketing scripts, huge image payloads, excessive JavaScript, scroll-jacking, constant decoration, full-screen preloaders, parallax, and excessive motion.

Next Image placements require intentional crop/aspect, dimensions, `sizes`, and responsive quality. The hero/LCP image must not lazy-load; below-fold images normally lazy-load. Target Core Web Vitals at p75: LCP ≤2.5 s, INP ≤200 ms, CLS ≤0.1.

## Drafting, preview, data access, and public privacy

Enable Payload drafts, publishing, versions, and direct draft preview for public editable content. Important editors must provide Preview; Live Preview is optional only if straightforward. Do not draft RSVP records. Anonymous public queries return only published content. Centralize deliberate server-only Local API use in typed modules under `src/lib/content` and `src/lib/rsvp`; do not scatter `payload.find()` through components. Pages load data then pass typed props to presentational components. Initially render public content dynamically for immediate correctness; do not build a complex revalidation layer.

## RSVP V1

RSVP is a small application: household/invitation identification, per-person attendance, dietary and optional accessibility information, review, and confirmation. Use a unique, high-entropy, server-generated non-sequential Household invitation code. Households have display name, optional contact email, active, and admin-only notes. Guests reference household and have first/last names, optional display name, active. Each Guest has one current `GuestResponse` with attendance (`pending`, `attending`, `not attending`), dietary/accessibility fields, and timestamps. Updates are canonical, not duplicate responses.

`/rsvp?invite=<token>` validates server-side, establishes context, and redirects to clean `/rsvp` where practical; manual code entry must work. Never expose a public guest-list endpoint or anonymous Payload reads of Household/Guest/GuestResponse. A write verifies invitation code → household → guest membership before updating. Never trust a client guest ID alone. Invalid code reveals no guest information; failures preserve entered answers.

Use shared Zod validation client-side where useful and always server-side. All state-changing work is POST. Protect code attempts with reasonable rate limiting. HTTPS, strong admin authentication, secrets only in environment variables, managed database backups, and secure media/database configuration are required.

## Tests, delivery order, and exclusions

Use Vitest for business/formatting and integration tests, Testing Library where useful, and Playwright for guest tasks. Critical assertions: published-vs-draft public content; event-time canonical rendering; accommodation/FAQ automatic rendering after data changes; household isolation; no cross-household response modification; invalid-code privacy; and response updates without duplicates. Playwright covers mobile ceremony details, accommodation link/code/deadline, full RSVP, keyboard FAQ, and mobile navigation. Add axe/semantic checks plus manual keyboard, VoiceOver spot checks, 200% zoom, reduced motion, narrow viewport, focus, Lighthouse, image/network, and production smoke testing.

Implement in this sequence: foundation; canonical model; public shell; Weekend/Travel/FAQ; Homepage/Story/Registry; RSVP data/security; RSVP UI; admin preview/polish; quality pass; deployment. First prove `/admin → WeddingSettings → /` with a city update, then `Venue → Event → /weekend` with an address update, then adding an accommodation and FAQ without source edits.

Deferred and documented only: private event/invitation matrix, guest permissions and plus-ones, multi-event RSVP/meal/transport/reminders, lifecycle automation, targeted messages/SMS/email, calendar export/feed, guest photo/gallery, page builder/audit roles, and analytics. Events remain stable independent entities so a future Invitation↔Event model can be added.

## Definition of done

The owner edits all listed operational/editorial content through understandable `/admin` drafts/preview/publish; all seven routes work; structured changes propagate everywhere they are consumed; guest data cannot be enumerated or crossed; core flows are accessible and responsive; no unnecessary client payload is shipped; responsive images and Core Web Vitals meet targets under representative conditions; and production edits persist through deployment with backups configured.
