"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Plus, RefreshCw, Search, SlidersHorizontal } from "lucide-react";
import { MobileShell } from "@/components/layout/mobile-shell";
import { JobCard, JobCardSkeleton } from "@/components/jobs/job-card";
import { FacetChips } from "@/components/filters/facet-chips";
import { EmptyState } from "@/components/states/empty-state";
import { StateBanners } from "@/components/states/status-banners";
import { Button } from "@/components/ui/button"
import { LinkButton } from "@/components/ui/link-button";
import { Input } from "@/components/ui/input";
import { SearchFilterDrawer } from "@/components/overlays/job-overlays";
import { useAsyncData } from "@/hooks/use-async-data";
import { useScreenState } from "@/providers/screen-state-provider";
import type { Job, User, UserRole } from "@/lib/types";

export function JobListScreen({
  role,
  user,
  title,
  loader,
  detailBase,
  createHref,
}: {
  role: UserRole;
  user: User;
  title: string;
  loader: () => Job[];
  detailBase: string;
  createHref?: string;
}) {
  const { setState } = useScreenState();
  const [status, setStatus] = useState("");
  const [query, setQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const { data, state } = useAsyncData(loader, []);

  const filtered = useMemo(() => {
    let list = data || [];
    if (status) list = list.filter((j) => j.status === status);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.city.toLowerCase().includes(q) ||
          j.address.toLowerCase().includes(q),
      );
    }
    return list;
  }, [data, status, query]);

  return (
    <MobileShell role={role} user={user}>
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
            {title}
          </h1>
          {createHref ? (
            <LinkButton size="sm" className="rounded-md" href={createHref}><Plus className="size-4" />
                Create</LinkButton>
          ) : (
            <Button
              size="sm"
              variant="outline"
              className="rounded-md"
              onClick={() => setState("ready")}
            >
              <RefreshCw className="size-4" />
              Refresh
            </Button>
          )}
        </div>

        <StateBanners state={state} onRetry={() => setState("ready")} />

        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              className="h-11 rounded-md ps-9"
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            className="size-11 rounded-md"
            onClick={() => setFilterOpen(true)}
          >
            <SlidersHorizontal className="size-4" />
          </Button>
        </div>

        <FacetChips
          options={[
            { label: "All", value: "" },
            { label: "Open", value: "open" },
            { label: "Bidding", value: "bidding" },
            { label: "In progress", value: "in_progress" },
            { label: "Paid", value: "paid" },
          ]}
          value={status}
          onChange={(v) => setStatus(String(v))}
        />

        {state === "loading" ? (
          <div className="grid gap-3">
            <JobCardSkeleton />
            <JobCardSkeleton />
            <JobCardSkeleton />
          </div>
        ) : null}

        {state === "empty" || (state === "ready" && filtered.length === 0) ? (
          <EmptyState
            title="No jobs found"
            description="Clear filters or post a new cleanup job."
            actionLabel="Clear filters"
            onAction={() => {
              setStatus("");
              setQuery("");
            }}
            secondaryLabel={createHref ? "Post a job" : undefined}
            onSecondary={
              createHref
                ? () => {
                    window.location.href = createHref;
                  }
                : undefined
            }
          />
        ) : null}

        {(state === "ready" || state === "plan_limit") &&
          filtered.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              href={`${detailBase}/${job.id}`}
              actionLabel="Open"
            />
          ))}
      </div>
      <SearchFilterDrawer open={filterOpen} onOpenChange={setFilterOpen} />
    </MobileShell>
  );
}
