import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CreditCard, 
  FileText, 
  PieChart, 
  User,
  Settings 
} from 'lucide-react';
import { ROUTES } from '@/routes';

interface SidebarProps {
  isOpen: boolean;
}

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', route: ROUTES.DASHBOARD },
  { icon: CreditCard, label: 'Credit Score', route: ROUTES.CREDIT_SCORE },
  { icon: FileText, label: 'Applications', route: ROUTES.APPLICATIONS },
  { icon: PieChart, label: 'Analytics', route: ROUTES.ANALYTICS },
  { icon: User, label: 'Profile', route: ROUTES.PROFILE },
];

export default function Sidebar({ isOpen }: SidebarProps) {
  return (
    <aside className={`
      fixed top-16 left-0 h-[calc(100vh-4rem)] bg-white border-r w-64 
      transition-transform duration-300 ease-in-out z-30
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      md:translate-x-0 md:static md:h-[calc(100vh-4rem)]
    `}>
      <div className="p-4">
        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.route}
              to={item.route}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
} 