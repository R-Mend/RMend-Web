import { createNeonAuth } from "@neondatabase/auth/next/server";

/**
 * Server-side Neon Auth instance. Reads the Neon Auth base URL and cookie
 * secret from the environment (see RMend-Web/.env, populated by
 * `neonctl env pull` plus a generated NEON_AUTH_COOKIE_SECRET).
 */
export const auth = createNeonAuth({
  baseUrl: process.env.NEON_AUTH_BASE_URL!,
  cookies: {
    secret: process.env.NEON_AUTH_COOKIE_SECRET!,
  },
});
