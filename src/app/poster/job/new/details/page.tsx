"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";
import { WizardShell } from "@/components/jobs/wizard-shell";
import { useJobDraft } from "@/providers/job-draft-provider";
import { Button } from "@/components/ui/button"
import { LinkButton } from "@/components/ui/link-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function JobDetailsStep() {
  const { draft, setDraft } = useJobDraft();

  return (
    <WizardShell
      title="Job details"
      preview={
        <div>
          <p className="font-[family-name:var(--font-display)] font-semibold">
            {draft.title || "Untitled job"}
          </p>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
            {draft.description || "Add a description to attract better bids."}
          </p>
          <p className="mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="size-3.5" />
            {draft.address || "Address pending"}
          </p>
        </div>
      }
    >
      <div className="space-y-2">
        <Label htmlFor="title">Job title</Label>
        <Input
          id="title"
          className="h-11 rounded-md"
          value={draft.title}
          onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="desc">Job description</Label>
        <Textarea
          id="desc"
          className="min-h-28 rounded-md"
          value={draft.description}
          onChange={(e) =>
            setDraft((d) => ({ ...d, description: e.target.value }))
          }
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          className="h-11 rounded-md"
          value={draft.address}
          onChange={(e) => setDraft((d) => ({ ...d, address: e.target.value }))}
          placeholder="Start typing an address…"
        />
      </div>
      <div className="overflow-hidden rounded-lg border bg-[#e8f0e9]">
        <div className="flex h-40 items-center justify-center text-sm text-muted-foreground">
          <div className="text-center">
            <MapPin className="mx-auto mb-2 size-6 text-primary" />
            Map picker · pin at job location
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 pt-2">
        <Button
          variant="outline"
          className="rounded-md"
          onClick={() => toast.message("Draft saved")}
        >
          Save draft
        </Button>
        <LinkButton className="rounded-md" href="/poster/job/new/budget">Next</LinkButton>
      </div>
      <LinkButton variant="ghost" className="rounded-md" href="/poster/home">Cancel</LinkButton>
    </WizardShell>
  );
}
