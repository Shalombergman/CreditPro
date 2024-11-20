import Fastify from 'fastify';
import cors from '@fastify/cors';

const fastify = Fastify({ logger: true });

// הגדרת CORS מעודכנת
const start = async () => {
  try {
    // רישום ה-CORS plugin
    await fastify.register(cors, {
      origin: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true
    });

    // מערך זמני לשמירת משתמשים
    const users: any[] = [];
    const pendingRegistrations: Map<string, any> = new Map();

    // נתיב להרשמה
    fastify.post('/api/register', async (request, reply) => {
      try {
        const { username, email, password } = request.body as any;
        fastify.log.info('Got registration request:', { username, email });
        
        if (!username || !email || !password) {
          return reply.code(400).send({ message: 'חסרים שדות חובה' });
        }

        // שמירת פרטי המשתמש בזיכרון זמני
        const tempUserId = Math.random().toString(36).substring(7);
        pendingRegistrations.set(tempUserId, { username, email, password });

        // שליחת תשובה חיובית
        return reply
          .code(200)
          .header('Access-Control-Allow-Origin', 'http://localhost:3000')
          .header('Access-Control-Allow-Credentials', 'true')
          .send({
            message: 'קוד אימות נשלח למייל',
            tempUserId
          });
      } catch (error) {
        fastify.log.error('Registration error:', error);
        return reply.code(500).send({ message: 'שגיאה בתהליך ההרשמה' });
      }
    });

    // נתיב לאימות OTP
    fastify.post('/api/verify_register', async (request, reply) => {
      try {
        const { tempUserId, otp } = request.body as any;
        
        if (!tempUserId || !otp) {
          return reply.code(400).send({ message: 'חסרים שדות חובה' });
        }

        const pendingUser = pendingRegistrations.get(tempUserId);
        if (!pendingUser) {
          return reply.code(400).send({ message: 'בקשת הרשמה לא תקינה' });
        }

        // בדיקת קוד האימות
        if (otp !== '123456') {
          return reply.code(400).send({ message: 'קוד אימות שגוי' });
        }

        // יצירת המשתמש
        const newUser = {
          id: users.length + 1,
          ...pendingUser
        };

        users.push(newUser);
        pendingRegistrations.delete(tempUserId);

        return reply
          .code(200)
          .header('Access-Control-Allow-Origin', 'http://localhost:3000')
          .header('Access-Control-Allow-Credentials', 'true')
          .send({
            token: 'dummy-token',
            user: {
              id: newUser.id,
              username: newUser.username,
              email: newUser.email
            }
          });
      } catch (error) {
        fastify.log.error('Verification error:', error);
        return reply.code(500).send({ message: 'שגיאה בתהליך האימות' });
      }
    });

    // הפעלת השרת
    await fastify.listen({ port: 5001, host: '0.0.0.0' });
    console.log('Server running on port 5001');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

export default fastify;
  