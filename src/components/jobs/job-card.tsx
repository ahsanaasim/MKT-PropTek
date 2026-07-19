"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Calendar, DollarSign } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LinkButton } from "@/components/ui/link-button";
import { JobStatusBadge } from "@/components/jobs/status-badge";
import { formatCurrency, formatDate } from "@/lib/data";
import type { Job } from "@/lib/types";

export function JobCard({
  job,
  href,
  actionLabel,
  onAction,
}: {
  job: Job;
  href: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <Card className="overflow-hidden rounded-lg border-border/80 bg-white p-0 shadow-sm transition-transform duration-200 hover:-translate-y-0.5">
      <Link href={href} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <Image
            src={job.images[0] || "/placeholder-job.jpg"}
            alt={job.title}
            fill
            className="object-cover"
            sizes="(max-width: 430px) 100vw, 400px"
            unoptimized
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-3 pt-10">
            <JobStatusBadge status={job.status} />
          </div>
        </div>
        <div className="space-y-2 p-4">
          <h3 className="font-[family-name:var(--font-display)] text-lg leading-snug font-semibold">
            {job.title}
          </h3>
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <MapPin className="size-3.5" />
              {job.city}
            </span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="size-3.5" />
              {formatDate(job.deadline)}
            </span>
            <span className="inline-flex items-center gap-1 font-medium text-foreground">
              <DollarSign className="size-3.5 text-primary" />
              {formatCurrency(job.budget)}
            </span>
          </div>
          {job.bidCount > 0 ? (
            <p className="text-xs text-muted-foreground">{job.bidCount} bids</p>
          ) : null}
        </div>
      </Link>
      {actionLabel ? (
        <div className="border-t px-4 py-3">
          {onAction ? (
            <Button
              className="w-full rounded-md"
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                onAction();
              }}
            >
              {actionLabel}
            </Button>
          ) : (
            <LinkButton href={href} className="w-full rounded-md" size="sm">
              {actionLabel}
            </LinkButton>
          )}
        </div>
      ) : null}
    </Card>
  );
}

export function JobCardSkeleton() {
  return (
    <Card className="overflow-hidden rounded-lg p-0">
      <div className="aspect-[4/3] animate-pulse bg-muted" />
      <div className="space-y-2 p-4">
        <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />
        <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
      </div>
    </Card>
  );
}
