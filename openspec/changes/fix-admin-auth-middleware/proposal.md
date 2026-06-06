## Why

Admin pages (`/admin/*`) can be accessed without authentication on the VPS. The `proxy.ts` file uses the old Auth.js middleware pattern (`export default auth(...)`) which is not compatible with Next.js 16's proxy convention. Next.js 16 expects the proxy function to be exported as a named `proxy` export or as `export { auth as proxy }`. The current code never executes as a proxy, leaving all admin routes unprotected.

## What Changes

- Update `proxy.ts` to use the Next.js 16 Auth.js pattern: `export { auth as proxy } from "@/auth"`
- Keep the `config` matcher to limit proxy to `/admin/*` routes
- Auth.js's `auth` function already handles session checking and redirects to `/admin/login` (configured in `auth.ts` via `pages.signIn`)

## Capabilities

### New Capabilities
- `admin-proxy-auth`: Updated `proxy.ts` using Next.js 16's `export { auth as proxy }` pattern to protect admin routes

### Modified Capabilities

## Impact

- **Files**: Modified `proxy.ts` (simplified to use Auth.js's built-in proxy export)
- **Behavior**: All `/admin/*` routes will require authentication; unauthenticated users redirected to `/admin/login`
- **No breaking changes**: Auth.js configuration in `auth.ts` remains unchanged
