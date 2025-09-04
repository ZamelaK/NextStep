
"use client";

import * as React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { MOCK_USER_PROFILE } from '@/lib/mock-data';
import { Separator } from '../ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Trash2, PlusCircle, Upload } from 'lucide-react';
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
  phoneNumber: z.string().min(10, 'Please enter a valid phone number.'),
  idNumber: z.string().min(1, 'ID Number is required.'),
  profilePicture: z.any().optional(),
  grade11Results: z.array(subjectGradeSchema),
  grade11Document: z.any().optional(),
  grade12FirstTermResults: z.array(subjectGradeSchema),
  grade12FirstTermDocument: z.any().optional(),
  grade12SecondTermResults: z.array(subjectGradeSchema),
  grade12SecondTermDocument: z.any().optional(),
  preferredLocation: z.string(),
  preferredPrograms: z.array(z.string().min(1, "Program preference cannot be empty.")).max(3, "You can add up to 3 preferences."),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const GradeTable = ({ term, control }: { term: "grade11Results" | "grade12FirstTermResults" | "grade12SecondTermResults", control: any }) => {
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
                                <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}>
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

  const { fields: programFields, append: appendProgram, remove: removeProgram } = useFieldArray({
    control: form.control,
    name: "preferredPrograms",
  });

  const profilePictureRef = form.register("profilePicture");
  const uploadButtonRef = React.useRef<HTMLInputElement>(null);

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
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="flex flex-col items-center gap-2">
                           <FormField
                                control={form.control}
                                name="profilePicture"
                                render={({ field }) => (
                                    <FormItem>
                                        <Avatar className="h-24 w-24 border-2 border-primary">
                                            <AvatarImage src={typeof field.value === 'string' ? field.value : undefined} alt="User avatar" data-ai-hint="person avatar" />
                                            <AvatarFallback>{MOCK_USER_PROFILE.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <FormControl>
                                             <Input type="file" className="hidden" accept="image/*" {...profilePictureRef} ref={uploadButtonRef} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button type="button" variant="outline" size="sm" onClick={() => uploadButtonRef.current?.click()}>
                                <Upload className="mr-2 h-4 w-4" />
                                Edit Photo
                            </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 w-full">
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
                            <FormField
                            control={form.control}
                            name="phoneNumber"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. 0123456789" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                             <FormField
                            control={form.control}
                            name="idNumber"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>ID Number</FormLabel>
                                <FormControl>
                                    <Input placeholder="Your ID Number" {...field} />
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
                <div className="space-y-6">
                     <h3 className="text-lg font-medium">Academic Information</h3>
                     <div className="space-y-4 rounded-lg border p-4">
                        <Label className="font-semibold">Grade 11 Results</Label>
                        <GradeTable term="grade11Results" control={form.control} />
                        <FormField
                          control={form.control}
                          name="grade11Document"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Proof of Results (Report Card/Transcript)</FormLabel>
                              <FormControl>
                                <Input type="file" accept=".pdf,image/*" {...form.register('grade11Document')} />
                              </FormControl>
                              <FormDescription>Upload a PDF or image file.</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                     </div>
                      <div className="space-y-4 rounded-lg border p-4">
                        <Label className="font-semibold">Grade 12 First Term Results</Label>
                        <GradeTable term="grade12FirstTermResults" control={form.control} />
                        <FormField
                          control={form.control}
                          name="grade12FirstTermDocument"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Proof of Results (Report Card/Transcript)</FormLabel>
                              <FormControl>
                                <Input type="file" accept=".pdf,image/*" {...form.register('grade12FirstTermDocument')} />
                              </FormControl>
                              <FormDescription>Upload a PDF or image file.</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                     </div>
                      <div className="space-y-4 rounded-lg border p-4">
                        <Label className="font-semibold">Grade 12 Second Term Results</Label>
                        <GradeTable term="grade12SecondTermResults" control={form.control} />
                         <FormField
                          control={form.control}
                          name="grade12SecondTermDocument"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Proof of Results (Report Card/Transcript)</FormLabel>
                              <FormControl>
                                <Input type="file" accept=".pdf,image/*" {...form.register('grade12SecondTermDocument')} />
                              </FormControl>
                              <FormDescription>Upload a PDF or image file.</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
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
                        <div className="space-y-2">
                             <FormLabel>Preferred Programs (up to 3)</FormLabel>
                             {programFields.map((field, index) => (
                                <FormField
                                    key={field.id}
                                    control={form.control}
                                    name={`preferredPrograms.${index}`}
                                    render={({ field }) => (
                                    <FormItem className="flex items-center gap-2">
                                        <FormControl>
                                            <Input placeholder={`Preference ${index + 1}`} {...field} />
                                        </FormControl>
                                        <Button type="button" variant="ghost" size="icon" onClick={() => removeProgram(index)}>
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                        </Button>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                             ))}
                              {programFields.length < 3 && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => appendProgram('')}
                                    className="mt-2"
                                >
                                    <PlusCircle className="mr-2 h-4 w-4"/>
                                    Add Preference
                                </Button>
                            )}
                             <FormMessage>{form.formState.errors.preferredPrograms?.message}</FormMessage>
                        </div>
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
