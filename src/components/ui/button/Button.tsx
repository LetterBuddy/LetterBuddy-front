import React from "react";
import classes from "./Button.module.css";

const Button: React.FC<{
  type?: "button" | "submit";
  onClick?: (event: React.FormEvent) => void;
  children: string;
  variant?: "default" | "white";
  style?: React.CSSProperties;
}> = (props) => {
  const buttonClasses =
    props.variant === "white"
      ? `${classes.button} ${classes.buttonWhite}`
      : classes.button;

  return (
    <button 
      type={props.type || "button"} 
      onClick={props.onClick} 
      className={buttonClasses}
      style={props.style} 
    >
      {props.children}
    </button>
  );
};

export default Button;