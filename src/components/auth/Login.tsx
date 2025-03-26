import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Label from "../ui/label/Label";
import Button from "../ui/button/Button";
import InputForm from "../ui/inputForm/InputForm";
import classes from "./AuthForm.module.css";
import useAuthStore from "../../store/useAuthStore";
import useUserStore from "../../store/useUserStore";
import axiosAPI from "../../axiosAPI";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(8, "Password is required (min 8 characters)"),
});

type LoginFormInput = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const setIsSignUp = useAuthStore((state) => state.setIsSignUp);
  const isChild = useAuthStore((state) => state.isChild);
  const userLogin = useUserStore((state) => state.userLogin);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInput>({
    resolver: zodResolver(loginSchema),
  });

  const loginHandler = async (data: LoginFormInput) => {
    try {
      console.log("Logging in...", data);
      setIsLoading(true);
      const response = await axiosAPI.post("/accounts/login/", data);
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
      userLogin(response.data.first_name, response.data.last_name, isChild);
      isChild ? navigate("/submission") : navigate("/accounts");
    } catch (error: any) {
      console.log("Login Failed", error.response.data);
      setError("Invalid username or password");
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(loginHandler)} className={classes.AuthForm}>
      <Label color="#7E675E">Log In</Label>
      <div className={classes.AuthToggle}>
        <p>{!isChild ? "Didn’t sign in yet?" : ""}</p>
        <button type="button" onClick={() => setIsSignUp(true)}>
          {!isChild ? "Sign Up" : ""}
        </button>
      </div>
      <InputForm
        type="text"
        placeholder="User Name"
        {...register("username")}
      />
      {errors?.username && <span>{errors.username.message}</span>}
      <InputForm
        type="password"
        placeholder="Password"
        {...register("password")}
      />
      {errors?.password && <span>{errors.password.message}</span>}
      {error && <span>{error}</span>}
      {!isLoading ? <Button type="submit" variant="default">
        Log In
      </Button> : <ClipLoader color="#7E675E" />}
    </form>
  );
};

export default Login;
