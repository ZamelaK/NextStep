"use client"

import * as React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import type { Application } from "@/lib/types"

const statusVariantMap: Record<Application['status'], 'default' | 'secondary' | 'destructive' | 'outline'> = {
    'Accepted': 'default',
    'Pending': 'secondary',
    'Rejected': 'destructive',
    'Interview': 'outline',
    'Draft': 'secondary'
}

const statusColorMap: Record<Application['status'], string> = {
    'Accepted': 'bg-green-500',
    'Pending': 'bg-yellow-500',
    'Rejected': 'bg-red-500',
    'Interview': 'bg-blue-500',
    'Draft': 'bg-gray-500',
}


export function ApplicationsTable({ applications }: { applications: Application[] }) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>University</TableHead>
            <TableHead>Program</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date Submitted</TableHead>
            <TableHead>Feedback</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((app) => (
            <TableRow key={app.id}>
              <TableCell className="font-medium">{app.university}</TableCell>
              <TableCell>{app.program}</TableCell>
              <TableCell>
                <Badge variant={statusVariantMap[app.status]} className="capitalize text-white" style={{backgroundColor: `var(--${statusVariantMap[app.status]})`}}>
                  <div className={`h-2 w-2 rounded-full mr-2 ${statusColorMap[app.status]}`}></div>
                  {app.status}
                </Badge>
              </TableCell>
              <TableCell>{app.date}</TableCell>
              <TableCell className="text-muted-foreground">{app.feedback || 'N/A'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
