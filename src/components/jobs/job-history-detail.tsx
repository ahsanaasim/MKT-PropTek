"use client";

import Image from "next/image";
import Link from "next/link";
import { use } from "react";
import { ChevronLeft, MessageCircle, Star } from "lucide-react";
import { MobileShell } from "@/components/layout/mobile-shell";
import { JobStatusBadge, PaymentStatusBadge } from "@/components/jobs/status-badge";
import { StateBanners } from "@/components/states/status-banners";
import { EmptyState } from "@/components/states/empty-state";
import { Button } from "@/components/ui/button"
import { LinkButton } from "@/components/ui/link-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  formatCurrency,
  formatDate,
  getJob,
  getTimelineForJob,
} from "@/lib/data";
import { useAsyncData } from "@/hooks/use-async-data";
import { useScreenState } from "@/providers/screen-state-provider";
import type { User, UserRole } from "@/lib/types";

export function JobHistoryDetail({
  params,
  role,
  user,
}: {
  params: Promise<{ jobId: string }>;
  role: UserRole;
  user: User;
}) {
  const { jobId } = use(params);
  const { setState } = useScreenState();
  const { data: job, state } = useAsyncData(() => getJob(jobId) || null, [jobId]);
  const events = job ? getTimelineForJob(job.id) : [];
  const base = role === "poster" ? "/poster" : "/team";

  return (
    <MobileShell role={role} user={user} showTopBar={false}>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <LinkButton variant="ghost" size="icon" className="rounded-md" href={`${base}/history`}><ChevronLeft className="size-5" /></LinkButton>
          <h1 className="font-[family-name:var(--font-display)] text-lg font-semibold">
            History detail
          </h1>
        </div>

        <StateBanners state={state} onRetry={() => setState("ready")} />

        {state === "loading" ? (
          <div className="space-y-3">
            <Skeleton className="h-8 w-2/3" />
            <Skeleton className="h-40 w-full" />
          </div>
        ) : null}

        {!job && state === "ready" ? (
          <EmptyState
            title="History item missing"
            description="We couldn’t find that completed job."
            actionLabel="Back"
            onAction={() => {
              window.location.href = `${base}/history`;
            }}
          />
        ) : null}

        {job && state !== "loading" ? (
          <>
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                <JobStatusBadge status={job.status} />
                <PaymentStatusBadge status={job.paymentStatus} />
              </div>
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
                {job.title}
              </h2>
              <p className="text-sm text-muted-foreground">{job.description}</p>
              <p className="text-sm">
                {job.address} · Posted {formatDate(job.createdAt)}
                {job.completedAt ? ` · Completed ${formatDate(job.completedAt)}` : ""}
              </p>
              <p className="font-semibold text-primary">
                {formatCurrency(job.budget)}
              </p>
            </div>

            <div className="grid gap-3 md:grid-cols-[1fr_0.85fr]">
              <Card className="rounded-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Completion uploads</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-2">
                  {job.images.map((src) => (
                    <div
                      key={src}
                      className="relative aspect-square overflow-hidden rounded-lg"
                    >
                      <Image src={src} alt="" fill className="object-cover" unoptimized />
                    </div>
                  ))}
                  {job.pdfs.map((pdf) => (
                    <div
                      key={pdf}
                      className="flex aspect-square items-center justify-center rounded-lg border bg-muted text-xs"
                    >
                      {pdf}
                    </div>
                  ))}
                </CardContent>
              </Card>

              <aside className="space-y-3">
                <Card className="rounded-lg">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">
                      {role === "poster" ? "Team" : "Poster"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p className="font-medium">
                      {role === "poster"
                        ? job.teamName || "Unassigned"
                        : "Ava Meridian · Meridian Properties"}
                    </p>
                    <LinkButton size="sm" variant="outline" className="rounded-md" href={`${base}/job/${job.id}/chat`}><MessageCircle className="size-3.5" />
                        Open chat</LinkButton>
                  </CardContent>
                </Card>

                <Card className="rounded-lg">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Payment receipt</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Amount</span>
                      <span>{formatCurrency(job.budget)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fee</span>
                      <span>{formatCurrency(Math.round(job.budget * 0.08))}</span>
                    </div>
                    <PaymentStatusBadge status={job.paymentStatus} />
                  </CardContent>
                </Card>

                <Card className="rounded-lg">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Feedback</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <div className="mb-1 flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className="size-3.5 fill-primary text-primary"
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground">
                      Professional crew, clear photos, on-time haul-away.
                    </p>
                  </CardContent>
                </Card>
              </aside>
            </div>

            <Card className="rounded-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Timeline</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                {(events.length
                  ? events
                  : [
                      {
                        id: "x",
                        title: "Completed",
                        description: "Job closed in history",
                        timestamp: job.completedAt || job.createdAt,
                        actor: "PropTek",
                      },
                    ]
                ).map((ev) => (
                  <div key={ev.id} className="rounded-md border px-3 py-2">
                    <p className="font-medium">{ev.title}</p>
                    <p className="text-muted-foreground">{ev.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(ev.timestamp)}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </>
        ) : null}
      </div>
    </MobileShell>
  );
}
