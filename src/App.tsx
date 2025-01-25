import Layout from './components/layouts/Layout';
import { Routes, Route, Navigate} from "react-router-dom";
import SplashPage from './pages/SplashPage';

function App() {
  return (
    <div>
      <Layout >
        <Routes>
          <Route path="/Splash" element={<SplashPage />}></Route>
          <Route path="/" element={<Navigate to="/Splash" />}></Route>
        </Routes>
      </Layout>
    </div>
  )
}

export default App;
