import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterForm() {
  const [formData, setFormData] = useState<RegisterFormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  // מצבים חדשים
  const [showOtpDialog, setShowOtpDialog] = useState(false);
  const [otp, setOtp] = useState('');
  const [tempUserId, setTempUserId] = useState('');
  const [otpError, setOtpError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError('הסיסמאות אינן תואמות');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:5001/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();
      console.log('Server response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'שגיאה בתהליך ההרשמה');
      }

      // פתיחת חלון האימות
      setTempUserId(data.tempUserId);
      setShowOtpDialog(true);
      setOtpError('');
    } catch (err: any) {
      console.error('שגיאת הרשמה:', err);
      setError(err.message || 'אירעה שגיאה בתהליך ההרשמה. אנא נסה שוב.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      setOtpError('נא להזין קוד אימות');
      return;
    }

    setLoading(true);
    setOtpError('');

    try {
      const requestData = {
        "email": formData.email,
        "otp": otp.toString(),
        "tempUserId": tempUserId
      };
      console.log('Sending verification data:', requestData);

      const response = await fetch('http://127.0.0.1:5001/api/verify_register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });

      const data = await response.json();
      console.log('Server response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'קוד האימות שגוי');
      }

      setShowOtpDialog(false);
      navigate('/profile');
    } catch (err: any) {
      console.error('שגיאת אימות:', err);
      setOtpError(err.message || 'שגיאה באימות הקוד. אנא נסה שוב.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <div className="text-red-500 text-sm">{error}</div>}
        
        <div className="space-y-2">
          <Input
            type="text"
            placeholder="שם משתמש"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            required
            disabled={loading}
          />
        </div>

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
            minLength={6}
            disabled={loading}
          />
        </div>

        <div className="space-y-2">
          <Input
            type="password"
            placeholder="אימות סיסמה"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            required
            disabled={loading}
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'מבצע רישום...' : 'הרשם'}
        </Button>
      </form>

      {/* חלון אימות OTP */}
      <Dialog open={showOtpDialog} onOpenChange={setShowOtpDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>אימות חשבון</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <p className="text-sm text-gray-500">
              קוד אימות נשלח לכתובת המייל שלך. אנא הזן אותו כאן:
            </p>
            <Input
              type="text"
              placeholder="הזן קוד אימות"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              className="text-center text-2xl tracking-widest"
            />
            {otpError && (
              <div className="text-red-500 text-sm text-center">
                {otpError}
              </div>
            )}
            <Button 
              onClick={handleVerifyOtp}
              disabled={loading || !otp}
              className="w-full"
            >
              {loading ? 'מאמת...' : 'אמת חשבון'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
} 