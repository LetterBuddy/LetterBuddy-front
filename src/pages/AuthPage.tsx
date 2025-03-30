import EntryLayout from "../components/layouts/EntryLayout";
import useAuthStore from "../store/useAuthstore";
import SignUp from "../components/auth/SignUp";
import Login from "../components/auth/Login";

const AuthPage = () => {
  const isSignUp = useAuthStore((state) => state.isSignUp);
  return (
    <EntryLayout>
      {isSignUp ? <SignUp /> : <Login />}
    </EntryLayout>
  );
};

export default AuthPage;
