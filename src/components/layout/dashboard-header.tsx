"use client"
import { SidebarTrigger } from '@/components/ui/sidebar';
import { UserNav } from '@/components/layout/user-nav';

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6 lg:px-8">
        <div className="md:hidden">
            <SidebarTrigger />
        </div>
        <div className="ml-auto">
            <UserNav />
        </div>
    </header>
  );
}
