
"use client";

import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';
import type { College } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

/**
 * Displays a card with information about a college.
 *
 * @param {object} props - The component props.
 * @param {College} props.college - The college data to display.
 * @returns {JSX.Element} The college card component.
 */
export function CollegeCard({ college }: { college: College }) {
  const { toast } = useToast();
  const router = useRouter();

  const handleStartApplication = () => {
    toast({
        title: "Application Started",
        description: `Your application for ${college.name} has been moved to your applications list as a draft.`,
    })
    router.push('/dashboard/applications');
  }
  
  return (
    <Card className="flex flex-col overflow-hidden transition-all hover:shadow-xl">
      <div className="relative h-48 w-full">
        <Image
          src={college.image}
          alt={`Campus of ${college.name}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          data-ai-hint="college campus"
        />
      </div>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">{college.name}</CardTitle>
        <CardDescription className="flex items-center gap-2 pt-1">
          <MapPin className="h-4 w-4" /> {college.location}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground mb-4">{college.description}</p>
        <h4 className="font-semibold mb-2">Popular Programs:</h4>
        <div className="flex flex-wrap gap-2">
          {college.programs.map(program => (
            <div key={program.id} className="rounded-md border p-2 bg-secondary">
                <p className="font-semibold text-sm">{program.name}</p>
                <p className="text-xs text-muted-foreground">{program.requirements}</p>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="secondary" className="w-full" onClick={handleStartApplication}>
            Start Application
        </Button>
      </CardFooter>
    </Card>
  );
}
