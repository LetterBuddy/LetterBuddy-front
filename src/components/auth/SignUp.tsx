import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Label from "../ui/label/Label";
import Button from "../ui/button/Button";
import InputForm from "../ui/inputForm/InputForm";
import classes from "./AuthForm.module.css";
import useAuthStore from "../../store/useAuthStore";
import useLoadingStore from "../../store/useLoadingStore";
import axiosAPI from "../../axiosAPI";
import ClipLoader from "react-spinners/ClipLoader";

const signUpSchema = z.object({
  email: z.string().email("Email is required"),
  username: z.string().min(1, "Username is required"),
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  password: z.string().min(8, "Password is required (min 8 characters)"),
});

type SignUpFormInput = z.infer<typeof signUpSchema>;

const SignUp = () => {
  const setIsSignUp = useAuthStore((state) => state.setIsSignUp);
  const {isLoading, setIsLoading} = useLoadingStore();
  
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignUpFormInput>({
    resolver: zodResolver(signUpSchema),
  });

  const signUpHandler = async (data: SignUpFormInput) => {
    try {
      setIsLoading(true);
      const response = await axiosAPI.post("/accounts/adult/", data);
      console.log("Sign Up Successful", response);
      setIsSignUp(false);
    } catch (error: any) {
      console.log("Sign Up Failed", error.response.data);
      const errorData = error.response.data;

      Object.keys(errorData).forEach((key) => {
        if (Array.isArray(errorData[key])) {
          setError(key as keyof SignUpFormInput, {
            message: errorData[key].join(" "),
          });
        }
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(signUpHandler)} className={classes.AuthForm}>
      <Label color="#7E675E">Sign Up</Label>
      <div className={classes.AuthToggle}>
        <p>Already have an account?</p>
        <button type="button" onClick={() => setIsSignUp(false)}>
          Log In
        </button>
      </div>
      <InputForm type="email" placeholder="Email" {...register("email")} />
      {errors?.email && <span>{errors.email.message}</span>}
      <InputForm
        type="text"
        placeholder="First Name"
        {...register("first_name")}
      />
      {errors?.first_name && <span>{errors.first_name.message}</span>}
      <InputForm
        type="text"
        placeholder="Last Name"
        {...register("last_name")}
      />
      {errors?.last_name && <span>{errors.last_name.message}</span>}
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
      {!isLoading ? (
        <Button type="submit" variant="default">
          Sign Up
        </Button>
      ) : (
        <ClipLoader className={classes.loader} />
      )}
    </form>
  );
};

export default SignUp;
