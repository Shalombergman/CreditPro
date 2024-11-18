import React from 'react';
import { TrendingUp } from 'lucide-react';

export default function CreditScore() {
  const score = 750;
  const maxScore = 850;
  const percentage = (score / maxScore) * 100;

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Credit Score</h3>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <TrendingUp className="w-3 h-3 mr-1" />
          +15 pts
        </span>
      </div>
      
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-3xl font-bold text-gray-900">{score}</span>
            <span className="text-sm text-gray-500 ml-2">out of {maxScore}</span>
          </div>
          <div className="text-right">
            <span className="text-sm font-semibold inline-block text-blue-600">
              Excellent
            </span>
          </div>
        </div>
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
          <div
            style={{ width: `${percentage}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>300</span>
          <span>850</span>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-gray-600">Payment History</span>
          <span className="font-medium text-gray-900">Excellent</span>
        </div>
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-gray-600">Credit Utilization</span>
          <span className="font-medium text-gray-900">15%</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Account Age</span>
          <span className="font-medium text-gray-900">7 years</span>
        </div>
      </div>
    </div>
  );
}