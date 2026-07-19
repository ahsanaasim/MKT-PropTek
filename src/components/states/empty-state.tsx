import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  secondaryLabel,
  onSecondary,
}: {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  secondaryLabel?: string;
  onSecondary?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-lg bg-[linear-gradient(160deg,#fff7f8_0%,#ffffff_55%,#f7f3ef_100%)] px-6 py-14 text-center">
      <div className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary animate-in fade-in zoom-in duration-500">
        <Sparkles className="size-7" />
      </div>
      <div className="space-y-2">
        <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold">
          {title}
        </h3>
        <p className="max-w-xs text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {actionLabel && onAction ? (
          <Button className="rounded-md" onClick={onAction}>
            {actionLabel}
          </Button>
        ) : null}
        {secondaryLabel && onSecondary ? (
          <Button variant="outline" className="rounded-md" onClick={onSecondary}>
            {secondaryLabel}
          </Button>
        ) : null}
      </div>
    </div>
  );
}
