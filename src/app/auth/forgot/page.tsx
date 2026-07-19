"use client";

import Link from "next/link";
import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { BrandLogo } from "@/components/brand/logo";
import { AuthShell } from "@/components/layout/mobile-shell";
import { Button } from "@/components/ui/button"
import { LinkButton } from "@/components/ui/link-button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StateBanners } from "@/components/states/status-banners";
import { useScreenState } from "@/providers/screen-state-provider";

export default function ForgotPasswordPage() {
  const { state } = useScreenState();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);
    setSuccess(true);
  }

  return (
    <AuthShell>
      <Card className="rounded-lg border-border/80 shadow-sm">
        <CardHeader className="space-y-3 text-center">
          <BrandLogo href="/auth/login" />
          <div>
            <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
              Reset password
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Enter your email and we&apos;ll send a reset link.
            </p>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <StateBanners state={state} />
          {success && state === "ready" ? (
            <div className="flex flex-col items-center gap-3 rounded-lg bg-emerald-50 px-4 py-8 text-center">
              <CheckCircle2 className="size-8 text-emerald-600" />
              <p className="font-medium">Check your inbox</p>
              <p className="text-sm text-muted-foreground">
                If an account exists for {email}, you&apos;ll receive a reset link shortly.
              </p>
              <LinkButton className="rounded-md" href="/auth/login">Back to login</LinkButton>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={onSubmit}>
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 rounded-md"
                />
              </div>
              <Button
                type="submit"
                className="h-11 w-full rounded-md"
                disabled={loading || state === "loading"}
              >
                {loading || state === "loading" ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : null}
                Send reset link
              </Button>
            </form>
          )}
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
    </AuthShell>
  );
}
