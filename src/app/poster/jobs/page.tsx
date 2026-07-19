"use client";

import { JobListScreen } from "@/components/jobs/job-list-screen";
import { currentPoster, jobs } from "@/lib/data";

export default function PosterJobsPage() {
  return (
    <JobListScreen
      role="poster"
      user={currentPoster}
      title="Your jobs"
      loader={() => jobs.filter((j) => j.posterId === "u-poster-1")}
      detailBase="/poster/job"
      createHref="/poster/job/new/details"
    />
  );
}
