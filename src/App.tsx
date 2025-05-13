import { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layouts/Layout';
import useUserStore from './store/useUserStore';

// Lazy load pages to optimize performance
const SplashPage = lazy(() => import('./pages/SplashPage'));
const UserTypePage = lazy(() => import('./pages/userTypePage/UserTypePage'));
const AuthPage = lazy(() => import('./pages/AuthPage'));
const Exercise = lazy(() => import('./components/child/Excercise'));
const Alphabet = lazy(() => import('./components/child/Alphabet'));
const SubmissionsTable = lazy(() => import('./components/adult/table/SubmissionsTable'));
const Articles = lazy(() => import('./components/adult/article/Articles'));
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
            <Route path="/submission" element={(isChild && isLoggedIn) ? <Exercise /> : <Navigate to="/splash" />} />
            <Route path="/alphabet" element={(isChild && isLoggedIn) ? <Alphabet /> : <Navigate to="/splash" />}/>
            <Route path="/table" element={(!isChild && isLoggedIn) ? <SubmissionsTable /> : <Navigate to="/splash" />} />
            <Route path="/articles" element={(!isChild && isLoggedIn) ? <Articles /> : <Navigate to="/splash" />} />
            <Route path="/accounts" element={(!isChild && isLoggedIn) ? <ChildAccountsPage /> : <Navigate to="/splash" />} />
            <Route path="*" element={!isLoggedIn ? <Navigate to="/splash" /> : 
                                      isChild ? <Navigate to="/submission"/> : <Navigate to="/accounts"/> } />
          </Routes>
      </Layout>
    </div>
  );
}

export default App;
