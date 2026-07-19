"use client";

import { useState } from "react";
import { Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useScreenState } from "@/providers/screen-state-provider";
import type { ScreenState } from "@/lib/types";
import { cn } from "@/lib/utils";

const options: { value: ScreenState; label: string }[] = [
  { value: "ready", label: "Ready" },
  { value: "loading", label: "Loading" },
  { value: "empty", label: "Empty" },
  { value: "error", label: "Error" },
  { value: "plan_limit", label: "Plan limit" },
  { value: "permission_denied", label: "Permission" },
];

export function StatePreviewFab() {
  const { state, setState } = useScreenState();
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed right-4 bottom-24 z-50 md:bottom-8">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          render={
            <Button
              size="sm"
              variant="secondary"
              className="rounded-full border border-zinc-300 bg-zinc-900 px-3.5 text-white shadow-lg hover:bg-zinc-800"
              aria-label="Preview screen states"
            />
          }
        >
          <Layers className="size-3.5" />
          States
        </PopoverTrigger>
        <PopoverContent align="end" className="w-48 rounded-lg p-2">
          <p className="mb-2 px-2 text-xs font-medium text-muted-foreground">
            Screen state
          </p>
          <div className="flex flex-col gap-1">
            {options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  setState(opt.value);
                  setOpen(false);
                }}
                className={cn(
                  "rounded-md px-2.5 py-2 text-left text-sm transition-colors",
                  state === opt.value
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted",
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
