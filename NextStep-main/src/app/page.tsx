import { LoginForm } from '@/components/auth/login-form';
import { Logo } from '@/components/icons/logo';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4 sm:p-8">
      <div className="flex w-full max-w-sm flex-col items-center gap-4 text-center">
        <Logo className="h-16 w-16" />
        <h1 className="text-4xl font-headline font-bold tracking-tight">
          Welcome to NextStep
        </h1>
        <p className="text-muted-foreground">
          Your personalized guide to university admissions. Let's find your
          future.
        </p>
      </div>
      <LoginForm />
    </main>
  );
}
