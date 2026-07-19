"use client";

import Link from "next/link";
import { WizardShell } from "@/components/jobs/wizard-shell";
import { useJobDraft } from "@/providers/job-draft-provider";
import { Button } from "@/components/ui/button"
import { LinkButton } from "@/components/ui/link-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { formatCurrency } from "@/lib/data";

export default function JobBudgetStep() {
  const { draft, setDraft } = useJobDraft();
  const budgetNum = Number(draft.budget) || 0;

  return (
    <WizardShell
      title="Budget & deadline"
      preview={
        <div className="space-y-1 text-sm">
          <p className="text-2xl font-semibold text-primary">
            {formatCurrency(budgetNum)}
          </p>
          <p>Deadline: {draft.deadline ? new Date(draft.deadline).toLocaleString() : "—"}</p>
          <p>{draft.urgency ? "Marked urgent" : "Standard timing"}</p>
        </div>
      }
    >
      <div className="space-y-2">
        <Label htmlFor="budget">Budget (USD)</Label>
        <Input
          id="budget"
          type="number"
          className="h-11 rounded-md"
          value={draft.budget}
          onChange={(e) => setDraft((d) => ({ ...d, budget: e.target.value }))}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="deadline">Deadline</Label>
        <Input
          id="deadline"
          type="datetime-local"
          className="h-11 rounded-md"
          value={draft.deadline}
          onChange={(e) =>
            setDraft((d) => ({ ...d, deadline: e.target.value }))
          }
        />
      </div>
      <label className="flex items-center justify-between rounded-lg border bg-white px-3 py-3">
        <div>
          <p className="font-medium">Urgent job</p>
          <p className="text-sm text-muted-foreground">
            Highlight in the gallery feed
          </p>
        </div>
        <Switch
          checked={draft.urgency}
          onCheckedChange={(v) => setDraft((d) => ({ ...d, urgency: v }))}
        />
      </label>
      <div className="grid grid-cols-2 gap-2 pt-2">
        <LinkButton variant="outline" className="rounded-md" href="/poster/job/new/details">Back</LinkButton>
        <LinkButton className="rounded-md" href="/poster/job/new/media">Next</LinkButton>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Button
          variant="secondary"
          className="rounded-md"
          onClick={() => toast.message("Draft saved")}
        >
          Save draft
        </Button>
        <LinkButton variant="ghost" className="rounded-md" href="/poster/home">Cancel</LinkButton>
      </div>
    </WizardShell>
  );
}
