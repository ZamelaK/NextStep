import type { Metadata } from 'next';
import { ProfileForm } from '@/components/dashboard/profile-form';

export const metadata: Metadata = {
  title: 'My Profile - NextStep',
  description: 'Manage your profile and academic information.',
};

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">My Profile</h1>
        <p className="text-muted-foreground">
          Keep your academic and personal information up to date.
        </p>
      </div>
      <ProfileForm />
    </div>
  );
}
