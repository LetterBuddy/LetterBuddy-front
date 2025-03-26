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
const ChildAccountsPage = lazy(() => import('./pages/ChildAccountsPage'));



const App = () => {
  const isChild = useUserStore(state => state.isChild);
  const isLoggedIn = useUserStore(state => state.isLoggedIn); 
  const defaultPath = isChild ? "/submission" : "/accounts";
  return (
    <div>
      <Layout>
          <Routes>
            <Route path="/splash" element={!isLoggedIn ? <SplashPage /> : <Navigate to={defaultPath} />}/>
            <Route path="/userType" element={!isLoggedIn ? <UserTypePage /> : <Navigate to={defaultPath} />}/>
            <Route path="/auth" element={!isLoggedIn ? <AuthPage /> : <Navigate to={defaultPath} />}/>
            <Route path="/submission" element={(isChild && isLoggedIn) ? <SubmissionPage /> : <Navigate to="/splash" />} />
            <Route path="/alphabet" element={(isChild && isLoggedIn) ? <AlphabetPage /> : <Navigate to="/splash" />}/>
            <Route path="/table" element={(!isChild && isLoggedIn) ? <SubmissionsTablePage /> : <Navigate to="/splash" />} />
            <Route path="/articles" element={(!isChild && isLoggedIn) ? <ArticlesPage /> : <Navigate to="/splash" />} />
            <Route path="/accounts" element={(!isChild && isLoggedIn) ? <ChildAccountsPage /> : <Navigate to="/splash" />} />
            <Route path="*" element={!isLoggedIn ? <Navigate to="/splash" /> : 
                                      isChild ? <Navigate to="/submission"/> : <Navigate to="/accounts"/> } />
          </Routes>
      </Layout>
    </div>
  );
}

export default App;
