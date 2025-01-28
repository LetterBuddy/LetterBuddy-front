import React from "react";
import classes from "./InputForm.module.css";

interface InputFormProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputForm: React.FC<InputFormProps> = ({ value, onChange }) => {
  return <input className={classes.inputForm} type="text" value={value} onChange={onChange} />;
};

export default InputForm;