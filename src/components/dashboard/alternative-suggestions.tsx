
"use client";

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { suggestAlternativeUniversities, SuggestAlternativeUniversitiesOutput } from '@/ai/flows/suggest-alternative-universities';
import { suggestColleges, SuggestCollegesOutput } from '@/ai/flows/suggest-colleges';
import type { UserProfile } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Loader2, GraduationCap, School } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AlternativeSuggestionsProps {
  userProfile: UserProfile;
  initialUniversityChoices: string[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  admissionChance: number | null;
}

const parseGrades = (grades: {subject: string, grade: number}[]): Record<string, string> => {
    if (!grades) return {};
    return grades.reduce((acc, item) => {
        acc[item.subject] = String(item.grade);
        return acc;
    }, {} as Record<string, string>);
}

export function AlternativeSuggestions({ userProfile, initialUniversityChoices, open, onOpenChange, admissionChance }: AlternativeSuggestionsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [universityResult, setUniversityResult] = useState<SuggestAlternativeUniversitiesOutput | null>(null);
  const [collegeResult, setCollegeResult] = useState<SuggestCollegesOutput | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      const getSuggestions = async () => {
        setIsLoading(true);
        setUniversityResult(null);
        setCollegeResult(null);
        try {
          const commonInput = {
            grades11: parseGrades(userProfile.grade11Results),
            grades12FirstTerm: parseGrades(userProfile.grade12FirstTermResults),
            grades12SecondTerm: parseGrades(userProfile.grade12SecondTermResults),
            preferredLocation: userProfile.preferredLocation,
            preferredPrograms: userProfile.preferredPrograms,
          };

          const [uniRes, colRes] = await Promise.all([
             suggestAlternativeUniversities({
              ...commonInput,
              initialUniversityChoices: initialUniversityChoices,
            }),
            suggestColleges({
              ...commonInput,
              admissionChance: admissionChance,
            })
          ]);

          setUniversityResult(uniRes);
          setCollegeResult(colRes);

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
  }, [open, userProfile, initialUniversityChoices, toast, admissionChance]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">Alternative Suggestions</DialogTitle>
          <DialogDescription>
            Here are some other great options based on your profile.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {isLoading && (
              <div className="flex flex-col items-center justify-center gap-4 p-8">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="text-muted-foreground">Finding great alternatives for you...</p>
              </div>
          )}
          {!isLoading && (
            <Tabs defaultValue="universities">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="universities">Universities</TabsTrigger>
                <TabsTrigger value="colleges">Colleges</TabsTrigger>
              </TabsList>
              <ScrollArea className="max-h-[60vh] pr-4 mt-4">
                <TabsContent value="universities">
                  <div className="space-y-4">
                      {universityResult && universityResult.alternativeUniversities.length > 0 && (
                          <div className="space-y-4">
                              {universityResult.alternativeUniversities.map((alt, index) => (
                                  <Card key={`uni-${index}`}>
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
                      {universityResult && universityResult.alternativeUniversities.length === 0 && (
                          <p>No alternative university suggestions found at this time.</p>
                      )}
                  </div>
                </TabsContent>
                <TabsContent value="colleges">
                   <div className="space-y-4">
                      {collegeResult && collegeResult.alternativeColleges.length > 0 && (
                          <div className="space-y-4">
                              {collegeResult.alternativeColleges.map((alt, index) => (
                                  <Card key={`col-${index}`}>
                                      <CardHeader>
                                          <CardTitle className="flex items-center gap-2">
                                              <School className="h-5 w-5 text-primary"/>
                                              {alt.collegeName}
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
                      {collegeResult && collegeResult.alternativeColleges.length === 0 && (
                          <p>No alternative college suggestions found at this time.</p>
                      )}
                   </div>
                </TabsContent>
              </ScrollArea>
            </Tabs>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
