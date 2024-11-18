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