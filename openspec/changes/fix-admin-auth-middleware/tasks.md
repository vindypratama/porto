## 1. Fix proxy.ts export pattern

- [x] 1.1 Replace `export default auth(...)` with `export { auth as proxy } from "@/auth"` in `proxy.ts`
- [x] 1.2 Keep the `config` export with matcher `["/admin/:path*"]`

## 2. Verify

- [x] 2.1 Run `npm run build` and confirm no errors
- [x] 2.2 Verify admin pages redirect to login when unauthenticated (test `/admin/posts` without session)
- [x] 2.3 Verify `/admin/login` is accessible without authentication
- [x] 2.4 Verify authenticated users can access admin pages normally
