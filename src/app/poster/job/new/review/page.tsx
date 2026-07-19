"use client";

import Link from "next/link";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { WizardShell } from "@/components/jobs/wizard-shell";
import { useJobDraft } from "@/providers/job-draft-provider";
import { Button } from "@/components/ui/button"
import { LinkButton } from "@/components/ui/link-button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatCurrency } from "@/lib/data";
import { toast } from "sonner";

export default function JobReviewStep() {
  const { draft } = useJobDraft();
  const [success, setSuccess] = useState(false);

  return (
    <WizardShell title="Review & submit">
      <section className="space-y-3 rounded-lg border bg-white p-4">
        {(
          [
            ["Title", draft.title, "/poster/job/new/details"],
            ["Description", draft.description, "/poster/job/new/details"],
            ["Address", draft.address, "/poster/job/new/details"],
            [
              "Budget",
              formatCurrency(Number(draft.budget) || 0),
              "/poster/job/new/budget",
            ],
            [
              "Deadline",
              draft.deadline
                ? new Date(draft.deadline).toLocaleString()
                : "—",
              "/poster/job/new/budget",
            ],
          ] as const
        ).map(([label, value, href]) => (
          <div key={label} className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs text-muted-foreground">{label}</p>
              <p className="text-sm font-medium">{value}</p>
            </div>
            <LinkButton variant="link" size="sm" className="h-auto p-0" href={href}>Edit</LinkButton>
          </div>
        ))}
        <div>
          <p className="text-xs text-muted-foreground">Uploaded media</p>
          <div className="mt-1 flex flex-wrap gap-1">
            {draft.media.map((m) => (
              <Badge key={m} variant="outline" className="rounded-md">
                {m}
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Timeline preview</p>
          <ol className="mt-1 space-y-1 text-sm text-muted-foreground">
            <li>1. Job posted</li>
            <li>2. Bids collected</li>
            <li>3. Award & escrow</li>
            <li>4. Completion & payment</li>
          </ol>
        </div>
        <div className="flex flex-wrap gap-1">
          <Badge className="rounded-md">Photo documentation</Badge>
          <Badge variant="outline" className="rounded-md">
            Insured preferred
          </Badge>
        </div>
      </section>

      <div className="grid gap-2 pt-2">
        <Button className="h-11 rounded-md" onClick={() => setSuccess(true)}>
          Submit job
        </Button>
        <Button
          variant="outline"
          className="rounded-md"
          onClick={() => toast.message("Saved as draft")}
        >
          Save as draft
        </Button>
        <LinkButton variant="ghost" className="rounded-md" href="/poster/job/new/media">Back</LinkButton>
      </div>

      <Dialog open={success} onOpenChange={setSuccess}>
        <DialogContent className="max-w-md rounded-lg">
          <DialogHeader>
            <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <CheckCircle2 className="size-6" />
            </div>
            <DialogTitle className="text-center font-[family-name:var(--font-display)]">
              Job posted
            </DialogTitle>
          </DialogHeader>
          <p className="text-center text-sm text-muted-foreground">
            Your cleanup job is live in the marketplace gallery.
          </p>
          <DialogFooter className="flex-col gap-2 sm:flex-col">
            <LinkButton className="w-full rounded-md" href="/poster/job/job-101">View job</LinkButton>
            <LinkButton variant="outline" className="w-full rounded-md" href="/poster/job/new/details">Post another job</LinkButton>
            <Button
              variant="ghost"
              className="w-full rounded-md"
              onClick={() => setSuccess(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </WizardShell>
  );
}
