"use client";

import { JobHistoryScreen } from "@/components/jobs/job-history-screen";
import { currentPoster, jobs } from "@/lib/data";

export default function PosterHistoryPage() {
  return (
    <JobHistoryScreen
      role="poster"
      user={currentPoster}
      loader={() =>
        jobs.filter(
          (j) =>
            j.posterId === "u-poster-1" &&
            ["approved", "paid", "completion_submitted", "disputed", "in_progress"].includes(
              j.status,
            ),
        )
      }
      detailBase="/poster/history"
    />
  );
}
