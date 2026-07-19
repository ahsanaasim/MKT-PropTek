"use client";

import { JobHistoryScreen } from "@/components/jobs/job-history-screen";
import { currentTeam, jobs } from "@/lib/data";

export default function TeamHistoryPage() {
  return (
    <JobHistoryScreen
      role="team"
      user={currentTeam}
      loader={() => jobs.filter((j) => j.teamId === "u-team-1")}
      detailBase="/team/history"
    />
  );
}
