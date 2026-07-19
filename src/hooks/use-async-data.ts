"use client";

import { useEffect, useState } from "react";
import { useScreenState } from "@/providers/screen-state-provider";
import type { ScreenState } from "@/lib/types";

export function useAsyncData<T>(loader: () => T, deps: unknown[] = []) {
  const { state: preview } = useScreenState();
  const [data, setData] = useState<T | null>(null);
  const [internal, setInternal] = useState<ScreenState>("loading");

  useEffect(() => {
    let alive = true;
    setInternal("loading");
    setData(null);
    const timer = window.setTimeout(() => {
      if (!alive) return;
      try {
        const result = loader();
        setData(result);
        setInternal("ready");
      } catch {
        setInternal("error");
      }
    }, 650);
    return () => {
      alive = false;
      window.clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  const effective: ScreenState =
    preview === "ready" ? internal : preview;

  return { data, state: effective, reloadKey: internal };
}
