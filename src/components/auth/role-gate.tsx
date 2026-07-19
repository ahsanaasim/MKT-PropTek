"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/providers/auth-provider";
import { canAccessPath, homeForRole, isPublicPath } from "@/lib/auth";
import type { UserRole } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

export function RoleGate({
  children,
  allow,
}: {
  children: React.ReactNode;
  /** Force a specific role for this subtree (e.g. poster layout) */
  allow?: UserRole;
}) {
  const { user, role, ready } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!ready) return;

    if (!user || !role) {
      if (!isPublicPath(pathname)) {
        const intent =
          allow ||
          (pathname.startsWith("/team")
            ? "team"
            : pathname.startsWith("/poster")
              ? "poster"
              : "poster");
        router.replace(`/auth/login?role=${intent}&next=${encodeURIComponent(pathname)}`);
      }
      return;
    }

    if (allow && role !== allow) {
      router.replace(`/denied?from=${encodeURIComponent(pathname)}&need=${allow}`);
      return;
    }

    if (!canAccessPath(role, pathname)) {
      router.replace(`/denied?from=${encodeURIComponent(pathname)}`);
    }
  }, [ready, user, role, pathname, router, allow]);

  if (!ready) {
    return (
      <div className="mx-auto flex min-h-dvh max-w-md flex-col gap-3 p-4">
        <Skeleton className="h-12 w-full rounded-lg" />
        <Skeleton className="h-40 w-full rounded-lg" />
        <Skeleton className="h-40 w-full rounded-lg" />
      </div>
    );
  }

  if (!user || !role) {
    return (
      <div className="mx-auto flex min-h-dvh max-w-md flex-col gap-3 p-4">
        <Skeleton className="h-12 w-full rounded-lg" />
        <p className="text-center text-sm text-muted-foreground">Redirecting to login…</p>
      </div>
    );
  }

  if (allow && role !== allow) {
    return (
      <div className="mx-auto flex min-h-dvh max-w-md flex-col gap-3 p-4">
        <Skeleton className="h-12 w-full rounded-lg" />
        <p className="text-center text-sm text-muted-foreground">
          Checking permissions…
        </p>
      </div>
    );
  }

  if (!canAccessPath(role, pathname)) {
    return null;
  }

  return <>{children}</>;
}

export function AuthRedirectIfSignedIn({ children }: { children: React.ReactNode }) {
  const { user, role, ready } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!ready || !user || !role) return;
    router.replace(homeForRole(role));
  }, [ready, user, role, router]);

  return <>{children}</>;
}
