
import type { Metadata } from 'next';
import { MOCK_DOCUMENTS } from '@/lib/mock-data';
import { DocumentManager } from '@/components/dashboard/document-manager';

export const metadata: Metadata = {
  title: 'My Documents - NextStep',
  description: 'Manage all your application documents in one place.',
};

export default function DocumentsPage() {
  const documents = MOCK_DOCUMENTS;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">My Documents</h1>
        <p className="text-muted-foreground">
          Upload, manage, and track all your application-related files.
        </p>
      </div>
      <DocumentManager initialDocuments={documents} />
    </div>
  );
}
