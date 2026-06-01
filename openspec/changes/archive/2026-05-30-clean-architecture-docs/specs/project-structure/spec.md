## ADDED Requirements

### Requirement: Feature-based module structure
The project SHALL organize code into feature modules under `modules/` directory, where each module contains its own components, services, and repositories.

#### Scenario: Module directory exists for each domain
- **WHEN** developer inspects the project structure
- **THEN** `modules/blog/`, `modules/projects/`, and `modules/auth/` directories SHALL exist with appropriate sub-folders

#### Scenario: Module contains expected files
- **WHEN** developer inspects a feature module (e.g., `modules/blog/`)
- **THEN** the module SHALL contain `components/`, `*.service.ts`, `*.repository.ts`, and `index.ts` (barrel export)

### Requirement: Service layer abstraction
Each feature module SHALL have a service layer that encapsulates business logic, separate from HTTP handlers and data access.

#### Scenario: API route uses service layer
- **WHEN** API route handler processes a request (e.g., `GET /api/admin/posts`)
- **THEN** the handler SHALL call service functions instead of directly calling Prisma

#### Scenario: Server Component uses service layer
- **WHEN** a Server Component fetches data (e.g., blog list page)
- **THEN** the component SHALL call service functions instead of directly calling Prisma

### Requirement: Repository layer for data access
Each feature module SHALL have a repository layer that encapsulates all Prisma database queries.

#### Scenario: Service calls repository
- **WHEN** service function needs data from database
- **THEN** it SHALL call repository functions instead of directly using `prisma` client

#### Scenario: Repository is the only layer touching Prisma
- **WHEN** developer searches for `prisma.` calls outside `lib/prisma.ts` and repository files
- **THEN** there SHALL be no direct Prisma calls in service files, API routes, or components

### Requirement: Feature-specific components co-located
Components used exclusively by one feature SHALL be moved into that feature's module directory.

#### Scenario: BlogCard is in blog module
- **WHEN** developer looks for `BlogCard` component
- **THEN** it SHALL be located at `modules/blog/components/BlogCard.tsx`

#### Scenario: ProjectCard is in projects module
- **WHEN** developer looks for `ProjectCard` component
- **THEN** it SHALL be located at `modules/projects/components/ProjectCard.tsx`

#### Scenario: MarkdownRenderer is in blog module
- **WHEN** developer looks for `MarkdownRenderer` component
- **THEN** it SHALL be located at `modules/blog/components/MarkdownRenderer.tsx`

### Requirement: Shared components remain in root components directory
Components used across multiple features SHALL remain in the root `components/` directory.

#### Scenario: Navigation stays shared
- **WHEN** developer looks for `Navigation` component
- **THEN** it SHALL be located at `components/Navigation.tsx`

#### Scenario: Footer stays shared
- **WHEN** developer looks for `Footer` component
- **THEN** it SHALL be located at `components/Footer.tsx`

### Requirement: Barrel exports for clean imports
Each feature module SHALL export its public API through an `index.ts` barrel file.

#### Scenario: Import from module root
- **WHEN** code imports from a module (e.g., `import { getPosts } from "@/modules/blog"`)
- **THEN** the import SHALL resolve correctly through the barrel export

### Requirement: Existing functionality preserved
The reorganization SHALL NOT change any observable behavior of the application.

#### Scenario: Build succeeds
- **WHEN** developer runs `npm run build`
- **THEN** the build SHALL complete without errors

#### Scenario: API endpoints unchanged
- **WHEN** client calls any existing API endpoint
- **THEN** the request and response format SHALL remain identical

#### Scenario: Page routes unchanged
- **WHEN** user navigates to any existing page route
- **THEN** the page SHALL render with the same content as before reorganization
