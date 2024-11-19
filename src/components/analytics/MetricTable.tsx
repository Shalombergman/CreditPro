import { MetricData, MetricFilter } from '@/types/analytics';

interface MetricTableProps {
  data: MetricData[];
  filters: MetricFilter;
  isLoading: boolean;
}

export default function MetricTable({ data, filters, isLoading }: MetricTableProps) {
  if (isLoading) {
    return <div className="text-center py-4">טוען...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="px-4 py-2 text-right">תאריך</th>
            <th className="px-4 py-2 text-right">ערך</th>
            <th className="px-4 py-2 text-right">שינוי</th>
            <th className="px-4 py-2 text-right">שינוי באחוזים</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">
                {new Date(item.date).toLocaleDateString('he-IL')}
              </td>
              <td className="px-4 py-2">{item.value.toFixed(2)}%</td>
              <td className="px-4 py-2">{item.change > 0 ? '+' : ''}{item.change}%</td>
              <td className="px-4 py-2">{item.changePercentage > 0 ? '+' : ''}{item.changePercentage}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 