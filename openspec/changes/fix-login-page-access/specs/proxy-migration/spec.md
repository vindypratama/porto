## MODIFIED Requirements

### Requirement: Admin route protection preserved
The proxy SHALL redirect unauthenticated requests from `/admin/*` (except `/admin/login`) to `/admin/login` with a `callbackUrl` query parameter. The admin layout SHALL also skip session redirect for `/admin/login` routes.

#### Scenario: Unauthenticated user accesses admin page
- **WHEN** unauthenticated user visits `/admin/posts`
- **THEN** user is redirected to `/admin/login?callbackUrl=/admin/posts`

#### Scenario: Unauthenticated user accesses admin login page
- **WHEN** unauthenticated user visits `/admin/login`
- **THEN** the login page is displayed without redirect from both proxy and layout

#### Scenario: Authenticated user accesses admin page
- **WHEN** authenticated user visits `/admin/posts`
- **THEN** the admin page is displayed normally

#### Scenario: Admin layout does not redirect login page
- **WHEN** unauthenticated user visits `/admin/login`
- **THEN** the admin layout renders the login page children without calling `redirect("/admin/login")`
