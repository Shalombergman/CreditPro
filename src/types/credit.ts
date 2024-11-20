export type LoanPurpose = 'MORTGAGE' | 'BUSINESS' | 'PERSONAL';
export type ApplicationStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'IN_PROCESS';
export type CreditScoreStatus = 'EXCELLENT' | 'GOOD' | 'FAIR' | 'POOR';
export type ImpactType = 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL';

export interface CreditScore {
  score: number;
  status: CreditScoreStatus;
  lastUpdated: Date;
  factors: {
    factor: string;
    impact: ImpactType;
    description: string;
  }[];
}

export interface Guarantor {
  id: string;
  fullName: string;
  idNumber: string;
  phoneNumber: string;
  email: string;
}

export interface Document {
  id: string;
  name: string;
  url: string;
  type: string;
  uploadedAt: string;
}

export interface LoanTerms {
  interestRate: number;
  loanTerm: number;
  monthlyPayment: number;
  totalPayment: number;
}

export interface CreditApplication {
  id: string;
  userId: string;
  amount: number;
  purpose: LoanPurpose;
  status: ApplicationStatus;
  guarantors: Guarantor[];
  documents: Document[];
  terms: LoanTerms;
  createdAt: string;
  updatedAt: string;
  notes?: string;
}

export interface CreditApplicationFilters {
  status?: ApplicationStatus;
  purpose?: LoanPurpose;
  fromDate?: string;
  toDate?: string;
  search?: string;
} 