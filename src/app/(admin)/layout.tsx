import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.css";
import "react-tabs/style/react-tabs.css";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
    title: "RMend",
    description: "RMend authority web console",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
            </head>
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
