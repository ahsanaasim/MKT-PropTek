"use client";

import { JobHistoryDetail } from "@/components/jobs/job-history-detail";
import { currentTeam } from "@/lib/data";

export default function TeamHistoryDetailPage({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) {
  return <JobHistoryDetail params={params} role="team" user={currentTeam} />;
}
