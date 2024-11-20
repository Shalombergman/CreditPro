export const CREDIT_THRESHOLDS = {
  EXCELLENT: 800,
  GOOD: 700,
  FAIR: 600,
  POOR: 500
} as const;

export const ANALYTICS_CONFIG = {
  UPDATE_INTERVAL: 60000, // 1 minute
  CHART_REFRESH_RATE: 5000, // 5 seconds
  MAX_DATA_POINTS: 100
} as const;

export const CREDIT_FACTORS = {
  PAYMENT_HISTORY: {
    name: 'היסטוריית תשלומים',
    weight: 0.35
  },
  CREDIT_UTILIZATION: {
    name: 'ניצול אשראי',
    weight: 0.30
  },
  CREDIT_AGE: {
    name: 'גיל האשראי',
    weight: 0.15
  },
  CREDIT_MIX: {
    name: 'תמהיל אשראי',
    weight: 0.10
  },
  NEW_CREDIT: {
    name: 'אשראי חדש',
    weight: 0.10
  }
} as const; 