"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Download, Search } from "lucide-react";
import { MobileShell } from "@/components/layout/mobile-shell";
import { JobCard, JobCardSkeleton } from "@/components/jobs/job-card";
import { FacetChips } from "@/components/filters/facet-chips";
import { EmptyState } from "@/components/states/empty-state";
import { StateBanners } from "@/components/states/status-banners";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAsyncData } from "@/hooks/use-async-data";
import { useScreenState } from "@/providers/screen-state-provider";
import type { Job, User, UserRole } from "@/lib/types";
import { toast } from "sonner";

export function JobHistoryScreen({
  role,
  user,
  loader,
  detailBase,
}: {
  role: UserRole;
  user: User;
  loader: () => Job[];
  detailBase: string;
}) {
  const { setState } = useScreenState();
  const [status, setStatus] = useState("");
  const [payment, setPayment] = useState("");
  const [query, setQuery] = useState("");
  const { data, state } = useAsyncData(loader, []);

  const filtered = useMemo(() => {
    let list = data || [];
    if (status) list = list.filter((j) => j.status === status);
    if (payment) list = list.filter((j) => j.paymentStatus === payment);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          (j.teamName || "").toLowerCase().includes(q),
      );
    }
    return list;
  }, [data, status, payment, query]);

  return (
    <MobileShell role={role} user={user}>
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
              Job history
            </h1>
            <p className="text-sm text-muted-foreground">
              {filtered.length} past jobs
            </p>
          </div>
          <Button
            size="sm"
            variant="outline"
            className="rounded-md"
            onClick={() => toast.success("History export started")}
          >
            <Download className="size-4" />
            Export
          </Button>
        </div>

        <StateBanners state={state} onRetry={() => setState("ready")} />

        <div className="relative">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search history"
            className="h-11 rounded-md ps-9"
          />
        </div>

        <FacetChips
          options={[
            { label: "All", value: "" },
            { label: "Approved", value: "approved" },
            { label: "Paid", value: "paid" },
            { label: "Disputed", value: "disputed" },
          ]}
          value={status}
          onChange={(v) => setStatus(String(v))}
        />
        <FacetChips
          options={[
            { label: "Any payment", value: "" },
            { label: "Held", value: "held" },
            { label: "Released", value: "released" },
            { label: "Pending", value: "pending" },
          ]}
          value={payment}
          onChange={(v) => setPayment(String(v))}
        />

        {state === "loading" ? (
          <div className="grid gap-3">
            <JobCardSkeleton />
            <JobCardSkeleton />
          </div>
        ) : null}

        {state === "empty" || (state === "ready" && filtered.length === 0) ? (
          <EmptyState
            title="No history yet"
            description="Completed jobs will appear here with receipts and feedback."
            actionLabel="Browse jobs"
            onAction={() => {
              window.location.href =
                role === "poster" ? "/poster/jobs" : "/team/jobs";
            }}
          />
        ) : null}

        {(state === "ready" || state === "plan_limit") &&
          filtered.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              href={`${detailBase}/${job.id}`}
              actionLabel="View details"
            />
          ))}

        <p className="text-center text-xs text-muted-foreground">
          Tip: open a history item for uploads, feedback, and payment receipt.{" "}
          <Link href={`${detailBase}/${filtered[0]?.id || "job-106"}`} className="underline">
            Latest
          </Link>
        </p>
      </div>
    </MobileShell>
  );
}
