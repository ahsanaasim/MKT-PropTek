"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import type { ScreenState } from "@/lib/types";

interface ScreenStateContextValue {
  state: ScreenState;
  setState: (state: ScreenState) => void;
  reset: () => void;
}

const ScreenStateContext = createContext<ScreenStateContextValue | null>(null);

export function ScreenStateProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [state, setState] = useState<ScreenState>("ready");
  const reset = useCallback(() => setState("ready"), []);

  // Preview state is per-screen; return to Ready on navigation.
  useEffect(() => {
    setState("ready");
  }, [pathname]);

  const value = useMemo(() => ({ state, setState, reset }), [state, reset]);
  return (
    <ScreenStateContext.Provider value={value}>{children}</ScreenStateContext.Provider>
  );
}

export function useScreenState() {
  const ctx = useContext(ScreenStateContext);
  if (!ctx) throw new Error("useScreenState must be used within ScreenStateProvider");
  return ctx;
}
