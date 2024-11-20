import { Select } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { CreditApplicationFilters, ApplicationStatus, LoanPurpose } from '@/types/credit';

const STATUS_OPTIONS = [
  { value: 'PENDING', label: 'ממתין לאישור' },
  { value: 'APPROVED', label: 'מאושר' },
  { value: 'REJECTED', label: 'נדחה' },
  { value: 'IN_PROCESS', label: 'בטיפול' }
];

const PURPOSE_OPTIONS = [
  { value: 'MORTGAGE', label: 'משכנתא' },
  { value: 'BUSINESS', label: 'עסקי' },
  { value: 'PERSONAL', label: 'אישי' }
];

interface ApplicationFiltersProps {
  filters: CreditApplicationFilters;
  onChange: (filters: CreditApplicationFilters) => void;
  disabled?: boolean;
}

export default function ApplicationFilters({ filters, onChange, disabled }: ApplicationFiltersProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">סטטוס</label>
          <Select
            value={filters.status}
            onChange={(e) => onChange({ ...filters, status: e.target.value as ApplicationStatus })}
            options={STATUS_OPTIONS}
            placeholder="כל הסטטוסים"
            disabled={disabled}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">מטרה</label>
          <Select
            value={filters.purpose}
            onChange={(e) => onChange({ ...filters, purpose: e.target.value as LoanPurpose })}
            options={PURPOSE_OPTIONS}
            placeholder="כל המטרות"
            disabled={disabled}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">מתאריך</label>
          <Input
            type="date"
            value={filters.fromDate}
            onChange={(e) => onChange({ ...filters, fromDate: e.target.value })}
            disabled={disabled}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">עד תאריך</label>
          <Input
            type="date"
            value={filters.toDate}
            onChange={(e) => onChange({ ...filters, toDate: e.target.value })}
            disabled={disabled}
          />
        </div>
      </div>

      <div>
        <Input
          type="search"
          placeholder="חיפוש לפי מזהה בקשה או שם לקוח..."
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          disabled={disabled}
        />
      </div>
    </div>
  );
} 