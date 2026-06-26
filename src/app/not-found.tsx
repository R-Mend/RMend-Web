import { redirect } from "next/navigation";

// Mirrors the old `<Redirect from="*" to="/" />` catch-all route.
export default function NotFound() {
    redirect("/");
}
