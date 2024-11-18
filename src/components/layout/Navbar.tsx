import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, ChevronDown, Menu, LogOut } from 'lucide-react';
import { ROUTES } from '@/routes';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [showProfile, setShowProfile] = React.useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = React.useState(false);

  const handleLogout = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      const data = await response.json();
      
      if (data.success) {
        localStorage.removeItem('token');
        setShowLogoutDialog(false);
        navigate('/auth');
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <>
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
                      פרופיל
                    </Link>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        setShowProfile(false);
                        setShowLogoutDialog(true);
                      }}
                    >
                      <div className="flex items-center space-x-2">
                        <LogOut className="h-4 w-4 ml-2" />
                        <span>התנתקות</span>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>אישור התנתקות</DialogTitle>
            <DialogDescription>
              האם אתה בטוח שברצונך להתנתק מהמערכת?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowLogoutDialog(false)}
            >
              ביטול
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleLogout}
            >
              התנתק
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}