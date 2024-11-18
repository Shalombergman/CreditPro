import { useState, useEffect } from 'react';
import { ANALYTICS_CONFIG } from '@/config/constants';
import type { CreditScore } from '@/types/credit';

export function useAnalytics() {
  const [data, setData] = useState<CreditScore[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Mock data for now - would be replaced with real API call
        const mockData: CreditScore[] = Array.from({ length: 6 }, (_, i) => ({
          score: 600 + Math.floor(Math.random() * 300),
          status: 'GOOD',
          lastUpdated: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
          factors: [
            {
              factor: 'Payment History',
              impact: 'POSITIVE',
              description: 'Consistent payments'
            },
            {
              factor: 'Credit Utilization',
              impact: 'NEUTRAL',
              description: 'Moderate usage'
            }
          ]
        }));
        
        setData(mockData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch analytics'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, ANALYTICS_CONFIG.UPDATE_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return { data, loading, error };
} 