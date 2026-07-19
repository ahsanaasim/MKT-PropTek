"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { BarChart3, MessageCircle, Plus, Search, SlidersHorizontal } from "lucide-react";
import { MobileShell } from "@/components/layout/mobile-shell";
import { JobCard, JobCardSkeleton } from "@/components/jobs/job-card";
import { FacetChips } from "@/components/filters/facet-chips";
import { EmptyState } from "@/components/states/empty-state";
import { StateBanners } from "@/components/states/status-banners";
import { Button } from "@/components/ui/button"
import { LinkButton } from "@/components/ui/link-button";
import { Input } from "@/components/ui/input";
import {
  MembershipModal,
  NotificationsDrawer,
  SearchFilterDrawer,
} from "@/components/overlays/job-overlays";
import { currentPoster, jobs } from "@/lib/data";
import { useAsyncData } from "@/hooks/use-async-data";
import { useScreenState } from "@/providers/screen-state-provider";
import { useAuthedUser } from "@/hooks/use-authed-user";

export default function PosterHomePage() {
  const { user } = useAuthedUser("poster");
  const { setState } = useScreenState();
  const [status, setStatus] = useState("");
  const [query, setQuery] = useState("");
  const [notifOpen, setNotifOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [membershipOpen, setMembershipOpen] = useState(false);

  const { data, state } = useAsyncData(
    () => jobs.filter((j) => j.posterId === "u-poster-1"),
    [],
  );

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
    <MobileShell
      role="poster"
      user={user}
      onNotifications={() => setNotifOpen(true)}
    >
      <div className="space-y-4">
        <StateBanners
          state={state}
          onRetry={() => setState("ready")}
          onUpgrade={() => setMembershipOpen(true)}
        />

        {state === "permission_denied" ? null : (
          <>
            <section className="rounded-lg bg-[linear-gradient(135deg,#ff385c_0%,#e31c5f_55%,#c13515_100%)] p-5 text-white shadow-sm">
              <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
                Your cleanup storefront
              </h1>
              <p className="mt-1 text-sm text-white/85">
                Post a job and compare immersive bids from trusted teams.
              </p>
              <LinkButton className="mt-4 h-11 rounded-md bg-white text-primary hover:bg-white/95" href="/poster/job/new/details"><Plus className="size-4" />
                  Post a job</LinkButton>
            </section>

            <div className="grid grid-cols-2 gap-2">
              <LinkButton variant="outline" className="h-11 justify-start rounded-md" href="/poster/job/job-102/chat"><MessageCircle className="size-4" />
                  Quick chat</LinkButton>
              <LinkButton variant="outline" className="h-11 justify-start rounded-md" href="/poster/reports"><BarChart3 className="size-4" />
                  Reports</LinkButton>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search jobs"
                  className="h-11 rounded-md ps-9"
                />
              </div>
              <Button
                variant="outline"
                size="icon"
                className="size-11 rounded-md"
                onClick={() => setFilterOpen(true)}
                aria-label="Filters"
              >
                <SlidersHorizontal className="size-4" />
              </Button>
            </div>

            <FacetChips
              options={[
                { label: "All", value: "" },
                { label: "Bidding", value: "bidding" },
                { label: "In progress", value: "in_progress" },
                { label: "Submitted", value: "completion_submitted" },
                { label: "Paid", value: "paid" },
              ]}
              value={status}
              onChange={(v) => setStatus(String(v))}
            />
          </>
        )}

        {state === "loading" ? (
          <div className="grid gap-3">
            <JobCardSkeleton />
            <JobCardSkeleton />
          </div>
        ) : null}

        {state === "empty" || (state === "ready" && filtered.length === 0) ? (
          <EmptyState
            title="No jobs yet"
            description="Post your first cleanup job and invite teams to bid."
            actionLabel="Post first job"
            onAction={() => {
              window.location.href = "/poster/job/new/details";
            }}
            secondaryLabel="Clear filters"
            onSecondary={() => {
              setStatus("");
              setQuery("");
            }}
          />
        ) : null}

        {(state === "ready" || state === "plan_limit") && filtered.length > 0 ? (
          <div className="grid gap-3">
            {filtered.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                href={`/poster/job/${job.id}`}
                actionLabel="Open job"
              />
            ))}
          </div>
        ) : null}
      </div>

      <NotificationsDrawer open={notifOpen} onOpenChange={setNotifOpen} />
      <SearchFilterDrawer
        open={filterOpen}
        onOpenChange={setFilterOpen}
        onApply={(f) => setQuery(f.search || "")}
      />
      <MembershipModal open={membershipOpen} onOpenChange={setMembershipOpen} />
    </MobileShell>
  );
}
