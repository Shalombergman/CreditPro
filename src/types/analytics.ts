export type MetricType = 'INTEREST' | 'INFLATION' | 'STOCK_INDEX';

export interface MetricData {
  id: string;
  type: MetricType;
  name: string;
  value: number;
  date: string;
  change: number;
  changePercentage: number;
}

export interface MetricFilter {
  types: MetricType[];
  dateRange: {
    from: string;
    to: string;
  };
  comparison: string[];
} 