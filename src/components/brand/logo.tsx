import Link from "next/link";
import { cn } from "@/lib/utils";

export function BrandLogo({
  href = "/",
  className,
  size = "md",
}: {
  href?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizes = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-4xl",
  };
  return (
    <Link
      href={href}
      className={cn(
        "font-[family-name:var(--font-display)] font-semibold tracking-tight text-primary",
        sizes[size],
        className,
      )}
    >
      PropTek
    </Link>
  );
}
