"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button"
import { LinkButton } from "@/components/ui/link-button";
import { cn } from "@/lib/utils";
import { StateBanners } from "@/components/states/status-banners";
import { useScreenState } from "@/providers/screen-state-provider";
import { MembershipModal } from "@/components/overlays/job-overlays";
import { useState } from "react";

const steps = [
  { href: "/poster/job/new/details", label: "Details" },
  { href: "/poster/job/new/budget", label: "Budget" },
  { href: "/poster/job/new/media", label: "Media" },
  { href: "/poster/job/new/review", label: "Review" },
];

export function WizardShell({
  title,
  children,
  preview,
}: {
  title: string;
  children: React.ReactNode;
  preview?: React.ReactNode;
}) {
  const pathname = usePathname();
  const { state, setState } = useScreenState();
  const [membershipOpen, setMembershipOpen] = useState(false);
  const index = Math.max(
    0,
    steps.findIndex((s) => pathname.startsWith(s.href)),
  );

  return (
    <div className="min-h-dvh bg-[radial-gradient(120%_80%_at_50%_-10%,#fff1f3_0%,#ffffff_50%,#f7f3ef_100%)]">
      <div className="mx-auto flex min-h-dvh max-w-md flex-col">
        <header className="sticky top-0 z-20 border-b bg-white/90 px-4 py-3 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <LinkButton variant="ghost" size="icon" className="rounded-md" href="/poster/home" aria-label="Cancel"><ChevronLeft className="size-5" /></LinkButton>
            <div>
              <p className="text-xs text-muted-foreground">
                Step {index + 1} of {steps.length}
              </p>
              <h1 className="font-[family-name:var(--font-display)] text-lg font-semibold">
                {title}
              </h1>
            </div>
          </div>
          <div className="mt-3 flex gap-1">
            {steps.map((s, i) => (
              <div
                key={s.href}
                className={cn(
                  "h-1.5 flex-1 rounded-full",
                  i <= index ? "bg-primary" : "bg-border",
                )}
              />
            ))}
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 px-4 py-4 pb-8">
          <StateBanners
            state={state}
            onRetry={() => setState("ready")}
            onUpgrade={() => setMembershipOpen(true)}
          />
          {state === "loading" ? (
            <div className="space-y-3">
              <div className="h-10 animate-pulse rounded-md bg-muted" />
              <div className="h-24 animate-pulse rounded-md bg-muted" />
              <div className="h-10 animate-pulse rounded-md bg-muted" />
            </div>
          ) : (
            <>
              <div className="space-y-4">{children}</div>
              {preview ? (
                <aside className="rounded-lg border bg-white/80 p-4 shadow-sm">
                  <p className="mb-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                    Merchandising preview
                  </p>
                  {preview}
                </aside>
              ) : null}
            </>
          )}
        </div>
      </div>
      <MembershipModal open={membershipOpen} onOpenChange={setMembershipOpen} />
    </div>
  );
}
