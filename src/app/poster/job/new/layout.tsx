import { JobDraftProvider } from "@/providers/job-draft-provider";

export default function NewJobLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <JobDraftProvider>{children}</JobDraftProvider>;
}
