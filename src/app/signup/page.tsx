import { SignupForm } from '@/components/auth/signup-form';
import { Logo } from '@/components/icons/logo';

export default function SignupPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4 sm:p-8">
      <div className="flex w-full max-w-sm flex-col items-center gap-4 text-center">
        <Logo className="h-16 w-16" />
        <h1 className="text-4xl font-headline font-bold tracking-tight">
          Create an Account
        </h1>
        <p className="text-muted-foreground">
          Join NextStep and take the first step towards your future.
        </p>
      </div>
      <SignupForm />
    </main>
  );
}
