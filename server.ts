import express from 'express';
const app = express();

// הגדרות בסיסיות
app.use(express.json());

// הגדרת CORS פשוטה
app.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

// מערך זמני לשמירת משתמשים
const users: any[] = [];
const pendingRegistrations = new Map<string, any>();

// נתיב להרשמה
app.post('/api/register', (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log('Got registration request:', { email });
    
    // שמירת המייל בזיכרון זמני
    const tempUserId = Math.random().toString(36).substring(7);
    pendingRegistrations.set(tempUserId, { username, email, password });
    
    console.log('Created registration:', { tempUserId, email });
    res.json({ tempUserId });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'שגיאה בתהליך ההרשמה' });
  }
});

// נתיב לאימות
app.post('/api/verify_register', (req: any, res: any) => {
  try {
    const { email, otp } = req.body;
    
    // בדיקה שהערכים קיימים
    if (!email || !otp) {
      return res.status(400).json({ message: 'Missing email or OTP' });
    }

    // הדפסה לבדיקה
    console.log('Verification request:', {
      email: email,
      otp: otp
    });

    res.json({
      token: 'dummy-token',
      user: {
        id: 1,
        email
      }
    });
  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({ message: 'שגיאה בתהליך האימות' });
  }
});

app.listen(5001, '0.0.0.0', () => {
  console.log('Server running on port 5001');
});
export default app;
  

