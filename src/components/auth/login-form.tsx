"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <Card className="w-full max-w-sm mt-8 shadow-2xl">
      <CardHeader>
        <CardTitle className="text-2xl font-headline">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              defaultValue="student@nextstep.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <a href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </a>
            </div>
            <Input id="password" type="password" defaultValue="password" required />
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-4">
          <Button type="submit" className="w-full">
            Sign In
          </Button>
          <div className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <a href="#" className="underline font-medium text-primary">
              Sign up
            </a>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
