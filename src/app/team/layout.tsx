import { RoleGate } from "@/components/auth/role-gate";

export default function TeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RoleGate allow="team">{children}</RoleGate>;
}
