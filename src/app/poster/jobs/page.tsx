"use client";

import { JobListScreen } from "@/components/jobs/job-list-screen";
import { jobs } from "@/lib/data";
import { useAuthedUser } from "@/hooks/use-authed-user";

export default function PosterJobsPage() {
  const { user } = useAuthedUser("poster");
  return (
    <JobListScreen
      role="poster"
      user={user}
      title="Your jobs"
      loader={() => jobs.filter((j) => j.posterId === "u-poster-1")}
      detailBase="/poster/job"
      createHref="/poster/job/new/details"
    />
  );
}
