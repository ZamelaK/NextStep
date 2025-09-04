// src/components/layout/dashboard-sidebar.tsx
"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Home, User, Building2, FileText, LogOut, School, PenSquare, Files } from "lucide-react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { Logo } from "@/components/icons/logo";
import { Separator } from "../ui/separator";

/**
 * Renders the sidebar navigation for the dashboard layout.
 * It includes links to Dashboard, My Profile, Universities, Colleges, and Applications.
 * The active link is highlighted based on the current pathname.
 * A logout button is also included in the sidebar footer.
 *
 * @returns {JSX.Element} The dashboard sidebar component.
 */
export function DashboardSidebar() {
  const pathname = usePathname();

  const primaryItems = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/dashboard/profile", label: "My Profile", icon: User },
    { href: "/dashboard/applications", label: "Applications", icon: FileText },
  ];

  const secondaryItems = [
    { href: "/dashboard/universities", label: "Universities", icon: Building2 },
    { href: "/dashboard/colleges", label: "Colleges", icon: School },
  ];
  
  const toolsItems = [
    { href: "/dashboard/essay-helper", label: "Essay Helper", icon: PenSquare },
    { href: "/dashboard/documents", label: "My Documents", icon: Files },
  ]

  return (
    <Sidebar>
        <div className="flex flex-col h-full">
            <SidebarHeader>
                <div className="flex w-full items-center gap-2 p-2 group-data-[collapsible=icon]:justify-center">
                    <Logo className="h-7 w-7 flex-shrink-0" />
                    <h1 className="truncate text-xl font-headline font-semibold group-data-[collapsible=icon]:hidden">
                        NextStep
                    </h1>
                </div>
            </SidebarHeader>
            <SidebarContent className="flex-1 overflow-y-auto">
                <SidebarMenu className="p-2 space-y-4">
                  <div>
                    <SidebarMenu className="p-2">
                      {primaryItems.map((item) => (
                        <SidebarMenuItem key={item.href}>
                          <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.label} size="lg">
                            <Link href={item.href}>
                              <item.icon />
                              <span>{item.label}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </div>
                  <Separator />
                   <div>
                    <SidebarMenu className="p-2">
                      {secondaryItems.map((item) => (
                        <SidebarMenuItem key={item.href}>
                          <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.label} size="lg">
                            <Link href={item.href}>
                              <item.icon />
                              <span>{item.label}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </div>
                   <Separator />
                   <div>
                    <SidebarMenu className="p-2">
                      {toolsItems.map((item) => (
                        <SidebarMenuItem key={item.href}>
                          <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.label} size="lg">
                            <Link href={item.href}>
                              <item.icon />
                              <span>{item.label}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </div>
                </SidebarMenu>
            </SidebarContent>
             <div className="mt-auto p-2">
                 <Separator className="my-2" />
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild tooltip="Log Out" size="lg">
                            <Link href="/">
                                <LogOut />
                                <span>Log Out</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </div>
        </div>
    </Sidebar>
  );
}