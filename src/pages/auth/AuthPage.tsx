import { useState } from 'react';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import { Card } from '@/components/ui/card';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="container flex items-center justify-center min-h-screen py-8">
      <Card className="w-full max-w-md p-6">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold">{isLogin ? 'התחברות' : 'הרשמה'}</h1>
        </div>
        
        {isLogin ? <LoginForm /> : <RegisterForm />}
        
        <div className="mt-4 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-blue-500 hover:underline"
          >
            {isLogin ? 'עדיין אין לך חשבון? הירשם כאן' : 'כבר יש לך חשבון? התחבר כאן'}
          </button>
        </div>
      </Card>
    </div>
  );
} 