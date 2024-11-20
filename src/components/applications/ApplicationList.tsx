import { CreditApplication } from '@/types/credit';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { Eye } from 'lucide-react';

interface ApplicationListProps {
  applications: CreditApplication[];
  isLoading: boolean;
}

const STATUS_COLORS = {
  PENDING: 'bg-yellow-500',
  APPROVED: 'bg-green-500',
  REJECTED: 'bg-red-500',
  IN_PROCESS: 'bg-blue-500'
};

const STATUS_LABELS = {
  PENDING: 'ממתין לאישור',
  APPROVED: 'מאושר',
  REJECTED: 'נדחה',
  IN_PROCESS: 'בטיפול'
};

export default function ApplicationList({ applications, isLoading }: ApplicationListProps) {
  const navigate = useNavigate();

  if (isLoading) {
    return <div className="text-center py-4">טוען...</div>;
  }

  if (applications.length === 0) {
    return <div className="text-center py-4">לא נמצאו בקשות</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="px-4 py-2 text-right">מזהה</th>
            <th className="px-4 py-2 text-right">סכום</th>
            <th className="px-4 py-2 text-right">מטרה</th>
            <th className="px-4 py-2 text-right">סטטוס</th>
            <th className="px-4 py-2 text-right">תאריך יצירה</th>
            <th className="px-4 py-2 text-right">פעולות</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((application) => (
            <tr key={application.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{application.id}</td>
              <td className="px-4 py-2">₪{application.amount.toLocaleString()}</td>
              <td className="px-4 py-2">{application.purpose}</td>
              <td className="px-4 py-2">
                <Badge className={STATUS_COLORS[application.status]}>
                  {STATUS_LABELS[application.status]}
                </Badge>
              </td>
              <td className="px-4 py-2">
                {new Date(application.createdAt).toLocaleDateString('he-IL')}
              </td>
              <td className="px-4 py-2">
                <button
                  onClick={() => navigate(`/applications/${application.id}`)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Eye className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 