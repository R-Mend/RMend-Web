import { auth } from "@/lib/auth/server";

// Neon Auth API route handler — backs sign-in/up, sessions, OAuth callbacks.
export const { GET, POST } = auth.handler();
