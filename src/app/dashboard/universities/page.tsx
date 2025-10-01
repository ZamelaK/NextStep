import type { Metadata } from 'next';
import { MOCK_UNIVERSITIES, MOCK_USER_PROFILE } from '@/lib/mock-data';
import { UniversityExplorer } from '@/components/dashboard/university-explorer';

export const metadata: Metadata = {
  title: 'Universities - NextStep',
  description: 'Explore universities and estimate your admission chances.',
};

export default async function UniversitiesPage() {
  const universities = MOCK_UNIVERSITIES;
  const userProfile = MOCK_USER_PROFILE;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Explore Universities</h1>
        <p className="text-muted-foreground">
          Find your perfect match. Search, filter, and estimate your admission chances.
        </p>
      </div>
      <UniversityExplorer universities={universities} userProfile={userProfile} />
    </div>
  );
}
