import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MetricData, MetricFilter } from '@/types/analytics';

interface MetricChartProps {
  data: MetricData[];
  filters: MetricFilter;
  isLoading: boolean;
}

export default function MetricChart({ data, filters, isLoading }: MetricChartProps) {
  if (isLoading) {
    return <div className="h-[400px] flex items-center justify-center">טוען...</div>;
  }

  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date" 
            tickFormatter={(date) => new Date(date).toLocaleDateString('he-IL')}
          />
          <YAxis />
          <Tooltip 
            labelFormatter={(date) => new Date(date).toLocaleDateString('he-IL')}
            formatter={(value) => [`${value}%`, 'ערך']}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#8884d8" 
            name="ערך"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
} 