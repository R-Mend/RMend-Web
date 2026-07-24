import Link from "next/link";

export function Navbar() {
    return (
        <nav className="flex w-full shrink-0 items-center gap-6 border-b border-line bg-elevated px-6 py-3">
            <Link href="/" className="font-display text-2xl leading-none tracking-wide text-fg">
                RMend
            </Link>

            {/* Replace with Neon Auth State Handling (updated redux state) */}
            {true && (
                <ul className="flex items-center gap-1">
                    <li>
                        <Link
                            href="/"
                            className="rounded-md px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface hover:text-fg"
                        >
                            Reports <span className="sr-only">(current)</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/users"
                            className="rounded-md px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface hover:text-fg"
                        >
                            Users
                        </Link>
                    </li>
                </ul>
            )}
        </nav>
    );
}
