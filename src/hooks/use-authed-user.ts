"use client";

import { useAuth } from "@/providers/auth-provider";
import type { User, UserRole } from "@/lib/types";
import { currentPoster, currentTeam } from "@/lib/data";

/** Session user with safe fixture fallback while auth hydrates inside a RoleGate. */
export function useAuthedUser(expected?: UserRole): {
  user: User;
  role: UserRole;
  ready: boolean;
} {
  const { user, role, ready } = useAuth();
  const resolvedRole = role ?? expected ?? "poster";
  const resolvedUser =
    user ?? (resolvedRole === "team" ? currentTeam : currentPoster);
  return { user: resolvedUser, role: resolvedRole, ready };
}
