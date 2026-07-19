import type { UserRole } from "@/lib/types";

export const AUTH_STORAGE_KEY = "proptek.auth.session";

export function homeForRole(role: UserRole) {
  return role === "team" ? "/team/home" : "/poster/home";
}

/** Public routes — no session required */
export function isPublicPath(pathname: string) {
  if (pathname === "/") return true;
  if (pathname.startsWith("/auth/")) return true;
  if (pathname === "/denied") return true;
  return false;
}

/** Which role owns a path, or null if shared/public */
export function requiredRoleForPath(pathname: string): UserRole | "any" | null {
  if (isPublicPath(pathname)) return null;
  if (pathname.startsWith("/poster")) return "poster";
  if (pathname.startsWith("/team")) return "team";
  if (pathname === "/profile" || pathname.startsWith("/profile/")) return "any";
  return "any";
}

export function canAccessPath(role: UserRole | null, pathname: string) {
  const required = requiredRoleForPath(pathname);
  if (required === null) return true;
  if (!role) return false;
  if (required === "any") return true;
  return role === required;
}

export const posterAllowedPrefixes = [
  "/poster",
  "/profile",
  "/auth",
  "/denied",
  "/",
] as const;

export const teamAllowedPrefixes = [
  "/team",
  "/profile",
  "/auth",
  "/denied",
  "/",
] as const;
