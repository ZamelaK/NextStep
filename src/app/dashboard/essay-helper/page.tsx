
import type { Metadata } from 'next';
import { EssayEditor } from '@/components/dashboard/essay-editor';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'AI Essay Helper - NextStep',
  description: 'Get AI-powered feedback on your application essays.',
};

export default function EssayHelperPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">AI Essay Helper</h1>
        <p className="text-muted-foreground">
            Paste your essay or motivation letter below to get instant feedback on grammar, clarity, and tone.
        </p>
      </div>
      <EssayEditor />
    </div>
  );
}
