import type { Metadata } from 'next';
import { MOCK_COLLEGES } from '@/lib/mock-data';
import { CollegeExplorer } from '@/components/dashboard/college-explorer';

export const metadata: Metadata = {
  title: 'Colleges - NextStep',
  description: 'Explore colleges and find the right program for you.',
};

export default async function CollegesPage() {
  const colleges = MOCK_COLLEGES;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Explore Colleges</h1>
        <p className="text-muted-foreground">
          Discover alternative pathways and practical programs.
        </p>
      </div>
      <CollegeExplorer colleges={colleges} />
    </div>
  );
}
