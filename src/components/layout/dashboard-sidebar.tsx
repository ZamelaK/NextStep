"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Home, User, Building2, FileText } from "lucide-react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { Logo } from "@/components/icons/logo";
import { Separator } from "@/components/ui/separator";

/**
 * Renders the sidebar navigation for the dashboard layout.
 * It includes links to Dashboard, My Profile, Universities, and Applications.
 * The active link is highlighted based on the current pathname.
 *
 * @returns {JSX.Element} The dashboard sidebar component.
 */
export function DashboardSidebar() {
  const pathname = usePathname();

  const menuItems = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/dashboard/profile", label: "My Profile", icon: User },
    { href: "/dashboard/universities", label: "Universities", icon: Building2 },
    { href: "/dashboard/applications", label: "Applications", icon: FileText },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="group-data-[collapsible=icon]:p-2">
        <div className="flex w-full items-center gap-2 p-2 group-data-[collapsible=icon]:justify-center">
          <Logo className="h-7 w-7 flex-shrink-0" />
          <h1 className="truncate text-xl font-headline font-semibold group-data-[collapsible=icon]:hidden">
            NextStep
          </h1>
        </div>
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <SidebarMenu className="p-2">
          {menuItems.map((item) => (
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
      </SidebarContent>
    </Sidebar>
  );
}
