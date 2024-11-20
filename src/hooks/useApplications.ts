import { useState, useEffect } from 'react';
import { CreditApplication, CreditApplicationFilters } from '@/types/credit';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';

export function useApplications(filters: CreditApplicationFilters) {
  const [data, setData] = useState<CreditApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchApplications = async () => {
      if (!user) {
        console.log('No user found');
        setError(new Error('משתמש לא מחובר'));
        setIsLoading(false);
        return;
      }
      
      try {
        console.log('Starting to fetch applications for user:', user.uid);
        setIsLoading(true);
        setError(null);
        
        // שאילתה בסיסית
        const applicationsRef = collection(db, 'applications');
        const q = query(applicationsRef, where('userId', '==', user.uid));
        
        console.log('Executing query...');
        const querySnapshot = await getDocs(q);
        console.log('Got applications:', querySnapshot.size);

        // המרת התוצאות למערך
        const applications = querySnapshot.docs.map(doc => {
          console.log('Processing doc:', doc.id);
          return {
            id: doc.id,
            ...doc.data()
          } as CreditApplication;
        });

        // מיון לפי תאריך יצירה
        applications.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        // פילטור נוסף
        let filteredApplications = applications;
        if (filters.status) {
          filteredApplications = filteredApplications.filter(app => app.status === filters.status);
        }
        if (filters.purpose) {
          filteredApplications = filteredApplications.filter(app => app.purpose === filters.purpose);
        }

        console.log('Final filtered applications:', filteredApplications.length);
        setData(filteredApplications);
        setError(null);
      } catch (err) {
        console.error('Error in useApplications:', err);
        setError(new Error('שגיאה בטעינת הבקשות. אנא נסה שוב מאוחר יותר.'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplications();
  }, [user, filters]);

  return { data, isLoading, error };
} 