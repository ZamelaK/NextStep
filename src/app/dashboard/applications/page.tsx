import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ApplicationsTable } from '@/components/dashboard/applications-table';
import { MOCK_APPLICATIONS } from '@/lib/mock-data';

export const metadata: Metadata = {
  title: 'My Applications - NextStep',
  description: 'Track your university applications.',
};

export default function ApplicationsPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl">My Applications</CardTitle>
          <CardDescription>
            Here is a list of your applications and their current status.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <ApplicationsTable applications={MOCK_APPLICATIONS} />
        </CardContent>
      </Card>
    </div>
  );
}
