import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { CreditScore } from '@/types/credit';
import { CREDIT_THRESHOLDS } from '@/config/constants';

interface CreditScoreCardProps {
  creditScore: CreditScore;
}

export default function CreditScoreCard({ creditScore }: CreditScoreCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= CREDIT_THRESHOLDS.EXCELLENT) return 'text-green-500';
    if (score >= CREDIT_THRESHOLDS.GOOD) return 'text-blue-500';
    if (score >= CREDIT_THRESHOLDS.FAIR) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case 'POSITIVE':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'NEGATIVE':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Credit Score</CardTitle>
        <span className="text-sm text-gray-500">
          Updated {new Date(creditScore.lastUpdated).toLocaleDateString()}
        </span>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <div className={`text-4xl font-bold ${getScoreColor(creditScore.score)}`}>
              {creditScore.score}
            </div>
            <div className="text-sm text-gray-500 mt-1">{creditScore.status}</div>
          </div>
          <div className="space-y-2">
            {creditScore.factors.map((factor, index) => (
              <div key={index} className="flex items-center gap-2">
                {getImpactIcon(factor.impact)}
                <div>
                  <div className="text-sm font-medium">{factor.factor}</div>
                  <div className="text-xs text-gray-500">{factor.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 