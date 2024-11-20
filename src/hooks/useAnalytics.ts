import { useState, useEffect } from 'react';
import { ANALYTICS_CONFIG, CREDIT_THRESHOLDS } from '@/config/constants';
import { CreditScore, CreditScoreStatus } from '@/types/credit';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';

export function useAnalytics() {
  const [data, setData] = useState<CreditScore[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      try {
        const scoresRef = collection(db, 'creditScores');
        const q = query(
          scoresRef,
          where('userId', '==', user.uid),
          orderBy('lastUpdated', 'desc'),
          limit(ANALYTICS_CONFIG.MAX_DATA_POINTS)
        );

        const querySnapshot = await getDocs(q);
        const scores = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            score: data.score,
            status: getScoreStatus(data.score),
            lastUpdated: data.lastUpdated.toDate(),
            factors: data.factors || []
          } as CreditScore;
        });

        setData(scores);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch analytics'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, ANALYTICS_CONFIG.UPDATE_INTERVAL);

    return () => clearInterval(interval);
  }, [user]);

  return { data, loading, error };
}

function getScoreStatus(score: number): CreditScoreStatus {
  if (score >= CREDIT_THRESHOLDS.EXCELLENT) return 'EXCELLENT';
  if (score >= CREDIT_THRESHOLDS.GOOD) return 'GOOD';
  if (score >= CREDIT_THRESHOLDS.FAIR) return 'FAIR';
  return 'POOR';
} 