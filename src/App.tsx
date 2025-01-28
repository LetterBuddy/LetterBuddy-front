import Layout from './components/layouts/Layout';
import { Routes, Route, Navigate} from "react-router-dom";
import SplashPage from './pages/SplashPage';
import UserTypePage from './pages/UserTypePage';
import AuthPage from './pages/AuthPage';

function App() {
  return (
    <div>
      <Layout >
        <Routes>
          <Route path="/Splash" element={<SplashPage />}></Route>
          <Route path="/userType" element={<UserTypePage />}></Route>
          <Route path="/auth" element={<AuthPage />}></Route>
          <Route path="/" element={<Navigate to="/Splash" />}></Route>
        </Routes>
      </Layout>
    </div>
  )
}

export default App;
