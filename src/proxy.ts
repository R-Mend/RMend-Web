import { auth } from "@/lib/auth/server";
import type { NextRequest } from "next/server";

// Require authentication on every page and route except the ones needed to
// perform login and related actions: the /auth pages and the /api/auth route.
// Next internals and static assets are also excluded so the middleware never
// runs on them.
const neonMiddleware = auth.middleware({
  loginUrl: "/auth/sign-in",
});

export default async function proxy(request: NextRequest) {
  return await neonMiddleware(request);
}

export const config = {
  // Does not need to exclude /auth routes as the Neon Auth middleware skips them internally
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
