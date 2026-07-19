"use client";

import { JobListScreen } from "@/components/jobs/job-list-screen";
import { currentTeam, jobs } from "@/lib/data";

export default function TeamJobsPage() {
  return (
    <JobListScreen
      role="team"
      user={currentTeam}
      title="Available jobs"
      loader={() =>
        jobs.filter((j) => ["open", "bidding"].includes(j.status) || !j.teamId)
      }
      detailBase="/team/job"
    />
  );
}
