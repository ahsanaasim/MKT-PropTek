"use client";

import { JobHistoryScreen } from "@/components/jobs/job-history-screen";
import { jobs } from "@/lib/data";
import { useAuthedUser } from "@/hooks/use-authed-user";

export default function TeamHistoryPage() {
  const { user } = useAuthedUser("team");
  return (
    <JobHistoryScreen
      role="team"
      user={user}
      loader={() => jobs.filter((j) => j.teamId === "u-team-1")}
      detailBase="/team/history"
    />
  );
}
