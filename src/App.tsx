import Layout from './components/layouts/Layout';
import { Routes, Route, Navigate} from "react-router-dom";
import SplashPage from './pages/SplashPage';
import UserTypePage from './pages/UserTypePage';
import AuthPage from './pages/AuthPage';
import SubmissionPage from './pages/SubmissionPage';
import AlphabetPage from './pages/AlphabetPage';

function App() {
  return (
    <div>
      <Layout >
        <Routes>
          <Route path="/splash" element={<SplashPage />}></Route>
          <Route path="/userType" element={<UserTypePage />}></Route>
          <Route path="/auth" element={<AuthPage />}></Route>
          <Route path="/submission" element={<SubmissionPage />}></Route>
          <Route path="/alphabet" element={<AlphabetPage />}></Route>
          <Route path="/" element={<Navigate to="/splash" />}></Route>
        </Routes>
      </Layout>
    </div>
  )
}

export default App;
