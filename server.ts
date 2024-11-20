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
app.post('/api/verify_register', (req, res) => {
  try {
    const { email, otp, tempUserId } = req.body;
    console.log('Received verification request:', { email, otp, tempUserId });

    // בדיקה שיש tempUserId
    if (!tempUserId) {
      return res.status(400).json({ message: 'Missing tempUserId' });
    }

    // בדיקה שיש רישום ממתין
    const pendingUser = pendingRegistrations.get(tempUserId);
    if (!pendingUser) {
      return res.status(400).json({ message: 'Invalid registration request' });
    }

    // בדיקה שהמייל תואם
    if (pendingUser.email !== email) {
      return res.status(400).json({ message: 'Email mismatch' });
    }

    // שליחת המייל והקוד לצוות 2
    console.log('Sending to team 2:', {
      email: email.trim(),
      otp: otp.trim()
    });

    // החזרת תשובה חיובית
    res.json({
      token: 'dummy-token',
      user: {
        id: 1,
        email: email.trim()
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
  

