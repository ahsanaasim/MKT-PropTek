import { RoleGate } from "@/components/auth/role-gate";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RoleGate>{children}</RoleGate>;
}
