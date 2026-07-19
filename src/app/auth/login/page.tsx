"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { BrandLogo } from "@/components/brand/logo";
import { AuthShell } from "@/components/layout/mobile-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  PermissionDeniedBanner,
  PlanLimitBanner,
} from "@/components/states/status-banners";
import { useScreenState } from "@/providers/screen-state-provider";
import { useAuth } from "@/providers/auth-provider";
import { homeForRole } from "@/lib/auth";
import { cn } from "@/lib/utils";
import type { UserRole } from "@/lib/types";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const { login } = useAuth();
  const { state, setState } = useScreenState();
  const [role, setRole] = useState<UserRole>(
    params.get("role") === "team" ? "team" : "poster",
  );
  const [email, setEmail] = useState(
    role === "team" ? "hello@coastalclean.co" : "ava@meridianprops.com",
  );
  const [password, setPassword] = useState("demo");
  const [show, setShow] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const loading = submitting || state === "loading";
  const showLoginError = state === "error";
  const next = params.get("next");

  function selectRole(nextRole: UserRole) {
    setRole(nextRole);
    setEmail(
      nextRole === "team" ? "hello@coastalclean.co" : "ava@meridianprops.com",
    );
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    setSubmitting(false);
    setState("ready");
    const session = login({ email, role });
    const dest =
      next && next.startsWith("/") && !next.startsWith("//")
        ? next
        : homeForRole(session.role);
    router.push(dest);
  }

  return (
    <Card className="rounded-lg border-border/80 shadow-sm">
      <CardHeader className="space-y-4 text-center">
        <BrandLogo className="justify-self-center" />
        <div>
          <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
            Welcome back
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Sign in once — we route you to your role home.
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {showLoginError ? (
          <div
            role="alert"
            className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive"
          >
            Invalid email or password. Try again.
          </div>
        ) : null}
        {state === "plan_limit" ? (
          <PlanLimitBanner onUpgrade={() => router.push("/profile")} />
        ) : null}
        {state === "permission_denied" ? <PermissionDeniedBanner /> : null}
        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="space-y-2">
            <Label>Continue as</Label>
            <div className="grid grid-cols-2 gap-2">
              {(
                [
                  { id: "poster", label: "Job Poster" },
                  { id: "team", label: "Clean Up Team" },
                ] as const
              ).map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => selectRole(opt.id)}
                  className={cn(
                    "rounded-lg border px-3 py-3 text-sm font-medium transition-colors",
                    role === opt.id
                      ? "border-primary bg-accent text-foreground"
                      : "border-border bg-white",
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 rounded-md"
              autoComplete="email"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 rounded-md pe-10"
                autoComplete="current-password"
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground"
                onClick={() => setShow((s) => !s)}
                aria-label={show ? "Hide password" : "Show password"}
              >
                {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>
          <Button
            type="submit"
            className="h-11 w-full rounded-md"
            disabled={loading || !email}
          >
            {loading ? <Loader2 className="size-4 animate-spin" /> : null}
            Log in
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 text-sm">
        <Link
          href="/auth/forgot"
          className="text-primary underline-offset-4 hover:underline"
        >
          Forgot password?
        </Link>
        <p className="text-muted-foreground">
          New here?{" "}
          <Link
            href={`/auth/register?role=${role}`}
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Create an account
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}

export default function LoginPage() {
  return (
    <AuthShell>
      <Suspense fallback={<div className="h-80 animate-pulse rounded-lg bg-muted" />}>
        <LoginForm />
      </Suspense>
    </AuthShell>
  );
}
