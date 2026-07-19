"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export interface JobDraft {
  title: string;
  description: string;
  address: string;
  budget: string;
  deadline: string;
  urgency: boolean;
  media: string[];
}

const defaultDraft: JobDraft = {
  title: "Post-renovation debris clear-out",
  description:
    "Full property clean-out after kitchen remodel including haul-away.",
  address: "1428 Valencia St, San Francisco",
  budget: "850",
  deadline: "2026-07-24T17:00",
  urgency: true,
  media: ["kitchen-before.jpg"],
};

const Ctx = createContext<{
  draft: JobDraft;
  setDraft: React.Dispatch<React.SetStateAction<JobDraft>>;
} | null>(null);

export function JobDraftProvider({ children }: { children: ReactNode }) {
  const [draft, setDraft] = useState(defaultDraft);
  const value = useMemo(() => ({ draft, setDraft }), [draft]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useJobDraft() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useJobDraft requires JobDraftProvider");
  return ctx;
}
