"use server";

import { AuthView } from "@neondatabase/auth/react";

const dynamicParams = false;

// Auth paths: sign-in, sign-up, forgot-password, reset-password,
// magic-link, two-factor, callback, sign-out
export default async function AuthPage({
  params,
}: {
  params: Promise<{ path: string }>;
}) {
  const { path } = await params;
  return <AuthView path={path} />;
}
