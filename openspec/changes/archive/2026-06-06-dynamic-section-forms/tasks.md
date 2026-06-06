## 1. Database Schema & Migration

- [x] 1.1 Add `SiteSettings` model to Prisma schema (singleton: heroHeadline, heroDescription, heroAvailability, heroResumeUrl, heroCtaPrimary, heroCtaSecondary, contactEmail, contactLinkedIn, contactHeading, contactDescription, logoIcon, logoText, logoImageUrl, additionalContactLinks JSON)
- [x] 1.2 Add `TechStackGroup` model to Prisma schema (id, name, color, sortOrder, createdAt, updatedAt)
- [x] 1.3 Add `TechStackItem` model to Prisma schema (id, name, icon, sortOrder, groupId FK, createdAt, updatedAt)
- [x] 1.4 Run `prisma migrate dev` to create the migration
- [x] 1.5 Update `prisma/seed.ts` to seed SiteSettings with current hardcoded defaults and TechStackGroup/TechStackItem with current `SKILL_GROUPS` data

## 2. Repository Layer

- [x] 2.1 Create `modules/settings/settings.repository.ts` — functions: `getSiteSettings()`, `updateSiteSettings(data)` using Prisma upsert
- [x] 2.2 Create `modules/settings/tech-stack.repository.ts` — functions: `getAllGroups()`, `createGroup(data)`, `updateGroup(id, data)`, `deleteGroup(id)`, `createItem(data)`, `updateItem(id, data)`, `deleteItem(id)`
- [x] 2.3 Create barrel `modules/settings/index.ts` for exports

## 3. Service Layer

- [x] 3.1 Create `modules/settings/settings.service.ts` — wraps repository with fallback defaults if DB fails
- [x] 3.2 Create `modules/settings/tech-stack.service.ts` — wraps repository with fallback to hardcoded `SKILL_GROUPS` if DB fails

## 4. Admin API Routes

- [x] 4.1 Create `app/api/admin/settings/route.ts` — GET (fetch all settings), PATCH (update site settings)
- [x] 4.2 Create `app/api/admin/settings/tech-stack/route.ts` — GET (list groups+items), POST (create group)
- [x] 4.3 Create `app/api/admin/settings/tech-stack/[id]/route.ts` — PATCH (update group), DELETE (delete group with cascade)
- [x] 4.4 Create `app/api/admin/settings/tech-stack/items/route.ts` — POST (create item)
- [x] 4.5 Create `app/api/admin/settings/tech-stack/items/[id]/route.ts` — PATCH (update item), DELETE (delete item)
- [x] 4.6 Create `app/api/admin/settings/logo/upload/route.ts` — POST (handle image upload to public/uploads/)

## 5. Admin UI Pages

- [x] 5.1 Create `app/admin/settings/layout.tsx` — settings layout with tab navigation (About, Tech Stack, Contact, Logo)
- [x] 5.2 Create `app/admin/settings/about/page.tsx` — form with headline, description, availability, resume URL, CTA text fields
- [x] 5.3 Create `app/admin/settings/tech-stack/page.tsx` — group list with CRUD, expandable items per group with CRUD
- [x] 5.4 Create `app/admin/settings/contact/page.tsx` — form with heading, description, email, LinkedIn, additional links manager
- [x] 5.5 Create `app/admin/settings/logo/page.tsx` — form with icon name (select/text), brand text, image upload with preview

## 6. Refactor Public Components

- [x] 6.1 Refactor `components/Hero.tsx` — accept props from database, fetch SiteSettings in parent or via service call
- [x] 6.2 Refactor `components/TechStack.tsx` — accept props from database, replace hardcoded `SKILL_GROUPS` with dynamic data
- [x] 6.3 Refactor `components/Contact.tsx` — accept props from database, replace hardcoded email/LinkedIn
- [x] 6.4 Refactor `components/Navigation.tsx` — use logo settings from database, render image or icon+text based on `logoImageUrl`
- [x] 6.5 Refactor `components/Footer.tsx` — use same logo settings source as Navigation
- [x] 6.6 Update `app/page.tsx` — fetch all settings and tech stack data, pass as props to section components

## 7. Icon Resolution Utility

- [x] 7.1 Create `lib/icon-resolver.ts` — utility to map lucide icon name strings to components, with fallback to `Code2` for invalid names
- [x] 7.2 Support emoji detection — if icon string is an emoji, render it directly

## 8. Validation & Error Handling

- [x] 8.1 Add form validation to admin about form (required fields, URL format for resume)
- [x] 8.2 Add form validation to admin contact form (email format, URL format for links)
- [x] 8.3 Add file upload validation to logo upload (type: png/svg/jpg/webp, max size: 2MB)
- [x] 8.4 Ensure all admin API routes return proper error responses and handle DB errors gracefully

## 9. Admin Navigation Integration

- [x] 9.1 Add "Settings" link/tab to admin dashboard navigation
- [x] 9.2 Update admin layout to include settings route in sidebar/nav

## 10. Testing & Verification

- [x] 10.1 Verify all admin forms save correctly and data persists
- [x] 10.2 Verify public page renders dynamic data from database
- [x] 10.3 Verify fallback to defaults when database is unavailable
- [x] 10.4 Verify logo image upload works and displays in Navigation/Footer
- [x] 10.5 Verify tech stack CRUD with cascade delete on groups
