import { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layouts/Layout';
import useUserStore from './store/useUserStore';

// Lazy load pages to optimize performance
const SplashPage = lazy(() => import('./pages/SplashPage'));
const UserTypePage = lazy(() => import('./pages/UserTypePage'));
const AuthPage = lazy(() => import('./pages/AuthPage'));
const SubmissionPage = lazy(() => import('./pages/SubmissionPage'));
const AlphabetPage = lazy(() => import('./pages/AlphabetPage'));
const SubmissionsTablePage = lazy(() => import('./pages/SubmissionsTablePage'));
const ArticlesPage = lazy(() => import('./pages/ArticlesPage'));





function App() {
  const isChild = useUserStore(state => state.isChild);
  const isLoggedIn = useUserStore(state => state.isLoggedIn); 
  return (
    <div>
      <Layout>
          <Routes>
            <Route path="/splash" element={<SplashPage />} />
            <Route path="/userType" element={<UserTypePage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/submission" element={(isChild && isLoggedIn) ? <SubmissionPage /> : <Navigate to="/splash" />} />
            <Route path="/alphabet" element={(isChild && isLoggedIn) ? <AlphabetPage /> : <Navigate to="/splash" />}/>
            <Route path="/table" element={(!isChild && isLoggedIn) ? <SubmissionsTablePage /> : <Navigate to="/splash" />} />
            <Route path="/articles" element={(!isChild && isLoggedIn) ? <ArticlesPage /> : <Navigate to="/splash" />} />
            <Route path="*" element={<Navigate to="/splash" />} />
          </Routes>
      </Layout>
    </div>
  );
}

export default App;
