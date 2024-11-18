import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import DashboardPage from '@/pages/dashboard/DashboardPage';
import CreditScorePage from '@/pages/credit-score/CreditScorePage';
import ApplicationsPage from '@/pages/applications/ApplicationsPage';
import NewApplicationPage from '@/pages/applications/NewApplicationPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/credit-score" element={<CreditScorePage />} />
          <Route path="/applications" element={<ApplicationsPage />} />
          <Route path="/applications/new" element={<NewApplicationPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}