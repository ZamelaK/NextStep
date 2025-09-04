import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Hourglass, CheckCircle2, XCircle } from 'lucide-react';
import { MOCK_APPLICATIONS } from '@/lib/mock-data';

export const metadata: Metadata = {
  title: 'Dashboard - NextStep',
  description: 'Your university application dashboard.',
};

const StatCard = ({ title, value, icon: Icon }: { title: string, value: number, icon: React.ElementType }) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{value}</div>
        </CardContent>
    </Card>
);

export default function DashboardPage() {
    const stats = {
        submitted: MOCK_APPLICATIONS.filter(app => app.status !== 'Draft').length,
        pending: MOCK_APPLICATIONS.filter(app => app.status === 'Pending' || app.status === 'Interview').length,
        accepted: MOCK_APPLICATIONS.filter(app => app.status === 'Accepted').length,
        rejected: MOCK_APPLICATIONS.filter(app => app.status === 'Rejected').length,
    }

  return (
    <div className="flex flex-col gap-8">
        <div>
            <h1 className="text-3xl font-bold font-headline">Welcome back, Student!</h1>
            <p className="text-muted-foreground">Here's a summary of your application journey.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard title="Applications Submitted" value={stats.submitted} icon={FileText} />
            <StatCard title="Pending Review" value={stats.pending} icon={Hourglass} />
            <StatCard title="Offers Received" value={stats.accepted} icon={CheckCircle2} />
            <StatCard title="Decisions Received" value={stats.rejected} icon={XCircle} />
        </div>
        <Card>
            <CardHeader>
                <CardTitle>Next Steps</CardTitle>
            </CardHeader>
            <CardContent>
                <p>Ready to plan your future? Start by exploring universities or updating your profile.</p>
            </CardContent>
        </Card>
    </div>
  );
}
