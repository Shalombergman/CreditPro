import React from 'react';
import { FileText, CreditCard, PieChart, Download } from 'lucide-react';
import QuickActionCard from './QuickActionCard';
import { ROUTES } from '@/routes';

const actions = [
  {
    title: 'New Application',
    description: 'Start a new credit application',
    icon: FileText,
    color: 'bg-blue-500',
    route: ROUTES.NEW_APPLICATION,
  },
  {
    title: 'Credit Score',
    description: 'View your credit score details',
    icon: CreditCard,
    color: 'bg-purple-500',
    route: ROUTES.CREDIT_SCORE,
  },
  {
    title: 'Applications',
    description: 'View all your applications',
    icon: Download,
    color: 'bg-green-500',
    route: ROUTES.APPLICATIONS,
  },
  {
    title: 'Analytics',
    description: 'View detailed analytics',
    icon: PieChart,
    color: 'bg-orange-500',
    route: ROUTES.ANALYTICS,
  },
];

export default function QuickActions() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {actions.map((action) => (
        <QuickActionCard
          key={action.title}
          {...action}
        />
      ))}
    </div>
  );
}