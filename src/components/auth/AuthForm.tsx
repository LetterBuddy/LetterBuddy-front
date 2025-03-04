import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Label from "../ui/label/Label";
import Button from "../ui/button/Button";
import InputForm from "../ui/inputForm/InputForm";
import classes from "./AuthForm.module.css";

const loginSchema = z.object({
  UserName: z.string().min(1, "Username is required"),
  Password: z.string().min(5, "Password is required (min 5 characters)"),
});

const signUpSchema = z.object({
  Email: z.string().email(""),
  UserName: z.string().min(1, "Username is required"),
  Password: z.string().min(5, "Password is required (min 5 characters)"),
});
type FormInput = z.infer<typeof signUpSchema> | z.infer<typeof loginSchema>;

const AuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(true);

  const schema = isSignUp ? signUpSchema : loginSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormInput) => {
    console.log(isSignUp ? "Signing Up..." : "Logging In...", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.AuthForm}>
      <Label>{isSignUp ? "Sign Up" : "Log In"}</Label>

      <div className={classes.AuthToggle}>
        <p>{isSignUp ? "Already have an account?" : "Don't have an account?"}</p>
        <button type="button" onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? "Log In" : "Sign Up"}
        </button>
      </div>

      {isSignUp && (
        <>
          <InputForm type="email" placeholder="Email" {...register("Email")} />
        </>
      )}

      <InputForm type="text" placeholder="User Name" {...register("UserName")} />
      {errors?.UserName && <span>{errors.UserName.message}</span>}

      <InputForm type="password" placeholder="Password" {...register("Password")} />
      {errors?.Password && <span>{errors.Password.message}</span>}

      <Button type="submit" variant="default">{isSignUp ? "Sign Up" : "Log In"}</Button>
    </form>
  );
};



export default AuthForm;
