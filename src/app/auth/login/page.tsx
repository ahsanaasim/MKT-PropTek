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
import { StateBanners } from "@/components/states/status-banners";
import { useScreenState } from "@/providers/screen-state-provider";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const role = params.get("role") === "team" ? "team" : "poster";
  const { state } = useScreenState();
  const [email, setEmail] = useState(
    role === "team" ? "hello@coastalclean.co" : "ava@meridianprops.com",
  );
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [localError, setLocalError] = useState(false);

  const effective = state === "ready" && localError ? "error" : state;
  const loading = submitting || effective === "loading";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLocalError(false);
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);
    if (!password) {
      setLocalError(true);
      return;
    }
    router.push(role === "team" ? "/team/home" : "/poster/home");
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
            Sign in to your PropTek marketplace account.
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <StateBanners
          state={effective}
          onRetry={() => setLocalError(false)}
          onUpgrade={() => router.push("/profile")}
        />
        {effective === "error" || localError ? (
          <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
            Invalid email or password. Try again.
          </div>
        ) : null}
        <form className="space-y-4" onSubmit={onSubmit}>
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
