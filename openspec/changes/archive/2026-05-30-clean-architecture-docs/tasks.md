## 1. Module Structure Setup

- [x] 1.1 Create `modules/blog/` directory with `components/`, `blog.repository.ts`, `blog.service.ts`, `index.ts`
- [x] 1.2 Create `modules/projects/` directory with `components/`, `project.repository.ts`, `project.service.ts`, `index.ts`
- [x] 1.3 Create `modules/auth/` directory with `auth.service.ts`, `index.ts`

## 2. Repository Layer

- [x] 2.1 Create `modules/blog/blog.repository.ts` — wrap all Prisma calls for Post model (findMany, findUnique, create, update, delete, count)
- [x] 2.2 Create `modules/projects/project.repository.ts` — wrap all Prisma calls for Project model (findMany, findUnique, create, update, delete, count)
- [x] 2.3 Verify no direct Prisma calls remain outside `lib/prisma.ts` and repository files

## 3. Service Layer

- [x] 3.1 Create `modules/blog/blog.service.ts` — business logic for posts (getPosts, getPostBySlug, createPost, updatePost, deletePost, togglePublish, getStats)
- [x] 3.2 Create `modules/projects/project.service.ts` — business logic for projects (getProjects, getProject, createProject, updateProject, deleteProject, toggleVisibility)
- [x] 3.3 Create `modules/auth/auth.service.ts` — extract `requireAuth()` helper and auth-related utilities

## 4. Move Feature-Specific Components

- [x] 4.1 Move `components/BlogCard.tsx` → `modules/blog/components/BlogCard.tsx`
- [x] 4.2 Move `components/MarkdownRenderer.tsx` → `modules/blog/components/MarkdownRenderer.tsx`
- [x] 4.3 Move `components/ProjectCard.tsx` → `modules/projects/components/ProjectCard.tsx`
- [x] 4.4 Move `components/Projects.tsx` → `modules/projects/components/Projects.tsx`
- [x] 4.5 Update all imports in moved components to use new paths

## 5. Update API Routes to Use Service Layer

- [x] 5.1 Update `app/api/admin/posts/route.ts` — replace direct Prisma calls with blog service
- [x] 5.2 Update `app/api/admin/posts/[id]/route.ts` — replace direct Prisma calls with blog service
- [x] 5.3 Update `app/api/admin/projects/[id]/route.ts` — replace direct Prisma calls with project service
- [x] 5.4 Remove duplicate `requireAuth()` from API routes — use auth service

## 6. Update Server Components to Use Service Layer

- [x] 6.1 Update `modules/projects/components/Projects.tsx` — use project service instead of direct Prisma
- [x] 6.2 Update `app/admin/page.tsx` (dashboard) — use blog/project services for stats
- [x] 6.3 Update `app/admin/posts/page.tsx` — use blog service
- [x] 6.4 Update `app/admin/projects/page.tsx` — use project service
- [x] 6.5 Update `app/blog/page.tsx` — use blog service
- [x] 6.6 Update `app/blog/[slug]/page.tsx` — use blog service

## 7. Barrel Exports

- [x] 7.1 Create `modules/blog/index.ts` — export service functions and components
- [x] 7.2 Create `modules/projects/index.ts` — export service functions and components
- [x] 7.3 Create `modules/auth/index.ts` — export service functions

## 8. Import Path Cleanup

- [x] 8.1 Update all imports in `app/` pages to use `@/modules/*` barrel imports
- [x] 8.2 Update all imports in `app/api/` routes to use `@/modules/*` barrel imports
- [x] 8.3 Update all imports in shared `components/` to use new paths for moved components
- [x] 8.4 Verify no broken imports remain (run `npm run build`)

## 9. Build Verification

- [x] 9.1 Run `npm run build` — verify zero errors
- [x] 9.2 Run `npm run lint` — verify zero warnings
- [x] 9.3 Manually verify all page routes render correctly (`/`, `/blog`, `/admin`)
- [x] 9.4 Manually verify API endpoints work (`/api/admin/posts`, `/api/admin/projects`)

## 10. Documentation

- [x] 10.1 Create `README.md` with project overview and tech stack section
- [x] 10.2 Add system requirements section (development + production minimum specs)
- [x] 10.3 Add Windows installation guide (PowerShell commands, step-by-step)
- [x] 10.4 Add Ubuntu installation guide (bash commands, step-by-step)
- [x] 10.5 Add environment variables reference table
- [x] 10.6 Add available npm scripts documentation
- [x] 10.7 Add project directory structure tree (reflecting new clean architecture)
