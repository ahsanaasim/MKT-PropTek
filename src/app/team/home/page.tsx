"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Award,
  MessageCircle,
  Search,
  SlidersHorizontal,
  Wallet,
} from "lucide-react";
import { MobileShell } from "@/components/layout/mobile-shell";
import { JobCard, JobCardSkeleton } from "@/components/jobs/job-card";
import { FacetChips } from "@/components/filters/facet-chips";
import { EmptyState } from "@/components/states/empty-state";
import { StateBanners } from "@/components/states/status-banners";
import { Button } from "@/components/ui/button"
import { LinkButton } from "@/components/ui/link-button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  MembershipModal,
  NotificationsDrawer,
  SearchFilterDrawer,
  SubmitBidModal,
} from "@/components/overlays/job-overlays";
import { currentTeam, jobs } from "@/lib/data";
import { useAsyncData } from "@/hooks/use-async-data";
import { useScreenState } from "@/providers/screen-state-provider";
import type { Job } from "@/lib/types";

export default function TeamHomePage() {
  const { setState } = useScreenState();
  const [status, setStatus] = useState("");
  const [query, setQuery] = useState("");
  const [notifOpen, setNotifOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [membershipOpen, setMembershipOpen] = useState(false);
  const [bidJob, setBidJob] = useState<Job | null>(null);

  const { data, state } = useAsyncData(
    () =>
      jobs.filter(
        (j) =>
          ["open", "bidding", "awarded", "in_progress", "approved"].includes(
            j.status,
          ) || j.teamId === "u-team-1",
      ),
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
          j.city.toLowerCase().includes(q),
      );
    }
    return list;
  }, [data, status, query]);

  return (
    <MobileShell
      role="team"
      user={currentTeam}
      onNotifications={() => setNotifOpen(true)}
    >
      <div className="space-y-4">
        <StateBanners
          state={state}
          onRetry={() => setState("ready")}
          onUpgrade={() => setMembershipOpen(true)}
        />

        {state !== "permission_denied" ? (
          <>
            <Alert className="rounded-lg border-primary/20 bg-accent">
              <AlertTitle>New open jobs near you</AlertTitle>
              <AlertDescription>
                3 listings match your certifications in SF & Oakland.
              </AlertDescription>
            </Alert>
            <Alert className="rounded-lg border-emerald-200 bg-emerald-50">
              <AlertTitle>Payment update</AlertTitle>
              <AlertDescription>
                Yard waste job approved — awaiting payment release.
              </AlertDescription>
            </Alert>

            <LinkButton className="h-12 w-full rounded-md text-base" href="/team/jobs">Find jobs</LinkButton>

            <div className="grid grid-cols-3 gap-2">
              <LinkButton variant="outline" className="h-auto flex-col gap-1 rounded-md py-3" href="/team/job/job-102/chat"><MessageCircle className="size-4" />
                  <span className="text-xs">Chat</span></LinkButton>
              <LinkButton variant="outline" className="h-auto flex-col gap-1 rounded-md py-3" href="/team/history"><Wallet className="size-4" />
                  <span className="text-xs">Payments</span></LinkButton>
              <LinkButton variant="outline" className="h-auto flex-col gap-1 rounded-md py-3" href="/profile"><Award className="size-4" />
                  <span className="text-xs">Certs</span></LinkButton>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search available jobs"
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
                { label: "Awarded", value: "awarded" },
                { label: "In progress", value: "in_progress" },
              ]}
              value={status}
              onChange={(v) => setStatus(String(v))}
            />
          </>
        ) : null}

        {state === "loading" ? (
          <div className="grid gap-3">
            <JobCardSkeleton />
            <JobCardSkeleton />
          </div>
        ) : null}

        {state === "empty" || (state === "ready" && filtered.length === 0) ? (
          <EmptyState
            title="No jobs match"
            description="Refresh or update filters to discover new cleanup listings."
            actionLabel="Refresh"
            onAction={() => setState("ready")}
            secondaryLabel="Update filters"
            onSecondary={() => setFilterOpen(true)}
          />
        ) : null}

        {(state === "ready" || state === "plan_limit") &&
          filtered.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              href={`/team/job/${job.id}`}
              actionLabel={
                job.status === "open" || job.status === "bidding"
                  ? "Bid now"
                  : "View job"
              }
              onAction={
                job.status === "open" || job.status === "bidding"
                  ? () => setBidJob(job)
                  : undefined
              }
            />
          ))}
      </div>

      <NotificationsDrawer open={notifOpen} onOpenChange={setNotifOpen} />
      <SearchFilterDrawer open={filterOpen} onOpenChange={setFilterOpen} />
      <MembershipModal
        open={membershipOpen}
        onOpenChange={setMembershipOpen}
        current="pro"
      />
      {bidJob ? (
        <SubmitBidModal
          open={Boolean(bidJob)}
          onOpenChange={(o) => !o && setBidJob(null)}
          job={bidJob}
        />
      ) : null}
    </MobileShell>
  );
}
