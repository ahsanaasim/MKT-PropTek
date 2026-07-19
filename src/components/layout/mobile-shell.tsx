"use client";

import { BottomNavBar } from "@/components/layout/bottom-nav";
import { TopBar } from "@/components/layout/top-bar";
import type { User, UserRole } from "@/lib/types";
import { cn } from "@/lib/utils";

export function MobileShell({
  children,
  role,
  user,
  onNotifications,
  showTopBar = true,
  showBottomNav = true,
  className,
}: {
  children: React.ReactNode;
  role: UserRole;
  user: User;
  onNotifications?: () => void;
  showTopBar?: boolean;
  showBottomNav?: boolean;
  className?: string;
}) {
  const homeHref = role === "poster" ? "/poster/home" : "/team/home";

  return (
    <div className="min-h-dvh bg-[radial-gradient(120%_80%_at_50%_-10%,#fff1f3_0%,#ffffff_45%,#f7f3ef_100%)]">
      <div
        className={cn(
          "relative mx-auto flex min-h-dvh w-full max-w-md flex-col bg-transparent",
          className,
        )}
      >
        {showTopBar ? (
          <TopBar
            user={user}
            homeHref={homeHref}
            onNotifications={onNotifications}
          />
        ) : null}
        <main
          className={cn(
            "flex-1 px-4 py-4",
            showBottomNav && "pb-24",
          )}
        >
          {children}
        </main>
        {showBottomNav ? <BottomNavBar role={role} /> : null}
      </div>
    </div>
  );
}

export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-[radial-gradient(100%_80%_at_50%_0%,#fff1f3_0%,#f7f3ef_40%,#ffffff_100%)] px-4 py-10">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
