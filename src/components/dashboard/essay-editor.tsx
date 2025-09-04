
"use client";

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2, Wand2 } from 'lucide-react';
import { reviewEssay, ReviewEssayOutput } from '@/ai/flows/review-essay';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';

export function EssayEditor() {
  const [essayText, setEssayText] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [result, setResult] = React.useState<ReviewEssayOutput | null>(null);
  const { toast } = useToast();

  const handleReview = async () => {
    if (!essayText.trim()) {
        toast({ title: "Essay is empty", description: "Please enter some text to review.", variant: "destructive" });
        return;
    }
    setIsLoading(true);
    setResult(null);
    try {
        const res = await reviewEssay({ essay: essayText });
        setResult(res);
    } catch (error) {
        console.error("Failed to review essay:", error);
        toast({ title: "Error", description: "Could not get feedback. Please try again.", variant: "destructive" });
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Your Essay</CardTitle>
          <CardDescription>Paste your text below.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Textarea
            value={essayText}
            onChange={(e) => setEssayText(e.target.value)}
            placeholder="Start writing your masterpiece here..."
            className="min-h-[400px] text-base"
          />
          <Button onClick={handleReview} disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 animate-spin" /> : <Wand2 className="mr-2" />}
            Review My Essay
          </Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>AI Feedback</CardTitle>
          <CardDescription>Suggestions to improve your writing.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="flex flex-col items-center justify-center gap-4 p-8 min-h-[400px]">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="text-muted-foreground">Our AI is reading your essay...</p>
            </div>
          )}
          {result ? (
            <div className="space-y-6">
                 <div className="space-y-2">
                    <h3 className="font-semibold">Overall Score</h3>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-primary">{result.overallScore}/100</span>
                         <Badge>{result.overallFeedback.clarity > 80 ? "Excellent" : "Needs Improvement"}</Badge>
                    </div>
                 </div>
                 <Separator/>
                 <div className="space-y-2">
                    <h3 className="font-semibold">Feedback Summary</h3>
                    <p className="text-sm text-muted-foreground">{result.summary}</p>
                 </div>
                 <Separator/>
                 <div className="space-y-4">
                    <h3 className="font-semibold">Detailed Suggestions</h3>
                    {result.suggestions.map((suggestion, index) => (
                        <div key={index} className="p-3 bg-secondary rounded-md">
                            <p className="font-medium text-sm">{suggestion.suggestion}</p>
                            <p className="text-xs text-muted-foreground mt-1">Original: "{suggestion.originalText}"</p>
                        </div>
                    ))}
                 </div>
            </div>
          ) : (
            !isLoading && <div className="flex items-center justify-center text-muted-foreground min-h-[400px]">Your feedback will appear here.</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
