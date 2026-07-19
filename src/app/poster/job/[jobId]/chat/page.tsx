"use client";

import { use } from "react";
import { JobChatScreen } from "@/components/jobs/job-chat-screen";
import { currentPoster } from "@/lib/data";

export default function PosterChatPage({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) {
  const { jobId } = use(params);
  return <JobChatScreen jobId={jobId} role="poster" user={currentPoster} />;
}
