"use client";

import { use } from "react";
import { JobChatScreen } from "@/components/jobs/job-chat-screen";
import { currentTeam } from "@/lib/data";

export default function TeamChatPage({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) {
  const { jobId } = use(params);
  return <JobChatScreen jobId={jobId} role="team" user={currentTeam} />;
}
