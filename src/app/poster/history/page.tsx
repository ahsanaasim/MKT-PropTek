"use client";

import { JobHistoryScreen } from "@/components/jobs/job-history-screen";
import { jobs } from "@/lib/data";
import { useAuthedUser } from "@/hooks/use-authed-user";

export default function PosterHistoryPage() {
  const { user } = useAuthedUser("poster");
  return (
    <JobHistoryScreen
      role="poster"
      user={user}
      loader={() =>
        jobs.filter(
          (j) =>
            j.posterId === "u-poster-1" &&
            [
              "approved",
              "paid",
              "completion_submitted",
              "disputed",
              "in_progress",
            ].includes(j.status),
        )
      }
      detailBase="/poster/history"
    />
  );
}
