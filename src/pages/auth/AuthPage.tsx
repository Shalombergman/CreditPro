import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import { Button } from '@/components/ui/button';

type AuthMode = 'login' | 'register';

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const [mode, setMode] = useState<AuthMode>(
    searchParams.get('mode') === 'register' ? 'register' : 'login'
  );

  useEffect(() => {
    const currentMode = searchParams.get('mode');
    setMode(currentMode === 'register' ? 'register' : 'login');
  }, [searchParams]);

  return (
    <div className="container mx-auto p-6 max-w-md">
      <Card className="p-6">
        <div className="flex justify-center mb-6">
          <div className="grid grid-cols-2 gap-2 bg-muted p-1 rounded-lg">
            <Button
              variant={mode === 'login' ? 'default' : 'ghost'}
              onClick={() => setMode('login')}
              className="rounded-md"
            >
              התחברות
            </Button>
            <Button
              variant={mode === 'register' ? 'default' : 'ghost'}
              onClick={() => setMode('register')}
              className="rounded-md"
            >
              הרשמה
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <h1 className="text-2xl font-bold text-center">
            {mode === 'login' ? 'התחברות' : 'הרשמה'}
          </h1>
          
          {mode === 'login' ? <LoginForm /> : <RegisterForm />}
          
          <div className="text-center text-sm text-gray-500">
            {mode === 'login' ? (
              <p>
                אין לך חשבון?{' '}
                <button
                  onClick={() => setMode('register')}
                  className="text-primary hover:underline"
                >
                  הרשם עכשיו
                </button>
              </p>
            ) : (
              <p>
                כבר יש לך חשבון?{' '}
                <button
                  onClick={() => setMode('login')}
                  className="text-primary hover:underline"
                >
                  התחבר
                </button>
              </p>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
} 