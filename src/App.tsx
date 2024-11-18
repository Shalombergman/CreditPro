import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import DashboardPage from '@/pages/dashboard/DashboardPage';
import CreditScorePage from '@/pages/credit-score/CreditScorePage';
import ApplicationsPage from '@/pages/applications/ApplicationsPage';
import NewApplicationPage from '@/pages/applications/NewApplicationPage';
import AuthPage from '@/pages/auth/AuthPage';

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/auth" element={
        !isAuthenticated ? <AuthPage /> : <Navigate to="/" replace />
      } />
      
      <Route element={<Layout />}>
        <Route path="/" element={
          isAuthenticated ? <DashboardPage /> : <Navigate to="/auth" replace />
        } />
        <Route path="/credit-score" element={<CreditScorePage />} />
        <Route path="/applications" element={<ApplicationsPage />} />
        <Route path="/applications/new" element={<NewApplicationPage />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}