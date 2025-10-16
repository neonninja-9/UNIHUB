import LoginForm from '@/components/auth/login-form';
import { Logo } from '@/components/logo';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl">
          <CardHeader className="items-center justify-center space-y-4 text-center">
            <Logo className="h-12 w-12" />
            <div>
              <h1 className="font-headline text-3xl font-bold tracking-tight">
                Welcome to UNIHUB
              </h1>
              <p className="text-muted-foreground">
                Sign in to access your dashboard
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
