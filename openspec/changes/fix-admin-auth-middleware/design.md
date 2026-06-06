## Context

The portfolio application runs on Next.js 16 (App Router) with Auth.js v5 for authentication. The `proxy.ts` file at the project root currently uses the old Auth.js middleware pattern:

```typescript
export default auth((req: NextRequest & { auth: unknown }) => {
  // custom redirect logic
});
```

This pattern was valid in Next.js 15 where `middleware.ts` was the convention. In Next.js 16, the file convention changed to `proxy.ts` and Auth.js now expects a different export pattern. The current code does not execute as a proxy, so admin routes are unprotected on the VPS.

## Goals / Non-Goals

**Goals:**
- Fix admin route protection using the correct Next.js 16 proxy convention
- Use Auth.js's built-in proxy export pattern (`export { auth as proxy }`)
- Keep `proxy.ts` as the file name (Next.js 16 convention)
- No changes to `auth.ts` configuration

**Non-Goals:**
- Adding custom proxy logic beyond what Auth.js provides
- Changing the auth provider or session strategy
- Modifying the admin login page

## Decisions

### Use `export { auth as proxy }` pattern

**Decision**: Replace the current `export default auth(...)` with `export { auth as proxy }` from Auth.js.

**Rationale**: Auth.js documentation for Next.js 16 explicitly recommends this pattern. The `auth` function already handles:
1. Session validation via JWT
2. Redirect to `pages.signIn` (`/admin/login`) for unauthenticated users
3. Session attachment to the request object

The custom redirect logic in the current `proxy.ts` is redundant because Auth.js's `auth` function already redirects unauthenticated users to the configured `signIn` page.

**Alternatives considered**:
- *Keep custom logic with named export*: Would require `export function proxy(request) { ... }` with manual session checking. More code, same result.
- *Use `authorized` callback*: Adds complexity without benefit since the default behavior already redirects to sign-in.

### Keep matcher config

**Decision**: Retain `export const config = { matcher: ["/admin/:path*"] }` to limit proxy execution to admin routes.

**Rationale**: Without the matcher, the proxy would run on every request (including public pages, API routes, static files). The matcher ensures the auth check only applies to admin routes.

## Risks / Trade-offs

- **Less granular control**: Using `export { auth as proxy }` means we rely on Auth.js's default redirect behavior. If we need custom logic (e.g., role-based access), we'd need to add the `authorized` callback. Mitigated by the fact that current requirements only need basic auth check.
- **Auth.js version dependency**: This pattern requires `next-auth@beta` (v5). The project already uses v5.0.0-beta.31.
