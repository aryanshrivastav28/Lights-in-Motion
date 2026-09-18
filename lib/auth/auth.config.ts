import type { UserRole } from "./types";

/**
 * Authentication configuration foundation for Light in Motion.
 * In production this integrates with Auth.js / NextAuth providers and Prisma adapter.
 */
export const authConfig = {
  pages: {
    signIn: "/store?action=login",
    error: "/store?action=auth-error",
  },
  callbacks: {
    authorized({
      auth,
      request,
    }: {
      auth: { user?: { role?: UserRole } } | null;
      request: { nextUrl: { pathname: string } };
    }) {
      const isLoggedIn = !!auth?.user;
      const pathname = request.nextUrl.pathname;

      // Protect administrative routes
      if (pathname.startsWith("/admin")) {
        if (!isLoggedIn) return false;
        return auth?.user?.role === "ADMIN";
      }

      // Protect customer-specific account endpoints
      if (pathname.startsWith("/account")) {
        return isLoggedIn;
      }

      return true;
    },
  },
};
