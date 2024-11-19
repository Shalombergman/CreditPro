import { useState, useEffect } from 'react';
import { MetricFilter, MetricData } from '@/types/analytics';

export function useMetrics(filters: MetricFilter) {
  const [data, setData] = useState<MetricData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // כרגע נשתמש בנתוני דוגמה - בהמשך נחליף ב-API אמיתי
        const mockData: MetricData[] = Array.from({ length: 30 }, (_, i) => ({
          id: `metric-${i}`,
          type: filters.types[0],
          name: 'ריבית בנק ישראל',
          value: 3.5 + Math.random(),
          date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
          change: 0.25,
          changePercentage: 2.5
        }));
        
        setData(mockData);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch metrics'));
        setIsLoading(false);
      }
    };

    fetchData();
  }, [filters]);

  return { data, isLoading, error };
} 