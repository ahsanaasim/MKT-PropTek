"use client";

import { use } from "react";
import { JobChatScreen } from "@/components/jobs/job-chat-screen";
import { useAuthedUser } from "@/hooks/use-authed-user";

export default function TeamChatPage({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) {
  const { jobId } = use(params);
  const { user } = useAuthedUser("team");
  return <JobChatScreen jobId={jobId} role="team" user={user} />;
}
