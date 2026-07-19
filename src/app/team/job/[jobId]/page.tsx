"use client";

import { use } from "react";
import { JobDetailScreen } from "@/components/jobs/job-detail-screen";
import { currentTeam } from "@/lib/data";

export default function TeamJobDetailPage({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) {
  const { jobId } = use(params);
  return <JobDetailScreen jobId={jobId} role="team" user={currentTeam} />;
}
