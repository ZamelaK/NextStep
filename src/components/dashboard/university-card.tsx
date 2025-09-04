"use client";

import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Target } from 'lucide-react';
import type { University, Program, UserProfile } from '@/lib/types';
import { useState } from 'react';
import { ChanceEstimator } from './chance-estimator';

export function UniversityCard({ university, userProfile }: { university: University, userProfile: UserProfile }) {
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  
  return (
    <>
      <Card className="flex flex-col overflow-hidden transition-all hover:shadow-xl">
        <div className="relative h-48 w-full">
          <Image
            src={university.image}
            alt={`Campus of ${university.name}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            data-ai-hint="university campus"
          />
        </div>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">{university.name}</CardTitle>
          <CardDescription className="flex items-center gap-2 pt-1">
            <MapPin className="h-4 w-4" /> {university.location}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-muted-foreground mb-4">{university.description}</p>
          <h4 className="font-semibold mb-2">Popular Programs:</h4>
          <div className="flex flex-wrap gap-2">
            {university.programs.map(program => (
              <Button 
                key={program.id} 
                variant="outline"
                size="sm"
                className="h-auto"
                onClick={() => setSelectedProgram(program)}
              >
                <div className="flex flex-col items-start p-1">
                  <span className="font-semibold">{program.name}</span>
                  <span className="text-xs text-muted-foreground">{program.requirements}</span>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="secondary" className="w-full">
              Start Application
          </Button>
        </CardFooter>
      </Card>
      {selectedProgram && (
        <ChanceEstimator 
          program={selectedProgram}
          university={university}
          userProfile={userProfile}
          open={!!selectedProgram}
          onOpenChange={() => setSelectedProgram(null)}
        />
      )}
    </>
  );
}
