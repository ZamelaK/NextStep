
"use client";

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { estimateAdmissionChance, EstimateAdmissionChanceOutput } from '@/ai/flows/estimate-admission-chance';
import type { Program, University, UserProfile } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Lightbulb } from 'lucide-react';
import { AlternativeSuggestions } from './alternative-suggestions';

interface ChanceEstimatorProps {
  university: University;
  program: Program;
  userProfile: UserProfile;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const formatGrades = (grades: {subject: string, grade: number}[]) => {
    if (!grades || grades.length === 0) return 'N/A';
    return grades.map(g => `${g.subject}: ${g.grade}`).join(', ');
}

export function ChanceEstimator({ university, program, userProfile, open, onOpenChange }: ChanceEstimatorProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<EstimateAdmissionChanceOutput | null>(null);
  const [showAlternatives, setShowAlternatives] = useState(false);
  const { toast } = useToast();

  const handleEstimate = async () => {
    setIsLoading(true);
    setResult(null);
    try {
      const res = await estimateAdmissionChance({
        universityName: university.name,
        programName: program.name,
        grade11Results: formatGrades(userProfile.grade11Results),
        grade12FirstTermResults: formatGrades(userProfile.grade12FirstTermResults),
        grade12SecondTermResults: formatGrades(userProfile.grade12SecondTermResults) || "N/A",
      });
      setResult(res);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to estimate admission chance. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
        setResult(null);
        setIsLoading(false);
    }, 300);
  }

  return (
    <>
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">Admission Chance Estimator</DialogTitle>
          <DialogDescription>
            For {program.name} at {university.name}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          {!result && !isLoading && (
            <p>Based on your profile, we can estimate your chances of getting into this program.</p>
          )}
          {isLoading && (
            <div className="flex flex-col items-center justify-center gap-4 p-8">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="text-muted-foreground">Analyzing your profile...</p>
            </div>
          )}
          {result && (
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-baseline mb-1">
                    <span className="font-semibold">Your Estimated Chance:</span>
                    <span className="text-2xl font-bold text-primary">{result.chancePercentage}%</span>
                </div>
                <Progress value={result.chancePercentage} className="h-4" />
              </div>
              <div>
                <h4 className="font-semibold mb-2">Reasoning:</h4>
                <p className="text-sm text-muted-foreground bg-secondary p-3 rounded-md">{result.reasoning}</p>
              </div>
            </div>
          )}
        </div>
        <DialogFooter className="sm:justify-between gap-2">
            {!result ? (
                <Button variant="outline" onClick={handleClose}>Cancel</Button>
            ) : (
                <Button variant="outline" onClick={() => setShowAlternatives(true)}>
                    <Lightbulb className="mr-2 h-4 w-4" />
                    Suggest Alternatives
                </Button>
            )}
            {!result && (
                <Button onClick={handleEstimate} disabled={isLoading}>
                    {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Estimating...</> : "Estimate My Chance"}
                </Button>
            )}
             {result && (
                <Button onClick={handleClose}>Close</Button>
            )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
    {result && <AlternativeSuggestions 
        open={showAlternatives}
        onOpenChange={setShowAlternatives}
        userProfile={userProfile}
        initialUniversityChoices={[university.name]}
        admissionChance={result.chancePercentage}
    />}
    </>
  );
}
