import { RoleGate } from "@/components/auth/role-gate";

export default function PosterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RoleGate allow="poster">{children}</RoleGate>;
}
