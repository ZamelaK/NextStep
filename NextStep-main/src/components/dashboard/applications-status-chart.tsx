
"use client"

import * as React from "react"
import { Pie, PieChart, Cell, Tooltip } from "recharts"
import type { Application } from "@/lib/types"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart"

const statusColors: Record<Application['status'], string> = {
    'Accepted': 'hsl(var(--chart-1))',
    'Pending': 'hsl(var(--chart-2))',
    'Interview': 'hsl(var(--chart-4))',
    'Rejected': 'hsl(var(--destructive))',
    'Draft': 'hsl(var(--muted-foreground))',
};

export function ApplicationsStatusChart({ applications }: { applications: Application[] }) {
  const statusCounts = React.useMemo(() => {
    return applications.reduce((acc, app) => {
      acc[app.status] = (acc[app.status] || 0) + 1;
      return acc;
    }, {} as Record<Application['status'], number>);
  }, [applications]);

  const chartData = Object.entries(statusCounts).map(([status, count]) => ({
    status,
    count,
    fill: statusColors[status as Application['status']],
  }));

  const chartConfig = chartData.reduce((acc, data) => {
    acc[data.status] = { label: data.status, color: data.fill };
    return acc;
  }, {} as any);


  return (
    <div className="w-full">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[300px]">
          <PieChart>
            <Tooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="status"
              innerRadius={60}
              strokeWidth={5}
            >
               {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
            </Pie>
          </PieChart>
        </ChartContainer>
    </div>
  )
}
