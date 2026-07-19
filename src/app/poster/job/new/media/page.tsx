"use client";

import Link from "next/link";
import { Upload, X } from "lucide-react";
import { WizardShell } from "@/components/jobs/wizard-shell";
import { useJobDraft } from "@/providers/job-draft-provider";
import { Button } from "@/components/ui/button"
import { LinkButton } from "@/components/ui/link-button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function JobMediaStep() {
  const { draft, setDraft } = useJobDraft();

  return (
    <WizardShell
      title="Media upload"
      preview={
        <ul className="space-y-1 text-sm">
          {draft.media.length ? (
            draft.media.map((m) => <li key={m}>• {m}</li>)
          ) : (
            <li className="text-muted-foreground">No media yet</li>
          )}
        </ul>
      }
    >
      <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-primary/40 bg-accent/40 px-4 py-10 text-center">
        <Upload className="size-6 text-primary" />
        <span className="text-sm font-medium">Drop JPG or PDF files</span>
        <span className="text-xs text-muted-foreground">Max 20MB each</span>
        <Input
          type="file"
          accept=".jpg,.jpeg,.pdf"
          className="hidden"
          onChange={(e) => {
            const name = e.target.files?.[0]?.name;
            if (name) setDraft((d) => ({ ...d, media: [...d.media, name] }));
          }}
        />
      </label>
      <div className="grid grid-cols-2 gap-2">
        {draft.media.map((m) => (
          <div
            key={m}
            className="relative flex aspect-square items-end rounded-lg border bg-muted p-2 text-xs"
          >
            <span className="truncate">{m}</span>
            <Button
              size="icon"
              variant="secondary"
              className="absolute top-1 right-1 size-7 rounded-md"
              onClick={() =>
                setDraft((d) => ({
                  ...d,
                  media: d.media.filter((x) => x !== m),
                }))
              }
            >
              <X className="size-3.5" />
            </Button>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2 pt-2">
        <LinkButton variant="outline" className="rounded-md" href="/poster/job/new/budget">Back</LinkButton>
        <LinkButton className="rounded-md" href="/poster/job/new/review">Next</LinkButton>
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
