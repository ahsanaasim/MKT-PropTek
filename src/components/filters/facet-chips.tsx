"use client";

import { cn } from "@/lib/utils";

export function FacetChips({
  options,
  value,
  onChange,
  multi = false,
  className,
}: {
  options: { label: string; value: string }[];
  value: string | string[];
  onChange: (next: string | string[]) => void;
  multi?: boolean;
  className?: string;
}) {
  const selected = Array.isArray(value) ? value : [value];

  function toggle(v: string) {
    if (!multi) {
      onChange(v === selected[0] ? "" : v);
      return;
    }
    const set = new Set(selected.filter(Boolean));
    if (set.has(v)) set.delete(v);
    else set.add(v);
    onChange(Array.from(set));
  }

  return (
    <div
      className={cn(
        "flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        className,
      )}
    >
      {options.map((opt) => {
        const active = selected.includes(opt.value);
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => toggle(opt.value)}
            className={cn(
              "shrink-0 rounded-full border px-3.5 py-2 text-sm font-medium transition-all duration-200",
              active
                ? "border-primary bg-primary text-primary-foreground shadow-sm"
                : "border-border bg-white text-foreground hover:border-primary/40",
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
