"use client";

import { JobHistoryDetail } from "@/components/jobs/job-history-detail";
import { useAuthedUser } from "@/hooks/use-authed-user";

export default function PosterHistoryDetailPage({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) {
  const { user } = useAuthedUser("poster");
  return <JobHistoryDetail params={params} role="poster" user={user} />;
}
