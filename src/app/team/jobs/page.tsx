"use client";

import { JobListScreen } from "@/components/jobs/job-list-screen";
import { jobs } from "@/lib/data";
import { useAuthedUser } from "@/hooks/use-authed-user";

export default function TeamJobsPage() {
  const { user } = useAuthedUser("team");
  return (
    <JobListScreen
      role="team"
      user={user}
      title="Available jobs"
      loader={() =>
        jobs.filter((j) => ["open", "bidding"].includes(j.status) || !j.teamId)
      }
      detailBase="/team/job"
    />
  );
}
