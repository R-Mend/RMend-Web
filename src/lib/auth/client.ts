"use client";

import { createAuthClient } from "@neondatabase/auth/next";

/** Client-side Neon Auth instance, used by the UI components/provider. */
export const authClient = createAuthClient();
