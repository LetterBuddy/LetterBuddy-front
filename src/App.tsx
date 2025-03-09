import { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layouts/Layout';

// Lazy load pages to optimize performance
const SplashPage = lazy(() => import('./pages/SplashPage'));
const UserTypePage = lazy(() => import('./pages/UserTypePage'));
const AuthPage = lazy(() => import('./pages/AuthPage'));
const SubmissionPage = lazy(() => import('./pages/SubmissionPage'));
const AlphabetPage = lazy(() => import('./pages/AlphabetPage'));
const SubmissionsTablePage = lazy(() => import('./pages/SubmissionsTablePage'));

function App() {
  return (
    <div>
      <Layout>
          <Routes>
            <Route path="/splash" element={<SplashPage />} />
            <Route path="/userType" element={<UserTypePage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/submission" element={<SubmissionPage />} />
            <Route path="/alphabet" element={<AlphabetPage />} />
            <Route path="/table" element={<SubmissionsTablePage />} />
            <Route path="/" element={<Navigate to="/splash" />} />
          </Routes>
      </Layout>
    </div>
  );
}

export default App;
