"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Award, Crown, LogOut, Shield } from "lucide-react";
import { MobileShell } from "@/components/layout/mobile-shell";
import { StateBanners } from "@/components/states/status-banners";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  CertificationUploadModal,
  MembershipModal,
} from "@/components/overlays/job-overlays";
import { formatDate } from "@/lib/data";
import { useAsyncData } from "@/hooks/use-async-data";
import { useScreenState } from "@/providers/screen-state-provider";
import { useAuth } from "@/providers/auth-provider";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

export default function ProfilePage() {
  const router = useRouter();
  const { user, role, logout, ready } = useAuth();
  const { setState } = useScreenState();
  const { data, state } = useAsyncData(() => user, [user?.id, ready]);
  const [membershipOpen, setMembershipOpen] = useState(false);
  const [certOpen, setCertOpen] = useState(false);

  if (!ready || !user || !role) {
    return (
      <div className="mx-auto max-w-md space-y-3 p-4">
        <Skeleton className="h-20 w-full rounded-lg" />
        <Skeleton className="h-40 w-full rounded-lg" />
      </div>
    );
  }

  return (
    <MobileShell role={role} user={user}>
      <div className="space-y-4">
        <div className="space-y-1">
          <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
            Profile & account
          </h1>
          <p className="text-sm text-muted-foreground">
            Role:{" "}
            <span className="font-medium text-foreground">
              {role === "team" ? "Clean Up Team" : "Job Poster"}
            </span>
          </p>
        </div>

        <StateBanners
          state={state}
          onRetry={() => setState("ready")}
          onUpgrade={() => setMembershipOpen(true)}
        />

        {state === "loading" ? (
          <div className="space-y-3">
            <Skeleton className="h-20 w-full rounded-lg" />
            <Skeleton className="h-40 w-full rounded-lg" />
          </div>
        ) : null}

        {data && state !== "loading" ? (
          <div className="grid gap-3 md:grid-cols-[1fr_0.9fr]">
            <div className="space-y-3">
              <Card className="rounded-lg">
                <CardContent className="flex items-center gap-3 p-4">
                  <Avatar className="size-16">
                    <AvatarImage src={data.avatar} />
                    <AvatarFallback>{data.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-[family-name:var(--font-display)] text-xl font-semibold">
                      {data.name}
                    </p>
                    <p className="text-sm text-muted-foreground">{data.email}</p>
                    <div className="mt-1 flex flex-wrap gap-1">
                      <Badge className="rounded-md capitalize">
                        {data.membership}
                      </Badge>
                      <Badge variant="outline" className="rounded-md">
                        ★ {data.rating}
                      </Badge>
                      <Badge variant="outline" className="rounded-md capitalize">
                        {data.role}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Accordion multiple defaultValue={["profile", "security"]}>
                <AccordionItem value="profile">
                  <AccordionTrigger>Edit profile</AccordionTrigger>
                  <AccordionContent className="space-y-3">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" defaultValue={data.name} className="rounded-md" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact">Contact</Label>
                      <Input id="contact" defaultValue={data.phone} className="rounded-md" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        defaultValue={data.company}
                        className="rounded-md"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        defaultValue={data.location}
                        className="rounded-md"
                      />
                    </div>
                    <Button
                      className="rounded-md"
                      onClick={() => toast.success("Profile saved")}
                    >
                      Save changes
                    </Button>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="security">
                  <AccordionTrigger>Change password</AccordionTrigger>
                  <AccordionContent className="space-y-3">
                    <div className="space-y-2">
                      <Label htmlFor="current">Current password</Label>
                      <Input id="current" type="password" className="rounded-md" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="next">New password</Label>
                      <Input id="next" type="password" className="rounded-md" />
                    </div>
                    <Button
                      className="rounded-md"
                      onClick={() => toast.success("Password updated")}
                    >
                      Update password
                    </Button>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <aside className="space-y-3">
              <Card className="rounded-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Crown className="size-4 text-primary" />
                    Membership
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm capitalize">
                    Current plan: <strong>{data.membership}</strong>
                  </p>
                  <Button
                    className="w-full rounded-md"
                    onClick={() => setMembershipOpen(true)}
                  >
                    Manage membership
                  </Button>
                </CardContent>
              </Card>

              <Card className="rounded-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Award className="size-4 text-primary" />
                    Certifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {data.certifications.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      No certifications on file.
                    </p>
                  ) : (
                    data.certifications.map((c) => (
                      <div
                        key={c.id}
                        className="rounded-lg border px-3 py-2 text-sm"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-medium">{c.type}</p>
                          {c.verified ? (
                            <Badge variant="outline" className="rounded-md">
                              <Shield className="size-3" />
                              Verified
                            </Badge>
                          ) : null}
                        </div>
                        <p className="text-muted-foreground">
                          {c.provider} · expires {formatDate(c.expiresAt)}
                        </p>
                      </div>
                    ))
                  )}
                  <Button
                    variant="outline"
                    className="w-full rounded-md"
                    onClick={() => setCertOpen(true)}
                  >
                    Upload certification
                  </Button>
                </CardContent>
              </Card>

              <Button
                variant="ghost"
                className="w-full rounded-md"
                onClick={() => {
                  logout();
                  router.push("/");
                }}
              >
                <LogOut className="size-4" />
                Sign out
              </Button>
            </aside>
          </div>
        ) : null}
      </div>

      <MembershipModal
        open={membershipOpen}
        onOpenChange={setMembershipOpen}
        current={user.membership}
      />
      <CertificationUploadModal open={certOpen} onOpenChange={setCertOpen} />
    </MobileShell>
  );
}
