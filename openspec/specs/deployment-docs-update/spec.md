## ADDED Requirements

### Requirement: Prisma 7 config references updated
DEPLOYMENT.md SHALL reference `prisma.config.ts` for database URL and seed configuration, NOT `schema.prisma` url field or `package.json#prisma`.

#### Scenario: Seed command uses tsx
- **WHEN** developer reads the seed instructions in DEPLOYMENT.md
- **THEN** the seed command references `npx tsx prisma/seed.ts` via `prisma.config.ts`

#### Scenario: Database push alternative documented
- **WHEN** developer cannot use `prisma migrate dev` due to missing CREATEDB permission
- **THEN** DEPLOYMENT.md documents `npx prisma db push` as an alternative

### Requirement: Tailwind CSS v4 references updated
DEPLOYMENT.md SHALL NOT reference `tailwind.config.ts` or `postcss.config.js` with old Tailwind v3 plugins.

#### Scenario: No tailwind.config.ts reference
- **WHEN** developer reads any section mentioning Tailwind config
- **THEN** it references `globals.css` with `@theme` directive, not `tailwind.config.ts`

### Requirement: Next.js 16 proxy convention referenced
DEPLOYMENT.md SHALL reference `proxy.ts` instead of `middleware.ts`.

#### Scenario: Proxy file reference
- **WHEN** developer reads any section mentioning middleware or proxy
- **THEN** it references `proxy.ts`, not `middleware.ts`

### Requirement: ESLint flat config referenced
DEPLOYMENT.md SHALL reference `eslint .` command and `eslint.config.mjs` file.

#### Scenario: Lint command updated
- **WHEN** developer reads the lint command in any section
- **THEN** it uses `npm run lint` which runs `eslint .`, not `next lint`

### Requirement: Docker dev port updated
DEPLOYMENT.md SHALL reference port 5433 for Docker PostgreSQL dev container.

#### Scenario: Docker dev port
- **WHEN** developer reads the Docker development section
- **THEN** DATABASE_URL uses port 5433, not 5432
