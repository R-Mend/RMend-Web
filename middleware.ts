import { auth } from "@/lib/auth/server";

// NOTE: scoped to /account only for now. The existing admin console still
// uses the legacy Redux/localStorage-JWT guard (RequireAuth). Broaden this
// matcher to the admin routes as part of the Phase 4 migration to Neon Auth.
export default auth.middleware({
  loginUrl: "/auth/sign-in",
});

export const config = {
  matcher: ["/account/:path*"],
};
