"use client";

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { suggestAlternativeUniversities, SuggestAlternativeUniversitiesOutput } from '@/ai/flows/suggest-alternative-universities';
import type { UserProfile } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Loader2, GraduationCap } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';

interface AlternativeSuggestionsProps {
  userProfile: UserProfile;
  initialUniversityChoices: string[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const parseGrades = (gradesStr: string): Record<string, string> => {
    if (!gradesStr) return {};
    return gradesStr.split(',').reduce((acc, pair) => {
        const [course, grade] = pair.split(':');
        if (course && grade) {
            acc[course.trim()] = grade.trim();
        }
        return acc;
    }, {} as Record<string, string>);
}

export function AlternativeSuggestions({ userProfile, initialUniversityChoices, open, onOpenChange }: AlternativeSuggestionsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SuggestAlternativeUniversitiesOutput | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      const getSuggestions = async () => {
        setIsLoading(true);
        setResult(null);
        try {
          const res = await suggestAlternativeUniversities({
            grades11: parseGrades(userProfile.grade11Results),
            grades12FirstTerm: parseGrades(userProfile.grade12FirstTermResults),
            grades12SecondTerm: parseGrades(userProfile.grade12SecondTermResults),
            preferredLocation: userProfile.preferredLocation,
            preferredProgram: userProfile.preferredProgram,
            initialUniversityChoices: initialUniversityChoices,
          });
          setResult(res);
        } catch (error) {
          console.error(error);
          toast({
            title: "Error",
            description: "Failed to get suggestions. Please try again.",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      };
      getSuggestions();
    }
  }, [open, userProfile, initialUniversityChoices, toast]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">Alternative University Suggestions</DialogTitle>
          <DialogDescription>
            Here are some other great options based on your profile.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] pr-4">
            <div className="py-4 space-y-4">
            {isLoading && (
                <div className="flex flex-col items-center justify-center gap-4 p-8">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="text-muted-foreground">Finding great alternatives for you...</p>
                </div>
            )}
            {result && result.alternativeUniversities.length > 0 && (
                <div className="space-y-4">
                    {result.alternativeUniversities.map((alt, index) => (
                        <Card key={index}>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <GraduationCap className="h-5 w-5 text-primary"/>
                                    {alt.universityName}
                                </CardTitle>
                                <CardDescription>{alt.program}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">{alt.reason}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
            {result && result.alternativeUniversities.length === 0 && (
                <p>No alternative suggestions found at this time.</p>
            )}
            </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
