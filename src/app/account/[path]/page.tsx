import { AccountView } from "@neondatabase/auth/react";
import { accountViewPaths } from "@neondatabase/auth/react/ui/server";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.values(accountViewPaths).map((path) => ({ path }));
}

// Account paths: settings, security
export default async function AccountPage({
  params,
}: {
  params: Promise<{ path: string }>;
}) {
  const { path } = await params;
  return (
    <div className="w-full overflow-y-auto p-4">
      <div className="mx-auto flex min-h-full max-w-2xl items-center justify-center">
        <AccountView path={path} />
      </div>
    </div>
  );
}
