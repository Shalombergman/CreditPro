import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginForm() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:5001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();
      console.log('Server response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'שגיאה בתהליך ההתחברות');
      }

      if (data.token) {
        localStorage.setItem('token', data.token);
        navigate('/profile');
      } else {
        throw new Error('לא התקבל טוקן מהשרת');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      if (err.message === 'Failed to fetch') {
        setError('לא ניתן להתחבר לשרת. אנא בדוק את החיבור לאינטרנט ונסה שוב.');
      } else {
        setError(err.message || 'אירעה שגיאה בתהליך ההתחברות. אנא נסה שוב.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-500 text-sm">{error}</div>}
      
      <div className="space-y-2">
        <Input
          type="email"
          placeholder="אימייל"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          disabled={loading}
        />
      </div>
      
      <div className="space-y-2">
        <Input
          type="password"
          placeholder="סיסמה"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
          disabled={loading}
        />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'מתחבר...' : 'התחבר'}
      </Button>
    </form>
  );
} 