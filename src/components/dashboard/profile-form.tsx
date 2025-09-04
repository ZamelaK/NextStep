
"use client";

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { MOCK_USER_PROFILE } from '@/lib/mock-data';
import { Separator } from '../ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Trash2, PlusCircle } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


const subjectGradeSchema = z.object({
  subject: z.string().min(1, 'Subject is required.'),
  grade: z.coerce.number().min(0, 'Grade must be positive.').max(100, 'Grade cannot exceed 100.'),
});

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Invalid email address.'),
  profilePicture: z.string().url().optional(),
  grade11Results: z.array(subjectGradeSchema),
  grade12FirstTermResults: z.array(subjectGradeSchema),
  grade12SecondTermResults: z.array(subjectGradeSchema),
  preferredLocation: z.string(),
  preferredProgram: z.string(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const GradeTable = ({ term, control, form }: { term: "grade11Results" | "grade12FirstTermResults" | "grade12SecondTermResults", control: any, form: any }) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: term,
    });

    return (
        <div className="space-y-2">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Subject</TableHead>
                        <TableHead>Grade (%)</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {fields.map((field, index) => (
                         <TableRow key={field.id}>
                            <TableCell>
                                <FormField
                                    control={control}
                                    name={`${term}.${index}.subject`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input {...field} placeholder="e.g. Mathematics" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </TableCell>
                            <TableCell>
                                 <FormField
                                    control={control}
                                    name={`${term}.${index}.grade`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input type="number" {...field} placeholder="e.g. 85" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </TableCell>
                            <TableCell>
                                <Button variant="ghost" size="icon" onClick={() => remove(index)}>
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                            </TableCell>
                         </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => append({ subject: '', grade: '' })}
                className="mt-2"
            >
                <PlusCircle className="mr-2 h-4 w-4"/>
                Add Subject
            </Button>
        </div>
    );
}

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
                    <div className="flex items-center gap-6">
                        <FormField
                            control={form.control}
                            name="profilePicture"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        <Avatar className="h-24 w-24 border-2 border-primary cursor-pointer">
                                            <AvatarImage src={field.value} alt="User avatar" data-ai-hint="person avatar" />
                                            <AvatarFallback>U</AvatarFallback>
                                        </Avatar>
                                    </FormLabel>
                                    <FormControl>
                                        <Input type="file" className="hidden" accept="image/*" />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-1 gap-4 flex-1">
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
                </div>

                <Separator />

                {/* Academic Information */}
                <div className="space-y-4">
                     <h3 className="text-lg font-medium">Academic Information</h3>
                     <div className="space-y-4">
                        <Label>Grade 11 Results</Label>
                        <GradeTable term="grade11Results" control={form.control} form={form} />
                     </div>
                      <div className="space-y-4">
                        <Label>Grade 12 First Term Results</Label>
                        <GradeTable term="grade12FirstTermResults" control={form.control} form={form} />
                     </div>
                      <div className="space-y-4">
                        <Label>Grade 12 Second Term Results</Label>
                        <GradeTable term="grade12SecondTermResults" control={form.control} form={form} />
                     </div>
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
