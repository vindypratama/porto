## Context

The portfolio site is a Next.js 16 App Router application with PostgreSQL/Prisma, NextAuth, and Tailwind CSS v4. Currently, only Projects and Blog Posts are managed via the database and admin UI. The About/Hero, Tech Stack, Contact sections and the site logo are all hardcoded in their respective components. This means any content update requires a code change and redeployment.

The admin dashboard already exists at `/admin` with login, project CRUD, and post CRUD. The goal is to extend this admin capability to cover all portfolio sections.

## Goals / Non-Goals

**Goals:**
- Make About/Hero section content editable via admin form (headline, description, availability, resume link, CTA text)
- Make Tech Stack groups and items editable via admin form (group name, color; item name, icon)
- Make Contact section editable via admin form (email, LinkedIn, additional links)
- Make site logo editable via admin form (icon type, brand text, optional image upload)
- Persist all section data in PostgreSQL via Prisma
- Section components fetch from DB at request time with fallback to defaults if DB unavailable
- Follow existing layered architecture: repository → service → components

**Non-Goals:**
- Real-time preview of changes (admin saves, public page reflects on next load)
- Full CMS with rich text editor (keep it simple with structured form fields)
- Versioning or draft/publish workflow for section content
- Multi-language support
- Drag-and-drop reordering of tech stack items (can be a future enhancement)

## Decisions

### 1. Database Schema: Single `SiteSettings` table for About + Logo + Contact

**Decision**: Use one `SiteSettings` singleton row for site-wide config (logo, about, contact) rather than separate tables per section.

**Rationale**: These are all singleton settings — there's only one about section, one logo, one contact block. A single table avoids unnecessary joins and keeps the query pattern simple (upsert by a fixed key). Tech stack gets separate tables because it has multiple groups with multiple items (one-to-many).

**Alternatives considered**:
- Separate tables per section → over-engineered for singleton data
- JSON column for all settings → harder to query/update individual fields, no type safety

### 2. Data Fetching: Server Components with `cache()`

**Decision**: Use Next.js Server Components that call service functions directly (no client-side fetch). Use React `cache()` for request-level deduplication.

**Rationale**: The portfolio is a public-facing page — SSR is ideal for SEO and performance. Server Components can call Prisma directly. The existing project fetching already uses this pattern. `cache()` prevents duplicate DB calls when multiple components need the same settings.

**Alternatives considered**:
- Client-side fetching with SWR/React Query → unnecessary complexity for a page that doesn't need client-side updates
- Static generation with ISR → settings changes would require revalidation triggers

### 3. Tech Stack: Two tables (`TechStackGroup` + `TechStackItem`)

**Decision**: `TechStackGroup` (id, name, color, sortOrder) has many `TechStackItem` (id, name, icon, sortOrder, groupId).

**Rationale**: Mirrors the current hardcoded `SKILL_GROUPS` structure exactly. Supports the existing UI pattern of grouped, color-coded badges. Separate tables allow independent CRUD on groups and items.

### 4. Logo: Text-based with optional image override

**Decision**: Store `logoIcon` (lucide icon name string), `logoText` (brand text), and `logoImageUrl` (optional, nullable). If `logoImageUrl` is set, render the image; otherwise render the icon + text combo.

**Rationale**: Current logo is icon + text. Supporting optional image upload gives flexibility without breaking the existing pattern. Lucide icon names can be stored as strings and dynamically rendered.

**Alternatives considered**:
- Image-only logo → breaks current design
- SVG upload only → too restrictive

### 5. Admin UI: Extend existing admin dashboard with new tabs/sections

**Decision**: Add new admin pages under `/admin/settings/` for each section (about, tech-stack, contact, logo) rather than one monolithic settings page.

**Rationale**: Follows the existing admin pattern (`/admin/posts/`, `/admin/projects/`). Each section has its own form and save logic. Keeps code organized and maintainable.

### 6. Image Upload for Logo: Local filesystem

**Decision**: Store uploaded logo images in `public/uploads/` directory. No external storage service.

**Rationale**: Keeps the project self-contained. The existing project already uses Docker with standalone output. Adding an external dependency (S3, Uploadthing) is unnecessary for a single logo image.

**Alternatives considered**:
- Uploadthing/S3 → overkill for one image, adds external dependency
- Base64 in DB → bloats the database, poor performance

## Risks / Trade-offs

- **[Risk] DB unavailability breaks all sections** → Mitigation: Maintain hardcoded fallback defaults in service layer (same pattern as existing `FALLBACK_PROJECTS`). If DB query fails, return default values.
- **[Risk] Lucide icon name mapping** → Mitigation: Store icon name as string, use dynamic import or a lookup map. Limit to a curated list of supported icons in the admin form.
- **[Risk] Migration complexity** → Mitigation: New tables only (no existing column changes). Seed with current hardcoded values so the site works identically after migration.
- **[Trade-off] Singleton settings table** → Simple but inflexible if future settings sections are added. Acceptable for current scope; can refactor later if needed.
- **[Trade-off] No rich text editor** → Limits formatting in about description. Acceptable since current content is plain text with simple formatting.
