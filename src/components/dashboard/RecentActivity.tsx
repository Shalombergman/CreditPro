import React from 'react';
import { Clock, ArrowUpRight, AlertCircle, CheckCircle2 } from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'application',
    title: 'Loan Application Submitted',
    description: 'Personal loan application #12345 is under review',
    timestamp: '2 hours ago',
    status: 'pending',
  },
  {
    id: 2,
    type: 'alert',
    title: 'Credit Score Update',
    description: 'Your credit score increased by 15 points',
    timestamp: '1 day ago',
    status: 'success',
  },
  {
    id: 3,
    type: 'notification',
    title: 'Payment Due Reminder',
    description: 'Credit card payment due in 3 days',
    timestamp: '2 days ago',
    status: 'warning',
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'pending':
      return <Clock className="h-5 w-5 text-blue-500" />;
    case 'success':
      return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    case 'warning':
      return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    default:
      return <ArrowUpRight className="h-5 w-5 text-gray-500" />;
  }
};

export default function RecentActivity() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          View All
        </button>
      </div>

      <div className="space-y-6">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-4">
            <div className="flex-shrink-0">{getStatusIcon(activity.status)}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">{activity.title}</p>
              <p className="text-sm text-gray-500">{activity.description}</p>
              <p className="text-xs text-gray-400 mt-1">{activity.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}