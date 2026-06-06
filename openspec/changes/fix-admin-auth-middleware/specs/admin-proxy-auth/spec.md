## ADDED Requirements

### Requirement: proxy.ts uses Auth.js proxy export pattern
The `proxy.ts` file SHALL export `auth` as `proxy` using the pattern `export { auth as proxy } from "@/auth"`.

#### Scenario: proxy.ts exports auth as proxy
- **WHEN** developer reads `proxy.ts`
- **THEN** the file contains `export { auth as proxy } from "@/auth"` as the main export

#### Scenario: proxy.ts retains matcher config
- **WHEN** developer reads `proxy.ts`
- **THEN** the file exports a `config` object with `matcher: ["/admin/:path*"]`

### Requirement: Admin route protection works on VPS
The proxy SHALL redirect unauthenticated requests from `/admin/*` to `/admin/login` on the production VPS environment.

#### Scenario: Unauthenticated user accesses admin page on VPS
- **WHEN** unauthenticated user visits `/admin/posts` on the VPS
- **THEN** user is redirected to `/admin/login`

#### Scenario: Unauthenticated user accesses admin login page on VPS
- **WHEN** unauthenticated user visits `/admin/login` on the VPS
- **THEN** the login page is displayed without redirect

#### Scenario: Authenticated user accesses admin page on VPS
- **WHEN** authenticated user visits `/admin/posts` on the VPS
- **THEN** the admin page is displayed normally
