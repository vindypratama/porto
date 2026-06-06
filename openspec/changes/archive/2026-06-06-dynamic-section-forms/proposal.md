## Why

The portfolio website currently has all section content (About/Hero, Tech Stack, Projects, Contact) hardcoded in components or fetched from the database with no admin editing capability for most sections. The admin can only manage Projects and Blog Posts. To make the portfolio fully manageable without code changes, the About, Tech Stack, Contact sections and the site logo need to be editable through admin forms with data persisted to the database.

## What Changes

- Add database models for `SiteSettings` (logo, about content), `TechStackGroup` and `TechStackItem` (skills), and extend `Contact` info storage
- Create admin CRUD forms for each section: About (headline, description, availability, resume link), Tech Stack (groups and items with icons/colors), Contact (email, LinkedIn, other links), and Logo (icon type, text, optional image upload)
- Refactor existing section components (`Hero`, `TechStack`, `Contact`, `Navigation`, `Footer`) to fetch data from the database instead of hardcoded values, with fallback to current defaults
- Add API routes under `/api/admin` for managing these new entities
- Add admin dashboard pages/tabs for each section's settings

## Capabilities

### New Capabilities
- `dynamic-about-section`: Admin-editable About/Hero section — headline, description, availability badge, CTA buttons, resume link stored in DB and rendered dynamically
- `dynamic-tech-stack`: Admin-editable Tech Stack section — skill groups and items (name, icon, color) stored in DB and rendered dynamically
- `dynamic-contact-section`: Admin-editable Contact section — email, LinkedIn URL, additional contact links stored in DB and rendered dynamically
- `dynamic-logo`: Admin-editable site logo — icon type, brand text, optional image upload stored in DB and used in Navigation and Footer

### Modified Capabilities

## Impact

- **Database**: New Prisma models (`SiteSettings`, `TechStackGroup`, `TechStackItem`), migration required
- **Components**: `Hero.tsx`, `TechStack.tsx`, `Contact.tsx`, `Navigation.tsx`, `Footer.tsx` refactored to use dynamic data
- **API**: New admin API routes for settings management
- **Admin UI**: New pages/tabs in admin dashboard for section editing
- **Dependencies**: No new external dependencies expected; may add `uploadthing` or similar for image upload if logo image upload is desired
