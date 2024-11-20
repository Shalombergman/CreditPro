import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="flex flex-1 relative">
        <Sidebar isOpen={isSidebarOpen} />
        <main className={`
          flex-1 p-6 
          transition-all duration-300 
          ${isSidebarOpen ? 'md:mr-64' : ''} 
          overflow-auto
        `}>
          <Outlet />
        </main>
      </div>
    </div>
  );
} 