"use client";

import { JobHistoryDetail } from "@/components/jobs/job-history-detail";
import { currentPoster } from "@/lib/data";

export default function PosterHistoryDetailPage({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) {
  return (
    <JobHistoryDetail params={params} role="poster" user={currentPoster} />
  );
}
