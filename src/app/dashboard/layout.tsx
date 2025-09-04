import { DashboardHeader } from '@/components/layout/dashboard-header';
import { DashboardSidebar } from '@/components/layout/dashboard-sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="min-h-screen w-full">
        <DashboardSidebar />
        <SidebarInset>
          <DashboardHeader />
          <div className="p-4 sm:p-6 lg:p-8">{children}</div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
