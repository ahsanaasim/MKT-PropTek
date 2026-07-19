"use client";

import { use } from "react";
import { JobDetailScreen } from "@/components/jobs/job-detail-screen";
import { currentPoster } from "@/lib/data";

export default function PosterJobDetailPage({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) {
  const { jobId } = use(params);
  return <JobDetailScreen jobId={jobId} role="poster" user={currentPoster} />;
}
