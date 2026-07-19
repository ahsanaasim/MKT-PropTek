"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { Loader2 } from "lucide-react";
import { BrandLogo } from "@/components/brand/logo";
import { AuthShell } from "@/components/layout/mobile-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StateBanners } from "@/components/states/status-banners";
import { useScreenState } from "@/providers/screen-state-provider";
import { cn } from "@/lib/utils";
import type { UserRole } from "@/lib/types";

function RegisterForm() {
  const router = useRouter();
  const params = useSearchParams();
  const { state } = useScreenState();
  const [role, setRole] = useState<UserRole>(
    params.get("role") === "team" ? "team" : "poster",
  );
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!agree) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    router.push(role === "team" ? "/team/home" : "/poster/home");
  }

  return (
    <Card className="rounded-lg border-border/80 shadow-sm">
      <CardHeader className="space-y-3 text-center">
        <BrandLogo href="/" />
        <div>
          <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
            Create your account
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Join PropTek as a job poster or cleanup team.
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <StateBanners state={state} onUpgrade={() => router.push("/profile")} />
        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="space-y-2">
            <Label>I am a…</Label>
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
                  onClick={() => setRole(opt.id)}
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
            <Label htmlFor="name">Name</Label>
            <Input id="name" required className="h-11 rounded-md" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" required className="h-11 rounded-md" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              className="h-11 rounded-md"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">Company (optional)</Label>
            <Input id="company" className="h-11 rounded-md" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" type="tel" required className="h-11 rounded-md" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              required
              placeholder="San Francisco, CA"
              className="h-11 rounded-md"
            />
          </div>
          <label className="flex items-start gap-2 text-sm">
            <Checkbox
              checked={agree}
              onCheckedChange={(v) => setAgree(Boolean(v))}
              className="mt-0.5"
            />
            <span>
              I agree to the PropTek terms and privacy policy.
            </span>
          </label>
          <Button
            type="submit"
            className="h-11 w-full rounded-md"
            disabled={!agree || loading || state === "loading"}
          >
            {loading || state === "loading" ? (
              <Loader2 className="size-4 animate-spin" />
            ) : null}
            Create account
          </Button>
        </form>
      </CardContent>
      <CardFooter className="justify-center">
        <Link
          href="/auth/login"
          className="text-sm text-primary underline-offset-4 hover:underline"
        >
          Back to login
        </Link>
      </CardFooter>
    </Card>
  );
}

export default function RegisterPage() {
  return (
    <AuthShell>
      <Suspense fallback={<div className="h-96 animate-pulse rounded-lg bg-muted" />}>
        <RegisterForm />
      </Suspense>
    </AuthShell>
  );
}
