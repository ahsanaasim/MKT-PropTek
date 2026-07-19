"use client";

import { JobHistoryDetail } from "@/components/jobs/job-history-detail";
import { useAuthedUser } from "@/hooks/use-authed-user";

export default function TeamHistoryDetailPage({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) {
  const { user } = useAuthedUser("team");
  return <JobHistoryDetail params={params} role="team" user={user} />;
}
