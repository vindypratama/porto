## ADDED Requirements

### Requirement: Proxy file exists at project root
The project SHALL have a `proxy.ts` file at the project root (same level as `app/`) that contains the authentication proxy logic.

#### Scenario: proxy.ts exists
- **WHEN** developer inspects the project root
- **THEN** `proxy.ts` file exists and `middleware.ts` does not exist

### Requirement: Admin route protection preserved
The proxy SHALL redirect unauthenticated requests from `/admin/*` (except `/admin/login`) to `/admin/login` with a `callbackUrl` query parameter.

#### Scenario: Unauthenticated user accesses admin page
- **WHEN** unauthenticated user visits `/admin/posts`
- **THEN** user is redirected to `/admin/login?callbackUrl=/admin/posts`

#### Scenario: Unauthenticated user accesses admin login page
- **WHEN** unauthenticated user visits `/admin/login`
- **THEN** the login page is displayed without redirect

#### Scenario: Authenticated user accesses admin page
- **WHEN** authenticated user visits `/admin/posts`
- **THEN** the admin page is displayed normally

### Requirement: No deprecation warning
The build and dev output SHALL NOT contain the warning "The middleware file convention is deprecated."

#### Scenario: Build output is clean
- **WHEN** developer runs `npm run build`
- **THEN** the output does not contain "middleware" deprecation warning

#### Scenario: Dev server output is clean
- **WHEN** developer runs `npm run dev`
- **THEN** the output does not contain "middleware" deprecation warning
