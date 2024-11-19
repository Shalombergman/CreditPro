import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import MetricFilters from '@/components/analytics/MetricFilters';
import MetricChart from '@/components/analytics/MetricChart';
import MetricTable from '@/components/analytics/MetricTable';
import { MetricFilter, MetricType } from '@/types/analytics';
import { useMetrics } from '@/hooks/useMetrics';

export default function AnalyticsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<MetricFilter>({
    types: (searchParams.get('types')?.split(',') as MetricType[]) || ['INTEREST'],
    dateRange: {
      from: searchParams.get('from') || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      to: searchParams.get('to') || new Date().toISOString().split('T')[0]
    },
    comparison: searchParams.get('compare')?.split(',') || []
  });

  const { data, isLoading, error } = useMetrics(filters);

  const handleFilterChange = (newFilters: MetricFilter) => {
    setFilters(newFilters);
    setSearchParams({
      types: newFilters.types.join(','),
      from: newFilters.dateRange.from,
      to: newFilters.dateRange.to,
      compare: newFilters.comparison.join(',')
    });
  };

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <Card className="p-6 bg-red-50">
          <p className="text-red-600">שגיאה בטעינת הנתונים. אנא נסה שוב מאוחר יותר.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">אנליטיקס פיננסית</h1>
      
      <Card className="p-6">
        <MetricFilters
          filters={filters}
          onChange={handleFilterChange}
          disabled={isLoading}
        />
      </Card>

      <Card className="p-6">
        <MetricChart
          data={data}
          filters={filters}
          isLoading={isLoading}
        />
      </Card>

      <Card className="p-6">
        <MetricTable
          data={data}
          filters={filters}
          isLoading={isLoading}
        />
      </Card>
    </div>
  );
} 