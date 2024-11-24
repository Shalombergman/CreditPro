import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginForm() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  const [otp, setOtp] = useState('');
  const [showOtpDialog, setShowOtpDialog] = useState(false);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:5001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
        credentials: 'include'
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || 'שגיאה בתהליך ההתחברות');
      }

      setShowOtpDialog(true);
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'שגיאה בתהליך ההתחברות');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      setError('נא להזין קוד אימות');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://127.0.0.1:5001/api/verify_login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          otp: otp.trim()
        }),
        credentials: 'include'
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || 'קוד האימות שגוי');
      }

      if (data.token) {
        localStorage.setItem('token', data.token);
        await login(data.token);
        navigate('/profile');
      } else {
        throw new Error('לא התקבל טוקן מהשרת');
      }
    } catch (err: any) {
      console.error('Verification error:', err);
      setError(err.message || 'שגיאה באימות הקוד');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {!showOtpDialog ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="אימייל"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            disabled={loading}
          />
          <Input
            type="password"
            placeholder="סיסמה"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            disabled={loading}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'מתחבר...' : 'התחברות'}
          </Button>
        </form>
      ) : (
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="הזן קוד אימות"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            disabled={loading}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button 
            onClick={handleVerifyOtp} 
            className="w-full" 
            disabled={loading}
          >
            {loading ? 'מאמת...' : 'אימות'}
          </Button>
        </div>
      )}
    </div>
  );
} 