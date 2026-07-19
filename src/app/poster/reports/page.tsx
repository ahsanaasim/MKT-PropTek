"use client";

import { useMemo, useState } from "react";
import { Download } from "lucide-react";
import { MobileShell } from "@/components/layout/mobile-shell";
import { FacetChips } from "@/components/filters/facet-chips";
import { StateBanners } from "@/components/states/status-banners";
import { EmptyState } from "@/components/states/empty-state";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { currentPoster, reportSeries } from "@/lib/data";
import { useAsyncData } from "@/hooks/use-async-data";
import { useScreenState } from "@/providers/screen-state-provider";
import { toast } from "sonner";

function MiniBars({
  data,
  format = (n: number) => String(n),
}: {
  data: { label: string; value: number }[];
  format?: (n: number) => string;
}) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="flex h-40 items-end gap-2">
      {data.map((d) => (
        <div key={d.label} className="flex flex-1 flex-col items-center gap-1">
          <span className="text-[10px] text-muted-foreground">
            {format(d.value)}
          </span>
          <div
            className="w-full rounded-t-md bg-gradient-to-t from-[#e31c5f] to-[#ff385c] transition-all duration-500"
            style={{ height: `${(d.value / max) * 100}%` }}
          />
          <span className="text-[10px] font-medium">{d.label}</span>
        </div>
      ))}
    </div>
  );
}

export default function ReportsPage() {
  const { setState } = useScreenState();
  const [range, setRange] = useState("90d");
  const { data, state } = useAsyncData(() => reportSeries, []);

  const kpis = useMemo(() => {
    if (!data) return [];
    return [
      {
        label: "Completed jobs",
        value: data.completedJobs.reduce((a, b) => a + b.value, 0),
      },
      {
        label: "Revenue",
        value: `$${data.revenue.reduce((a, b) => a + b.value, 0).toLocaleString()}`,
      },
      {
        label: "Members",
        value: data.membershipGrowth.at(-1)?.value || 0,
      },
      {
        label: "Avg days",
        value: data.completionDays.at(-1)?.value.toFixed(1) || "—",
      },
    ];
  }, [data]);

  return (
    <MobileShell role="poster" user={currentPoster}>
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
              Reports & analytics
            </h1>
            <p className="text-sm text-muted-foreground">
              Performance across your cleanup portfolio
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button size="sm" variant="outline" className="rounded-md" />
              }
            >
              <Download className="size-4" />
              Export
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => toast.success("CSV exported")}>
                Export CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast.success("PDF exported")}>
                Export PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <StateBanners state={state} onRetry={() => setState("ready")} />

        <FacetChips
          options={[
            { label: "30 days", value: "30d" },
            { label: "90 days", value: "90d" },
            { label: "YTD", value: "ytd" },
          ]}
          value={range}
          onChange={(v) => setRange(String(v))}
        />

        {state === "loading" ? (
          <div className="grid grid-cols-2 gap-2">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-24 rounded-lg" />
            ))}
          </div>
        ) : null}

        {state === "empty" ? (
          <EmptyState
            title="No report data"
            description="Complete a few jobs to unlock analytics."
          />
        ) : null}

        {(state === "ready" || state === "plan_limit") && data ? (
          <>
            <div className="grid grid-cols-2 gap-2">
              {kpis.map((k) => (
                <Card key={k.label} className="rounded-lg">
                  <CardContent className="space-y-1 p-4">
                    <p className="text-xs text-muted-foreground">{k.label}</p>
                    <p className="font-[family-name:var(--font-display)] text-xl font-semibold">
                      {k.value}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Tabs defaultValue="jobs">
              <TabsList className="grid w-full grid-cols-3 rounded-lg">
                <TabsTrigger value="jobs">Jobs</TabsTrigger>
                <TabsTrigger value="revenue">Revenue</TabsTrigger>
                <TabsTrigger value="teams">Teams</TabsTrigger>
              </TabsList>
              <TabsContent value="jobs" className="space-y-3 pt-3">
                <Card className="rounded-lg">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Completed jobs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <MiniBars data={data.completedJobs} />
                  </CardContent>
                </Card>
                <Card className="rounded-lg">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Completion time</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <MiniBars
                      data={data.completionDays}
                      format={(n) => `${n}d`}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="revenue" className="space-y-3 pt-3">
                <Card className="rounded-lg">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Revenue</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <MiniBars
                      data={data.revenue}
                      format={(n) => `$${(n / 1000).toFixed(1)}k`}
                    />
                  </CardContent>
                </Card>
                <Card className="rounded-lg">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Membership growth</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <MiniBars data={data.membershipGrowth} />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="teams" className="pt-3">
                <Card className="rounded-lg">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Team ratings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Team</TableHead>
                          <TableHead>Rating</TableHead>
                          <TableHead>Jobs</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {data.teamRatings.map((row) => (
                          <TableRow key={row.team}>
                            <TableCell>{row.team}</TableCell>
                            <TableCell>{row.rating}</TableCell>
                            <TableCell>{row.jobs}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        ) : null}
      </div>
    </MobileShell>
  );
}
