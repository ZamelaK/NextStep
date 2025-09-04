"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { MOCK_USER_PROFILE } from '@/lib/mock-data';
import { Separator } from '../ui/separator';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Invalid email address.'),
  grade11Results: z.string().min(1, 'Grade 11 results are required.'),
  grade12FirstTermResults: z.string().min(1, 'Grade 12 Term 1 results are required.'),
  grade12SecondTermResults: z.string(),
  preferredLocation: z.string(),
  preferredProgram: z.string(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

/**
 * Renders a form for users to update their profile information,
 * including personal details, academic results, and university preferences.
 * The form is built with react-hook-form for state management and zod for validation.
 *
 * @returns {JSX.Element} The profile form component.
 */
export function ProfileForm() {
  const { toast } = useToast();
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: MOCK_USER_PROFILE,
  });

  function onSubmit(data: ProfileFormValues) {
    console.log(data);
    toast({
      title: "Profile Updated",
      description: "Your information has been saved successfully.",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
            <CardHeader>
                <CardTitle>Edit Profile</CardTitle>
                <CardDescription>Update your personal, academic, and preference information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
                {/* Personal Information */}
                <div className="space-y-4">
                    <h3 className="text-lg font-medium">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Your Name" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="your@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    </div>
                </div>

                <Separator />

                {/* Academic Information */}
                <div className="space-y-4">
                     <h3 className="text-lg font-medium">Academic Information</h3>
                     <CardDescription>Enter your grades as "Course: Grade, Course: Grade, ...".</CardDescription>
                    <FormField
                    control={form.control}
                    name="grade11Results"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Grade 11 Results</FormLabel>
                        <FormControl>
                            <Textarea placeholder="e.g., Math: 95, English: 88" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="grade12FirstTermResults"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Grade 12 First Term Results</FormLabel>
                        <FormControl>
                            <Textarea placeholder="e.g., Advanced Functions: 96, English: 90" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="grade12SecondTermResults"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Grade 12 Second Term Results (if available)</FormLabel>
                        <FormControl>
                            <Textarea placeholder="e.g., Calculus: 97, English: 92" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>

                <Separator />
                
                {/* Preferences */}
                <div className="space-y-4">
                    <h3 className="text-lg font-medium">Preferences</h3>
                    <CardDescription>Help us recommend better alternatives.</CardDescription>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="preferredLocation"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Preferred Location</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., Ontario, Canada" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="preferredProgram"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Preferred Program</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., Computer Science" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
          </CardContent>
          <CardFooter>
            <Button type="submit">Save Changes</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
