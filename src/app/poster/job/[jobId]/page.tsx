"use client";

import { use } from "react";
import { JobDetailScreen } from "@/components/jobs/job-detail-screen";
import { useAuthedUser } from "@/hooks/use-authed-user";

export default function PosterJobDetailPage({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) {
  const { jobId } = use(params);
  const { user } = useAuthedUser("poster");
  return <JobDetailScreen jobId={jobId} role="poster" user={user} />;
}
