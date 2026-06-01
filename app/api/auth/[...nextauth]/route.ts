/**
 * app/api/auth/[...nextauth]/route.ts
 * Route handler Auth.js untuk Next.js App Router.
 */

import { handlers } from "@/auth";

export const { GET, POST } = handlers;
