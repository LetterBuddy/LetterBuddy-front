import { useForm } from "react-hook-form";
import Label from "../ui/label/Label";
import Button from "../ui/button/Button";
import InputForm from "../ui/inputForm/InputForm";
import classes from "./SignUp.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';

const schema = z.object({
  Email: z.string().email("Email is required"),
  UserName: z.string().min(1, "Username is required"),
  Password: z.string().min(5, "Password is required (min 5 characters)"),
});
type IFormInput = z.infer<typeof schema>;

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: zodResolver(schema), // Use Zod resolver here
  });

  const onSubmit = (data: IFormInput) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.SignUp}>
      <Label>Sign Up</Label>
      <label >Existing user? Log in</label>

      <InputForm
        type="email"
        placeholder="Email"
        {...register("Email")}
      />
      {errors.Email && <span>{errors.Email.message}</span>}

      <InputForm
        type="text"
        placeholder="User Name"
        {...register("UserName")}
      />
      {errors.UserName && <span>{errors.UserName.message}</span>}

      <InputForm
        type="password"
        placeholder="Password"
        {...register("Password")}
      />
      {errors.Password && <span>{errors.Password.message}</span>}

      <Button type="submit" variant="default">Sign Up</Button>
    </form>
  );
};

export default SignUp;
