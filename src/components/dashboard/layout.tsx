
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
      <div className="min-h-screen w-full flex">
        <DashboardSidebar />
        <SidebarInset>
          <div className="flex-1 flex flex-col h-screen">
            <DashboardHeader />
            <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">{children}</main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
