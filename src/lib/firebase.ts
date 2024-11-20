import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator, collection, addDoc } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);

// Enable offline persistence
import { enableIndexedDbPersistence } from 'firebase/firestore';

try {
  enableIndexedDbPersistence(db);
} catch (err) {
  console.error('Error enabling offline persistence:', err);
}

// Initialize collections with proper types
export const collections = {
  users: collection(db, 'users'),
  applications: collection(db, 'applications'),
  creditScores: collection(db, 'creditScores')
};

// Add some initial data for testing
export async function initializeFirestore(userId: string) {
  try {
    // Add a test application
    await addDoc(collections.applications, {
      userId,
      amount: 50000,
      purpose: 'PERSONAL',
      status: 'PENDING',
      guarantors: [],
      documents: [],
      terms: {
        interestRate: 5.5,
        loanTerm: 12,
        monthlyPayment: 4300,
        totalPayment: 51600
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    // Add initial credit score
    await addDoc(collections.creditScores, {
      userId,
      score: 750,
      lastUpdated: new Date(),
      factors: [
        {
          factor: 'Payment History',
          impact: 'POSITIVE',
          description: 'תשלומים סדירים'
        }
      ]
    });
  } catch (error) {
    console.error('Error initializing Firestore:', error);
  }
} 