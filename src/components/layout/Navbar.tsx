import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, ChevronDown, Menu, X } from 'lucide-react';
import { ROUTES } from '@/routes';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [showProfile, setShowProfile] = React.useState(false);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={onMenuClick}
              className="md:hidden"
            >
              <Menu className="h-6 w-6" />
            </Button>
            <Link to={ROUTES.DASHBOARD} className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-blue-600">CreditPro</span>
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link 
              to={ROUTES.DASHBOARD} 
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:text-blue-600"
            >
              Dashboard
            </Link>
            <Link 
              to={ROUTES.APPLICATIONS} 
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-blue-600"
            >
              Applications
            </Link>
            <Link 
              to={ROUTES.ANALYTICS} 
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-blue-600"
            >
              Analytics
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="h-5 w-5" />
            </Button>
            
            <div className="relative">
              <Button
                variant="ghost"
                className="flex items-center space-x-2"
                onClick={() => setShowProfile(!showProfile)}
              >
                <div className="h-8 w-8 rounded-full bg-gray-200" />
                <ChevronDown className="h-4 w-4" />
              </Button>

              {showProfile && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                  <Link
                    to={ROUTES.PROFILE}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => {/* Implement logout */}}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}