import { Badge } from "@/components/ui/badge";
import { statusLabel } from "@/lib/data";
import type { JobStatus, PaymentStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

const jobTone: Record<JobStatus, string> = {
  draft: "bg-zinc-100 text-zinc-700 border-zinc-200",
  open: "bg-sky-50 text-sky-700 border-sky-200",
  bidding: "bg-[#FFF1F3] text-[#E31C5F] border-[#FFD0D9]",
  awarded: "bg-violet-50 text-violet-700 border-violet-200",
  in_progress: "bg-amber-50 text-amber-800 border-amber-200",
  completion_submitted: "bg-orange-50 text-orange-800 border-orange-200",
  approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
  paid: "bg-emerald-100 text-emerald-800 border-emerald-200",
  disputed: "bg-rose-50 text-rose-700 border-rose-200",
  cancelled: "bg-zinc-100 text-zinc-500 border-zinc-200",
};

const payTone: Record<PaymentStatus, string> = {
  pending: "bg-zinc-100 text-zinc-700 border-zinc-200",
  held: "bg-amber-50 text-amber-800 border-amber-200",
  released: "bg-emerald-50 text-emerald-700 border-emerald-200",
  failed: "bg-rose-50 text-rose-700 border-rose-200",
  refunded: "bg-sky-50 text-sky-700 border-sky-200",
};

export function JobStatusBadge({ status }: { status: JobStatus }) {
  return (
    <Badge
      variant="outline"
      className={cn("rounded-md font-medium", jobTone[status])}
    >
      {statusLabel(status)}
    </Badge>
  );
}

export function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  return (
    <Badge
      variant="outline"
      className={cn("rounded-md font-medium", payTone[status])}
    >
      {statusLabel(status)}
    </Badge>
  );
}
