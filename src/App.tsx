import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import DashboardPage from '@/pages/dashboard/DashboardPage';
import CreditScorePage from '@/pages/credit-score/CreditScorePage';
import ApplicationsPage from '@/pages/applications/ApplicationsPage';
import NewApplicationPage from '@/pages/applications/NewApplicationPage';
import AuthPage from '@/pages/auth/AuthPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          localStorage.getItem('token') ? 
            <Layout><DashboardPage /></Layout> : 
            <Navigate to="/auth" replace />
        } />
        
        <Route path="/auth" element={<AuthPage />} />
        
        <Route element={<Layout />}>
          <Route path="/credit-score" element={<CreditScorePage />} />
          <Route path="/applications" element={<ApplicationsPage />} />
          <Route path="/applications/new" element={<NewApplicationPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}