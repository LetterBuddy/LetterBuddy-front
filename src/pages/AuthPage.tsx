import useAuthStore from "../store/useAuthStore";
import SignUp from "../components/auth/SignUp";
import Login from "../components/auth/Login";

const AuthPage = () => {
  const isSignUp = useAuthStore((state) => state.isSignUp);
  return isSignUp ? <SignUp /> : <Login />;
};

export default AuthPage;
