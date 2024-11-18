export interface CreditScore {
  score: number;
  status: string;
  lastUpdated: Date;
  factors: {
    factor: string;
    impact: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL';
    description: string;
  }[];
}

export interface CreditApplication {
  id: string;
  type: string;
  amount: number;
  status: 'APPROVED' | 'REJECTED' | 'PENDING' | 'REVIEW';
  submittedAt: Date;
}

export interface DecisionTreeNode {
  question: string;
  options: {
    text: string;
    value: string;
    nextNodeId?: string;
  }[];
  type: 'INCOME' | 'EMPLOYMENT' | 'CREDIT_HISTORY' | 'DEBT_RATIO' | 'PAYMENT_HISTORY';
} 