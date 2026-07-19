"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Ban } from "lucide-react";
import { BrandLogo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { LinkButton } from "@/components/ui/link-button";
import { useAuth } from "@/providers/auth-provider";
import { homeForRole } from "@/lib/auth";

function DeniedContent() {
  const params = useSearchParams();
  const router = useRouter();
  const { user, role, logout } = useAuth();
  const need = params.get("need");
  const from = params.get("from");
  const switchRole =
    need === "team" || need === "poster"
      ? need
      : role === "poster"
        ? "team"
        : "poster";

  return (
    <div className="flex min-h-dvh items-center justify-center bg-[radial-gradient(100%_80%_at_50%_0%,#fff1f3_0%,#f7f3ef_45%,#ffffff_100%)] px-4">
      <div className="mx-auto w-full max-w-md space-y-6 text-center">
        <BrandLogo />
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-amber-100 text-amber-800">
          <Ban className="size-7" />
        </div>
        <div className="space-y-2">
          <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
            Permission denied
          </h1>
          <p className="text-sm text-muted-foreground">
            {need
              ? `That screen is only available to ${need === "team" ? "cleanup teams" : "job posters"}.`
              : "You don’t have access to that area of PropTek."}
            {from ? (
              <>
                {" "}
                (<span className="font-medium text-foreground">{from}</span>)
              </>
            ) : null}
          </p>
          {role ? (
            <p className="text-sm text-muted-foreground">
              Signed in as <strong>{user?.name}</strong> (
              {role === "team" ? "Clean Up Team" : "Job Poster"}).
            </p>
          ) : null}
        </div>
        <div className="grid gap-2">
          {role ? (
            <LinkButton className="h-11 rounded-md" href={homeForRole(role)}>
              Go to my home
            </LinkButton>
          ) : (
            <LinkButton className="h-11 rounded-md" href="/auth/login">
              Log in
            </LinkButton>
          )}
          {role ? (
            <Button
              variant="outline"
              className="h-11 rounded-md"
              onClick={() => {
                logout();
                router.push(`/auth/login?role=${switchRole}`);
              }}
            >
              Switch role (sign in again)
            </Button>
          ) : null}
          <LinkButton variant="outline" className="h-11 rounded-md" href="/">
            Go home
          </LinkButton>
        </div>
        <p className="text-xs text-muted-foreground">
          Need help?{" "}
          <Link href="mailto:support@proptek.app" className="underline">
            Contact support
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function PermissionDeniedPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-dvh items-center justify-center text-sm text-muted-foreground">
          Loading…
        </div>
      }
    >
      <DeniedContent />
    </Suspense>
  );
}
