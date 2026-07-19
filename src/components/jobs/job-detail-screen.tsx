"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ChevronLeft,
  Clock,
  MapPin,
  MessageCircle,
  Upload,
} from "lucide-react";
import { MobileShell } from "@/components/layout/mobile-shell";
import { JobStatusBadge, PaymentStatusBadge } from "@/components/jobs/status-badge";
import { StateBanners } from "@/components/states/status-banners";
import { EmptyState } from "@/components/states/empty-state";
import { Button } from "@/components/ui/button"
import { LinkButton } from "@/components/ui/link-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BidApproveModal,
  BidListModal,
  BidRejectModal,
  CompletionApprovalModal,
  CompletionUploadDrawer,
  DisputeModal,
  FeedbackModal,
  JobTimelineDrawer,
  PaymentModal,
  SubmitBidModal,
} from "@/components/overlays/job-overlays";
import {
  formatCurrency,
  formatDate,
  getBidsForJob,
  getJob,
} from "@/lib/data";
import { useAsyncData } from "@/hooks/use-async-data";
import { useScreenState } from "@/providers/screen-state-provider";
import type { Bid, User, UserRole } from "@/lib/types";

export function JobDetailScreen({
  jobId,
  role,
  user,
}: {
  jobId: string;
  role: UserRole;
  user: User;
}) {
  const { setState } = useScreenState();
  const { data: job, state } = useAsyncData(() => getJob(jobId) || null, [jobId]);
  const bids = useMemo(() => (job ? getBidsForJob(job.id) : []), [job]);

  const [bidsOpen, setBidsOpen] = useState(false);
  const [approveBid, setApproveBid] = useState<Bid | null>(null);
  const [rejectBid, setRejectBid] = useState<Bid | null>(null);
  const [timelineOpen, setTimelineOpen] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [approvalOpen, setApprovalOpen] = useState(false);
  const [disputeOpen, setDisputeOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [submitBidOpen, setSubmitBidOpen] = useState(false);

  const base = role === "poster" ? "/poster" : "/team";

  return (
    <MobileShell role={role} user={user} showTopBar={false}>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <LinkButton variant="ghost" size="icon" className="rounded-md" href={`${base}/jobs`}><ChevronLeft className="size-5" /></LinkButton>
          <h1 className="font-[family-name:var(--font-display)] text-lg font-semibold">
            Job detail
          </h1>
        </div>

        <StateBanners state={state} onRetry={() => setState("ready")} />

        {state === "loading" ? (
          <div className="space-y-3">
            <Skeleton className="aspect-[4/3] w-full rounded-lg" />
            <Skeleton className="h-8 w-2/3" />
            <Skeleton className="h-20 w-full" />
          </div>
        ) : null}

        {state === "empty" || (state === "ready" && !job) ? (
          <EmptyState
            title="Job not found"
            description="This listing may have been removed."
            actionLabel="Back to jobs"
            onAction={() => {
              window.location.href = `${base}/jobs`;
            }}
          />
        ) : null}

        {job &&
        (state === "ready" ||
          state === "plan_limit" ||
          state === "permission_denied" ||
          state === "error") ? (
          <>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <Image
                src={job.images[0]}
                alt={job.title}
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <JobStatusBadge status={job.status} />
                <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold text-white">
                  {job.title}
                </h2>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <MapPin className="size-3.5" />
                {job.address}, {job.city}
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock className="size-3.5" />
                {formatDate(job.deadline)}
              </span>
              <span className="font-semibold text-foreground">
                {formatCurrency(job.budget)}
              </span>
              <PaymentStatusBadge status={job.paymentStatus} />
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                variant="outline"
                className="rounded-md"
                onClick={() => setTimelineOpen(true)}
              >
                Timeline
              </Button>
              <LinkButton size="sm" variant="outline" className="rounded-md" href={`${base}/job/${job.id}/chat`}><MessageCircle className="size-3.5" />
                  Chat</LinkButton>
              {role === "poster" ? (
                <>
                  <Button
                    size="sm"
                    className="rounded-md"
                    onClick={() => setBidsOpen(true)}
                  >
                    Bids ({bids.length})
                  </Button>
                  {job.status === "completion_submitted" ? (
                    <Button
                      size="sm"
                      variant="secondary"
                      className="rounded-md"
                      onClick={() => setApprovalOpen(true)}
                    >
                      Review completion
                    </Button>
                  ) : null}
                  {job.status === "approved" ? (
                    <>
                      <Button
                        size="sm"
                        className="rounded-md"
                        onClick={() => setFeedbackOpen(true)}
                      >
                        Feedback
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="rounded-md"
                        onClick={() => setPaymentOpen(true)}
                      >
                        Pay
                      </Button>
                    </>
                  ) : null}
                </>
              ) : (
                <>
                  {(job.status === "open" || job.status === "bidding") && (
                    <Button
                      size="sm"
                      className="rounded-md"
                      onClick={() => setSubmitBidOpen(true)}
                    >
                      Bid now
                    </Button>
                  )}
                  {job.teamId === user.id ? (
                    <Button
                      size="sm"
                      variant="secondary"
                      className="rounded-md"
                      onClick={() => setUploadOpen(true)}
                    >
                      <Upload className="size-3.5" />
                      Upload proof
                    </Button>
                  ) : null}
                </>
              )}
            </div>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4 rounded-lg">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="bids">Bids</TabsTrigger>
                <TabsTrigger value="completion">Done</TabsTrigger>
                <TabsTrigger value="payment">Pay</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-3 pt-3">
                <p className="text-sm leading-relaxed">{job.description}</p>
                <div className="flex flex-wrap gap-1">
                  {job.requirements.map((r) => (
                    <span
                      key={r}
                      className="rounded-md border bg-white px-2 py-1 text-xs"
                    >
                      {r}
                    </span>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {job.images.map((src) => (
                    <div
                      key={src}
                      className="relative aspect-square overflow-hidden rounded-lg"
                    >
                      <Image src={src} alt="" fill className="object-cover" unoptimized />
                    </div>
                  ))}
                </div>
                <div className="rounded-lg border bg-[#e8f0e9] p-4 text-sm text-muted-foreground">
                  Map preview · {job.lat.toFixed(3)}, {job.lng.toFixed(3)}
                </div>
              </TabsContent>
              <TabsContent value="bids" className="pt-3">
                <Button className="w-full rounded-md" onClick={() => setBidsOpen(true)}>
                  Open bid gallery ({bids.length})
                </Button>
              </TabsContent>
              <TabsContent value="completion" className="space-y-3 pt-3">
                <p className="text-sm text-muted-foreground">
                  Before/after photos and PDFs appear here after upload.
                </p>
                {role === "team" ? (
                  <Button className="rounded-md" onClick={() => setUploadOpen(true)}>
                    Upload completion
                  </Button>
                ) : (
                  <Button className="rounded-md" onClick={() => setApprovalOpen(true)}>
                    Review completion
                  </Button>
                )}
              </TabsContent>
              <TabsContent value="payment" className="space-y-3 pt-3">
                <p className="text-sm">
                  Escrow status: <PaymentStatusBadge status={job.paymentStatus} />
                </p>
                {role === "poster" ? (
                  <Button className="rounded-md" onClick={() => setPaymentOpen(true)}>
                    Open payment
                  </Button>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Payment releases after poster approval and feedback.
                  </p>
                )}
              </TabsContent>
            </Tabs>
          </>
        ) : null}
      </div>

      {job ? (
        <>
          <BidListModal
            open={bidsOpen}
            onOpenChange={setBidsOpen}
            job={job}
            state={state}
            onApprove={(b) => {
              setBidsOpen(false);
              setApproveBid(b);
            }}
            onReject={(b) => {
              setBidsOpen(false);
              setRejectBid(b);
            }}
          />
          <BidApproveModal
            open={Boolean(approveBid)}
            onOpenChange={(o) => !o && setApproveBid(null)}
            bid={approveBid}
          />
          <BidRejectModal
            open={Boolean(rejectBid)}
            onOpenChange={(o) => !o && setRejectBid(null)}
            bid={rejectBid}
          />
          <JobTimelineDrawer
            open={timelineOpen}
            onOpenChange={setTimelineOpen}
            job={job}
            state={state}
          />
          <CompletionUploadDrawer
            open={uploadOpen}
            onOpenChange={setUploadOpen}
            job={job}
          />
          <CompletionApprovalModal
            open={approvalOpen}
            onOpenChange={setApprovalOpen}
            job={job}
            onDispute={() => {
              setApprovalOpen(false);
              setDisputeOpen(true);
            }}
          />
          <DisputeModal
            open={disputeOpen}
            onOpenChange={setDisputeOpen}
            job={job}
          />
          <FeedbackModal
            open={feedbackOpen}
            onOpenChange={setFeedbackOpen}
            job={job}
          />
          <PaymentModal
            open={paymentOpen}
            onOpenChange={setPaymentOpen}
            job={job}
          />
          <SubmitBidModal
            open={submitBidOpen}
            onOpenChange={setSubmitBidOpen}
            job={job}
          />
        </>
      ) : null}
    </MobileShell>
  );
}
