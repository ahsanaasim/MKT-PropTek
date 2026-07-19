import Link from "next/link";
import { Compass } from "lucide-react";
import { BrandLogo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button"
import { LinkButton } from "@/components/ui/link-button";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-[radial-gradient(100%_80%_at_50%_0%,#fff1f3_0%,#f7f3ef_45%,#ffffff_100%)] px-4">
      <div className="mx-auto w-full max-w-md space-y-6 text-center">
        <BrandLogo />
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Compass className="size-7" />
        </div>
        <div className="space-y-2">
          <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
            Page not found
          </h1>
          <p className="text-sm text-muted-foreground">
            That route isn&apos;t in the PropTek marketplace. Head back to the
            gallery home.
          </p>
        </div>
        <LinkButton className="h-11 rounded-md" href="/">Go home</LinkButton>
      </div>
    </div>
  );
}
