import React from "react";
import classes from "./InputForm.module.css";

interface InputFormProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

const InputForm = React.forwardRef<HTMLInputElement, InputFormProps>(
  ({ ...props }, ref) => {
    return <input className={classes.inputForm} ref={ref} {...props} />;
  }
);

export default InputForm;
