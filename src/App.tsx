import { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layouts/Layout';
import useUserStore from './store/useUserStore';

// Lazy load pages to optimize performance
const SplashPage = lazy(() => import('./pages/SplashPage'));
const UserTypePage = lazy(() => import('./pages/userTypePage/UserTypePage'));
const AuthPage = lazy(() => import('./pages/AuthPage'));
const Exercise = lazy(() => import('./components/child/Exercise'));
const Alphabet = lazy(() => import('./components/child/Alphabet'));
const SubmissionsTable = lazy(() => import('./components/adult/table/SubmissionsTable'));
const Articles = lazy(() => import('./components/adult/article/Articles'));
const ChildAccountsPage = lazy(() => import('./pages/ChildAccountsPage'));
const ChildCharts = lazy(() => import('./components/adult/chart/childCharts'));

const App = () => {
  const isChild = useUserStore(state => state.isChild);
  const isLoggedIn = useUserStore(state => state.isLoggedIn); 
  const defaultPath = isChild ? "/exercise" : "/accounts";
  return (
    <div>
      <Layout>
          <Routes>
            <Route path="/splash" element={!isLoggedIn ? <SplashPage /> : <Navigate to={defaultPath} />}/>
            <Route path="/userType" element={!isLoggedIn ? <UserTypePage /> : <Navigate to={defaultPath} />}/>
            <Route path="/auth" element={!isLoggedIn ? <AuthPage /> : <Navigate to={defaultPath} />}/>
            <Route path="/exercise" element={(isChild && isLoggedIn) ? <Exercise /> : <Navigate to="/splash" />} />
            <Route path="/alphabet" element={(isChild && isLoggedIn) ? <Alphabet /> : <Navigate to="/splash" />}/>
            <Route path="/table" element={(!isChild && isLoggedIn) ? <SubmissionsTable /> : <Navigate to="/splash" />} />
            <Route path="/chart" element={(!isChild && isLoggedIn) ? <ChildCharts /> : <Navigate to="/splash" />} />
            <Route path="/articles" element={(!isChild && isLoggedIn) ? <Articles /> : <Navigate to="/splash" />} />
            <Route path="/accounts" element={(!isChild && isLoggedIn) ? <ChildAccountsPage /> : <Navigate to="/splash" />} />
            <Route path="*" element={!isLoggedIn ? <Navigate to="/splash" /> : 
                                      isChild ? <Navigate to="/exercise"/> : <Navigate to="/accounts"/> } />
          </Routes>
      </Layout>
    </div>
  );
}

export default App;
