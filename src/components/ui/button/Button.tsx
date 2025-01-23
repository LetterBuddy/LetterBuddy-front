import React from "react";
import classes from "./Button.module.css";

const Button: React.FC<{
  onClick: (event: React.FormEvent) => void;
  children: string;
  variant?: "default" | "white";
}> = (props) => {
  const buttonClasses =
  props.variant === "white"
    ? `${classes.button} ${classes.buttonWhite}`
    : classes.button;

  return (
    <button onClick={props.onClick} className={buttonClasses}>
      {props.children}
    </button>
  );
};

export default Button;