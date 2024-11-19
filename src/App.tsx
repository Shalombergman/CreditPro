import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import DashboardPage from '@/pages/dashboard/DashboardPage';
import CreditScorePage from '@/pages/credit-score/CreditScorePage';
import ApplicationsPage from '@/pages/applications/ApplicationsPage';
import NewApplicationPage from '@/pages/applications/NewApplicationPage';
import AuthPage from '@/pages/auth/AuthPage';
import ProfilePage from '@/pages/profile/ProfilePage';
import AnalyticsPage from '@/pages/analytics/AnalyticsPage';
import { ROUTES } from '@/routes';

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path={ROUTES.AUTH} element={
        isAuthenticated ? <Navigate to={ROUTES.HOME} replace /> : <AuthPage />
      } />

      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path={ROUTES.HOME} element={<DashboardPage />} />
          <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
          <Route path={ROUTES.CREDIT_SCORE} element={<CreditScorePage />} />
          <Route path={ROUTES.APPLICATIONS} element={<ApplicationsPage />} />
          <Route path={ROUTES.NEW_APPLICATION} element={<NewApplicationPage />} />
          <Route path={ROUTES.ANALYTICS} element={<AnalyticsPage />} />
        </Route>
      </Route>
      
      <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}