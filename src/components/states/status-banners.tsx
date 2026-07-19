"use client";

import { AlertTriangle, Ban, Crown, RefreshCw } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import type { ScreenState } from "@/lib/types";

export function ErrorBanner({
  message = "Something went wrong loading this screen.",
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <Alert variant="destructive" className="rounded-lg border-destructive/30">
      <AlertTriangle className="size-4" />
      <AlertTitle>Couldn&apos;t load</AlertTitle>
      <AlertDescription className="flex flex-col gap-3">
        <span>{message}</span>
        {onRetry ? (
          <Button size="sm" variant="outline" onClick={onRetry} className="w-fit">
            <RefreshCw className="size-3.5" />
            Retry
          </Button>
        ) : null}
      </AlertDescription>
    </Alert>
  );
}

export function PlanLimitBanner({ onUpgrade }: { onUpgrade?: () => void }) {
  return (
    <Alert className="rounded-lg border-[#FF385C]/25 bg-[#FFF1F3]">
      <Crown className="size-4 text-primary" />
      <AlertTitle className="text-foreground">Plan limit reached</AlertTitle>
      <AlertDescription className="flex flex-col gap-3 text-muted-foreground">
        <span>Upgrade membership to post more jobs and unlock advanced filters.</span>
        <Button size="sm" className="w-fit rounded-md" onClick={onUpgrade}>
          Upgrade plan
        </Button>
      </AlertDescription>
    </Alert>
  );
}

export function PermissionDeniedBanner({
  message = "You do not have permission to view this content.",
}: {
  message?: string;
}) {
  return (
    <Alert className="rounded-lg border-amber-300 bg-amber-50">
      <Ban className="size-4 text-amber-700" />
      <AlertTitle>Permission denied</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}

export function StateBanners({
  state,
  onRetry,
  onUpgrade,
}: {
  state: ScreenState;
  onRetry?: () => void;
  onUpgrade?: () => void;
}) {
  if (state === "error") return <ErrorBanner onRetry={onRetry} />;
  if (state === "plan_limit") return <PlanLimitBanner onUpgrade={onUpgrade} />;
  if (state === "permission_denied") return <PermissionDeniedBanner />;
  return null;
}
