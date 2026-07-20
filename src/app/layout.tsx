import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.css";
import "react-tabs/style/react-tabs.css";
import "@neondatabase/auth/ui/css";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
    title: "RMend",
    description: "RMend organization web console",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
            </head>
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
