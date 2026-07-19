"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Briefcase,
  MessageCircle,
  User,
  History,
  BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { UserRole } from "@/lib/types";

const posterItems = [
  { href: "/poster/home", label: "Home", icon: Home },
  { href: "/poster/jobs", label: "Jobs", icon: Briefcase },
  { href: "/poster/history", label: "History", icon: History },
  { href: "/poster/reports", label: "Reports", icon: BarChart3 },
  { href: "/profile", label: "Profile", icon: User },
];

const teamItems = [
  { href: "/team/home", label: "Home", icon: Home },
  { href: "/team/jobs", label: "Find", icon: Briefcase },
  { href: "/team/history", label: "History", icon: History },
  { href: "/team/job/job-102/chat", label: "Chat", icon: MessageCircle },
  { href: "/profile", label: "Profile", icon: User },
];

export function BottomNavBar({ role }: { role: UserRole }) {
  const pathname = usePathname();
  const items = role === "poster" ? posterItems : teamItems;

  return (
    <nav
      className="safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-border/80 bg-white/95 backdrop-blur-md"
      aria-label="Primary"
    >
      <ul className="mx-auto flex max-w-md items-stretch justify-between px-2 py-1.5">
        {items.map(({ href, label, icon: Icon }) => {
          const active =
            pathname === href ||
            (href !== "/poster/home" &&
              href !== "/team/home" &&
              pathname.startsWith(href));
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                className={cn(
                  "flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-md px-1 text-[11px] font-medium transition-colors duration-150",
                  active ? "text-primary" : "text-muted-foreground",
                )}
              >
                <Icon className={cn("size-5", active && "scale-105")} />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
