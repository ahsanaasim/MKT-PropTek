"use client";

import Link from "next/link";
import { Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/brand/logo";
import type { User } from "@/lib/types";

export function TopBar({
  user,
  onNotifications,
  homeHref,
}: {
  user: User;
  onNotifications?: () => void;
  homeHref: string;
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-md items-center justify-between gap-3 px-4 py-3">
        <BrandLogo href={homeHref} size="sm" />
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="rounded-md border-primary/30 bg-[#FFF1F3] capitalize text-primary"
          >
            {user.membership}
          </Badge>
          <Button
            variant="ghost"
            size="icon"
            className="relative rounded-md"
            onClick={onNotifications}
            aria-label="Notifications"
          >
            <Bell className="size-5" />
            <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-primary" />
          </Button>
          <Link href="/profile" aria-label="Profile">
            <Avatar className="size-9 ring-2 ring-primary/15">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.slice(0, 1)}</AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </div>
    </header>
  );
}
