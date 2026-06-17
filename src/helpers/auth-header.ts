import type { AuthUser } from "../types";

export function authHeader(): Record<string, string> {
    // return authorization header with jwt token
    if (typeof window === "undefined") {
        return {};
    }

    const stored = localStorage.getItem("user");
    const user: AuthUser | null = stored ? JSON.parse(stored) : null;

    if (user && user.token) {
        return { Authorization: "Bearer " + user.token };
    } else {
        return {};
    }
}
