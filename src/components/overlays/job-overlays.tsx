"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  Star,
  Upload,
  X,
  AlertTriangle,
  CheckCircle2,
  FileText,
  Shield,
} from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FacetChips } from "@/components/filters/facet-chips";
import { StateBanners } from "@/components/states/status-banners";
import { EmptyState } from "@/components/states/empty-state";
import { JobStatusBadge } from "@/components/jobs/status-badge";
import {
  formatCurrency,
  formatDate,
  getBidsForJob,
  getTimelineForJob,
  membershipPlans,
  notifications,
} from "@/lib/data";
import type { Bid, Job, ScreenState } from "@/lib/types";
import { cn } from "@/lib/utils";

function StarRatingInput({
  value,
  onChange,
}: {
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <div className="flex gap-1" role="radiogroup" aria-label="Star rating">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          className="rounded-md p-1"
          aria-label={`${n} stars`}
        >
          <Star
            className={cn(
              "size-7 transition-colors",
              n <= value ? "fill-primary text-primary" : "text-muted-foreground",
            )}
          />
        </button>
      ))}
    </div>
  );
}

export function BidListModal({
  open,
  onOpenChange,
  job,
  state = "ready",
  onApprove,
  onReject,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  job: Job;
  state?: ScreenState;
  onApprove: (bid: Bid) => void;
  onReject: (bid: Bid) => void;
}) {
  const [sort, setSort] = useState("rating");
  const bids = useMemo(() => {
    const list = [...getBidsForJob(job.id)];
    if (sort === "price") list.sort((a, b) => a.amount - b.amount);
    if (sort === "timing") list.sort((a, b) => a.estimatedDays - b.estimatedDays);
    if (sort === "rating") list.sort((a, b) => b.teamRating - a.teamRating);
    return list;
  }, [job.id, sort]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90dvh] max-w-md overflow-y-auto rounded-lg">
        <DialogHeader>
          <DialogTitle className="font-[family-name:var(--font-display)]">
            Bids
          </DialogTitle>
          <DialogDescription>
            {job.title} · {formatCurrency(job.budget)} budget
          </DialogDescription>
        </DialogHeader>
        <StateBanners state={state} />
        {state === "loading" ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-28 animate-pulse rounded-lg bg-muted" />
            ))}
          </div>
        ) : null}
        {state === "empty" || (state === "ready" && bids.length === 0) ? (
          <EmptyState
            title="No bids yet"
            description="Share your job or wait for teams to respond."
          />
        ) : null}
        {state === "ready" || state === "plan_limit" || state === "permission_denied" ? (
          <>
            <FacetChips
              options={[
                { label: "Top rated", value: "rating" },
                { label: "Lowest price", value: "price" },
                { label: "Fastest", value: "timing" },
              ]}
              value={sort}
              onChange={(v) => setSort(String(v))}
            />
            <div className="space-y-3">
              {bids.map((bid) => (
                <div
                  key={bid.id}
                  className="rounded-lg border bg-white p-3 shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <Avatar>
                      <AvatarImage src={bid.teamAvatar} />
                      <AvatarFallback>{bid.teamName[0]}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate font-medium">{bid.teamName}</p>
                        <span className="inline-flex items-center gap-1 text-sm">
                          <Star className="size-3.5 fill-primary text-primary" />
                          {bid.teamRating}
                        </span>
                      </div>
                      <p className="text-lg font-semibold text-primary">
                        {formatCurrency(bid.amount)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {bid.estimatedDays} day · {bid.notes}
                      </p>
                      <div className="flex flex-wrap gap-1 pt-1">
                        {bid.certifications.map((c) => (
                          <Badge key={c} variant="outline" className="rounded-md text-[10px]">
                            {c}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button
                          size="sm"
                          className="rounded-md"
                          onClick={() => onApprove(bid)}
                        >
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="rounded-md"
                          onClick={() => onReject(bid)}
                        >
                          Reject
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

export function BidApproveModal({
  open,
  onOpenChange,
  bid,
  state = "ready",
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  bid: Bid | null;
  state?: ScreenState;
}) {
  if (!bid) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-lg">
        <DialogHeader>
          <DialogTitle>Approve bid</DialogTitle>
          <DialogDescription>
            This action awards the job and holds payment in escrow.
          </DialogDescription>
        </DialogHeader>
        <StateBanners state={state} />
        <div className="rounded-lg border bg-muted/40 p-3 text-sm">
          <p className="font-medium">{bid.teamName}</p>
          <p>
            {formatCurrency(bid.amount)} · {bid.estimatedDays} day
          </p>
        </div>
        <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
          <AlertTriangle className="mt-0.5 size-4 shrink-0" />
          Approving is irreversible. Other pending bids will be declined.
        </div>
        <DialogFooter className="gap-2 sm:justify-stretch">
          <Button variant="outline" className="rounded-md" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            className="rounded-md"
            onClick={() => {
              toast.success("Bid approved");
              onOpenChange(false);
            }}
          >
            Approve bid
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function BidRejectModal({
  open,
  onOpenChange,
  bid,
  state = "ready",
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  bid: Bid | null;
  state?: ScreenState;
}) {
  const [feedback, setFeedback] = useState("");
  if (!bid) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-lg">
        <DialogHeader>
          <DialogTitle>Reject bid</DialogTitle>
          <DialogDescription>
            Optionally share feedback with {bid.teamName}.
          </DialogDescription>
        </DialogHeader>
        <StateBanners state={state} />
        <div className="rounded-lg border p-3 text-sm">
          {formatCurrency(bid.amount)} · {bid.estimatedDays} day
        </div>
        <div className="space-y-2">
          <Label htmlFor="reject-feedback">Feedback</Label>
          <Textarea
            id="reject-feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Timing didn’t match our schedule…"
            className="rounded-md"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" className="rounded-md" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            className="rounded-md"
            onClick={() => {
              toast.message("Bid rejected");
              onOpenChange(false);
            }}
          >
            Reject bid
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function JobTimelineDrawer({
  open,
  onOpenChange,
  job,
  state = "ready",
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  job: Job;
  state?: ScreenState;
}) {
  const events = getTimelineForJob(job.id);
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="mx-auto max-w-md rounded-t-2xl">
        <DrawerHeader>
          <div className="flex items-start justify-between gap-2">
            <div>
              <DrawerTitle className="font-[family-name:var(--font-display)]">
                {job.title}
              </DrawerTitle>
              <DrawerDescription className="pt-2">
                <JobStatusBadge status={job.status} />
              </DrawerDescription>
            </div>
            <DrawerClose
              render={
                <Button size="icon" variant="ghost" className="rounded-md" />
              }
            >
              <X className="size-4" />
            </DrawerClose>
          </div>
        </DrawerHeader>
        <div className="space-y-4 px-4 pb-6">
          <StateBanners state={state} />
          {state === "loading" ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 animate-pulse rounded-lg bg-muted" />
              ))}
            </div>
          ) : null}
          {state === "empty" || (state === "ready" && events.length === 0) ? (
            <p className="text-sm text-muted-foreground">No timeline events yet.</p>
          ) : null}
          {(state === "ready" || state === "plan_limit") &&
            events.map((ev, idx) => (
              <div key={ev.id} className="relative flex gap-3 ps-2">
                {idx < events.length - 1 ? (
                  <span className="absolute top-8 bottom-[-12px] left-[1.15rem] w-px bg-border" />
                ) : null}
                <Avatar className="size-8">
                  <AvatarImage src={ev.actorAvatar} />
                  <AvatarFallback>{ev.actor[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 rounded-lg border bg-white p-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-medium">{ev.title}</p>
                    {ev.alert ? (
                      <Badge className="rounded-md bg-amber-100 text-amber-900">Alert</Badge>
                    ) : null}
                  </div>
                  <p className="text-sm text-muted-foreground">{ev.description}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {ev.actor} · {formatDate(ev.timestamp)}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export function CompletionUploadDrawer({
  open,
  onOpenChange,
  job,
  state = "ready",
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  job: Job;
  state?: ScreenState;
}) {
  const [progress, setProgress] = useState(0);
  const [files, setFiles] = useState<string[]>(["before-living.jpg"]);

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="mx-auto max-w-md rounded-t-2xl">
        <DrawerHeader>
          <DrawerTitle>Upload completion</DrawerTitle>
          <DrawerDescription>
            {job.title} · JPG and PDF up to 20MB
          </DrawerDescription>
          <Badge variant="outline" className="w-fit rounded-md">
            JPG, PDF
          </Badge>
        </DrawerHeader>
        <div className="space-y-4 px-4 pb-2">
          <StateBanners state={state} />
          <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-primary/40 bg-[#FFF1F3]/50 px-4 py-8 text-center">
            <Upload className="size-6 text-primary" />
            <span className="text-sm font-medium">Add before/after photos or PDFs</span>
            <Input
              type="file"
              className="hidden"
              accept=".jpg,.jpeg,.pdf"
              onChange={(e) => {
                const name = e.target.files?.[0]?.name;
                if (name) {
                  setFiles((f) => [...f, name]);
                  setProgress(72);
                }
              }}
            />
          </label>
          {progress > 0 ? <Progress value={progress} className="h-2" /> : null}
          <ul className="space-y-2">
            {files.map((f) => (
              <li
                key={f}
                className="flex items-center justify-between rounded-lg border bg-white px-3 py-2 text-sm"
              >
                <span className="inline-flex items-center gap-2">
                  <FileText className="size-4 text-primary" />
                  {f}
                </span>
                <Button
                  size="icon"
                  variant="ghost"
                  className="rounded-md"
                  onClick={() => setFiles((all) => all.filter((x) => x !== f))}
                >
                  <X className="size-4" />
                </Button>
              </li>
            ))}
          </ul>
        </div>
        <DrawerFooter>
          <Button
            className="rounded-md"
            onClick={() => {
              toast.success("Completion uploaded");
              onOpenChange(false);
            }}
          >
            Submit upload
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export function CompletionApprovalModal({
  open,
  onOpenChange,
  job,
  onDispute,
  state = "ready",
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  job: Job;
  onDispute: () => void;
  state?: ScreenState;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90dvh] max-w-md overflow-y-auto rounded-lg">
        <DialogHeader>
          <DialogTitle>Review completion</DialogTitle>
          <DialogDescription>
            {job.title} · {job.teamName || "Team"}
          </DialogDescription>
        </DialogHeader>
        <StateBanners state={state} />
        <Badge className="w-fit rounded-md" variant="outline">
          Completion submitted
        </Badge>
        <div className="grid grid-cols-2 gap-2">
          {job.images.slice(0, 2).map((src) => (
            <div key={src} className="relative aspect-square overflow-hidden rounded-lg">
              <Image src={src} alt="" fill className="object-cover" unoptimized />
            </div>
          ))}
        </div>
        <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm">
          <AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-700" />
          Approving is irreversible and unlocks feedback for payment release.
        </div>
        <DialogFooter className="gap-2">
          <Button variant="outline" className="rounded-md" onClick={onDispute}>
            Dispute
          </Button>
          <Button
            className="rounded-md"
            onClick={() => {
              toast.success("Completion approved");
              onOpenChange(false);
            }}
          >
            Approve
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function DisputeModal({
  open,
  onOpenChange,
  job,
  state = "ready",
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  job: Job;
  state?: ScreenState;
}) {
  const [reason, setReason] = useState("");
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-lg">
        <DialogHeader>
          <DialogTitle>Open dispute</DialogTitle>
          <DialogDescription>
            {job.title} · {job.teamName}
          </DialogDescription>
        </DialogHeader>
        <StateBanners state={state} />
        <div className="space-y-2">
          <Label htmlFor="dispute-reason">Reason</Label>
          <Textarea
            id="dispute-reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Describe what still needs attention…"
            className="rounded-md"
          />
        </div>
        <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed px-3 py-4 text-sm">
          <Upload className="size-4 text-primary" />
          Attach evidence (JPG, PDF)
          <Input type="file" className="hidden" accept=".jpg,.jpeg,.pdf" />
        </label>
        <DialogFooter>
          <Button variant="outline" className="rounded-md" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            className="rounded-md"
            disabled={!reason.trim()}
            onClick={() => {
              toast.message("Dispute submitted");
              onOpenChange(false);
            }}
          >
            Submit dispute
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function FeedbackModal({
  open,
  onOpenChange,
  job,
  state = "ready",
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  job: Job;
  state?: ScreenState;
}) {
  const [stars, setStars] = useState(5);
  const [text, setText] = useState("");
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-lg">
        <DialogHeader>
          <DialogTitle>Rate & feedback</DialogTitle>
          <DialogDescription>
            Required before payment release for {job.teamName || "the team"}.
          </DialogDescription>
        </DialogHeader>
        <StateBanners state={state} />
        <StarRatingInput value={stars} onChange={setStars} />
        <div className="space-y-2">
          <Label htmlFor="feedback">Feedback</Label>
          <Textarea
            id="feedback"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="rounded-md"
            placeholder="What went well?"
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Feedback is required for payment release.
        </p>
        <DialogFooter>
          <Button variant="outline" className="rounded-md" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            className="rounded-md"
            disabled={!text.trim()}
            onClick={() => {
              toast.success("Thanks for your feedback");
              onOpenChange(false);
            }}
          >
            Submit feedback
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function PaymentModal({
  open,
  onOpenChange,
  job,
  state = "ready",
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  job: Job;
  state?: ScreenState;
}) {
  const [method, setMethod] = useState("card");
  const fee = Math.round(job.budget * 0.08);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-lg">
        <DialogHeader>
          <DialogTitle>Release payment</DialogTitle>
          <DialogDescription>
            {job.title} → {job.teamName || "Team"}
          </DialogDescription>
        </DialogHeader>
        <StateBanners state={state} />
        <div className="space-y-2 rounded-lg border p-3 text-sm">
          <div className="flex justify-between">
            <span>Job amount</span>
            <span>{formatCurrency(job.budget)}</span>
          </div>
          <div className="flex justify-between">
            <span>Platform fee</span>
            <Badge variant="outline" className="rounded-md">
              {formatCurrency(fee)}
            </Badge>
          </div>
          <Separator />
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>{formatCurrency(job.budget + fee)}</span>
          </div>
        </div>
        <div className="space-y-2">
          <Label>Payment method</Label>
          <div className="grid gap-2">
            {[
              { id: "card", label: "Visa ···· 4242" },
              { id: "bank", label: "Bank transfer" },
            ].map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setMethod(m.id)}
                className={cn(
                  "rounded-lg border px-3 py-3 text-left text-sm",
                  method === m.id && "border-primary bg-accent",
                )}
              >
                {m.label}
              </button>
            ))}
          </div>
          <Button variant="outline" size="sm" className="rounded-md">
            Add payment method
          </Button>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Shield className="size-3.5" />
          Secure escrow payment ·{" "}
          <a href="mailto:support@proptek.app" className="underline">
            Support
          </a>
        </div>
        <DialogFooter>
          <Button
            className="w-full rounded-md"
            onClick={() => {
              toast.success("Payment released");
              onOpenChange(false);
            }}
          >
            Confirm payment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function MembershipModal({
  open,
  onOpenChange,
  current = "plus",
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  current?: string;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90dvh] max-w-md overflow-y-auto rounded-lg">
        <DialogHeader>
          <DialogTitle className="font-[family-name:var(--font-display)]">
            Membership options
          </DialogTitle>
          <DialogDescription>Compare plans and unlock more jobs.</DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          {membershipPlans.map((plan) => (
            <div
              key={plan.id}
              className={cn(
                "rounded-lg border p-4",
                plan.highlighted && "border-primary shadow-sm",
              )}
            >
              <div className="flex items-center justify-between">
                <p className="font-[family-name:var(--font-display)] text-lg font-semibold">
                  {plan.name}
                </p>
                {current === plan.id ? (
                  <Badge className="rounded-md">Current</Badge>
                ) : null}
              </div>
              <p className="text-2xl font-semibold text-primary">
                {formatCurrency(plan.price)}
                <span className="text-sm font-normal text-muted-foreground">
                  /{plan.period}
                </span>
              </p>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-primary" />
                    {f}
                  </li>
                ))}
              </ul>
              {current !== plan.id ? (
                <Button
                  className="mt-3 w-full rounded-md"
                  onClick={() => {
                    toast.success(`Upgraded to ${plan.name}`);
                    onOpenChange(false);
                  }}
                >
                  Purchase
                </Button>
              ) : null}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function CertificationUploadModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-lg">
        <DialogHeader>
          <DialogTitle>Upload certification</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <div className="space-y-2">
            <Label>Type</Label>
            <Select defaultValue="hazmat">
              <SelectTrigger className="rounded-md">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hazmat">Hazardous Waste Handling</SelectItem>
                <SelectItem value="insured">Bonded & Insured</SelectItem>
                <SelectItem value="green">Green waste certified</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="provider">Provider</Label>
            <Input id="provider" className="rounded-md" placeholder="CalEPA" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cert-id">Certification ID</Label>
            <Input id="cert-id" className="rounded-md" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="expires">Expiration date</Label>
            <Input id="expires" type="date" className="rounded-md" />
          </div>
          <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed px-3 py-4 text-sm">
            <Upload className="size-4 text-primary" />
            Upload certificate file
            <Input type="file" className="hidden" accept=".pdf,.jpg,.jpeg" />
          </label>
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" className="rounded-md" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" className="rounded-md" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            className="rounded-md"
            onClick={() => {
              toast.success("Certification uploaded");
              onOpenChange(false);
            }}
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function NotificationsDrawer({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) {
  const groups = useMemo(() => {
    const map = new Map<string, typeof notifications>();
    for (const n of notifications) {
      const list = map.get(n.type) || [];
      list.push(n);
      map.set(n.type, list);
    }
    return Array.from(map.entries());
  }, []);

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="mx-auto max-h-[90dvh] max-w-md rounded-t-2xl">
        <DrawerHeader>
          <div className="flex items-center justify-between">
            <DrawerTitle>Notifications</DrawerTitle>
            <Button size="sm" variant="ghost" className="rounded-md">
              Mark all as read
            </Button>
          </div>
        </DrawerHeader>
        <div className="space-y-5 overflow-y-auto px-4 pb-8">
          {groups.map(([type, items]) => (
            <div key={type} className="space-y-2">
              <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                {type}
              </p>
              {items.map((n) => (
                <div
                  key={n.id}
                  className={cn(
                    "rounded-lg border p-3",
                    !n.read && "border-primary/30 bg-accent/60",
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-medium">{n.title}</p>
                    <Badge variant="outline" className="rounded-md capitalize">
                      {n.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{n.body}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {formatDate(n.timestamp)}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export function SearchFilterDrawer({
  open,
  onOpenChange,
  onApply,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  onApply?: (filters: Record<string, string>) => void;
}) {
  const [status, setStatus] = useState<string[]>([]);
  const [payment, setPayment] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="mx-auto max-w-md rounded-t-2xl">
        <DrawerHeader>
          <DrawerTitle>Search & filters</DrawerTitle>
        </DrawerHeader>
        <div className="space-y-4 px-4 pb-2">
          <div className="space-y-2">
            <Label htmlFor="sf-search">Search</Label>
            <Input
              id="sf-search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Address, title, team…"
              className="rounded-md"
            />
          </div>
          <div className="space-y-2">
            <Label>Job status</Label>
            <FacetChips
              multi
              options={[
                { label: "Open", value: "open" },
                { label: "Bidding", value: "bidding" },
                { label: "In progress", value: "in_progress" },
                { label: "Paid", value: "paid" },
              ]}
              value={status}
              onChange={(v) => setStatus(v as string[])}
            />
          </div>
          <div className="space-y-2">
            <Label>Payment status</Label>
            <FacetChips
              multi
              options={[
                { label: "Pending", value: "pending" },
                { label: "Held", value: "held" },
                { label: "Released", value: "released" },
              ]}
              value={payment}
              onChange={(v) => setPayment(v as string[])}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sf-location">Location</Label>
            <Input id="sf-location" placeholder="City or neighborhood" className="rounded-md" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-2">
              <Label htmlFor="sf-from">From</Label>
              <Input id="sf-from" type="date" className="rounded-md" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sf-to">To</Label>
              <Input id="sf-to" type="date" className="rounded-md" />
            </div>
          </div>
        </div>
        <DrawerFooter className="flex-row gap-2">
          <Button
            variant="outline"
            className="flex-1 rounded-md"
            onClick={() => {
              setStatus([]);
              setPayment([]);
              setSearch("");
            }}
          >
            Clear
          </Button>
          <Button
            className="flex-1 rounded-md"
            onClick={() => {
              onApply?.({ search, status: status.join(","), payment: payment.join(",") });
              onOpenChange(false);
            }}
          >
            Apply filters
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export function SubmitBidModal({
  open,
  onOpenChange,
  job,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  job: Job;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-lg">
        <DialogHeader>
          <DialogTitle>Submit bid</DialogTitle>
          <DialogDescription>{job.title}</DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="bid-amount">Bid amount</Label>
            <Input id="bid-amount" type="number" defaultValue={job.budget} className="rounded-md" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bid-days">Estimated completion (days)</Label>
            <Input id="bid-days" type="number" defaultValue={2} className="rounded-md" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bid-notes">Notes</Label>
            <Textarea id="bid-notes" className="rounded-md" />
          </div>
          <p className="text-xs text-muted-foreground">
            By submitting, you agree to PropTek marketplace terms.
          </p>
        </div>
        <DialogFooter>
          <Button variant="outline" className="rounded-md" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            className="rounded-md"
            onClick={() => {
              toast.success("Bid submitted");
              onOpenChange(false);
            }}
          >
            Submit bid
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
