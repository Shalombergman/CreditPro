import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ApplicationList from '@/components/applications/ApplicationList';
import ApplicationFilters from '@/components/applications/ApplicationFilters';
import { CreditApplicationFilters } from '@/types/credit';
import { useApplications } from '@/hooks/useApplications';

export default function ApplicationsPage() {
  const [filters, setFilters] = useState<CreditApplicationFilters>({});
  const { data: applications, isLoading, error } = useApplications(filters);
  const navigate = useNavigate();

  const handleNewApplication = () => {
    navigate('/applications/new');
  };

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <Card className="p-6 bg-red-50">
          <p className="text-red-600">שגיאה בטעינת הבקשות. אנא נסה שוב מאוחר יותר.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">בקשות אשראי</h1>
        <Button onClick={handleNewApplication}>בקשה חדשה</Button>
      </div>

      <Card className="p-6">
        <ApplicationFilters
          filters={filters}
          onChange={setFilters}
          disabled={isLoading}
        />
      </Card>

      <Card className="p-6">
        <ApplicationList
          applications={applications || []}
          isLoading={isLoading}
        />
      </Card>
    </div>
  );
} 