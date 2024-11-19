import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { MetricFilter, MetricType } from '@/types/analytics';

const METRIC_TYPES = [
  { value: 'INTEREST', label: 'ריבית' },
  { value: 'INFLATION', label: 'אינפלציה' },
  { value: 'STOCK_INDEX', label: 'מדד מניות' }
];

interface MetricFiltersProps {
  filters: MetricFilter;
  onChange: (filters: MetricFilter) => void;
  disabled?: boolean;
}

export default function MetricFilters({ filters, onChange, disabled }: MetricFiltersProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">סוג מדד</label>
          <Select
            value={filters.types.join(',')}
            onChange={(e) => onChange({ 
              ...filters, 
              types: e.target.value.split(',').filter(Boolean) as MetricType[] 
            })}
            options={METRIC_TYPES}
            isMulti
            isDisabled={disabled}
            placeholder="בחר מדדים"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">מתאריך</label>
          <Input
            type="date"
            value={filters.dateRange.from}
            onChange={(e) => onChange({
              ...filters,
              dateRange: { ...filters.dateRange, from: e.target.value }
            })}
            disabled={disabled}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">עד תאריך</label>
          <Input
            type="date"
            value={filters.dateRange.to}
            onChange={(e) => onChange({
              ...filters,
              dateRange: { ...filters.dateRange, to: e.target.value }
            })}
            disabled={disabled}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">השוואה</label>
        <Select
          value={filters.comparison.join(',')}
          onChange={(e) => onChange({ 
            ...filters, 
            comparison: e.target.value.split(',').filter(Boolean) 
          })}
          options={METRIC_TYPES}
          isMulti
          isDisabled={disabled}
          placeholder="בחר מדדים להשוואה"
        />
      </div>
    </div>
  );
} 