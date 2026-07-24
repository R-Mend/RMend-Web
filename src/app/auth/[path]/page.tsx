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
  return (
    <div className="w-full overflow-y-auto p-4">
      <div className="mx-auto flex min-h-full max-w-md items-center justify-center">
        <AuthView path={path} />
      </div>
    </div>
  );
}
